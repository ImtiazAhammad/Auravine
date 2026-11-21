import time

import psycopg
import pytest

pytestmark = pytest.mark.db


def hit(conn, bucket="contact", key="k1", window=3600, limit=3):
    return conn.execute(
        "select public.hit_rate_limit(%s, %s, %s, %s)", (bucket, key, window, limit)
    ).fetchone()[0]


def test_allows_up_to_the_limit_then_blocks(connect):
    svc = connect("service_role")
    assert [hit(svc) for _ in range(5)] == [True, True, True, False, False]


def test_keys_and_buckets_are_independent(connect):
    svc = connect("service_role")
    assert [hit(svc, key="a", limit=1), hit(svc, key="a", limit=1)] == [True, False]
    assert hit(svc, key="b", limit=1) is True
    assert hit(svc, bucket="chat", key="a", limit=1) is True


def test_a_new_window_allows_again(connect):
    svc = connect("service_role")
    assert [hit(svc, window=1, limit=1), hit(svc, window=1, limit=1)] == [True, False]
    time.sleep(1.2)
    assert hit(svc, window=1, limit=1) is True


def test_old_rows_are_deleted_by_a_call(connect):
    pg = connect("postgres")
    pg.execute(
        "insert into rate_limits (bucket, key, window_start, count) "
        "values ('contact', 'old', now() - interval '3 days', 5)"
    )
    hit(connect("service_role"), key="fresh")
    assert pg.execute("select count(*) from rate_limits where key = 'old'").fetchone()[0] == 0


@pytest.mark.parametrize("role", ["anon", "authenticated"])
def test_visitors_cannot_use_the_limiter(connect, role):
    visitor = connect(role)
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        hit(visitor)
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        visitor.execute("select * from rate_limits")


def test_contact_messages_has_email_status_columns(connect):
    pg = connect("postgres")
    cols = {
        r[0]: r[1]
        for r in pg.execute(
            "select column_name, is_nullable from information_schema.columns "
            "where table_name = 'contact_messages' and column_name in ('emailed_at', 'email_error')"
        )
    }
    assert cols == {"emailed_at": "YES", "email_error": "YES"}


def test_visitors_still_cannot_read_contact_messages(connect):
    with pytest.raises(psycopg.errors.InsufficientPrivilege):
        connect("anon").execute("select * from contact_messages")
