import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.config import Settings
from app.main import create_app

REQUIRED = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "REVALIDATE_URL", "REVALIDATE_SECRET"]


@pytest.fixture
def clean_env(monkeypatch):
    for name in REQUIRED:
        monkeypatch.delenv(name, raising=False)


def test_missing_variable_is_named_in_the_error(clean_env):
    with pytest.raises(ValidationError) as err:
        Settings(_env_file=None)
    assert "supabase_service_role_key" in str(err.value)


def test_blank_value_is_rejected(clean_env, monkeypatch):
    for name in REQUIRED:
        monkeypatch.setenv(name, "x")
    monkeypatch.setenv("SUPABASE_URL", "")
    with pytest.raises(ValidationError):
        Settings(_env_file=None)


@pytest.mark.parametrize("name", ["SUPABASE_SERVICE_ROLE_KEY", "REVALIDATE_SECRET"])
def test_blank_secret_is_rejected_and_named(clean_env, monkeypatch, name):
    for required in REQUIRED:
        monkeypatch.setenv(required, "x")
    monkeypatch.setenv(name, "")
    with pytest.raises(ValidationError) as err:
        Settings(_env_file=None)
    assert name.lower() in str(err.value)


def test_secrets_do_not_leak_in_repr(clean_env, monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setenv("REVALIDATE_URL", "https://example.test/revalidate")
    monkeypatch.setenv("SUPABASE_SERVICE_ROLE_KEY", "topsecret-service-key")
    monkeypatch.setenv("REVALIDATE_SECRET", "topsecret-revalidate")
    shown = repr(Settings(_env_file=None)) + str(Settings(_env_file=None))
    assert "topsecret" not in shown


def test_health_works_without_any_environment(clean_env):
    assert TestClient(create_app()).get("/health").status_code == 200
