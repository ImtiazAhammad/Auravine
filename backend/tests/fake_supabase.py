"""A tiny in-memory stand-in for the parts of Supabase the admin API uses (Auth user lookup,
PostgREST tables, storage signing), for MockTransport. Records every request."""

import json
import uuid

import httpx2

ADMIN_ID = "11111111-1111-1111-1111-111111111111"
OTHER_ID = "22222222-2222-2222-2222-222222222222"
ADMIN_TOKEN = "admin-token"
OTHER_TOKEN = "signed-up-user-token"

UNIQUE = {
    "projects": "slug", "blog_posts": "slug", "faqs": "key", "tech_items": "key",
    "site_settings": "key", "media_assets": "path",
}


class FakeSupabase:
    def __init__(self):
        self.tables: dict[str, list[dict]] = {name: [] for name in UNIQUE}
        self.tables["contact_messages"] = []
        self.tables["admin_profiles"] = [{"user_id": ADMIN_ID, "role": "admin"}]
        self.requests: list[httpx2.Request] = []
        self.revalidate_calls: list[httpx2.Request] = []
        self.revalidate_status = 200
        self.revalidate_error = False
        self.fail_tables: set[str] = set()
        self.sign_status = 200

    # ------------------------------------------------------------------ helpers
    def db_calls(self) -> list[httpx2.Request]:
        return [r for r in self.requests if r.url.path.startswith("/rest/v1/")
                and not r.url.path.endswith("admin_profiles")]

    def add(self, table: str, **row) -> dict:
        row.setdefault("id", str(uuid.uuid4()))
        self.tables[table].append(row)
        return row

    @staticmethod
    def _filters(request: httpx2.Request) -> dict[str, str]:
        reserved = {"select", "order", "limit", "on_conflict"}
        return {k: v[3:] for k, v in request.url.params.items()
                if k not in reserved and v.startswith("eq.")}

    def _match(self, table: str, request: httpx2.Request) -> list[dict]:
        filters = self._filters(request)
        return [r for r in self.tables[table] if all(str(r.get(k)) == v for k, v in filters.items())]

    # ------------------------------------------------------------------ transport
    def handler(self, request: httpx2.Request) -> httpx2.Response:
        self.requests.append(request)
        path = request.url.path
        if request.url.host == "site.test":  # the revalidate endpoint
            self.revalidate_calls.append(request)
            if self.revalidate_error:
                raise httpx2.ConnectTimeout("slow")
            return httpx2.Response(self.revalidate_status, json={"revalidated": True})
        if path == "/auth/v1/user":
            token = request.headers.get("authorization", "").removeprefix("Bearer ")
            users = {ADMIN_TOKEN: ADMIN_ID, OTHER_TOKEN: OTHER_ID}
            if token not in users:
                return httpx2.Response(401, json={"msg": "invalid"})
            return httpx2.Response(200, json={"id": users[token], "email": f"{token}@example.com"})
        if path.startswith("/storage/v1/object/upload/sign/"):
            if self.sign_status != 200:
                return httpx2.Response(self.sign_status, text="nope")
            return httpx2.Response(200, json={
                "url": f"/object/upload/sign/{path.split('/sign/', 1)[1]}?token=signed-token",
                "token": "signed-token",
            })
        if path.startswith("/rest/v1/"):
            return self._rest(request, path.removeprefix("/rest/v1/"))
        return httpx2.Response(404)

    def _rest(self, request: httpx2.Request, table: str) -> httpx2.Response:
        if table in self.fail_tables:
            return httpx2.Response(500, text="boom")
        if table not in self.tables:
            return httpx2.Response(404, json={"message": "no such table"})
        rows = self.tables[table]
        unique = UNIQUE.get(table)
        method = request.method
        if method == "GET":
            return httpx2.Response(200, json=self._match(table, request))
        body = json.loads(request.content) if request.content else None
        if method == "POST":
            upsert = "merge-duplicates" in request.headers.get("prefer", "")
            incoming = body if isinstance(body, list) else [body]
            saved = []
            for row in incoming:
                existing = next((r for r in rows if unique and r.get(unique) == row.get(unique)), None)
                if existing and not upsert:
                    return httpx2.Response(409, json={"code": "23505", "message": "duplicate"})
                if existing:
                    existing.update(row)
                    saved.append(existing)
                else:
                    row = {"id": str(uuid.uuid4()), **row}
                    rows.append(row)
                    saved.append(row)
            return httpx2.Response(201, json=saved)
        matches = self._match(table, request)
        if method == "PATCH":
            for row in matches:
                if unique and unique in body and any(
                    o is not row and o.get(unique) == body[unique] for o in rows
                ):
                    return httpx2.Response(409, json={"code": "23505"})
                row.update(body)
            return httpx2.Response(200, json=matches)
        if method == "DELETE":
            for row in matches:
                rows.remove(row)
            return httpx2.Response(200, json=matches)
        return httpx2.Response(405)
