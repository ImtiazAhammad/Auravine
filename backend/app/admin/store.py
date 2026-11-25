"""PostgREST access for the admin API, using the service-role key. Database problems become
short HTTP errors; response bodies from Supabase are never passed to the browser."""

import logging
from typing import Any

import httpx2
from fastapi import HTTPException

from app.config import Settings

log = logging.getLogger("auravine.admin")


class Store:
    def __init__(self, client: httpx2.AsyncClient, settings: Settings):
        key = settings.supabase_service_role_key.get_secret_value()
        self._client = client
        self._base = f"{settings.supabase_url.rstrip('/')}/rest/v1"
        self._headers = {"apikey": key, "Authorization": f"Bearer {key}"}

    async def _call(
        self, method: str, table: str, *, params: dict | None = None, json: Any = None,
        prefer: str | None = None,
    ) -> list[dict]:
        headers = dict(self._headers)
        if prefer:
            headers["Prefer"] = prefer
        try:
            response = await self._client.request(
                method, f"{self._base}/{table}", params=params, json=json, headers=headers
            )
        except httpx2.HTTPError as error:
            log.error("admin %s %s failed: %s", method, table, type(error).__name__)
            raise HTTPException(502, "Database error") from error
        if response.status_code == 409:
            raise HTTPException(409, "That slug or key already exists")
        if response.status_code >= 400:
            log.error("admin %s %s answered HTTP %s", method, table, response.status_code)
            raise HTTPException(502, "Database error")
        try:
            data = response.json()
        except ValueError as error:
            raise HTTPException(502, "Database error") from error
        return data if isinstance(data, list) else []

    async def list(self, table: str, order: str) -> list[dict]:
        return await self._call("GET", table, params={"select": "*", "order": order})

    async def get(self, table: str, column: str, value: str) -> dict:
        rows = await self._call(
            "GET", table, params={"select": "*", column: f"eq.{value}", "limit": "1"}
        )
        if not rows:
            raise HTTPException(404, "Not found")
        return rows[0]

    async def insert(self, table: str, row: dict) -> dict:
        rows = await self._call("POST", table, json=row, prefer="return=representation")
        if not rows:
            raise HTTPException(502, "Database error")
        return rows[0]

    async def update(self, table: str, row_id: str, row: dict) -> dict:
        rows = await self._call(
            "PATCH", table, params={"id": f"eq.{row_id}"}, json=row, prefer="return=representation"
        )
        if not rows:
            raise HTTPException(404, "Not found")
        return rows[0]

    async def delete(self, table: str, row_id: str) -> None:
        rows = await self._call(
            "DELETE", table, params={"id": f"eq.{row_id}"}, prefer="return=representation"
        )
        if not rows:
            raise HTTPException(404, "Not found")

    async def upsert(self, table: str, row: dict, conflict: str) -> dict:
        rows = await self._call(
            "POST", table, params={"on_conflict": conflict}, json=row,
            prefer="resolution=merge-duplicates,return=representation",
        )
        if not rows:
            raise HTTPException(502, "Database error")
        return rows[0]
