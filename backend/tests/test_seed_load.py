import json
from pathlib import Path

import httpx2
import pytest

from app.config import Settings
from app.seed.load import UPSERT_KEYS, build_requests, load_seed, main
from app.seed.mapping import build_seed

FIXTURE_PATH = Path(__file__).parent / "fixtures" / "portfolio_sample.json"
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


@pytest.fixture
def seed():
    return build_seed(json.loads(FIXTURE_PATH.read_text()))


def table_of(request: httpx2.Request) -> str:
    return request.url.path.rsplit("/", 1)[-1]


def test_one_upsert_request_per_batch_with_conflict_key(settings, seed):
    requests = build_requests(seed, settings)
    assert {table_of(r) for r in requests} == set(seed)
    for request in requests:
        table = table_of(request)
        assert request.method == "POST"
        assert str(request.url) == (
            f"https://x.supabase.co/rest/v1/{table}?on_conflict={UPSERT_KEYS[table]}"
        )
        assert "resolution=merge-duplicates" in request.headers["Prefer"]


def test_batches_are_capped(settings, seed):
    row = seed["faqs"][0]
    requests = build_requests({"faqs": [row] * 450}, settings, batch_size=200)
    assert [len(json.loads(r.content)) for r in requests] == [200, 200, 50]


def test_empty_tables_send_nothing(settings):
    assert build_requests({"faqs": [], "projects": []}, settings) == []


def test_service_key_is_sent_only_as_headers_never_in_url_or_body(settings, seed):
    for request in build_requests(seed, settings):
        assert request.headers["apikey"] == KEY
        assert request.headers["Authorization"] == f"Bearer {KEY}"
        assert KEY not in str(request.url)
        assert KEY not in request.content.decode()


def test_running_twice_sends_identical_requests(settings, seed):
    def signature(requests):
        return [(r.method, str(r.url), dict(r.headers), r.content) for r in requests]

    assert signature(build_requests(seed, settings)) == signature(build_requests(seed, settings))


def test_load_returns_rows_sent_per_table(settings, seed):
    client = httpx2.Client(transport=httpx2.MockTransport(lambda request: httpx2.Response(201)))
    counts = load_seed(seed, settings, client=client)
    assert counts == {table: len(rows) for table, rows in seed.items() if rows}


def test_error_response_raises_and_names_the_table_not_the_key(settings, seed):
    client = httpx2.Client(
        transport=httpx2.MockTransport(lambda request: httpx2.Response(409, text="conflict"))
    )
    with pytest.raises(RuntimeError) as err:
        load_seed(seed, settings, client=client)
    message = str(err.value)
    assert next(iter(seed)) in message and "409" in message
    assert KEY not in message


def test_dry_run_reports_counts_without_any_network(seed, monkeypatch):
    monkeypatch.setattr(httpx2.Client, "send", lambda *a, **k: pytest.fail("network used"))
    counts = main([str(FIXTURE_PATH), "--dry-run"])
    assert counts == {table: len(rows) for table, rows in seed.items()}
