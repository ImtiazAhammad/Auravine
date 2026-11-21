from fastapi import FastAPI

from app.routes import contact, health


def create_app() -> FastAPI:
    application = FastAPI(title="Auravine backend")
    application.include_router(health.router)
    application.include_router(contact.router)
    return application


app = create_app()
