import logging

import httpx2

from app.config import Settings

log = logging.getLogger("auravine.admin")


async def notify(client: httpx2.AsyncClient, settings: Settings) -> bool:
    """Ask the site to drop its cached content. Best effort: a failure is reported, not raised,
    because the save itself already succeeded."""
    try:
        response = await client.post(
            settings.revalidate_url,
            headers={"Authorization": f"Bearer {settings.revalidate_secret.get_secret_value()}"},
            timeout=3,
        )
    except httpx2.HTTPError as error:
        log.error("revalidate failed: %s", type(error).__name__)
        return False
    if response.status_code != 200:
        log.error("revalidate answered HTTP %s", response.status_code)
        return False
    return True
