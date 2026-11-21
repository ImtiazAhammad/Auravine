import json

import httpx2
import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.deps import get_http_client, get_mailer, get_settings_dep
from app.mail import MailError
from app.main import create_app

VALID = {"name": "Ada", "email": "ada@example.com", "subject": "Hi", "message": "Hello there"}


def make_settings():
    return Settings(
        _env_file=None, supabase_url="https://x.supabase.co", supabase_service_role_key="svc",
        revalidate_url="https://r.test", revalidate_secret="s", rate_limit_salt="salt",
    )


class World:
    """A fake Supabase plus a fake mailer, recording what the endpoint did."""

    def __init__(self):
        self.limit_answers = [True, True]
        self.limiter_down = False
        self.insert_status = 201
        self.mail_error: Exception | None = None
        self.requests: list[httpx2.Request] = []
        self.sent: list[dict] = []

    def handler(self, request: httpx2.Request) -> httpx2.Response:
        self.requests.append(request)
        path = request.url.path
        if path.endswith("/rpc/hit_rate_limit"):
            if self.limiter_down:
                return httpx2.Response(500, text="down")
            answer = self.limit_answers.pop(0) if self.limit_answers else True
            return httpx2.Response(200, json=answer)
        if path.endswith("/contact_messages") and request.method == "POST":
            if self.insert_status >= 400:
                return httpx2.Response(self.insert_status, text="nope")
            return httpx2.Response(201, json=[{"id": "row-1"}])
        if path.endswith("/contact_messages") and request.method == "PATCH":
            return httpx2.Response(204)
        return httpx2.Response(404)

    def mailer(self, settings, payload):
        if self.mail_error:
            raise self.mail_error
        self.sent.append(payload)

    def calls(self, method, suffix):
        return [r for r in self.requests if r.method == method and r.url.path.endswith(suffix)]


@pytest.fixture
def world():
    return World()


@pytest.fixture
def client(world):
    app = create_app()

    async def http_client():
        async with httpx2.AsyncClient(transport=httpx2.MockTransport(world.handler)) as c:
            yield c

    app.dependency_overrides[get_settings_dep] = make_settings
    app.dependency_overrides[get_http_client] = http_client
    app.dependency_overrides[get_mailer] = lambda: world.mailer
    return TestClient(app)


def post(client, body=None, ip="203.0.113.7"):
    payload = body if body is not None else VALID
    return client.post("/contact", json=payload, headers={"x-client-ip": ip})


def test_valid_message_is_stored_then_emailed_then_marked(client, world):
    response = post(client)
    assert response.status_code == 200
    assert response.json() == {"message": "Message received"}
    stored = json.loads(world.calls("POST", "/contact_messages")[0].content)
    assert stored["name"] == "Ada" and stored["email"] == "ada@example.com"
    assert world.sent and world.sent[0]["message"] == "Hello there"
    patch_body = json.loads(world.calls("PATCH", "/contact_messages")[0].content)
    assert "emailed_at" in patch_body and patch_body.get("email_error") is None


def test_honeypot_returns_success_and_does_nothing(client, world):
    response = post(client, {**VALID, "website": "http://spam.test"})
    assert response.status_code == 200
    assert world.requests == [] and world.sent == []


@pytest.mark.parametrize(
    "bad",
    [
        {"name": "x" * 101}, {"name": ""}, {"email": "not-an-email"},
        {"email": "a@b.c\r\nBcc: x@y.z"}, {"subject": "s" * 201},
        {"message": "m" * 5001}, {"message": ""}, {"message": "   "},
    ],
)
def test_invalid_input_is_rejected(client, world, bad):
    assert post(client, {**VALID, **bad}).status_code == 422
    assert world.calls("POST", "/contact_messages") == []


def test_over_the_limit_returns_429_and_stores_nothing(client, world):
    world.limit_answers = [False]
    response = post(client)
    assert response.status_code == 429
    assert world.calls("POST", "/contact_messages") == [] and world.sent == []


def test_limiter_down_fails_closed_with_503(client, world):
    world.limiter_down = True
    response = post(client)
    assert response.status_code == 503
    assert world.calls("POST", "/contact_messages") == [] and world.sent == []


def test_email_failure_still_succeeds_and_records_a_short_reason(client, world):
    world.mail_error = MailError("SMTP login failed")
    response = post(client)
    assert response.status_code == 200
    patch_body = json.loads(world.calls("PATCH", "/contact_messages")[0].content)
    assert patch_body["email_error"] == "SMTP login failed"
    assert "emailed_at" not in patch_body


def test_unexpected_mailer_crash_is_contained(client, world):
    world.mail_error = RuntimeError("secret-password-in-message")
    response = post(client)
    assert response.status_code == 200
    patch_body = json.loads(world.calls("PATCH", "/contact_messages")[0].content)
    assert "secret-password" not in patch_body["email_error"]


def test_insert_failure_but_email_works_still_succeeds(client, world):
    world.insert_status = 500
    response = post(client)
    assert response.status_code == 200
    assert world.sent and world.calls("PATCH", "/contact_messages") == []


def test_both_failing_returns_503(client, world):
    world.insert_status = 500
    world.mail_error = MailError("down")
    response = post(client)
    assert response.status_code == 503
    assert "email" in response.json()["error"].lower()


def test_limits_are_per_visitor_per_hour_per_day_and_overall(client, world):
    post(client)
    limits = [json.loads(r.content) for r in world.calls("POST", "/rpc/hit_rate_limit")]
    assert [(x["p_bucket"], x["p_window_seconds"], x["p_max"]) for x in limits] == [
        ("contact", 3600, 5), ("contact-day", 86400, 20), ("contact-all", 86400, 200),
    ]


def test_a_stuck_mailer_does_not_hold_the_response(client, world, monkeypatch):
    import time

    from app.routes import contact as contact_module

    monkeypatch.setattr(contact_module, "EMAIL_DEADLINE_SECONDS", 0.2)
    world.mailer = lambda settings, payload: time.sleep(1.5)  # noqa: E731
    started = time.monotonic()
    response = post(client)
    assert time.monotonic() - started < 1.2
    assert response.status_code == 200
    patch_body = json.loads(world.calls("PATCH", "/contact_messages")[0].content)
    assert patch_body["email_error"] == "email timed out"
