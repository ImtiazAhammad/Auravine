import logging
import re
from collections.abc import Callable
from datetime import UTC, datetime
from typing import Annotated

import anyio.to_thread
import httpx2
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator

from app.config import Settings
from app.deps import get_http_client, get_mailer, get_settings_dep
from app.mail import MailError
from app.ratelimit import RateLimitUnavailable, enforce

router = APIRouter()
log = logging.getLogger("auravine.contact")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PER_VISITOR = (3600, 5)
OVERALL = (86400, 200)
OK = {"message": "Message received"}


class ContactIn(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=320)
    subject: str | None = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)
    website: str = ""  # honeypot: real visitors never see or fill this
    locale: str | None = Field(default=None, max_length=10)

    @field_validator("name", "message", mode="after")
    @classmethod
    def _not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("must not be blank")
        return value

    @field_validator("email", mode="after")
    @classmethod
    def _email(cls, value: str) -> str:
        if not EMAIL_RE.match(value):
            raise ValueError("not a valid email address")
        return value


def _service_headers(settings: Settings) -> dict[str, str]:
    key = settings.supabase_service_role_key.get_secret_value()
    return {"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json"}


async def _store(client: httpx2.AsyncClient, settings: Settings, body: ContactIn) -> str | None:
    """Insert the message; returns its id, or None when the insert failed."""
    try:
        response = await client.post(
            f"{settings.supabase_url.rstrip('/')}/rest/v1/contact_messages",
            headers={**_service_headers(settings), "Prefer": "return=representation"},
            json={
                "name": body.name.strip(), "email": body.email.strip(),
                "subject": (body.subject or "").strip() or None,
                "message": body.message, "locale": body.locale,
            },
        )
        if response.status_code >= 400:
            log.error("contact insert failed: HTTP %s", response.status_code)
            return None
        return response.json()[0]["id"]
    except (httpx2.HTTPError, ValueError, KeyError, IndexError) as error:
        log.error("contact insert failed: %s", type(error).__name__)
        return None


async def _mark(client: httpx2.AsyncClient, settings: Settings, row_id: str, patch: dict) -> None:
    try:
        await client.patch(
            f"{settings.supabase_url.rstrip('/')}/rest/v1/contact_messages?id=eq.{row_id}",
            headers={**_service_headers(settings), "Prefer": "return=minimal"},
            json=patch,
        )
    except httpx2.HTTPError as error:
        log.error("contact status update failed: %s", type(error).__name__)


@router.post("/contact")
async def contact(
    body: ContactIn,
    request: Request,
    settings: Annotated[Settings, Depends(get_settings_dep)],
    client: Annotated[httpx2.AsyncClient, Depends(get_http_client)],
    mailer: Annotated[Callable[[Settings, dict], None], Depends(get_mailer)],
):
    if body.website.strip():
        return OK  # bots get a success and nothing is stored

    ip = request.headers.get("x-client-ip", "unknown")
    try:
        if not await enforce(client, settings, "contact", ip, PER_VISITOR, OVERALL):
            return JSONResponse({"error": "Too many messages. Please try again later."}, 429)
    except RateLimitUnavailable as error:
        log.error("rate limiter unavailable: %s", error)
        return JSONResponse({"error": "Service temporarily unavailable."}, 503)

    row_id = await _store(client, settings, body)

    payload = {
        "name": body.name, "email": body.email, "subject": body.subject, "message": body.message,
    }
    email_error: str | None = None
    try:
        await anyio.to_thread.run_sync(mailer, settings, payload)
    except MailError as error:
        email_error = str(error)[:300]
        log.error("contact email failed: %s", email_error)
    except Exception as error:  # a mailer bug must not lose a stored message
        email_error = f"unexpected {type(error).__name__}"
        log.error("contact email crashed: %s", type(error).__name__)

    if row_id is None and email_error is not None:
        return JSONResponse(
            {"error": "We could not send your message. Please email us directly."}, 503
        )
    if row_id is not None:
        patch = (
            {"email_error": email_error} if email_error
            else {"emailed_at": datetime.now(UTC).isoformat()}
        )
        await _mark(client, settings, row_id, patch)
    return OK
