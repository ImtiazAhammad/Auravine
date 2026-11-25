import json

import httpx2
import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.main import create_app


def make_settings(salt="salt"):
    return Settings(
        _env_file=None, supabase_url="https://x.supabase.co", supabase_service_role_key="svc",
        revalidate_url="https://r.test", revalidate_secret="s", rate_limit_salt=salt,
    )


class World:
    def __init__(self):
        self.answers: list[bool] = []
        self.down = False
        self.calls: list[dict] = []

    def handler(self, request: httpx2.Request) -> httpx2.Response:
        if self.down:
            return httpx2.Response(500, text="down")
        body = json.loads(request.content)
        self.calls.append(body)
        return httpx2.Response(200, json=self.answers.pop(0) if self.answers else True)


@pytest.fixture
def world():
    return World()


def client_for(world, settings=None):
    app = create_app()

    async def http_client():
        async with httpx2.AsyncClient(transport=httpx2.MockTransport(world.handler)) as c:
            yield c

    app.dependency_overrides[get_settings_dep] = lambda: settings or make_settings()
    app.dependency_overrides[get_http_client] = http_client
    return TestClient(app)


def test_allowed_attempt_is_ok(world):
    response = client_for(world).post("/login-attempt", headers={"x-client-ip": "1.2.3.4"})
    assert response.status_code == 200 and response.json() == {"ok": True}


def test_checks_a_short_and_a_daily_window_per_visitor_but_no_shared_budget(world):
    client_for(world).post("/login-attempt", headers={"x-client-ip": "1.2.3.4"})
    assert [(c["p_bucket"], c["p_window_seconds"], c["p_max"]) for c in world.calls] == [
        ("login", 900, 10), ("login-day", 86400, 50),
    ]  # no "login-all": a stranger must not be able to use up the owner's budget
    assert "1.2.3.4" not in json.dumps(world.calls)


def test_over_limit_is_429(world):
    world.answers = [False]
    response = client_for(world).post("/login-attempt", headers={"x-client-ip": "1.2.3.4"})
    assert response.status_code == 429


def test_daily_limit_is_429(world):
    world.answers = [True, False]
    assert client_for(world).post("/login-attempt").status_code == 429


def test_limiter_down_fails_closed(world):
    world.down = True
    assert client_for(world).post("/login-attempt").status_code == 503


def test_missing_salt_fails_closed(world):
    response = client_for(world, make_settings(salt=None)).post("/login-attempt")
    assert response.status_code == 503
