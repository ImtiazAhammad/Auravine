import json

import httpx2
import pytest

from app.backup import TABLES, export_all, main
from app.config import Settings

KEY = "svc-key-123"


@pytest.fixture
def settings():
    return Settings(
        _env_file=None,
        supabase_url="https://x.supabase.co/",
        supabase_service_role_key=KEY,
        revalidate_url="https://r.test/revalidate",
        revalidate_secret="rev-secret",
    )


def make_client(pages: dict[str, list[list[dict]]], seen: list | None = None):
    """Each table answers its pages in order; a short page ends the table."""
    served: dict[str, int] = {}

    def handler(request: httpx2.Request) -> httpx2.Response:
        table = request.url.path.rsplit("/", 1)[-1]
        if seen is not None:
            seen.append(request)
        index = served.get(table, 0)
        served[table] = index + 1
        table_pages = pages.get(table, [[]])
        return httpx2.Response(200, json=table_pages[index] if index < len(table_pages) else [])

    return httpx2.Client(transport=httpx2.MockTransport(handler))


def test_every_table_is_exported_including_private_ones():
    assert {"projects", "blog_posts", "faqs", "tech_items", "site_settings", "media_assets",
            "contact_messages", "admin_profiles"} <= set(TABLES)
    assert "rate_limits" not in TABLES  # disposable counters


def test_export_writes_one_json_file_per_table(tmp_path, settings):
    pages = {"faqs": [[{"key": "a"}, {"key": "b"}]], "projects": [[{"slug": "p"}]]}
    counts = export_all(settings, tmp_path, client=make_client(pages))
    assert counts["faqs"] == 2 and counts["projects"] == 1 and counts["contact_messages"] == 0
    assert json.loads((tmp_path / "faqs.json").read_text()) == [{"key": "a"}, {"key": "b"}]
    assert (tmp_path / "contact_messages.json").exists()


def test_export_pages_through_large_tables(tmp_path, settings):
    full = [{"id": i} for i in range(1000)]
    pages = {"faqs": [full, [{"id": 1000}]]}
    seen: list[httpx2.Request] = []
    counts = export_all(settings, tmp_path, client=make_client(pages, seen), page_size=1000)
    assert counts["faqs"] == 1001
    faq_requests = [r for r in seen if r.url.path.endswith("/faqs")]
    assert [r.url.params["offset"] for r in faq_requests] == ["0", "1000"]
    assert all("order" in r.url.params for r in faq_requests)  # stable paging


def test_service_key_goes_only_in_headers(tmp_path, settings):
    seen: list[httpx2.Request] = []
    export_all(settings, tmp_path, client=make_client({}, seen))
    for request in seen:
        assert request.headers["apikey"] == KEY
        assert KEY not in str(request.url)
    for file in tmp_path.iterdir():
        assert KEY not in file.read_text()


def test_failure_names_the_table_and_leaves_no_partial_file(tmp_path, settings):
    def handler(request):
        if request.url.path.endswith("/projects"):
            return httpx2.Response(500, text="secret internals")
        return httpx2.Response(200, json=[])

    client = httpx2.Client(transport=httpx2.MockTransport(handler))
    with pytest.raises(RuntimeError, match="projects") as error:
        export_all(settings, tmp_path, client=client)
    assert "secret internals" not in str(error.value)
    assert not (tmp_path / "projects.json").exists()


def test_main_refuses_a_non_empty_target(tmp_path):
    (tmp_path / "old.txt").write_text("x")
    with pytest.raises(SystemExit):
        main([str(tmp_path)])
