"""Upsert seed rows into Supabase through its REST API using the service-role key.

    uv run python -m app.seed.load seed/portfolio.json [--dry-run]

Rows are upserted on a stable key, so running it again updates rows and never duplicates them.
"""

import json
import sys
from pathlib import Path

import httpx2

from app.config import Settings, get_settings
from app.seed.mapping import build_seed

UPSERT_KEYS = {
    "projects": "slug",
    "blog_posts": "slug",
    "faqs": "key",
    "tech_items": "key",
    "site_settings": "key",
    "media_assets": "path",
}


def build_requests(
    seed: dict[str, list[dict]], settings: Settings, batch_size: int = 200
) -> list[httpx2.Request]:
    base = settings.supabase_url.rstrip("/")
    key = settings.supabase_service_role_key.get_secret_value()
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates,return=minimal",
    }
    requests = []
    for table, rows in seed.items():
        for start in range(0, len(rows), batch_size):
            url = f"{base}/rest/v1/{table}?on_conflict={UPSERT_KEYS[table]}"
            requests.append(
                httpx2.Request("POST", url, headers=headers, json=rows[start:start + batch_size])
            )
    return requests


def load_seed(
    seed: dict[str, list[dict]], settings: Settings, client: httpx2.Client | None = None
) -> dict[str, int]:
    owned = client is None
    client = client or httpx2.Client(timeout=30)
    sent: dict[str, int] = {}
    try:
        for request in build_requests(seed, settings):
            table = request.url.path.rsplit("/", 1)[-1]
            response = client.send(request)
            if response.status_code >= 400:
                raise RuntimeError(
                    f"{table}: Supabase answered HTTP {response.status_code}: {response.text[:300]}"
                )
            sent[table] = sent.get(table, 0) + len(json.loads(request.content))
    finally:
        if owned:
            client.close()
    return sent


def main(argv: list[str] | None = None) -> dict[str, int]:
    args = sys.argv[1:] if argv is None else argv
    dry_run = "--dry-run" in args
    paths = [a for a in args if not a.startswith("--")]
    if len(paths) != 1:
        raise SystemExit("usage: python -m app.seed.load <portfolio.json> [--dry-run]")
    seed = build_seed(json.loads(Path(paths[0]).read_text()))
    counts = (
        {table: len(rows) for table, rows in seed.items()}
        if dry_run
        else load_seed(seed, get_settings())
    )
    print(("dry run, would send: " if dry_run else "sent: ") + json.dumps(counts))
    return counts


if __name__ == "__main__":
    main()
