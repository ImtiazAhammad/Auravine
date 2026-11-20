import copy
import json
from pathlib import Path

import pytest

from app.seed.mapping import (
    bilingual,
    build_seed,
    collect_media,
    map_blog_post,
    map_faq,
    map_project,
    map_site_settings,
    map_tech_items,
    slugify,
)

FIXTURE = json.loads((Path(__file__).parent / "fixtures" / "portfolio_sample.json").read_text())


@pytest.fixture
def portfolio():
    return copy.deepcopy(FIXTURE)


def test_slugify_and_bilingual():
    assert slugify("What services does Auravine offer?") == "what-services-does-auravine-offer"
    assert slugify("  C++ / Rust  ") == "c-rust"
    assert bilingual("Hi") == {"en": "Hi"}


def test_map_project_wraps_text_and_nests_details(portfolio):
    raw = portfolio["projects"][0]
    row = map_project(raw, 0)
    assert row["slug"] == raw["slug"]
    assert row["title"] == {"en": raw["title"]}
    assert row["description"] == {"en": raw["description"]}
    assert row["long_description"] == {"en": raw["longDescription"]}
    assert row["hero_image"] == raw["image"]
    assert row["delivery_status"] == raw["status"]
    assert row["start_date"] == raw["startDate"]
    assert row["tech_stack"] == raw["techStack"]
    for key in ("highlights", "metrics", "features", "challengesAndSolutions"):
        assert row["details"]["en"][key] == raw[key]
    assert row["status"] == "published" and row["sort_order"] == 0


def test_placeholder_urls_become_null(portfolio):
    raw = portfolio["projects"][0]
    raw["demoUrl"], raw["repoUrl"] = "#", "https://example.com/repo"
    row = map_project(raw, 0)
    assert row["demo_url"] is None
    assert row["repo_url"] == "https://example.com/repo"


@pytest.mark.parametrize("missing", ["description", "title", "slug"])
def test_project_missing_required_field_raises_and_names_it(portfolio, missing):
    raw = portfolio["projects"][0]
    label = raw["slug"]
    del raw[missing]
    with pytest.raises(ValueError) as err:
        map_project(raw, 0)
    assert missing in str(err.value) or label in str(err.value)


def test_map_blog_post_keeps_markdown_and_converts_read_time(portfolio):
    raw = portfolio["blogs"][0]
    row = map_blog_post(raw, 2)
    assert row["content"] == {"en": raw["content"]}
    assert "\n\n" in row["content"]["en"]
    assert row["read_time_minutes"] == int(raw["readTime"])
    assert row["published_at"] == raw["date"]
    assert row["cover_image"] == raw["image"]
    assert row["author_name"] == raw["author"]["name"]
    assert row["tags"] == raw["tags"] and row["sort_order"] == 2


def test_blog_with_unreadable_read_time_raises(portfolio):
    raw = portfolio["blogs"][0]
    raw["readTime"] = "soon"
    with pytest.raises(ValueError) as err:
        map_blog_post(raw, 0)
    assert raw["slug"] in str(err.value)


def test_faq_key_is_stable_slug_of_question(portfolio):
    raw = portfolio["faqs"][0]
    first, second = map_faq(raw, 0), map_faq(raw, 0)
    assert first["key"] == second["key"] == slugify(raw["question"])
    assert first["question"] == {"en": raw["question"]}
    assert first["answer"] == {"en": raw["answer"]}


def test_tech_items_cover_all_kinds_with_unique_keys(portfolio):
    rows = map_tech_items(portfolio)
    assert {r["kind"] for r in rows} == {"tech", "tool", "hard_skill", "soft_skill"}
    keys = [r["key"] for r in rows]
    assert len(keys) == len(set(keys))
    hard = next(r for r in rows if r["kind"] == "hard_skill")
    assert hard["extra"]["level"] == portfolio["hardSkills"][0]["level"]
    assert hard["extra"]["description"] == portfolio["hardSkills"][0]["description"]
    assert all(r["status"] == "published" for r in rows)


def test_duplicate_tech_names_in_one_list_raise(portfolio):
    portfolio["techStack"].append(dict(portfolio["techStack"][0]))
    with pytest.raises(ValueError):
        map_tech_items(portfolio)


def test_site_settings_split_personal_social_languages(portfolio):
    rows = {r["key"]: r["value"] for r in map_site_settings(portfolio)}
    assert set(rows) == {"personal", "social_links", "languages"}
    assert rows["personal"]["name"] == portfolio["personal"]["name"]
    assert "socialLinks" not in rows["personal"] and "languages" not in rows["personal"]
    assert rows["social_links"] == portfolio["personal"]["socialLinks"]
    assert rows["languages"] == portfolio["personal"]["languages"]


def test_collect_media_deduplicates_paths_and_marks_repo_source():
    projects = [
        {"hero_image": "/a.webp", "gallery_images": ["/b.webp", "/a.webp"]},
        {"hero_image": "https://cdn.example.com/x.png", "gallery_images": []},
    ]
    blogs = [{"cover_image": "/b.webp"}, {"cover_image": "/clip.mp4"}]
    media = collect_media(projects, blogs)
    assert [m["path"] for m in media] == ["/a.webp", "/b.webp", "/clip.mp4"]
    assert all(m["source"] == "repo" for m in media)
    assert [m["kind"] for m in media] == ["image", "image", "video"]


def test_build_seed_table_names_counts_and_sort_order(portfolio):
    seed = build_seed(portfolio)
    assert set(seed) == {
        "projects", "blog_posts", "faqs", "tech_items", "site_settings", "media_assets",
    }
    assert len(seed["projects"]) == len(portfolio["projects"])
    assert len(seed["blog_posts"]) == len(portfolio["blogs"])
    assert len(seed["faqs"]) == len(portfolio["faqs"])
    assert [r["sort_order"] for r in seed["projects"]] == [0, 1]
    assert all(r["status"] == "published" for t in ("projects", "blog_posts", "faqs")
               for r in seed[t])
    paths = [m["path"] for m in seed["media_assets"]]
    assert len(paths) == len(set(paths)) and portfolio["projects"][0]["image"] in paths
