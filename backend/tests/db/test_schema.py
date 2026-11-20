import time

import psycopg
import pytest
from psycopg.types.json import Jsonb

TABLES = {
    "projects", "blog_posts", "faqs", "tech_items",
    "site_settings", "media_assets", "contact_messages", "admin_profiles",
}


def test_all_tables_exist(connect):
    rows = connect().execute(
        "select table_name from information_schema.tables where table_schema = 'public'"
    ).fetchall()
    assert TABLES <= {r[0] for r in rows}


def test_bilingual_round_trip(connect):
    conn = connect()
    question = {"en": "Q?", "bn": "প্রশ্ন? 😀"}
    answer = {"en": "## Heading\n\nমার্কডাউন 😀 " + "x" * 20000}
    conn.execute(
        "insert into faqs (key, question, answer) values ('k', %s, %s)",
        (Jsonb(question), Jsonb(answer)),
    )
    got = conn.execute("select question, answer from faqs where key = 'k'").fetchone()
    assert got == (question, answer)


@pytest.mark.parametrize(
    "bad",
    [
        {}, {"bn": "x"}, {"en": ""}, {"en": "  "}, "plain string", {"en": 5}, {"en": None},
        {"en": "x", "bn": 5},
        {"en": "\n"}, {"en": "\t\r\n"}, {"en": "\u00a0"}, {"en": "\u200b"},
    ],
)
def test_missing_or_blank_english_is_rejected(connect, bad):
    with pytest.raises(psycopg.errors.CheckViolation):
        connect().execute(
            "insert into faqs (key, question, answer) values ('k', %s, %s)",
            (Jsonb(bad), Jsonb({"en": "ok"})),
        )


def test_slug_is_unique_and_status_defaults_to_draft(connect):
    conn = connect()
    insert = (
        "insert into projects (slug, delivery_status, title, description) "
        "values ('p1', 'ongoing', %s, %s) returning status"
    )
    args = (Jsonb({"en": "T"}), Jsonb({"en": "D"}))
    assert conn.execute(insert, args).fetchone() == ("draft",)
    with pytest.raises(psycopg.errors.UniqueViolation):
        conn.execute(insert, args)


def test_invalid_status_is_rejected(connect):
    with pytest.raises(psycopg.errors.CheckViolation):
        connect().execute(
            "insert into faqs (key, question, answer, status) values ('k', %s, %s, 'live')",
            (Jsonb({"en": "Q"}), Jsonb({"en": "A"})),
        )


def test_updated_at_changes_on_update(connect):
    conn = connect()
    conn.execute(
        "insert into faqs (key, question, answer) values ('k', %s, %s)",
        (Jsonb({"en": "Q"}), Jsonb({"en": "A"})),
    )
    before = conn.execute("select updated_at from faqs where key = 'k'").fetchone()[0]
    time.sleep(0.05)
    conn.execute("update faqs set sort_order = 9 where key = 'k'")
    after = conn.execute("select updated_at from faqs where key = 'k'").fetchone()[0]
    assert after > before


def test_contact_message_length_limits(connect):
    conn = connect()
    insert = "insert into contact_messages (name, email, message) values ('n', 'a@b.co', %s)"
    conn.execute(insert, ("m" * 5000,))
    with pytest.raises(psycopg.errors.CheckViolation):
        conn.execute(insert, ("m" * 5001,))
    with pytest.raises(psycopg.errors.CheckViolation):
        conn.execute(insert, ("",))


PROJECT = (
    "insert into projects (slug, delivery_status, title, description{col}) "
    "values ('p', 'ongoing', %s, %s{ph})"
)


@pytest.mark.parametrize("column", ["category", "role", "team", "custom_timeline"])
def test_project_display_fields_are_bilingual_or_null(connect, column):
    conn = connect()
    base = (Jsonb({"en": "T"}), Jsonb({"en": "D"}))
    sql = PROJECT.format(col=f", {column}", ph=", %s")
    conn.execute(sql, (*base, Jsonb({"en": "Lead", "bn": "নেতা"})))
    conn.execute("delete from projects")
    conn.execute(PROJECT.format(col="", ph=""), base)  # null is allowed
    conn.execute("delete from projects")
    with pytest.raises(psycopg.errors.CheckViolation):
        conn.execute(sql, (*base, Jsonb("plain text")))


def test_blog_author_name_is_bilingual_or_null(connect):
    conn = connect()
    insert = (
        "insert into blog_posts (slug, title, excerpt, content, author_name) "
        "values ('b', %s, %s, %s, %s)"
    )
    ok = (Jsonb({"en": "T"}), Jsonb({"en": "E"}), Jsonb({"en": "C"}))
    conn.execute(insert, (*ok, Jsonb({"en": "Auravine Team"})))
    conn.execute("delete from blog_posts")
    with pytest.raises(psycopg.errors.CheckViolation):
        conn.execute(insert, (*ok, Jsonb("Auravine Team")))


@pytest.mark.parametrize("bad", [{"fr": {}}, {"en": []}, {"en": "text"}, [], {}])
def test_project_details_must_hold_an_english_object(connect, bad):
    with pytest.raises(psycopg.errors.CheckViolation):
        connect().execute(
            "insert into projects (slug, delivery_status, title, description, details) "
            "values ('p', 'ongoing', %s, %s, %s)",
            (Jsonb({"en": "T"}), Jsonb({"en": "D"}), Jsonb(bad)),
        )


def test_project_details_default_is_valid(connect):
    conn = connect()
    conn.execute(
        "insert into projects (slug, delivery_status, title, description) "
        "values ('p', 'ongoing', %s, %s)",
        (Jsonb({"en": "T"}), Jsonb({"en": "D"})),
    )
    assert conn.execute("select details from projects").fetchone() == ({"en": {}},)
