import uuid

import psycopg
import pytest
from psycopg.types.json import Jsonb

B = lambda text: Jsonb({"en": text})  # noqa: E731

CONTENT_TABLES = ["projects", "blog_posts", "faqs", "tech_items"]
PRIVATE_TABLES = ["contact_messages", "admin_profiles"]
ALL_TABLES = CONTENT_TABLES + ["site_settings", "media_assets"] + PRIVATE_TABLES
VISITORS = ["anon", "authenticated"]

INSERTS = {
    "projects": (
        "insert into projects (slug, status, delivery_status, title, description) "
        "values (%s, %s, 'ongoing', %s, %s)",
        lambda slug, status: (slug, status, B(slug), B("d")),
    ),
    "blog_posts": (
        "insert into blog_posts (slug, status, title, excerpt, content) "
        "values (%s, %s, %s, %s, %s)",
        lambda slug, status: (slug, status, B(slug), B("e"), B("c")),
    ),
    "faqs": (
        "insert into faqs (key, status, question, answer) values (%s, %s, %s, %s)",
        lambda slug, status: (slug, status, B(slug), B("a")),
    ),
    "tech_items": (
        "insert into tech_items (key, status, kind, name) values (%s, %s, 'tech', %s)",
        lambda slug, status: (slug, status, slug),
    ),
}

# One harmless statement per table for the "cannot write" tests (column that exists on each).
UPDATES = {
    "projects": "update projects set sort_order = 9",
    "blog_posts": "update blog_posts set sort_order = 9",
    "faqs": "update faqs set sort_order = 9",
    "tech_items": "update tech_items set sort_order = 9",
    "site_settings": "update site_settings set updated_at = now()",
    "media_assets": "update media_assets set width = 1",
    "contact_messages": "update contact_messages set handled = true",
    "admin_profiles": "update admin_profiles set role = 'admin'",
}

def seed_everything(connect):
    """One draft and one published row per content table, plus the other tables."""
    svc = connect("service_role")
    for table in CONTENT_TABLES:
        sql, args = INSERTS[table]
        svc.execute(sql, args(f"{table}-draft", "draft"))
        svc.execute(sql, args(f"{table}-pub", "published"))
    svc.execute(
        "insert into site_settings (key, value) values ('personal', %s)", (Jsonb({"a": 1}),)
    )
    svc.execute("insert into media_assets (path, kind, source) values ('/x.webp', 'image', 'repo')")
    svc.execute("insert into contact_messages (name, email, message) values ('n', 'a@b.co', 'hi')")
    uid = svc.execute(
        "insert into auth.users (id) values (gen_random_uuid()) returning id"
    ).fetchone()[0]
    svc.execute("insert into admin_profiles (user_id) values (%s)", (uid,))


def as_visitor(connect, role):
    return connect(role, str(uuid.uuid4()) if role == "authenticated" else None)


def test_every_public_table_has_rls_enabled(connect):
    rows = connect().execute(
        "select tablename from pg_tables where schemaname = 'public' and not rowsecurity"
    ).fetchall()
    assert rows == [], f"tables without row-level security: {[r[0] for r in rows]}"


@pytest.mark.parametrize("role", VISITORS)
@pytest.mark.parametrize("table", CONTENT_TABLES)
def test_visitors_see_only_published(connect, role, table):
    seed_everything(connect)
    rows = as_visitor(connect, role).execute(f"select status from {table}").fetchall()
    assert rows == [("published",)]


@pytest.mark.parametrize("role", VISITORS)
def test_visitors_read_settings_and_media(connect, role):
    seed_everything(connect)
    conn = as_visitor(connect, role)
    assert conn.execute("select count(*) from site_settings").fetchone() == (1,)
    assert conn.execute("select count(*) from media_assets").fetchone() == (1,)


@pytest.mark.parametrize("role", VISITORS)
@pytest.mark.parametrize("table", ALL_TABLES)
def test_visitors_cannot_update_or_delete(connect, role, table):
    seed_everything(connect)
    conn = as_visitor(connect, role)
    for statement in (UPDATES[table], f"delete from {table}"):
        try:
            changed = conn.execute(statement).rowcount
        except psycopg.errors.InsufficientPrivilege:
            continue
        assert changed == 0, f"{role} changed rows with: {statement}"


@pytest.mark.parametrize("role", VISITORS)
@pytest.mark.parametrize("table", CONTENT_TABLES)
def test_visitors_cannot_insert(connect, role, table):
    sql, args = INSERTS[table]
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        as_visitor(connect, role).execute(sql, args("sneaky", "published"))


@pytest.mark.parametrize("role", VISITORS)
@pytest.mark.parametrize("table", ["site_settings", "media_assets"])
def test_visitors_cannot_insert_settings_or_media(connect, role, table):
    sql = {
        "site_settings": "insert into site_settings (key, value) values ('k', '{}')",
        "media_assets": (
            "insert into media_assets (path, kind, source) values ('/y', 'image', 'repo')"
        ),
    }[table]
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        as_visitor(connect, role).execute(sql)


@pytest.mark.parametrize("role", VISITORS)
@pytest.mark.parametrize("table", ["contact_messages", "admin_profiles"])
def test_private_tables_are_invisible(connect, role, table):
    seed_everything(connect)
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        as_visitor(connect, role).execute(f"select * from {table}")


def test_anonymous_cannot_submit_contact_messages_directly(connect):
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        connect("anon").execute(
            "insert into contact_messages (name, email, message) values ('n', 'a@b.co', 'hi')"
        )


def test_service_role_can_do_everything(connect):
    svc = connect("service_role")
    sql, args = INSERTS["projects"]
    svc.execute(sql, args("p", "draft"))
    assert svc.execute("update projects set status = 'published'").rowcount == 1
    assert svc.execute("select count(*) from projects").fetchone() == (1,)
    assert svc.execute("delete from projects").rowcount == 1
