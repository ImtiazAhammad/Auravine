"""Chat completion with provider fallback: Groq first, then Gemini. Provider error bodies are
never logged or returned, because they can echo request details."""

import logging

import httpx2

from app.config import Settings

log = logging.getLogger("auravine.chat")
PROVIDER_TIMEOUT = 15
MAX_TOKENS = 1024


class AllProvidersFailed(Exception):
    pass


async def _groq(settings: Settings, client: httpx2.AsyncClient, messages: list[dict], system: str):
    response = await client.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {settings.groq_api_key.get_secret_value()}"},
        json={
            "model": settings.groq_model,
            "messages": [{"role": "system", "content": system}, *messages],
            "max_tokens": MAX_TOKENS, "temperature": 0.7,
        },
        timeout=PROVIDER_TIMEOUT,
    )
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


async def _gemini(
    settings: Settings, client: httpx2.AsyncClient, messages: list[dict], system: str
):
    response = await client.post(
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{settings.gemini_model}:generateContent",
        headers={"x-goog-api-key": settings.gemini_api_key.get_secret_value()},
        json={
            "systemInstruction": {"parts": [{"text": system}]},
            "contents": [
                {"role": "model" if m["role"] == "assistant" else "user",
                 "parts": [{"text": m["content"]}]}
                for m in messages
            ],
            "generationConfig": {"maxOutputTokens": MAX_TOKENS, "temperature": 0.7},
        },
        timeout=PROVIDER_TIMEOUT,
    )
    response.raise_for_status()
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]


async def complete(
    settings: Settings, client: httpx2.AsyncClient, messages: list[dict], system: str
) -> tuple[str, str]:
    """Returns (reply, provider). Raises AllProvidersFailed."""
    providers = []
    if settings.groq_api_key is not None:
        providers.append(("groq", _groq))
    if settings.gemini_api_key is not None:
        providers.append(("gemini", _gemini))
    for name, call in providers:
        try:
            reply = await call(settings, client, messages, system)
            if isinstance(reply, str) and reply.strip():
                return reply, name
            log.warning("chat provider %s returned an empty reply", name)
        except httpx2.HTTPStatusError as error:
            log.warning("chat provider %s failed: HTTP %s", name, error.response.status_code)
        except (httpx2.HTTPError, KeyError, IndexError, TypeError, ValueError) as error:
            log.warning("chat provider %s failed: %s", name, type(error).__name__)
    raise AllProvidersFailed
