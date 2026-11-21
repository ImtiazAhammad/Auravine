import psycopg
import pytest

pytestmark = pytest.mark.db


def test_media_bucket_is_public_small_and_images_only(connect):
    row = connect("postgres").execute(
        "select public, file_size_limit, allowed_mime_types from storage.buckets where id = 'media'"
    ).fetchone()
    assert row is not None
    public, limit, mimes = row
    assert public is True and limit == 5 * 1024 * 1024
    assert set(mimes) == {"image/webp", "image/png", "image/jpeg", "image/gif", "image/svg+xml", "image/avif"}


@pytest.mark.parametrize("role", ["anon", "authenticated"])
def test_visitors_cannot_write_objects_directly(connect, role):
    visitor = connect(role)
    with pytest.raises((psycopg.errors.InsufficientPrivilege, psycopg.errors.CheckViolation)):
        visitor.execute("insert into storage.objects (bucket_id, name) values ('media', 'uploads/x.png')")


def test_migration_is_safe_to_apply_twice(connect, pg_url):
    from tests.db.conftest import MIGRATIONS

    conn = connect("postgres")
    conn.execute((MIGRATIONS / "20261122000002_media_bucket.sql").read_text())
    assert conn.execute("select count(*) from storage.buckets where id = 'media'").fetchone()[0] == 1
