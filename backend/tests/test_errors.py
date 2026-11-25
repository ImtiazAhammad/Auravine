from fastapi.testclient import TestClient

from app.main import create_app


def boom_app():
    application = create_app()

    @application.get("/boom")
    def boom():
        raise RuntimeError("db password is hunter2")

    return application


def test_unhandled_error_is_a_generic_500_without_details():
    client = TestClient(boom_app(), raise_server_exceptions=False)
    response = client.get("/boom")
    assert response.status_code == 500
    assert response.json() == {"detail": "Internal server error"}
    assert "hunter2" not in response.text


def test_unhandled_error_is_logged_with_its_traceback(caplog):
    client = TestClient(boom_app(), raise_server_exceptions=False)
    with caplog.at_level("ERROR", logger="auravine"):
        client.get("/boom")
    assert any("/boom" in r.getMessage() and r.exc_info for r in caplog.records)


def test_api_answers_are_not_cacheable_or_sniffable():
    response = TestClient(create_app()).get("/health")
    assert response.headers["cache-control"] == "no-store"
    assert response.headers["x-content-type-options"] == "nosniff"
