import json

import httpx2
import pytest
from fastapi.testclient import TestClient

from app.deps import get_http_client, get_settings_dep
from app.main import create_app
from tests.fake_supabase import ADMIN_TOKEN, OTHER_TOKEN, FakeSupabase
from tests.test_admin_api import make_settings


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


ADMIN = {"authorization": f"Bearer {ADMIN_TOKEN}"}
SIGN = {"filename": "My Photo.PNG", "content_type": "image/png", "size": 1234}

ROUTES = [
    ("GET", "/admin/messages"), ("PATCH", "/admin/messages/00000000-0000-0000-0000-000000000001"),
    ("GET", "/admin/media"), ("POST", "/admin/media/sign"), ("POST", "/admin/media"),
]


@pytest.mark.parametrize("method,path", ROUTES)
def test_401_and_403_touch_nothing(client, fake, method, path):
    assert client.request(method, path, json={}).status_code == 401
    other = {"authorization": f"Bearer {OTHER_TOKEN}"}
    assert client.request(method, path, json={}, headers=other).status_code == 403
    assert fake.db_calls() == []
    assert not any(r.url.path.startswith("/storage") for r in fake.requests)


# ------------------------------------------------------------------ messages
def test_messages_are_listed_newest_first_with_email_status(client, fake):
    fake.add("contact_messages", name="A", email="a@b.co", message="m", handled=False,
             emailed_at=None, email_error="SMTP failed", created_at="2026-01-01T00:00:00Z")
    response = client.get("/admin/messages", headers=ADMIN)
    assert response.status_code == 200
    assert response.json()["items"][0]["email_error"] == "SMTP failed"
    call = [r for r in fake.requests if r.url.path.endswith("/contact_messages")][0]
    assert call.url.params["order"] == "created_at.desc"


def test_a_message_can_be_marked_handled_and_nothing_else_changes(client, fake):
    row = fake.add("contact_messages", name="A", email="a@b.co", message="secret text", handled=False)
    response = client.patch(f"/admin/messages/{row['id']}", json={"handled": True}, headers=ADMIN)
    assert response.status_code == 200 and response.json()["item"]["handled"] is True
    assert fake.tables["contact_messages"][0]["message"] == "secret text"
    patch = [r for r in fake.requests if r.method == "PATCH"][0]
    assert json.loads(patch.content) == {"handled": True}


@pytest.mark.parametrize("body", [{}, {"handled": "yes"}, {"handled": True, "message": "x"}])
def test_message_patch_only_accepts_handled(client, body):
    response = client.patch(
        "/admin/messages/00000000-0000-0000-0000-000000000001", json=body, headers=ADMIN
    )
    assert response.status_code == 422


# ------------------------------------------------------------------ media signing
def test_sign_returns_an_upload_url_and_a_public_url_without_the_service_key(client, fake):
    response = client.post("/admin/media/sign", json=SIGN, headers=ADMIN)
    assert response.status_code == 200
    data = response.json()
    assert data["path"].startswith("uploads/") and data["path"].endswith(".png")
    assert "my-photo" in data["path"] and ".." not in data["path"]
    assert data["upload_url"] == (
        f"https://x.supabase.co/storage/v1/object/upload/sign/media/{data['path']}?token=signed-token"
    )
    assert data["public_url"] == (
        f"https://x.supabase.co/storage/v1/object/public/media/{data['path']}"
    )
    assert "svc-key" not in response.text
    storage_call = [r for r in fake.requests if r.url.path.startswith("/storage")][0]
    assert storage_call.method == "POST"
    assert storage_call.headers["authorization"] == "Bearer svc-key"


@pytest.mark.parametrize(
    "body",
    [
        {**SIGN, "content_type": "text/html"}, {**SIGN, "content_type": "application/pdf"},
        {**SIGN, "size": 5 * 1024 * 1024 + 1}, {**SIGN, "size": 0}, {**SIGN, "filename": ""},
        {**SIGN, "filename": "   "},
    ],
)
def test_sign_rejects_bad_files_before_calling_storage(client, fake, body):
    assert client.post("/admin/media/sign", json=body, headers=ADMIN).status_code == 422
    assert not any(r.url.path.startswith("/storage") for r in fake.requests)


def test_sign_never_trusts_directories_in_the_filename(client):
    body = {**SIGN, "filename": "../../etc/passwd.png"}
    path = client.post("/admin/media/sign", json=body, headers=ADMIN).json()["path"]
    assert path.startswith("uploads/") and ".." not in path and path.count("/") == 2


def test_sign_extension_comes_from_the_content_type_not_the_filename(client):
    body = {"filename": "evil.html", "content_type": "image/webp", "size": 10}
    assert client.post("/admin/media/sign", json=body, headers=ADMIN).json()["path"].endswith(".webp")


def test_a_storage_failure_is_502_without_detail(client, fake):
    fake.sign_status = 500
    response = client.post("/admin/media/sign", json=SIGN, headers=ADMIN)
    assert response.status_code == 502 and "nope" not in response.text


# ------------------------------------------------------------------ media registration
def test_register_stores_a_media_row_with_bilingual_alt(client, fake):
    path = client.post("/admin/media/sign", json=SIGN, headers=ADMIN).json()["path"]
    body = {"path": path, "alt": {"en": "A photo", "bn": "ছবি"}, "width": 800, "height": 600}
    response = client.post("/admin/media", json=body, headers=ADMIN)
    assert response.status_code == 201
    row = fake.tables["media_assets"][0]
    assert row["path"] == path and row["source"] == "storage" and row["kind"] == "image"
    assert row["alt"] == {"en": "A photo", "bn": "ছবি"} and row["width"] == 800
    assert response.json()["item"]["public_url"].endswith(f"/object/public/media/{path}")


@pytest.mark.parametrize(
    "path", ["/project/a.webp", "other/a.png", "uploads/../a.png", "uploads/a b.png", "uploads/x.html"]
)
def test_register_rejects_paths_outside_uploads(client, fake, path):
    response = client.post("/admin/media", json={"path": path}, headers=ADMIN)
    assert response.status_code == 422 and fake.tables["media_assets"] == []


def test_media_list_marks_storage_rows_with_public_urls(client, fake):
    fake.add("media_assets", path="uploads/2026/a.png", kind="image", source="storage")
    fake.add("media_assets", path="/project/x.webp", kind="image", source="repo")
    items = client.get("/admin/media", headers=ADMIN).json()["items"]
    by_path = {i["path"]: i for i in items}
    assert by_path["uploads/2026/a.png"]["public_url"].endswith("/object/public/media/uploads/2026/a.png")
    assert by_path["/project/x.webp"]["public_url"] == "/project/x.webp"
