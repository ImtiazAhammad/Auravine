import httpx2
import pytest
from fastapi.testclient import TestClient

from app.config import Settings
from app.deps import get_http_client, get_settings_dep
from app.main import create_app
from tests.fake_supabase import ADMIN_TOKEN, OTHER_TOKEN, FakeSupabase

SECRET = "rev-secret-1"


def make_settings():
    return Settings(
        _env_file=None, supabase_url="https://x.supabase.co", supabase_service_role_key="svc-key",
        revalidate_url="https://site.test/api/revalidate", revalidate_secret=SECRET,
        supabase_anon_key="anon-key",
    )


@pytest.fixture
def fake():
    return FakeSupabase()


@pytest.fixture
def client(fake):
    app = create_app()

    async def http_client():
        async with httpx2.AsyncClient(transport=httpx2.MockTransport(fake.handler)) as c:
            yield c

    app.dependency_overrides[get_settings_dep] = make_settings
    app.dependency_overrides[get_http_client] = http_client
    return TestClient(app)


def as_admin(extra=None):
    return {"authorization": f"Bearer {ADMIN_TOKEN}", **(extra or {})}


PROJECT = {
    "slug": "shefa", "status": "published", "sort_order": 1, "delivery_status": "ongoing",
    "title": {"en": "Shefa"}, "description": {"en": "Agent"},
}
BLOG = {"slug": "hello", "status": "draft", "sort_order": 0, "title": {"en": "Hi"},
        "excerpt": {"en": "E"}, "content": {"en": "## Body"}}
FAQ = {"key": "q1", "status": "published", "sort_order": 0, "question": {"en": "Q"},
       "answer": {"en": "A"}}
TECH = {"key": "tech-python", "status": "published", "sort_order": 0, "kind": "tech",
        "name": "Python", "extra": {}}
RESOURCES = [
    ("projects", "projects", PROJECT, "slug"),
    ("blog-posts", "blog_posts", BLOG, "slug"),
    ("faqs", "faqs", FAQ, "key"),
    ("tech-items", "tech_items", TECH, "key"),
]

ALL_ROUTES = [
    ("GET", "/admin/me"), ("GET", "/admin/projects"), ("POST", "/admin/projects"),
    ("GET", "/admin/projects/00000000-0000-0000-0000-000000000001"),
    ("PUT", "/admin/projects/00000000-0000-0000-0000-000000000001"),
    ("DELETE", "/admin/projects/00000000-0000-0000-0000-000000000001"),
    ("GET", "/admin/blog-posts"), ("POST", "/admin/blog-posts"), ("GET", "/admin/faqs"),
    ("POST", "/admin/faqs"), ("GET", "/admin/tech-items"), ("POST", "/admin/tech-items"),
    ("GET", "/admin/settings"), ("PUT", "/admin/settings/personal"),
]


# ------------------------------------------------------------------ Review Focus 1
@pytest.mark.parametrize("method,path", ALL_ROUTES)
def test_no_token_is_401_and_touches_nothing(client, fake, method, path):
    assert client.request(method, path, json={}).status_code == 401
    assert fake.db_calls() == []


@pytest.mark.parametrize("method,path", ALL_ROUTES)
def test_a_signed_up_non_admin_is_403_and_touches_nothing(client, fake, method, path):
    response = client.request(method, path, json={}, headers={"authorization": f"Bearer {OTHER_TOKEN}"})
    assert response.status_code == 403
    assert fake.db_calls() == []


def test_me_returns_the_admin(client):
    response = client.get("/admin/me", headers=as_admin())
    assert response.status_code == 200
    assert response.json()["email"] == f"{ADMIN_TOKEN}@example.com"


# ------------------------------------------------------------------ CRUD
@pytest.mark.parametrize("name,table,body,unique", RESOURCES)
def test_create_list_get_update_delete(client, fake, name, table, body, unique):
    created = client.post(f"/admin/{name}", json=body, headers=as_admin())
    assert created.status_code == 201
    item = created.json()["item"]
    assert item[unique] == body[unique] and created.json()["revalidated"] is True
    assert fake.tables[table][0][unique] == body[unique]

    listed = client.get(f"/admin/{name}", headers=as_admin()).json()["items"]
    assert [i[unique] for i in listed] == [body[unique]]

    assert client.get(f"/admin/{name}/{item['id']}", headers=as_admin()).json()["item"]["id"] == item["id"]

    changed = {**body, "sort_order": 7}
    updated = client.put(f"/admin/{name}/{item['id']}", json=changed, headers=as_admin())
    assert updated.status_code == 200 and updated.json()["item"]["sort_order"] == 7

    deleted = client.delete(f"/admin/{name}/{item['id']}", headers=as_admin())
    assert deleted.status_code == 200 and deleted.json()["ok"] is True
    assert fake.tables[table] == []


def test_list_includes_drafts_and_orders_by_sort_order(client, fake):
    fake.add("projects", slug="b", status="draft", sort_order=2)
    fake.add("projects", slug="a", status="published", sort_order=1)
    response = client.get("/admin/projects", headers=as_admin())
    assert {i["status"] for i in response.json()["items"]} == {"draft", "published"}
    order = [r for r in fake.requests if r.url.path.endswith("/projects")][0].url.params["order"]
    assert order.startswith("sort_order.asc")


def test_duplicate_slug_is_409_and_does_not_revalidate(client, fake):
    client.post("/admin/projects", json=PROJECT, headers=as_admin())
    fake.revalidate_calls.clear()
    response = client.post("/admin/projects", json=PROJECT, headers=as_admin())
    assert response.status_code == 409
    assert fake.revalidate_calls == []


def test_unknown_id_is_404_for_get_put_delete(client):
    missing = "/admin/projects/00000000-0000-0000-0000-0000000000aa"
    assert client.get(missing, headers=as_admin()).status_code == 404
    assert client.put(missing, json=PROJECT, headers=as_admin()).status_code == 404
    assert client.delete(missing, headers=as_admin()).status_code == 404


def test_a_non_uuid_id_is_rejected_before_any_database_call(client, fake):
    response = client.get("/admin/projects/not-a-uuid;drop", headers=as_admin())
    assert response.status_code == 422
    assert fake.db_calls() == []


# ------------------------------------------------------------------ Review Focus 4
@pytest.mark.parametrize(
    "bad",
    [{"slug": "Bad Slug"}, {"title": {"en": " "}}, {"demo_url": "javascript:alert(1)"},
     {"details": {"en": {"features": "text"}}}, {"hero_image": "http://plain.test/a.png"}],
)
def test_invalid_input_is_422_and_nothing_is_written(client, fake, bad):
    response = client.post("/admin/projects", json={**PROJECT, **bad}, headers=as_admin())
    assert response.status_code == 422
    assert fake.tables["projects"] == [] and fake.revalidate_calls == []


# ------------------------------------------------------------------ Review Focus 5
def test_a_write_calls_revalidate_with_the_bearer_secret(client, fake):
    client.post("/admin/faqs", json=FAQ, headers=as_admin())
    assert len(fake.revalidate_calls) == 1
    call = fake.revalidate_calls[0]
    assert call.headers["authorization"] == f"Bearer {SECRET}" and call.method == "POST"


@pytest.mark.parametrize("mode", ["error", "status"])
def test_a_failed_revalidate_does_not_fail_the_save(client, fake, mode):
    if mode == "error":
        fake.revalidate_error = True
    else:
        fake.revalidate_status = 500
    response = client.post("/admin/faqs", json=FAQ, headers=as_admin())
    assert response.status_code == 201 and response.json()["revalidated"] is False
    assert len(fake.tables["faqs"]) == 1


def test_a_failed_database_write_is_502_without_detail_and_does_not_revalidate(client, fake):
    fake.fail_tables.add("faqs")
    response = client.post("/admin/faqs", json=FAQ, headers=as_admin())
    assert response.status_code == 502
    assert "boom" not in response.text and fake.revalidate_calls == []


# ------------------------------------------------------------------ settings
def test_settings_roundtrip_and_validation(client, fake):
    value = [{"platform": "GitHub", "url": "https://github.com/x", "icon": "github"}]
    saved = client.put("/admin/settings/social_links", json={"value": value}, headers=as_admin())
    assert saved.status_code == 200 and saved.json()["revalidated"] is True
    listed = client.get("/admin/settings", headers=as_admin()).json()["items"]
    assert listed["social_links"] == value

    assert client.put("/admin/settings/secrets", json={"value": {}}, headers=as_admin()).status_code == 404
    bad = [{"platform": "X", "url": "javascript:x", "icon": "x"}]
    assert client.put("/admin/settings/social_links", json={"value": bad}, headers=as_admin()).status_code == 422
