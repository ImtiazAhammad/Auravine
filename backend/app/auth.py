"""Admin authentication. A request is an admin request only if Supabase Auth accepts the bearer
token AND the user has a row in `admin_profiles`. Tokens and keys are never logged or echoed."""

import logging
from dataclasses import dataclass
from typing import Annotated

import httpx2
from fastapi import Depends, HTTPException, Request

from app.config import Settings
from app.deps import get_http_client, get_settings_dep

log = logging.getLogger("auravine.auth")


@dataclass(frozen=True)
class AdminUser:
    id: str
    email: str | None


def _bearer(request: Request) -> str:
    header = request.headers.get("authorization", "")
    scheme, _, token = header.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        raise HTTPException(status_code=401, detail="Not signed in")
    return token.strip()


async def require_admin(
    request: Request,
    settings: Annotated[Settings, Depends(get_settings_dep)],
    client: Annotated[httpx2.AsyncClient, Depends(get_http_client)],
) -> AdminUser:
    token = _bearer(request)
    if settings.supabase_anon_key is None:
        log.error("admin auth unavailable: SUPABASE_ANON_KEY is not set")
        raise HTTPException(status_code=503, detail="Admin is not available")
    base = settings.supabase_url.rstrip("/")
    service_key = settings.supabase_service_role_key.get_secret_value()
    try:
        user_response = await client.get(
            f"{base}/auth/v1/user",
            headers={
                "apikey": settings.supabase_anon_key.get_secret_value(),
                "Authorization": f"Bearer {token}",
            },
        )
        if user_response.status_code in (400, 401, 403):
            raise HTTPException(status_code=401, detail="Not signed in")
        if user_response.status_code != 200:
            log.error("admin auth: Supabase Auth answered HTTP %s", user_response.status_code)
            raise HTTPException(status_code=503, detail="Admin is not available")
        user = user_response.json()
        user_id = user["id"]

        lookup = await client.get(
            f"{base}/rest/v1/admin_profiles",
            params={"user_id": f"eq.{user_id}", "select": "role"},
            headers={"apikey": service_key, "Authorization": f"Bearer {service_key}"},
        )
    except (httpx2.HTTPError, ValueError, KeyError, TypeError) as error:
        log.error("admin auth failed: %s", type(error).__name__)
        raise HTTPException(status_code=503, detail="Admin is not available") from error
    if lookup.status_code != 200:
        log.error("admin auth: admin lookup answered HTTP %s", lookup.status_code)
        raise HTTPException(status_code=503, detail="Admin is not available")
    try:
        rows = lookup.json()
    except ValueError as error:
        raise HTTPException(status_code=503, detail="Admin is not available") from error
    if not isinstance(rows, list) or not rows:
        raise HTTPException(status_code=403, detail="Not an admin")
    return AdminUser(id=user_id, email=user.get("email"))
