import httpx2
import pytest

from app import prompt as prompt_module
from app.config import Settings
from app.prompt import build_system_prompt, load_content

pytestmark = pytest.mark.anyio

CONTENT = {
    "personal": {"name": "ACME", "title": "AI Company", "subtitle": "Sub", "bio": "Bio text",
                 "location": "Dhaka", "email": ""},
    "social_links": [{"platform": "GitHub", "url": "https://github.com/acme"}],
    "languages": [{"name": "Bengali", "level": "Native"}],
    "projects": [
        {"title": {"en": "Shefa", "bn": "শেফা"}, "description": {"en": "Hospital agent"},
         "category": {"en": "Healthcare AI"}, "tech_stack": ["Python"], "role": None,
         "demo_url": "https://demo.test", "repo_url": None},
        {"title": {"en": "Plain"}, "description": {"en": "No links"}, "category": None,
         "tech_stack": [], "role": None, "demo_url": None, "repo_url": None},
    ],
    "tools": [{"name": "Docker"}],
    "soft_skills": [{"name": "Transparency"}],
    "hard_skills": [{"name": "Computer Vision", "level": "expert"}],
}


def test_prompt_contains_company_projects_and_tools():
    text = build_system_prompt(CONTENT, "en")
    for expected in ("ACME", "Shefa", "Hospital agent", "Healthcare AI", "Python", "Docker",
                     "Transparency", "Computer Vision", "https://demo.test"):
        assert expected in text


def test_prompt_uses_bangla_where_present_and_asks_for_bangla_replies():
    text = build_system_prompt(CONTENT, "bn")
    assert "শেফা" in text and "Bengali (Bangla)" in text


def test_prompt_omits_empty_links_and_forbids_inventing():
    text = build_system_prompt(CONTENT, "en")
    assert "Repo: None" not in text and "None" not in text and "#" not in text
    assert "Do NOT make up information" in text


def make_settings():
    return Settings(_env_file=None, supabase_url="https://x.supabase.co",
                    supabase_service_role_key="svc", revalidate_url="https://r.test",
                    revalidate_secret="s")


def supabase_handler(counter, fail=False):
    def handler(request: httpx2.Request) -> httpx2.Response:
        counter.append(request.url.path)
        if fail:
            return httpx2.Response(500, text="down")
        path = request.url.path
        if path.endswith("/projects"):
            return httpx2.Response(200, json=CONTENT["projects"])
        if path.endswith("/tech_items"):
            return httpx2.Response(200, json=[
                {"kind": "tool", "name": "Docker"}, {"kind": "soft_skill", "name": "Transparency"},
                {"kind": "hard_skill", "name": "Computer Vision", "extra": {"level": "expert"}},
            ])
        if path.endswith("/site_settings"):
            return httpx2.Response(200, json=[
                {"key": "personal", "value": CONTENT["personal"]},
                {"key": "social_links", "value": CONTENT["social_links"]},
                {"key": "languages", "value": CONTENT["languages"]},
            ])
        return httpx2.Response(404)
    return handler


async def test_content_is_loaded_published_only_and_cached_for_five_minutes():
    prompt_module.clear_cache()
    calls: list[str] = []
    clock = [1000.0]
    async with httpx2.AsyncClient(transport=httpx2.MockTransport(supabase_handler(calls))) as c:
        first = await load_content(c, make_settings(), now=lambda: clock[0])
        n = len(calls)
        await load_content(c, make_settings(), now=lambda: clock[0] + 299)
        assert len(calls) == n  # served from cache
        await load_content(c, make_settings(), now=lambda: clock[0] + 301)
        assert len(calls) == 2 * n  # refreshed after 300 s
    assert first["personal"]["name"] == "ACME" and first["tools"][0]["name"] == "Docker"


async def test_published_filter_is_sent_to_supabase():
    prompt_module.clear_cache()
    seen = []

    def handler(request):
        seen.append(str(request.url))
        return supabase_handler([])(request)

    async with httpx2.AsyncClient(transport=httpx2.MockTransport(handler)) as c:
        await load_content(c, make_settings(), now=lambda: 0.0)
    assert any("status=eq.published" in u for u in seen)


async def test_a_failed_refresh_serves_the_last_good_content_then_a_minimal_one():
    prompt_module.clear_cache()
    async with httpx2.AsyncClient(transport=httpx2.MockTransport(supabase_handler([]))) as c:
        good = await load_content(c, make_settings(), now=lambda: 0.0)
    async with httpx2.AsyncClient(transport=httpx2.MockTransport(supabase_handler([], True))) as c:
        stale = await load_content(c, make_settings(), now=lambda: 10_000.0)
        assert stale == good
        prompt_module.clear_cache()
        minimal = await load_content(c, make_settings(), now=lambda: 20_000.0)
    assert minimal["projects"] == [] and minimal["personal"]["name"] == "Auravine"


def test_minimal_prompt_does_not_claim_there_are_no_solutions():
    from app.prompt import MINIMAL_CONTENT

    text = build_system_prompt(MINIMAL_CONTENT, "en")
    assert "0 total" not in text and "contact page" in text


async def test_a_cold_failure_is_remembered_so_requests_do_not_retry_every_time():
    prompt_module.clear_cache()
    calls: list[str] = []
    async with httpx2.AsyncClient(
        transport=httpx2.MockTransport(supabase_handler(calls, True))
    ) as c:
        await load_content(c, make_settings(), now=lambda: 0.0)
        made = len(calls)
        await load_content(c, make_settings(), now=lambda: 5.0)
        assert len(calls) == made  # within the 30 s backoff
        await load_content(c, make_settings(), now=lambda: 40.0)
        assert len(calls) > made
