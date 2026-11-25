from fastapi import FastAPI

from app.admin import routes as admin_routes
from app.routes import chat, contact, health


def create_app() -> FastAPI:
    application = FastAPI(title="Auravine backend")
    application.include_router(health.router)
    application.include_router(contact.router)
    application.include_router(chat.router)
    application.include_router(admin_routes.router)
    return application


app = create_app()
