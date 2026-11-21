"""The chatbot's system prompt, built from published content in Supabase (cached 5 minutes)."""

import logging
import time
from collections.abc import Callable

import httpx2

from app.config import Settings

log = logging.getLogger("auravine.chat")
TTL_SECONDS = 300
RETRY_AFTER_FAILURE_SECONDS = 30

_cache: dict = {"content": None, "fetched_at": 0.0}

MINIMAL_CONTENT = {
    "personal": {
        "name": "Auravine", "title": "AI-First Software Development Company", "subtitle": "",
        "bio": "", "location": "Dhaka, Bangladesh", "email": "",
    },
    "social_links": [], "languages": [], "projects": [], "tools": [], "soft_skills": [],
    "hard_skills": [],
}


def clear_cache() -> None:
    _cache.update(content=None, fetched_at=0.0)


def _pick(value, locale: str) -> str:
    if isinstance(value, dict):
        translated = value.get("bn") if locale == "bn" else None
        text = translated if translated and translated.strip() else value.get("en")
        return text or ""
    return value or ""


async def _rows(client: httpx2.AsyncClient, settings: Settings, path: str) -> list[dict]:
    key = settings.supabase_service_role_key.get_secret_value()
    response = await client.get(
        f"{settings.supabase_url.rstrip('/')}/rest/v1/{path}",
        headers={"apikey": key, "Authorization": f"Bearer {key}"},
        timeout=3,
    )
    response.raise_for_status()
    data = response.json()
    if not isinstance(data, list):
        raise ValueError("unexpected body")
    return data


async def _fetch(client: httpx2.AsyncClient, settings: Settings) -> dict:
    published = "status=eq.published&order=sort_order.asc"
    projects = await _rows(
        client, settings,
        "projects?select=title,description,category,tech_stack,role,demo_url,repo_url&" + published,
    )
    tech = await _rows(client, settings, f"tech_items?select=kind,name,extra&{published}")
    site = {r["key"]: r["value"] for r in await _rows(client, settings, "site_settings?select=*")}
    return {
        "personal": site.get("personal") or MINIMAL_CONTENT["personal"],
        "social_links": site.get("social_links") or [],
        "languages": site.get("languages") or [],
        "projects": projects,
        "tools": [{"name": t["name"]} for t in tech if t["kind"] == "tool"],
        "soft_skills": [{"name": t["name"]} for t in tech if t["kind"] == "soft_skill"],
        "hard_skills": [
            {"name": t["name"], "level": (t.get("extra") or {}).get("level")}
            for t in tech if t["kind"] == "hard_skill"
        ],
    }


async def load_content(
    client: httpx2.AsyncClient, settings: Settings, now: Callable[[], float] = time.monotonic
) -> dict:
    """Published content, cached. A failed refresh keeps serving the last good copy."""
    current = now()
    if _cache["content"] is not None and current - _cache["fetched_at"] < TTL_SECONDS:
        return _cache["content"]
    try:
        content = await _fetch(client, settings)
    except (httpx2.HTTPError, ValueError, KeyError, TypeError) as error:
        log.error("chat content refresh failed: %s", type(error).__name__)
        # Remember the failure: retry in 30 s, not on every request.
        _cache["fetched_at"] = current - TTL_SECONDS + RETRY_AFTER_FAILURE_SECONDS
        if _cache["content"] is None:
            _cache["content"] = MINIMAL_CONTENT
        return _cache["content"]
    _cache.update(content=content, fetched_at=current)
    return content


def build_system_prompt(content: dict, locale: str) -> str:
    personal = content.get("personal") or MINIMAL_CONTENT["personal"]
    name = personal.get("name") or "Auravine"

    def link(platform: str) -> str:
        for item in content.get("social_links") or []:
            if isinstance(item, dict) and item.get("platform") == platform and item.get("url") not in (None, "", "#"):
                return item["url"]
        return ""

    project_lines = []
    for p in content.get("projects") or []:
        title = _pick(p.get("title"), locale)
        if not title:
            continue
        line = f"- {title}"
        if p.get("category"):
            line += f" ({_pick(p['category'], locale)})"
        line += f": {_pick(p.get('description'), locale)}."
        if p.get("tech_stack"):
            line += f" Tech: {', '.join(str(t) for t in p['tech_stack'])}."
        if p.get("role"):
            line += f" Role: {_pick(p['role'], locale)}."
        if p.get("demo_url") not in (None, "", "#"):
            line += f" Demo: {p['demo_url']}"
        project_lines.append(line)

    def names(items: list | None) -> list[str]:
        return [str(i["name"]) for i in items or [] if isinstance(i, dict) and i.get("name")]

    skills = ", ".join(
        f"{s['name']} ({s['level']})" if s.get("level") else str(s["name"])
        for s in content.get("hard_skills") or [] if isinstance(s, dict) and s.get("name")
    )
    languages = ", ".join(
        f"{x['name']} ({x['level']})" if x.get("level") else str(x["name"])
        for x in content.get("languages") or [] if isinstance(x, dict) and x.get("name")
    )
    reply_language = "Bengali (Bangla)" if locale == "bn" else "English"
    solutions = (
        f"SOLUTIONS ({len(project_lines)} total)\n" + "\n".join(project_lines)
        if project_lines
        else "SOLUTIONS\nThe list of solutions is not available right now. Invite the visitor to "
             "see the projects page or to ask the team through the contact page."
    )

    return f"""You are the AI assistant for {name}, an AI-first software development company based in Dhaka, Bangladesh. You are friendly, helpful, and knowledgeable about {name}'s services, delivery process, and solutions. Answer questions accurately based on the information below.

COMPANY INFO
- Name: {name}
- Title: {personal.get('title', '')}
- Subtitle: {personal.get('subtitle', '')}
- Bio: {personal.get('bio', '')}
- Location: {personal.get('location', '')}
- Email: {personal.get('email', '')}
- Languages: {languages}
- GitHub: {link('GitHub')}
- LinkedIn: {link('LinkedIn')}

{solutions}

TECHNICAL SKILLS
{skills or 'AI, Machine Learning, Full Stack Development, Computer Vision.'}

SOFT SKILLS
{', '.join(names(content.get('soft_skills'))) or 'Transparency, Clear Communication, Ownership.'}

TOOLS AND TECHNOLOGIES
{', '.join(names(content.get('tools'))) or 'Docker, GitHub, Figma.'}

INSTRUCTIONS
- Answer in {reply_language} (the current interface language). If the user asks in a different language, you may respond in that language too, staying professionally friendly.
- Be concise but informative. Use bullet points for lists.
- If asked about something not in the information above, politely say you can only share details about {name}'s services and solutions, and suggest contacting the team.
- When recommending solutions, include demo links if available.
- Do NOT quote prices, timelines, or guarantees. For pricing and project scope, invite the visitor to book a free consultation on the contact page.
- Always be positive and professional about {name}'s work.
- Do NOT make up information not present above, including client names, results, or metrics.
- Greet users warmly and encourage them to explore our solutions or book a free consultation."""
