"""Visitor rate limiting backed by a Postgres function (see migration 5). Fails closed: if the
counter cannot be reached, callers must refuse the request."""

import hashlib
import ipaddress

import httpx2

from app.config import Settings


class RateLimitUnavailable(Exception):
    """The limiter could not give an answer (not configured, network error, bad response)."""


def _normalise(ip: str) -> str:
    """IPv6 visitors are keyed by their /64 (one household or host can use the whole range, so
    per-address keys would let one client rotate for free). Unparseable input shares 'unknown'."""
    try:
        address = ipaddress.ip_address(ip.strip())
    except ValueError:
        return "unknown"
    if address.version == 6:
        return str(ipaddress.ip_network(f"{address}/64", strict=False))
    return str(address)


def visitor_key(ip: str, salt: str) -> str:
    """A stable per-visitor key that never contains the raw IP."""
    return hashlib.sha256(f"{salt}:{_normalise(ip)}".encode()).hexdigest()


async def allowed(
    client: httpx2.AsyncClient, settings: Settings, bucket: str, key: str,
    window_seconds: int, max_calls: int,
) -> bool:
    service_key = settings.supabase_service_role_key.get_secret_value()
    url = f"{settings.supabase_url.rstrip('/')}/rest/v1/rpc/hit_rate_limit"
    try:
        response = await client.post(
            url,
            headers={"apikey": service_key, "Authorization": f"Bearer {service_key}"},
            json={
                "p_bucket": bucket, "p_key": key,
                "p_window_seconds": window_seconds, "p_max": max_calls,
            },
        )
    except httpx2.HTTPError as error:
        raise RateLimitUnavailable(type(error).__name__) from error
    if response.status_code != 200:
        raise RateLimitUnavailable(f"HTTP {response.status_code}")
    try:
        result = response.json()
    except ValueError as error:
        raise RateLimitUnavailable("not JSON") from error
    if not isinstance(result, bool):
        raise RateLimitUnavailable("unexpected body")
    return result


async def enforce(
    client: httpx2.AsyncClient, settings: Settings, bucket: str, ip: str,
    per_visitor: tuple[int, int], overall: tuple[int, int],
    daily_per_visitor: tuple[int, int] | None = None,
) -> bool:
    """True when the request may proceed: within the per-visitor, the optional daily
    per-visitor and the overall limit, checked in that order (a refused visitor never spends
    the shared budget)."""
    if settings.rate_limit_salt is None:
        raise RateLimitUnavailable("RATE_LIMIT_SALT is not set")
    key = visitor_key(ip, settings.rate_limit_salt.get_secret_value())
    if not await allowed(client, settings, bucket, key, *per_visitor):
        return False
    if daily_per_visitor is not None and not await allowed(
        client, settings, f"{bucket}-day", key, *daily_per_visitor
    ):
        return False
    return await allowed(client, settings, f"{bucket}-all", "all", *overall)
