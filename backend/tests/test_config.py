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


def test_missing_variable_error_does_not_leak_other_secrets(clean_env, monkeypatch):
    monkeypatch.setenv("SUPABASE_URL", "https://example.supabase.co")
    monkeypatch.setenv("REVALIDATE_URL", "https://example.test/revalidate")
    monkeypatch.setenv("REVALIDATE_SECRET", "TOPSECRET-REVALIDATE")
    with pytest.raises(ValidationError) as err:
        Settings(_env_file=None)
    assert "supabase_service_role_key" in str(err.value)
    assert "TOPSECRET" not in str(err.value)


@pytest.mark.parametrize("name", ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "REVALIDATE_SECRET"])
def test_whitespace_only_value_is_rejected(clean_env, monkeypatch, name):
    for required in REQUIRED:
        monkeypatch.setenv(required, "x")
    monkeypatch.setenv(name, "   ")
    with pytest.raises(ValidationError) as err:
        Settings(_env_file=None)
    assert name.lower() in str(err.value)


OPTIONAL = ["EMAIL_USER", "EMAIL_APP_PASSWORD", "GROQ_API_KEY", "GEMINI_API_KEY", "RATE_LIMIT_SALT"]


def _base_env(monkeypatch):
    for name in REQUIRED:
        monkeypatch.setenv(name, "x")
    for name in OPTIONAL:
        monkeypatch.delenv(name, raising=False)


def test_optional_settings_default_to_none(clean_env, monkeypatch):
    _base_env(monkeypatch)
    settings = Settings(_env_file=None)
    assert settings.email_user is None
    assert settings.email_app_password is None
    assert settings.groq_api_key is None
    assert settings.gemini_api_key is None
    assert settings.rate_limit_salt is None


def test_blank_optional_values_count_as_unset(clean_env, monkeypatch):
    _base_env(monkeypatch)
    for name in OPTIONAL:
        monkeypatch.setenv(name, "   ")
    settings = Settings(_env_file=None)
    assert settings.email_user is None and settings.groq_api_key is None


def test_optional_secrets_do_not_leak_in_repr(clean_env, monkeypatch):
    _base_env(monkeypatch)
    monkeypatch.setenv("EMAIL_APP_PASSWORD", "mail-secret-1")
    monkeypatch.setenv("GROQ_API_KEY", "groq-secret-2")
    monkeypatch.setenv("GEMINI_API_KEY", "gemini-secret-3")
    monkeypatch.setenv("RATE_LIMIT_SALT", "salt-secret-4")
    shown = repr(Settings(_env_file=None)) + str(Settings(_env_file=None))
    for secret in ("mail-secret-1", "groq-secret-2", "gemini-secret-3", "salt-secret-4"):
        assert secret not in shown
