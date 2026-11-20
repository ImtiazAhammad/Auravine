"""Check a live Supabase project after migrating and seeding, using only the public anon key
(plus, optionally, the service key to flip one project to draft and back).

    uv run python -m app.seed.verify seed/portfolio.json [--toggle-draft]

Exit code 1 if any check fails. The write probe is deliberately invalid (blank title), so even
if row-level security were open it could not create a real row.
"""

import json
import os
import sys
from dataclasses import dataclass
from pathlib import Path

import httpx2
from dotenv import dotenv_values

from app.config import get_settings
from app.seed.mapping import build_seed

PRIVATE_TABLES = ("contact_messages", "admin_profiles")


@dataclass
class Check:
    name: str
    ok: bool
    detail: str = ""


def _headers(key: str, **extra: str) -> dict[str, str]:
    return {"apikey": key, "Authorization": f"Bearer {key}", **extra}


def _total(response: httpx2.Response) -> int | None:
    value = response.headers.get("Content-Range", "").rsplit("/", 1)[-1]
    return int(value) if value.isdigit() else None


def _count(client: httpx2.Client, base: str, key: str, table: str) -> httpx2.Response:
    return client.get(
        f"{base}/rest/v1/{table}?select=*",
        headers=_headers(key, Prefer="count=exact", Range="0-0", **{"Range-Unit": "items"}),
    )


def run_checks(
    client: httpx2.Client,
    base_url: str,
    anon_key: str,
    expected: dict[str, int],
    service_key: str | None = None,
    toggle_slug: str | None = None,
) -> list[Check]:
    base = base_url.rstrip("/")
    checks: list[Check] = []

    for table, want in expected.items():
        got = _total(_count(client, base, anon_key, table))
        checks.append(Check(f"{table}: anonymous sees {want} rows", got == want, f"got {got}"))

    probe = {
        "slug": "verify-live-probe", "status": "published", "delivery_status": "ongoing",
        "title": {"en": ""}, "description": {"en": ""},
    }
    response = client.post(
        f"{base}/rest/v1/projects", headers=_headers(anon_key, Prefer="return=minimal"), json=probe
    )
    checks.append(Check("anonymous write is rejected", response.status_code in (401, 403),
                        f"HTTP {response.status_code}"))

    for table in PRIVATE_TABLES:
        response = _count(client, base, anon_key, table)
        hidden = response.status_code in (401, 403) or (
            response.status_code < 300 and _total(response) == 0
        )
        checks.append(Check(f"{table}: not readable by anonymous", hidden,
                            f"HTTP {response.status_code}"))

    if service_key and toggle_slug:
        url = f"{base}/rest/v1/projects?slug=eq.{toggle_slug}"

        def set_status(status: str) -> httpx2.Response:
            return client.patch(
                url, headers=_headers(service_key, Prefer="return=minimal"), json={"status": status}
            )

        try:
            flipped = set_status("draft")
            if flipped.status_code >= 300:
                checks.append(Check("could not set a project to draft with the service key", False,
                                    f"HTTP {flipped.status_code}"))
            else:
                got = _total(_count(client, base, anon_key, "projects"))
                want = expected["projects"] - 1
                checks.append(Check("draft project is hidden from anonymous", got == want,
                                    f"got {got}, wanted {want}"))
        finally:
            restored = set_status("published")
            checks.append(Check("project restored to published", restored.status_code < 300,
                                f"HTTP {restored.status_code}"))
    return checks


def main(argv: list[str] | None = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    paths = [a for a in args if not a.startswith("--")]
    anon_key = os.environ.get("SUPABASE_ANON_KEY") or dotenv_values(".env").get("SUPABASE_ANON_KEY")
    if len(paths) != 1 or not anon_key:
        raise SystemExit(
            "usage: python -m app.seed.verify <portfolio.json> [--toggle-draft]\n"
            "needs SUPABASE_ANON_KEY (the public key) in the environment or backend/.env"
        )
    seed = build_seed(json.loads(Path(paths[0]).read_text()))
    expected = {table: len(rows) for table, rows in seed.items()}
    settings = get_settings()
    toggle = "--toggle-draft" in args
    with httpx2.Client(timeout=30) as client:
        checks = run_checks(
            client,
            settings.supabase_url,
            anon_key,
            expected,
            service_key=settings.supabase_service_role_key.get_secret_value() if toggle else None,
            toggle_slug=seed["projects"][0]["slug"] if toggle else None,
        )
    for check in checks:
        print(f"{'PASS' if check.ok else 'FAIL'}  {check.name}  ({check.detail})")
    return 0 if all(c.ok for c in checks) else 1


if __name__ == "__main__":
    sys.exit(main())
