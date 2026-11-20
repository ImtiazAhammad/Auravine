"""A private, throwaway PostgreSQL cluster for testing migrations and row-level security.

Uses the PostgreSQL server binaries already on the machine (no Docker, no root): a fresh
cluster is initialised in a temp directory, listens on a unix socket only, and is deleted
at the end of the session.
"""

import shutil
import subprocess
import tempfile
from collections.abc import Callable, Iterator
from pathlib import Path

import psycopg
import pytest

ROOT = Path(__file__).resolve().parents[3]
MIGRATIONS = ROOT / "supabase" / "migrations"
BOOTSTRAP = Path(__file__).with_name("bootstrap.sql")


def _pg_bin() -> Path | None:
    for candidate in sorted(Path("/usr/lib/postgresql").glob("*/bin"), reverse=True):
        if (candidate / "initdb").exists():
            return candidate
    found = shutil.which("initdb")
    return Path(found).parent if found else None


@pytest.fixture(scope="session")
def pg_url() -> Iterator[str]:
    bin_dir = _pg_bin()
    if bin_dir is None:
        pytest.skip("PostgreSQL server binaries (initdb, pg_ctl) not found")
    base = Path(tempfile.mkdtemp(prefix="auravine-pg-"))
    data, sock = base / "data", base / "sock"
    sock.mkdir()
    subprocess.run(
        [bin_dir / "initdb", "-D", data, "-A", "trust", "-U", "postgres", "--no-sync"],
        check=True, capture_output=True,
    )
    options = f"-c listen_addresses='' -c unix_socket_directories={sock} -c fsync=off"
    subprocess.run(
        [bin_dir / "pg_ctl", "-D", data, "-o", options, "-w", "-l", base / "pg.log", "start"],
        check=True, capture_output=True,
    )
    url = f"host={sock} user=postgres dbname=postgres"
    try:
        with psycopg.connect(url, autocommit=True) as conn:
            conn.execute(BOOTSTRAP.read_text())
            for migration in sorted(MIGRATIONS.glob("*.sql")):
                conn.execute(migration.read_text())
        yield url
    finally:
        subprocess.run([bin_dir / "pg_ctl", "-D", data, "-m", "immediate", "stop"],
                       capture_output=True)
        shutil.rmtree(base, ignore_errors=True)


@pytest.fixture
def connect(pg_url: str) -> Iterator[Callable[..., psycopg.Connection]]:
    """connect(role, user_id=None): autocommit connection acting as a Supabase role."""
    opened: list[psycopg.Connection] = []

    def _connect(role: str = "postgres", user_id: str | None = None) -> psycopg.Connection:
        conn = psycopg.connect(pg_url, autocommit=True)
        opened.append(conn)
        if role != "postgres":
            conn.execute(f'set role "{role}"')
        conn.execute("select set_config('request.jwt.claim.sub', %s, false)", (user_id or "",))
        return conn

    yield _connect
    for conn in opened:
        conn.close()


@pytest.fixture(autouse=True)
def _clean_tables(request: pytest.FixtureRequest) -> None:
    """Empty every public table before each database test."""
    if "pg_url" not in request.fixturenames and "connect" not in request.fixturenames:
        return
    url = request.getfixturevalue("pg_url")
    with psycopg.connect(url, autocommit=True) as conn:
        names = [r[0] for r in conn.execute(
            "select tablename from pg_tables where schemaname = 'public'")]
        if names:
            conn.execute("truncate " + ", ".join(f'public."{n}"' for n in names) + " cascade")
        conn.execute("truncate auth.users cascade")
