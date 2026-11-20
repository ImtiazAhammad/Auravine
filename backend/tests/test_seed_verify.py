import json

import httpx2

from app.seed.verify import PRIVATE_TABLES, run_checks

EXPECTED = {
    "projects": 11, "blog_posts": 5, "faqs": 6, "tech_items": 51,
    "site_settings": 3, "media_assets": 20,
}
BASE = "https://x.supabase.co"


class FakeSupabase:
    """A stand-in for the live REST API, with switches for the ways it could be misconfigured."""

    def __init__(self, counts=None, open_writes=False, leak_private=False, draft_hidden=True):
        self.counts = counts or dict(EXPECTED)
        self.open_writes = open_writes
        self.leak_private = leak_private
        self.draft_hidden = draft_hidden
        self.patches: list[str] = []
        self.post_bodies: list[dict] = []
        self.status = "published"

    def client(self) -> httpx2.Client:
        return httpx2.Client(transport=httpx2.MockTransport(self.handle))

    def handle(self, request: httpx2.Request) -> httpx2.Response:
        table = request.url.path.rsplit("/", 1)[-1]
        if request.method == "GET":
            if table in PRIVATE_TABLES:
                if self.leak_private:
                    return httpx2.Response(206, headers={"Content-Range": "0-0/3"}, json=[{}])
                return httpx2.Response(401, json={"code": "42501"})
            total = self.counts[table]
            if table == "projects" and self.status == "draft" and self.draft_hidden:
                total -= 1
            return httpx2.Response(206, headers={"Content-Range": f"0-0/{total}"}, json=[{}])
        if request.method == "POST":
            self.post_bodies.append(json.loads(request.content))
            return httpx2.Response(201 if self.open_writes else 401)
        if request.method == "PATCH":
            self.status = json.loads(request.content)["status"]
            self.patches.append(self.status)
            return httpx2.Response(204)
        raise AssertionError(request.method)


def run(fake, **kwargs):
    return run_checks(fake.client(), BASE, "anon-key", EXPECTED, **kwargs)


def failed(checks):
    return [c.name for c in checks if not c.ok]


def test_all_checks_pass_on_a_correct_server():
    assert failed(run(FakeSupabase())) == []


def test_count_mismatch_fails_naming_the_table():
    fake = FakeSupabase(counts={**EXPECTED, "faqs": 5})
    assert any("faqs" in name for name in failed(run(fake)))


def test_open_write_is_reported():
    assert any("write" in name for name in failed(run(FakeSupabase(open_writes=True))))


def test_write_probe_cannot_create_valid_data():
    fake = FakeSupabase()
    run(fake)
    assert fake.post_bodies, "the probe must try a write"
    assert all(body["title"]["en"].strip() == "" for body in fake.post_bodies)


def test_private_table_leak_is_reported():
    assert any("contact_messages" in n or "admin_profiles" in n
               for n in failed(run(FakeSupabase(leak_private=True))))


def test_draft_toggle_hides_the_row_and_always_restores():
    fake = FakeSupabase()
    checks = run(fake, service_key="svc", toggle_slug="some-project")
    assert failed(checks) == []
    assert fake.patches == ["draft", "published"]


def test_draft_still_visible_fails_but_still_restores():
    fake = FakeSupabase(draft_hidden=False)
    checks = run(fake, service_key="svc", toggle_slug="some-project")
    assert any("draft" in name for name in failed(checks))
    assert fake.patches == ["draft", "published"]
