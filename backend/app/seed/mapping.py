"""Pure functions that turn the site's existing content (src/data/portfolio.ts, exported as
JSON) into database rows. No I/O: easy to test and safe to run repeatedly."""

import re
import unicodedata
from pathlib import PurePosixPath
from typing import Any

PROJECT_DETAIL_KEYS = (
    "highlights", "metrics", "features", "installation", "challenges", "challengesAndSolutions",
)
TECH_SOURCES = (
    ("tech", "techStack"), ("tool", "tools"), ("hard_skill", "hardSkills"),
    ("soft_skill", "softSkills"),
)
TECH_COLUMNS = {"name", "icon", "category", "url"}
IMAGE_EXTENSIONS = {".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".avif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov"}


def slugify(text: str) -> str:
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")


def bilingual(text: str) -> dict[str, str]:
    """English only for now; Bangla is added later through the admin."""
    return {"en": text}


def _require(raw: dict, field: str, kind: str, label: str) -> Any:
    value = raw.get(field)
    if value is None or (isinstance(value, str) and not value.strip()):
        raise ValueError(f"{kind} {label}: missing required field '{field}'")
    return value


def _bilingual_or_none(text: str | None) -> dict[str, str] | None:
    return bilingual(text) if isinstance(text, str) and text.strip() else None


def _url(value: str | None) -> str | None:
    """The old site used '#' as 'no link'; the database uses NULL."""
    return None if value in (None, "", "#") else value


def map_project(raw: dict, index: int) -> dict:
    label = raw.get("slug") or raw.get("title") or f"#{index}"
    slug = _require(raw, "slug", "project", label)
    details = {key: raw[key] for key in PROJECT_DETAIL_KEYS if key in raw}
    long_description = raw.get("longDescription")
    return {
        "slug": slug,
        "status": "published",
        "sort_order": index,
        "delivery_status": _require(raw, "status", "project", label),
        "category": _bilingual_or_none(raw.get("category")),
        "title": bilingual(_require(raw, "title", "project", label)),
        "description": bilingual(_require(raw, "description", "project", label)),
        "long_description": bilingual(long_description) if long_description else None,
        "details": {"en": details},
        "tech_stack": list(raw.get("techStack", [])),
        "tools": list(raw.get("tools", [])),
        "hero_image": raw.get("image"),
        "gallery_images": list(raw.get("galleryImages", [])),
        "demo_url": _url(raw.get("demoUrl")),
        "repo_url": _url(raw.get("repoUrl")),
        "start_date": raw.get("startDate"),
        "end_date": raw.get("endDate"),
        "role": _bilingual_or_none(raw.get("role")),
        "team": _bilingual_or_none(raw.get("team")),
        "custom_timeline": _bilingual_or_none(raw.get("customTimeline")),
    }


def map_blog_post(raw: dict, index: int) -> dict:
    label = raw.get("slug") or f"#{index}"
    try:
        read_time = int(raw["readTime"]) if raw.get("readTime") is not None else None
    except (TypeError, ValueError) as error:
        raise ValueError(
            f"blog post {label}: unreadable readTime {raw.get('readTime')!r}"
        ) from error
    return {
        "slug": _require(raw, "slug", "blog post", label),
        "status": "published",
        "sort_order": index,
        "title": bilingual(_require(raw, "title", "blog post", label)),
        "excerpt": bilingual(_require(raw, "excerpt", "blog post", label)),
        "content": bilingual(_require(raw, "content", "blog post", label)),
        "cover_image": raw.get("image"),
        "published_at": raw.get("date"),
        "category": raw.get("category"),
        "tags": list(raw.get("tags", [])),
        "author_name": _bilingual_or_none((raw.get("author") or {}).get("name")),
        "read_time_minutes": read_time,
    }


def map_faq(raw: dict, index: int) -> dict:
    question = _require(raw, "question", "faq", f"#{index}")
    return {
        "key": slugify(question),
        "status": "published",
        "sort_order": index,
        "question": bilingual(question),
        "answer": bilingual(_require(raw, "answer", "faq", question)),
    }


def map_tech_items(portfolio: dict) -> list[dict]:
    rows: list[dict] = []
    seen: set[str] = set()
    for kind, source in TECH_SOURCES:
        for index, item in enumerate(portfolio.get(source, [])):
            name = _require(item, "name", kind, f"#{index}")
            key = f"{kind}-{slugify(name)}"
            if key in seen:
                raise ValueError(f"{kind} {name!r} appears twice in {source}")
            seen.add(key)
            rows.append({
                "key": key,
                "status": "published",
                "sort_order": index,
                "kind": kind,
                "name": name,
                "icon": item.get("icon"),
                "category": item.get("category"),
                "url": item.get("url"),
                "extra": {k: v for k, v in item.items() if k not in TECH_COLUMNS},
            })
    return rows


def map_site_settings(portfolio: dict) -> list[dict]:
    personal = dict(portfolio["personal"])
    social_links = personal.pop("socialLinks", [])
    languages = personal.pop("languages", [])
    return [
        {"key": "personal", "value": personal},
        {"key": "social_links", "value": social_links},
        {"key": "languages", "value": languages},
    ]


def collect_media(projects: list[dict], blogs: list[dict]) -> list[dict]:
    paths: list[str] = []
    for project in projects:
        paths += [project.get("hero_image"), *project.get("gallery_images", [])]
    paths += [blog.get("cover_image") for blog in blogs]
    media, seen = [], set()
    for path in paths:
        if not path or not path.startswith("/") or path in seen:
            continue
        seen.add(path)
        extension = PurePosixPath(path).suffix.lower()
        kind = "image" if extension in IMAGE_EXTENSIONS else (
            "video" if extension in VIDEO_EXTENSIONS else "file")
        media.append({"path": path, "kind": kind, "source": "repo", "alt": None})
    return media


def build_seed(portfolio: dict) -> dict[str, list[dict]]:
    projects = [map_project(p, i) for i, p in enumerate(portfolio.get("projects", []))]
    blog_posts = [map_blog_post(b, i) for i, b in enumerate(portfolio.get("blogs", []))]
    return {
        "projects": projects,
        "blog_posts": blog_posts,
        "faqs": [map_faq(f, i) for i, f in enumerate(portfolio.get("faqs", []))],
        "tech_items": map_tech_items(portfolio),
        "site_settings": map_site_settings(portfolio),
        "media_assets": collect_media(projects, blog_posts),
    }
