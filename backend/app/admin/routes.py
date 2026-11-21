import logging
import re
from datetime import UTC, datetime
from typing import Annotated
from uuid import UUID, uuid4

import httpx2
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, ValidationError

from app.admin import schemas
from app.admin.revalidate import notify
from app.admin.store import Store
from app.auth import AdminUser, require_admin
from app.config import Settings
from app.deps import get_http_client, get_settings_dep

log = logging.getLogger("auravine.admin")
router = APIRouter(prefix="/admin", dependencies=[Depends(require_admin)])

Client = Annotated[httpx2.AsyncClient, Depends(get_http_client)]
Config = Annotated[Settings, Depends(get_settings_dep)]


@router.get("/me")
async def me(admin: Annotated[AdminUser, Depends(require_admin)]):
    return {"id": admin.id, "email": admin.email}


def _resource(path: str, table: str, schema: type[BaseModel], order: str) -> None:
    """Register list/get/create/update/delete for one table."""

    @router.get(f"/{path}", name=f"list_{table}")
    async def list_items(client: Client, settings: Config):
        return {"items": await Store(client, settings).list(table, order)}

    @router.get(f"/{path}/{{item_id}}", name=f"get_{table}")
    async def get_item(item_id: UUID, client: Client, settings: Config):
        return {"item": await Store(client, settings).get(table, "id", str(item_id))}

    @router.post(f"/{path}", status_code=201, name=f"create_{table}")
    async def create_item(body: schema, client: Client, settings: Config):  # type: ignore[valid-type]
        item = await Store(client, settings).insert(table, schemas.dump(body))
        return {"item": item, "revalidated": await notify(client, settings)}

    @router.put(f"/{path}/{{item_id}}", name=f"update_{table}")
    async def update_item(  # type: ignore[valid-type]
        item_id: UUID, body: schema, client: Client, settings: Config
    ):
        item = await Store(client, settings).update(table, str(item_id), schemas.dump(body))
        return {"item": item, "revalidated": await notify(client, settings)}

    @router.delete(f"/{path}/{{item_id}}", name=f"delete_{table}")
    async def delete_item(item_id: UUID, client: Client, settings: Config):
        await Store(client, settings).delete(table, str(item_id))
        return {"ok": True, "revalidated": await notify(client, settings)}


_resource("projects", "projects", schemas.ProjectIn, "sort_order.asc,slug.asc")
_resource("blog-posts", "blog_posts", schemas.BlogPostIn, "sort_order.asc,slug.asc")
_resource("faqs", "faqs", schemas.FaqIn, "sort_order.asc,key.asc")
_resource("tech-items", "tech_items", schemas.TechItemIn, "sort_order.asc,key.asc")


@router.get("/settings")
async def get_settings(client: Client, settings: Config):
    rows = await Store(client, settings).list("site_settings", "key.asc")
    return {"items": {row["key"]: row["value"] for row in rows}}


@router.put("/settings/{key}")
async def put_setting(key: str, body: dict, client: Client, settings: Config):
    model = schemas.SETTINGS.get(key)
    if model is None:
        raise HTTPException(404, "Unknown setting")
    try:
        parsed = model.model_validate(body)
    except ValidationError as error:
        detail = error.errors(include_url=False, include_input=False, include_context=False)
        return JSONResponse({"detail": detail}, 422)
    item = await Store(client, settings).upsert(
        "site_settings", {"key": key, "value": schemas.dump(parsed)["value"]}, "key"
    )
    return {"item": item, "revalidated": await notify(client, settings)}


# ---------------------------------------------------------------- contact messages
@router.get("/messages")
async def list_messages(client: Client, settings: Config):
    return {"items": await Store(client, settings).list("contact_messages", "created_at.desc")}


@router.patch("/messages/{item_id}")
async def mark_message(item_id: UUID, body: schemas.MessagePatch, client: Client, settings: Config):
    item = await Store(client, settings).update(
        "contact_messages", str(item_id), {"handled": body.handled}
    )
    return {"item": item}


# ---------------------------------------------------------------- media
def _public_url(settings: Settings, path: str) -> str:
    if path.startswith("/"):
        return path  # a file that lives in the repo's public/ folder
    return f"{settings.supabase_url.rstrip('/')}/storage/v1/object/public/media/{path}"


def _safe_stem(filename: str) -> str:
    stem = filename.replace("\\", "/").rsplit("/", 1)[-1].rsplit(".", 1)[0].lower()
    return re.sub(r"[^a-z0-9]+", "-", stem).strip("-")[:40] or "image"


@router.get("/media")
async def list_media(client: Client, settings: Config):
    rows = await Store(client, settings).list("media_assets", "created_at.desc")
    return {"items": [{**r, "public_url": _public_url(settings, r["path"])} for r in rows]}


@router.post("/media/sign")
async def sign_upload(body: schemas.SignRequest, client: Client, settings: Config):
    path = (
        f"uploads/{datetime.now(UTC).year}/{uuid4().hex[:12]}-{_safe_stem(body.filename)}"
        f".{schemas.IMAGE_TYPES[body.content_type]}"
    )
    key = settings.supabase_service_role_key.get_secret_value()
    base = settings.supabase_url.rstrip("/")
    try:
        response = await client.post(
            f"{base}/storage/v1/object/upload/sign/media/{path}",
            headers={"apikey": key, "Authorization": f"Bearer {key}"},
            json={},
        )
        signed = response.json()["url"] if response.status_code == 200 else None
    except (httpx2.HTTPError, ValueError, KeyError, TypeError) as error:
        log.error("storage signing failed: %s", type(error).__name__)
        signed = None
    if not signed or not isinstance(signed, str):
        raise HTTPException(502, "Storage error")
    return {
        "path": path,
        "upload_url": f"{base}/storage/v1{signed}",
        "public_url": _public_url(settings, path),
    }


@router.post("/media", status_code=201)
async def register_media(body: schemas.MediaIn, client: Client, settings: Config):
    row = {
        "path": body.path, "kind": "image", "source": "storage",
        "alt": body.alt.model_dump(mode="json") if body.alt else None,
        "width": body.width, "height": body.height,
    }
    item = await Store(client, settings).insert("media_assets", row)
    return {"item": {**item, "public_url": _public_url(settings, item["path"])}}
