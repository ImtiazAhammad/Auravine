from functools import lru_cache

from pydantic import Field, SecretStr, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration. Every value is required and must be non-blank."""

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        # A "missing" error would otherwise echo the whole raw input, secrets included, into logs.
        hide_input_in_errors=True,
        # A stray space pasted into an env UI must not count as a value.
        str_strip_whitespace=True,
    )

    supabase_url: str = Field(min_length=1)
    supabase_service_role_key: SecretStr = Field(min_length=1)
    revalidate_url: str = Field(min_length=1)
    revalidate_secret: SecretStr = Field(min_length=1)

    # Optional: an endpoint that needs a missing one answers 503; the app still starts.
    email_user: str | None = None
    email_app_password: SecretStr | None = None
    groq_api_key: SecretStr | None = None
    gemini_api_key: SecretStr | None = None
    rate_limit_salt: SecretStr | None = None
    groq_model: str = "llama-3.1-8b-instant"
    # Confirm the current free Flash model name against Google's docs; override with GEMINI_MODEL.
    gemini_model: str = "gemini-2.5-flash"

    @field_validator(
        "email_user", "email_app_password", "groq_api_key", "gemini_api_key", "rate_limit_salt",
        mode="before",
    )
    @classmethod
    def _blank_is_unset(cls, value):
        return None if isinstance(value, str) and not value.strip() else value


@lru_cache
def get_settings() -> Settings:
    return Settings()
