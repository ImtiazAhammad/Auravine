import logging

import httpx2
import pytest
from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

from app.auth import AdminUser, require_admin
from app.config import Settings
from app.deps import get_http_client, get_settings_dep

ANON = "anon-key-xyz"
SERVICE = "service-key-abc"
TOKEN = "user-token-123"
USER_ID = "11111111-1111-1111-1111-111111111111"


def make_settings(**extra):
    base = dict(
        _env_file=None, supabase_url="https://x.supabase.co", supabase_service_role_key=SERVICE,
        revalidate_url="https://r.test/api/revalidate", revalidate_secret="rev",
        supabase_anon_key=ANON,
    )
    base.update(extra)
    return Settings(**base)


class World:
    def __init__(self):
        self.auth_status = 200
        self.auth_body = {"id": USER_ID, "email": "owner@example.com"}
        self.is_admin = True
        self.admin_status = 200
        self.requests: list[httpx2.Request] = []

    def handler(self, request: httpx2.Request) -> httpx2.Response:
        self.requests.append(request)
        if request.url.path == "/auth/v1/user":
            return httpx2.Response(self.auth_status, json=self.auth_body)
        if request.url.path == "/rest/v1/admin_profiles":
            if self.admin_status != 200:
                return httpx2.Response(self.admin_status, text="boom")
            return httpx2.Response(200, json=[{"role": "admin"}] if self.is_admin else [])
        return httpx2.Response(404)


@pytest.fixture
def world():
    return World()


def build(world, **settings):
    app = FastAPI()

    @app.get("/probe")
    async def probe(admin: AdminUser = Depends(require_admin)):  # noqa: B008
        return {"id": admin.id, "email": admin.email}

    async def http_client():
        async with httpx2.AsyncClient(transport=httpx2.MockTransport(world.handler)) as c:
            yield c

    app.dependency_overrides[get_settings_dep] = lambda: make_settings(**settings)
    app.dependency_overrides[get_http_client] = http_client
    return TestClient(app)


def get(client, token=TOKEN, scheme="Bearer"):
    headers = {"authorization": f"{scheme} {token}"} if token is not None else {}
    return client.get("/probe", headers=headers)


def test_valid_admin_is_accepted_and_auth_called_with_anon_key_and_user_token(world):
    response = get(build(world))
    assert response.status_code == 200
    assert response.json() == {"id": USER_ID, "email": "owner@example.com"}
    auth_call = world.requests[0]
    assert auth_call.headers["apikey"] == ANON
    assert auth_call.headers["authorization"] == f"Bearer {TOKEN}"


def test_admin_lookup_uses_the_service_key_and_the_user_id(world):
    get(build(world))
    lookup = world.requests[1]
    assert lookup.url.params["user_id"] == f"eq.{USER_ID}"
    assert lookup.headers["apikey"] == SERVICE
    assert lookup.headers["authorization"] == f"Bearer {SERVICE}"


@pytest.mark.parametrize("scheme,token", [("Bearer", None), ("Basic", TOKEN), ("Bearer", "")])
def test_missing_or_malformed_credentials_are_401_without_any_call(world, scheme, token):
    response = get(build(world), token=token, scheme=scheme)
    assert response.status_code == 401
    assert world.requests == []


def test_an_invalid_token_is_401_and_never_reaches_the_database(world):
    world.auth_status = 401
    response = get(build(world))
    assert response.status_code == 401
    assert [r.url.path for r in world.requests] == ["/auth/v1/user"]


def test_a_signed_up_user_who_is_not_an_admin_is_403(world):
    world.is_admin = False
    assert get(build(world)).status_code == 403


@pytest.mark.parametrize("break_it", ["auth", "db", "anon"])
def test_upstream_trouble_is_503_not_a_pass(world, break_it):
    if break_it == "auth":
        world.auth_status = 500
    elif break_it == "db":
        world.admin_status = 500
    settings = {"supabase_anon_key": None} if break_it == "anon" else {}
    assert get(build(world, **settings)).status_code == 503


def test_a_transport_error_is_503(world):
    def handler(request):
        raise httpx2.ConnectTimeout("slow")

    world.handler = handler
    assert get(build(world)).status_code == 503


def test_secrets_never_appear_in_error_bodies_or_logs(world, caplog):
    caplog.set_level(logging.DEBUG)
    world.auth_status = 500
    response = get(build(world))
    for text in (response.text, caplog.text):
        for secret in (TOKEN, ANON, SERVICE):
            assert secret not in text
