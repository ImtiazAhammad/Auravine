import json
import logging

import httpx2
import pytest
from fastapi.testclient import TestClient

from app import prompt as prompt_module
from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.main import create_app

KEYS = {"groq_api_key": "groq-secret-A", "gemini_api_key": "gemini-secret-B"}


def make_settings(**extra):
    return Settings(_env_file=None, supabase_url="https://x.supabase.co",
                    supabase_service_role_key="svc", revalidate_url="https://r.test",
                    revalidate_secret="s", rate_limit_salt="salt", **extra)


class World:
    def __init__(self):
        self.limit_answers: list[bool] = []
        self.limiter_down = False
        self.groq = (200, {"choices": [{"message": {"content": "hello from groq"}}]})
        self.gemini = (200, {"candidates": [{"content": {"parts": [{"text": "from gemini"}]}}]})
        self.requests: list[httpx2.Request] = []

    def handler(self, request: httpx2.Request) -> httpx2.Response:
        self.requests.append(request)
        path, host = request.url.path, request.url.host
        if path.endswith("/rpc/hit_rate_limit"):
            if self.limiter_down:
                return httpx2.Response(500)
            answer = self.limit_answers.pop(0) if self.limit_answers else True
            return httpx2.Response(200, json=answer)
        if "groq" in host:
            return httpx2.Response(self.groq[0], json=self.groq[1])
        if "googleapis" in host:
            return httpx2.Response(self.gemini[0], json=self.gemini[1])
        if path.endswith("/site_settings"):
            return httpx2.Response(200, json=[{"key": "personal", "value": {"name": "ACME"}}])
        return httpx2.Response(200, json=[])


@pytest.fixture
def world():
    prompt_module.clear_cache()
    return World()


def build_client(world, **settings):
    app = create_app()

    async def http_client():
        async with httpx2.AsyncClient(transport=httpx2.MockTransport(world.handler)) as c:
            yield c

    app.dependency_overrides[get_settings_dep] = lambda: make_settings(**settings)
    app.dependency_overrides[get_http_client] = http_client
    return TestClient(app)


def chat(client, messages=None, locale="en", ip="203.0.113.7"):
    body = {"messages": messages or [{"role": "user", "content": "hi"}], "locale": locale}
    return client.post("/chat", json=body, headers={"x-client-ip": ip})


def test_happy_path_returns_reply_and_provider(world):
    response = chat(build_client(world, **KEYS))
    assert response.status_code == 200
    assert response.json() == {"reply": "hello from groq", "provider": "groq"}


def test_only_the_last_twenty_messages_are_sent(world):
    msgs = [{"role": "user" if i % 2 == 0 else "assistant", "content": f"m{i}"} for i in range(30)]
    chat(build_client(world, **KEYS), msgs)
    groq = next(r for r in world.requests if "groq" in r.url.host)
    sent = json.loads(groq.content)["messages"]
    assert [m["content"] for m in sent[1:]] == [f"m{i}" for i in range(10, 30)]


@pytest.mark.parametrize(
    "messages",
    [[], [{"role": "system", "content": "x"}], [{"role": "user", "content": ""}],
     [{"role": "user", "content": "x" * 2001}], [{"role": "user"}], "nope"],
)
def test_bad_shapes_are_rejected(world, messages):
    response = build_client(world, **KEYS).post(
        "/chat", json={"messages": messages}, headers={"x-client-ip": "1.1.1.1"}
    )
    assert response.status_code == 422
    assert not any("groq" in r.url.host for r in world.requests)


def test_rate_limit_429(world):
    world.limit_answers = [False]
    assert chat(build_client(world, **KEYS)).status_code == 429


def test_limiter_down_fails_closed(world):
    world.limiter_down = True
    response = chat(build_client(world, **KEYS))
    assert response.status_code == 503
    assert not any("groq" in r.url.host for r in world.requests)


def test_limits_are_20_per_ten_minutes_and_500_per_day(world):
    chat(build_client(world, **KEYS))
    limits = [
        json.loads(r.content) for r in world.requests if r.url.path.endswith("hit_rate_limit")
    ]
    assert [(x["p_bucket"], x["p_window_seconds"], x["p_max"]) for x in limits] == [
        ("chat", 600, 20), ("chat-all", 86400, 500),
    ]


def test_both_providers_failing_gives_a_friendly_message_without_provider_details(world, caplog):
    caplog.set_level(logging.DEBUG)
    world.groq = (500, {"error": "groq-secret-A boom"})
    world.gemini = (500, {"error": "gemini-secret-B boom"})
    response = chat(build_client(world, **KEYS))
    assert response.status_code == 503
    text = response.text.lower()
    for forbidden in ("groq", "gemini", "secret", "boom", "details"):
        assert forbidden not in text
    assert "contact" in text
    assert "secret" not in caplog.text


def test_failure_message_is_bangla_for_bn(world):
    world.groq = (500, {})
    world.gemini = (500, {})
    response = chat(build_client(world, **KEYS), locale="bn")
    assert response.status_code == 503
    assert any("ঀ" <= ch <= "৿" for ch in response.json()["error"])


def test_missing_keys_answer_503(world):
    response = chat(build_client(world))
    assert response.status_code == 503
