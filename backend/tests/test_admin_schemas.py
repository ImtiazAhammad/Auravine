import pytest
from pydantic import ValidationError

from app.admin.schemas import (
    BlogPostIn,
    FaqIn,
    LanguagesSetting,
    PersonalSetting,
    ProjectIn,
    SocialLinksSetting,
    TechItemIn,
)


def project(**over):
    base = {
        "slug": "shefa-agent", "status": "published", "sort_order": 0, "delivery_status": "ongoing",
        "title": {"en": "Shefa"}, "description": {"en": "Agent"},
    }
    return {**base, **over}


def test_a_minimal_project_is_valid_and_dumps_without_empty_bangla():
    dumped = ProjectIn(**project(title={"en": "Shefa", "bn": "  "})).model_dump(mode="json")
    assert dumped["title"] == {"en": "Shefa"}
    assert dumped["details"] == {"en": {}}
    assert dumped["hero_image"] is None and dumped["gallery_images"] == []


@pytest.mark.parametrize("slug", ["Has Caps", "has_underscore", "-lead", "trail-", "a--b", "", "x" * 101])
def test_bad_slugs_are_rejected(slug):
    with pytest.raises(ValidationError):
        ProjectIn(**project(slug=slug))


@pytest.mark.parametrize("title", [{"en": ""}, {"en": "   "}, {"bn": "শুধু বাংলা"}, "text", None])
def test_english_text_is_required(title):
    with pytest.raises(ValidationError):
        ProjectIn(**project(title=title))


@pytest.mark.parametrize(
    "url",
    ["javascript:alert(1)", "data:text/html,x", "//evil.test/x", "http://plain.test", "ftp://x.test",
     "https://", "relative/path"],
)
@pytest.mark.parametrize("field", ["demo_url", "repo_url", "hero_image"])
def test_dangerous_or_odd_urls_are_rejected(field, url):
    with pytest.raises(ValidationError):
        ProjectIn(**project(**{field: url}))


@pytest.mark.parametrize("url", ["https://x.test/a?b=1", "/project/a.webp", "", None])
def test_https_urls_site_paths_and_empty_are_accepted(url):
    assert ProjectIn(**project(hero_image=url)).hero_image in (url, None)


def test_gallery_images_are_checked_one_by_one():
    with pytest.raises(ValidationError):
        ProjectIn(**project(gallery_images=["/ok.webp", "javascript:x"]))


def test_status_and_delivery_status_are_enumerated():
    for bad in ({"status": "live"}, {"delivery_status": "done"}):
        with pytest.raises(ValidationError):
            ProjectIn(**project(**bad))


GOOD_DETAILS = {
    "en": {
        "highlights": ["a"], "metrics": [{"value": "1", "label": "x"}],
        "features": [{"title": "t", "items": ["i"]}],
        "challengesAndSolutions": [{"problem": "p", "solution": "s"}],
        "installation": [{"title": "t", "type": "code", "cmd": "npm i"}],
    },
    "bn": {"highlights": ["ক"]},
}


def test_valid_details_pass_through_unchanged():
    assert ProjectIn(**project(details=GOOD_DETAILS)).model_dump(mode="json")["details"] == GOOD_DETAILS


@pytest.mark.parametrize(
    "bad",
    [
        {"en": {"title": "override"}},                      # unknown key cannot override a column
        {"en": {"features": "text"}},
        {"en": {"features": [{"title": "t", "items": None}]}},
        {"en": {"metrics": [{"value": "1"}]}},
        {"en": {"highlights": [1]}},
        {"en": {"installation": [{"title": "t", "type": "weird"}]}},
        ["not", "an", "object"],
    ],
)
def test_wrongly_shaped_details_are_rejected(bad):
    with pytest.raises(ValidationError):
        ProjectIn(**project(details=bad))


def test_length_and_count_caps():
    for bad in (
        {"title": {"en": "x" * 201}}, {"description": {"en": "x" * 1001}},
        {"long_description": {"en": "x" * 20001}}, {"tech_stack": ["a"] * 51},
        {"tech_stack": ["x" * 101]}, {"sort_order": -1}, {"sort_order": 100001},
    ):
        with pytest.raises(ValidationError):
            ProjectIn(**project(**bad))


def test_blog_post_rules():
    base = {"slug": "a-post", "status": "draft", "sort_order": 1, "title": {"en": "T"},
            "excerpt": {"en": "E"}, "content": {"en": "## Hi\n\ntext"}}
    assert BlogPostIn(**base).read_time_minutes is None
    for bad in ({"read_time_minutes": 0}, {"content": {"en": "x" * 100001}},
                {"cover_image": "javascript:x"}, {"tags": ["a"] * 51}):
        with pytest.raises(ValidationError):
            BlogPostIn(**{**base, **bad})


def test_faq_and_tech_item_rules():
    FaqIn(key="what-is-it", status="published", sort_order=0, question={"en": "Q"}, answer={"en": "A"})
    with pytest.raises(ValidationError):
        FaqIn(key="Bad Key", status="draft", sort_order=0, question={"en": "Q"}, answer={"en": "A"})
    TechItemIn(key="tech-python", status="published", sort_order=0, kind="tech", name="Python",
               icon="https://cdn.simpleicons.org/python", category="language", extra={})
    for bad in ({"kind": "gadget"}, {"name": " "}, {"icon": "javascript:x"}, {"url": "ftp://x"}):
        with pytest.raises(ValidationError):
            TechItemIn(**{"key": "tech-x", "status": "draft", "sort_order": 0, "kind": "tech",
                          "name": "X", **bad})


def test_settings_shapes():
    PersonalSetting(value={"name": "A", "title": "T", "subtitle": "S", "bio": "B", "avatar": "/grid.svg",
                           "location": "L", "email": ""})
    SocialLinksSetting(value=[{"platform": "GitHub", "url": "https://github.com/x", "icon": "github"}])
    LanguagesSetting(value=[{"name": "Bengali", "level": "Native"}])
    with pytest.raises(ValidationError):
        SocialLinksSetting(value=[{"platform": "X", "url": "javascript:x", "icon": "x"}])
    with pytest.raises(ValidationError):
        PersonalSetting(value={"name": "A"})
