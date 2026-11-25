"""The admin API must accept every row the site is actually seeded with, or the owner could not
edit existing content (found in review: skills, social links and categories were all refused)."""

import json
from pathlib import Path

import pytest

from app.admin.schemas import (
    BlogPostIn,
    FaqIn,
    LanguagesSetting,
    PersonalSetting,
    ProjectIn,
    SocialLinksSetting,
    TechItemIn,
)

ROWS = json.loads(
    (Path(__file__).resolve().parents[2] / "src/lib/content/__fixtures__/seed-rows.json").read_text()
)


@pytest.mark.parametrize("row", ROWS["projects"], ids=lambda r: r["slug"])
def test_every_seeded_project_is_accepted(row):
    assert ProjectIn(**row).model_dump(mode="json")["slug"] == row["slug"]


@pytest.mark.parametrize("row", ROWS["blog_posts"], ids=lambda r: r["slug"])
def test_every_seeded_blog_post_is_accepted(row):
    assert BlogPostIn(**row).model_dump(mode="json")["category"] == row["category"]


@pytest.mark.parametrize("row", ROWS["faqs"], ids=lambda r: r["key"])
def test_every_seeded_faq_is_accepted(row):
    FaqIn(**row)


@pytest.mark.parametrize("row", ROWS["tech_items"], ids=lambda r: r["key"])
def test_every_seeded_tech_item_is_accepted(row):
    TechItemIn(**row)


def test_every_seeded_setting_is_accepted():
    settings = {r["key"]: r["value"] for r in ROWS["site_settings"]}
    PersonalSetting(value=settings["personal"])
    SocialLinksSetting(value=settings["social_links"])
    LanguagesSetting(value=settings["languages"])
