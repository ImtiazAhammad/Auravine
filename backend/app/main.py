import logging

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.admin import routes as admin_routes
from app.routes import chat, contact, health, login

log = logging.getLogger("auravine")


def create_app() -> FastAPI:
    application = FastAPI(title="Auravine backend")
    application.include_router(health.router)
    application.include_router(contact.router)
    application.include_router(chat.router)
    application.include_router(login.router)
    application.include_router(admin_routes.router)

    @application.exception_handler(Exception)
    async def unhandled(request: Request, error: Exception) -> JSONResponse:
        # The traceback goes to the logs only; the caller gets no internals.
        log.error("unhandled error on %s %s", request.method, request.url.path, exc_info=error)
        return JSONResponse({"detail": "Internal server error"}, status_code=500)

    @application.middleware("http")
    async def api_headers(request: Request, call_next):
        response = await call_next(request)
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Content-Type-Options"] = "nosniff"
        return response

    return application


app = create_app()
