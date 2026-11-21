import logging
from typing import Annotated, Literal

import httpx2
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator, model_validator

from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.llm import AllProvidersFailed, complete
from app.prompt import MINIMAL_CONTENT, build_system_prompt, load_content
from app.ratelimit import RateLimitUnavailable, enforce

router = APIRouter()
log = logging.getLogger("auravine.chat")

PER_VISITOR = (600, 20)
DAILY_PER_VISITOR = (86400, 100)
OVERALL = (86400, 500)
KEEP_LAST = 20

UNAVAILABLE = {
    "en": "The assistant is unavailable right now. Please try again later or reach us through "
          "the contact page.",
    "bn": "সহকারী এই মুহূর্তে পাওয়া যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন অথবা যোগাযোগ "
          "পেজের মাধ্যমে আমাদের জানান।",
}


MAX_CONTENT = 2000


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1)

    @model_validator(mode="after")
    def _limit_length(self):
        if not self.content.strip():
            raise ValueError("must not be blank")
        if len(self.content) > MAX_CONTENT:
            if self.role == "user":
                raise ValueError(f"must be at most {MAX_CONTENT} characters")
            # The widget replays earlier answers, which can be longer than a visitor may type.
            self.content = self.content[:MAX_CONTENT]
        return self


class ChatIn(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1)
    locale: str | None = Field(default=None, max_length=10)

    @field_validator("messages", mode="before")
    @classmethod
    def _only_the_recent_turns(cls, value):
        """Slice first: old turns we would drop anyway must not be able to fail validation."""
        return value[-KEEP_LAST:] if isinstance(value, list) else value


@router.post("/chat")
async def chat(
    body: ChatIn,
    request: Request,
    settings: Annotated[Settings, Depends(get_settings_dep)],
    client: Annotated[httpx2.AsyncClient, Depends(get_http_client)],
):
    locale = "bn" if body.locale == "bn" else "en"
    ip = request.headers.get("x-client-ip", "unknown")
    try:
        if not await enforce(
            client, settings, "chat", ip, PER_VISITOR, OVERALL,
            daily_per_visitor=DAILY_PER_VISITOR,
        ):
            return JSONResponse({"error": "Too many messages. Please slow down."}, 429)
    except RateLimitUnavailable as error:
        log.error("rate limiter unavailable: %s", error)
        return JSONResponse({"error": UNAVAILABLE[locale]}, 503)

    messages = [m.model_dump() for m in body.messages]
    content = await load_content(client, settings)
    try:
        system = build_system_prompt(content, locale)
    except (KeyError, TypeError, AttributeError, ValueError) as error:
        log.error("chat prompt could not be built from content: %s", type(error).__name__)
        system = build_system_prompt(MINIMAL_CONTENT, locale)
    try:
        reply, provider = await complete(settings, client, messages, system)
    except AllProvidersFailed:
        return JSONResponse({"error": UNAVAILABLE[locale]}, 503)
    return {"reply": reply, "provider": provider}
