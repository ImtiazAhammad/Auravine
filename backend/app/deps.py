"""FastAPI dependencies. Tests replace these with fakes through `dependency_overrides`."""

from collections.abc import AsyncIterator, Callable

import httpx2

from app.config import Settings, get_settings
from app.mail import send_notification


def get_settings_dep() -> Settings:
    return get_settings()


async def get_http_client() -> AsyncIterator[httpx2.AsyncClient]:
    async with httpx2.AsyncClient(timeout=10) as client:
        yield client


def get_mailer() -> Callable[[Settings, dict], None]:
    return send_notification
