from fastapi import FastAPI

from app.routes import health


def create_app() -> FastAPI:
    application = FastAPI(title="Auravine backend")
    application.include_router(health.router)
    return application


app = create_app()
