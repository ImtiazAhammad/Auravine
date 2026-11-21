import json
import logging

import httpx2
import pytest

from app.config import Settings
from app.llm import AllProvidersFailed, complete

pytestmark = pytest.mark.anyio

MESSAGES = [{"role": "user", "content": "hi"}, {"role": "assistant", "content": "hello"},
            {"role": "user", "content": "projects?"}]


def make_settings(**extra):
    return Settings(_env_file=None, supabase_url="https://x.supabase.co",
                    supabase_service_role_key="svc", revalidate_url="https://r.test",
                    revalidate_secret="s", **extra)


GROQ_OK = {"choices": [{"message": {"content": "from groq"}}]}
GEMINI_OK = {"candidates": [{"content": {"parts": [{"text": "from gemini"}]}}]}


def route(groq=None, gemini=None, record=None):
    def handler(request: httpx2.Request) -> httpx2.Response:
        if record is not None:
            record.append(request)
        host = request.url.host
        answer = groq if "groq" in host else gemini
        if isinstance(answer, Exception):
            raise answer
        status, body = answer
        return httpx2.Response(status, json=body)
    return handler


async def run(settings, handler):
    async with httpx2.AsyncClient(transport=httpx2.MockTransport(handler)) as c:
        return await complete(settings, c, MESSAGES, "SYSTEM PROMPT")


async def test_groq_success_sends_system_prompt_first_and_uses_bearer_key():
    seen = []
    settings = make_settings(groq_api_key="groq-key-1")
    reply, provider = await run(settings, route(groq=(200, GROQ_OK), record=seen))
    assert (reply, provider) == ("from groq", "groq")
    body = json.loads(seen[0].content)
    assert body["model"] == "llama-3.1-8b-instant"
    assert body["messages"][0] == {"role": "system", "content": "SYSTEM PROMPT"}
    assert body["messages"][1:] == MESSAGES
    assert seen[0].headers["authorization"] == "Bearer groq-key-1"


async def test_gemini_is_used_when_groq_fails_and_key_is_a_header_not_in_the_url():
    seen = []
    settings = make_settings(groq_api_key="g", gemini_api_key="gem-key-2")
    reply, provider = await run(
        settings, route(groq=(500, {}), gemini=(200, GEMINI_OK), record=seen)
    )
    assert (reply, provider) == ("from gemini", "gemini")
    gemini_request = seen[-1]
    assert "gem-key-2" not in str(gemini_request.url)
    assert gemini_request.headers["x-goog-api-key"] == "gem-key-2"
    body = json.loads(gemini_request.content)
    assert body["systemInstruction"]["parts"][0]["text"] == "SYSTEM PROMPT"
    assert [c["role"] for c in body["contents"]] == ["user", "model", "user"]


async def test_gemini_model_is_configurable():
    seen = []
    settings = make_settings(gemini_api_key="k", gemini_model="gemini-test-model")
    await run(settings, route(gemini=(200, GEMINI_OK), record=seen))
    assert "models/gemini-test-model:generateContent" in seen[0].url.path


@pytest.mark.parametrize("groq", [(200, {"choices": []}), (429, {}), httpx2.ReadTimeout("slow")])
async def test_provider_problems_fall_through_to_the_next_provider(groq):
    settings = make_settings(groq_api_key="g", gemini_api_key="k")
    reply, provider = await run(settings, route(groq=groq, gemini=(200, GEMINI_OK)))
    assert provider == "gemini"


async def test_providers_without_keys_are_skipped():
    seen = []
    settings = make_settings(gemini_api_key="k")
    await run(settings, route(gemini=(200, GEMINI_OK), record=seen))
    assert [r.url.host for r in seen] == ["generativelanguage.googleapis.com"]


async def test_all_failing_raises_and_logs_never_contain_keys(caplog):
    caplog.set_level(logging.DEBUG)
    settings = make_settings(groq_api_key="groq-secret-A", gemini_api_key="gemini-secret-B")
    with pytest.raises(AllProvidersFailed):
        await run(settings, route(groq=(500, {"error": "groq-secret-A"}),
                                  gemini=(503, {"error": "gemini-secret-B"})))
    assert "secret" not in caplog.text


async def test_no_keys_at_all_raises():
    with pytest.raises(AllProvidersFailed):
        await run(make_settings(), route())
