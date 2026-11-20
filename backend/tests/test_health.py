from fastapi.testclient import TestClient

from app.main import create_app


def test_health_returns_ok():
    response = TestClient(create_app()).get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_unknown_route_is_404_json():
    response = TestClient(create_app()).get("/nope")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}
