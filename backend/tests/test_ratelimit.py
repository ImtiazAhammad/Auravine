import json

import httpx2
import pytest

from app.config import Settings
from app.ratelimit import RateLimitUnavailable, allowed, enforce, visitor_key

pytestmark = pytest.mark.anyio

SERVICE_KEY = "svc-key-123"


def make_settings(**extra):
    return Settings(
        _env_file=None,
        supabase_url="https://x.supabase.co/",
        supabase_service_role_key=SERVICE_KEY,
        revalidate_url="https://r.test/revalidate",
        revalidate_secret="rev",
        **extra,
    )


def client_with(handler):
    return httpx2.AsyncClient(transport=httpx2.MockTransport(handler))


def test_visitor_key_is_a_salted_hash_without_the_ip():
    key = visitor_key("203.0.113.9", "salt-a")
    assert len(key) == 64 and int(key, 16) >= 0
    assert "203.0.113.9" not in key
    assert key == visitor_key("203.0.113.9", "salt-a")
    assert key != visitor_key("203.0.113.9", "salt-b")
    assert key != visitor_key("203.0.113.10", "salt-a")


async def test_allowed_calls_the_rpc_with_service_headers():
    seen = {}

    def handler(request: httpx2.Request) -> httpx2.Response:
        seen["url"] = str(request.url)
        seen["headers"] = request.headers
        seen["body"] = json.loads(request.content)
        return httpx2.Response(200, json=True)

    async with client_with(handler) as client:
        assert await allowed(client, make_settings(), "contact", "k", 3600, 5) is True
    assert seen["url"] == "https://x.supabase.co/rest/v1/rpc/hit_rate_limit"
    assert seen["headers"]["apikey"] == SERVICE_KEY
    assert seen["headers"]["authorization"] == f"Bearer {SERVICE_KEY}"
    assert seen["body"] == {
        "p_bucket": "contact", "p_key": "k", "p_window_seconds": 3600, "p_max": 5,
    }


async def test_allowed_returns_false_when_over_the_limit():
    async with client_with(lambda r: httpx2.Response(200, json=False)) as client:
        assert await allowed(client, make_settings(), "contact", "k", 3600, 5) is False


@pytest.mark.parametrize(
    "handler",
    [
        lambda r: httpx2.Response(500, text="boom"),
        lambda r: httpx2.Response(200, json={"not": "a bool"}),
        lambda r: httpx2.Response(200, text="<html>"),
    ],
)
async def test_failures_raise_rate_limit_unavailable(handler):
    async with client_with(handler) as client:
        with pytest.raises(RateLimitUnavailable):
            await allowed(client, make_settings(), "contact", "k", 3600, 5)


async def test_transport_errors_raise_rate_limit_unavailable():
    def handler(request):
        raise httpx2.ConnectTimeout("slow")

    async with client_with(handler) as client:
        with pytest.raises(RateLimitUnavailable):
            await allowed(client, make_settings(), "contact", "k", 3600, 5)


async def test_enforce_checks_per_visitor_then_overall():
    calls = []

    def handler(request):
        body = json.loads(request.content)
        calls.append((body["p_bucket"], body["p_window_seconds"], body["p_max"]))
        return httpx2.Response(200, json=True)

    settings = make_settings(rate_limit_salt="salt")
    async with client_with(handler) as client:
        ok = await enforce(client, settings, "contact", "203.0.113.9", (3600, 5), (86400, 200))
    assert ok is True
    assert calls == [("contact", 3600, 5), ("contact-all", 86400, 200)]


async def test_enforce_stops_at_the_first_refusal():
    calls = []

    def handler(request):
        calls.append(1)
        return httpx2.Response(200, json=False)

    settings = make_settings(rate_limit_salt="salt")
    async with client_with(handler) as client:
        ok = await enforce(client, settings, "chat", "ip", (600, 20), (86400, 500))
    assert ok is False and len(calls) == 1


async def test_enforce_without_a_salt_fails_closed():
    async with client_with(lambda r: httpx2.Response(200, json=True)) as client:
        with pytest.raises(RateLimitUnavailable):
            await enforce(client, make_settings(), "chat", "ip", (600, 20), (86400, 500))


def test_ipv6_visitors_are_keyed_by_their_64_bit_prefix():
    a = visitor_key("2001:db8:1:2::1", "s")
    b = visitor_key("2001:db8:1:2:ffff:ffff:ffff:ffff", "s")
    c = visitor_key("2001:db8:1:3::1", "s")
    assert a == b and a != c


def test_ipv4_and_unparseable_addresses_are_handled():
    assert visitor_key("203.0.113.9", "s") != visitor_key("203.0.113.10", "s")
    assert visitor_key("not-an-ip", "s") == visitor_key("unknown", "s")


async def test_enforce_adds_a_daily_per_visitor_check_between_the_two():
    calls = []

    def handler(request):
        body = json.loads(request.content)
        calls.append((body["p_bucket"], body["p_window_seconds"], body["p_max"]))
        return httpx2.Response(200, json=True)

    settings = make_settings(rate_limit_salt="salt")
    async with client_with(handler) as client:
        ok = await enforce(
            client, settings, "chat", "ip", (600, 20), (86400, 500), daily_per_visitor=(86400, 100)
        )
    assert ok is True
    assert calls == [("chat", 600, 20), ("chat-day", 86400, 100), ("chat-all", 86400, 500)]
