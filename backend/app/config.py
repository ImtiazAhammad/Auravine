from functools import lru_cache

from pydantic import Field, SecretStr
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


@lru_cache
def get_settings() -> Settings:
    return Settings()
