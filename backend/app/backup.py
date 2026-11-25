"""Export every content table to JSON files, for a backup the owner keeps off Supabase.

    uv run python -m app.backup ../backups/2026-12-01

Supabase's free plan has no automatic backups. The export contains private data (contact
messages, admin user ids), so it must never be committed or uploaded to a public place:
the repository is public, and so are its Actions artifacts. `backups/` is git-ignored.
"""

import json
import os
import sys
from pathlib import Path

import httpx2

from app.config import Settings, get_settings

# table -> a unique column to order by, so pages never overlap or skip rows.
TABLES = {
    "projects": "id",
    "blog_posts": "id",
    "faqs": "id",
    "tech_items": "id",
    "site_settings": "key",
    "media_assets": "id",
    "contact_messages": "id",
    "admin_profiles": "user_id",
}


def _fetch_table(
    client: httpx2.Client, base: str, headers: dict, table: str, page_size: int
) -> list[dict]:
    rows: list[dict] = []
    offset = 0
    while True:
        response = client.get(
            f"{base}/{table}", headers=headers,
            params={"select": "*", "order": TABLES[table], "limit": page_size, "offset": offset},
        )
        if response.status_code != 200:
            # Never echo the body: it can hold query details.
            raise RuntimeError(f"{table}: Supabase answered HTTP {response.status_code}")
        page = response.json()
        rows.extend(page)
        if len(page) < page_size:
            return rows
        offset += page_size


def export_all(
    settings: Settings, target: Path, client: httpx2.Client | None = None, page_size: int = 1000
) -> dict[str, int]:
    """Write `<table>.json` for every table. A table is written only when it was read in full,
    through a temporary file, so a failure never leaves a truncated backup that looks complete."""
    target.mkdir(parents=True, exist_ok=True)
    key = settings.supabase_service_role_key.get_secret_value()
    headers = {"apikey": key, "Authorization": f"Bearer {key}"}
    base = f"{settings.supabase_url.rstrip('/')}/rest/v1"
    owned = client is None
    client = client or httpx2.Client(timeout=30)
    counts: dict[str, int] = {}
    try:
        for table in TABLES:
            rows = _fetch_table(client, base, headers, table, page_size)
            temporary = target / f".{table}.json.part"
            temporary.write_text(json.dumps(rows, indent=2, ensure_ascii=False))
            os.replace(temporary, target / f"{table}.json")
            counts[table] = len(rows)
    finally:
        if owned:
            client.close()
    return counts


def main(argv: list[str] | None = None) -> dict[str, int]:
    args = sys.argv[1:] if argv is None else argv
    if len(args) != 1:
        raise SystemExit("usage: python -m app.backup <new-or-empty-directory>")
    target = Path(args[0])
    if target.exists() and any(target.iterdir()):
        raise SystemExit(f"{target} is not empty; pick a new directory (one per backup)")
    counts = export_all(get_settings(), target)
    for table, count in counts.items():
        print(f"{table}: {count} rows")
    return counts


if __name__ == "__main__":
    main()
