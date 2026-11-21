from typing import Annotated
from uuid import UUID

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
