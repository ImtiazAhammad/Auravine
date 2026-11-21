import logging
from typing import Annotated, Literal

import httpx2
from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator

from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.llm import AllProvidersFailed, complete
from app.prompt import build_system_prompt, load_content
from app.ratelimit import RateLimitUnavailable, enforce

router = APIRouter()
log = logging.getLogger("auravine.chat")

PER_VISITOR = (600, 20)
OVERALL = (86400, 500)
KEEP_LAST = 20

UNAVAILABLE = {
    "en": "The assistant is unavailable right now. Please try again later or reach us through "
          "the contact page.",
    "bn": "সহকারী এই মুহূর্তে পাওয়া যাচ্ছে না। অনুগ্রহ করে পরে আবার চেষ্টা করুন অথবা যোগাযোগ "
          "পেজের মাধ্যমে আমাদের জানান।",
}


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)

    @field_validator("content", mode="after")
    @classmethod
    def _not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("must not be blank")
        return value


class ChatIn(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1)
    locale: str | None = Field(default=None, max_length=10)


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
        if not await enforce(client, settings, "chat", ip, PER_VISITOR, OVERALL):
            return JSONResponse({"error": "Too many messages. Please slow down."}, 429)
    except RateLimitUnavailable as error:
        log.error("rate limiter unavailable: %s", error)
        return JSONResponse({"error": UNAVAILABLE[locale]}, 503)

    messages = [m.model_dump() for m in body.messages[-KEEP_LAST:]]
    system = build_system_prompt(await load_content(client, settings), locale)
    try:
        reply, provider = await complete(settings, client, messages, system)
    except AllProvidersFailed:
        return JSONResponse({"error": UNAVAILABLE[locale]}, 503)
    return {"reply": reply, "provider": provider}
