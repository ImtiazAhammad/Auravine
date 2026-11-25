"""Rate limit for admin sign-in attempts. The Next.js login handler calls this before it
sends a password to Supabase Auth. Supabase's own limits are shared by every Vercel server, so
they cannot tell visitors apart; this counter can."""

import logging
from typing import Annotated

import httpx2
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse

from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.ratelimit import RateLimitUnavailable, allowed, visitor_key

router = APIRouter()
log = logging.getLogger("auravine.login")

SHORT = (900, 10)  # 10 attempts per 15 minutes per visitor
DAILY = (86400, 50)  # 50 per day per visitor
# Deliberately no shared budget: with one, a stranger could spend it and lock the owner out.


@router.post("/login-attempt")
async def login_attempt(
    request: Request,
    settings: Annotated[Settings, Depends(get_settings_dep)],
    client: Annotated[httpx2.AsyncClient, Depends(get_http_client)],
):
    try:
        if settings.rate_limit_salt is None:
            raise RateLimitUnavailable("RATE_LIMIT_SALT is not set")
        salt = settings.rate_limit_salt.get_secret_value()
        key = visitor_key(request.headers.get("x-client-ip", "unknown"), salt)
        if not await allowed(client, settings, "login", key, *SHORT):
            return JSONResponse({"error": "Too many attempts. Try again later."}, 429)
        if not await allowed(client, settings, "login-day", key, *DAILY):
            return JSONResponse({"error": "Too many attempts. Try again later."}, 429)
    except RateLimitUnavailable as error:
        log.error("login limiter unavailable: %s", error)
        return JSONResponse({"error": "Service temporarily unavailable."}, 503)
    return {"ok": True}
