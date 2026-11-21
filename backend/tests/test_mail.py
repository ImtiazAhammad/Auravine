from email import message_from_bytes
from unittest.mock import MagicMock, patch

import pytest

from app.config import Settings
from app.mail import MailError, build_message, send_notification


def make_settings(**extra):
    return Settings(
        _env_file=None, supabase_url="https://x.supabase.co", supabase_service_role_key="k",
        revalidate_url="https://r.test", revalidate_secret="s", **extra,
    )


CONFIGURED = {"email_user": "owner@example.com", "email_app_password": "app-pass-123"}
PAYLOAD = {"name": "Ada", "email": "ada@example.com", "subject": "Hello", "message": "Hi there"}


def test_message_goes_to_the_owner_with_reply_to_the_visitor():
    message = build_message(make_settings(**CONFIGURED), PAYLOAD)
    assert message["To"] == "owner@example.com"
    assert message["From"] == "owner@example.com"
    assert message["Reply-To"] == "ada@example.com"
    assert "Hello" in message["Subject"]


def test_header_injection_is_neutralised():
    payload = {**PAYLOAD, "name": "A\r\nBcc: evil@x.y", "subject": "S\nBcc: evil@x.y"}
    message = build_message(make_settings(**CONFIGURED), payload)
    raw = message.as_bytes()
    parsed = message_from_bytes(raw)
    assert parsed["Bcc"] is None
    assert b"\r\nBcc:" not in raw


def test_html_in_the_message_is_escaped():
    payload = {**PAYLOAD, "message": "<script>alert(1)</script>\nline two"}
    html = build_message(make_settings(**CONFIGURED), payload).get_body(("html",)).get_content()
    assert "<script>" not in html
    assert "&lt;script&gt;" in html
    assert "<br />" in html


def test_not_configured_raises_mail_error_without_connecting():
    with patch("app.mail.smtplib.SMTP_SSL") as smtp:
        with pytest.raises(MailError, match="not configured"):
            send_notification(make_settings(), PAYLOAD)
    smtp.assert_not_called()


def test_sends_over_ssl_with_a_timeout_and_login():
    server = MagicMock()
    with patch("app.mail.smtplib.SMTP_SSL") as smtp:
        smtp.return_value.__enter__.return_value = server
        send_notification(make_settings(**CONFIGURED), PAYLOAD)
    smtp.assert_called_once_with("smtp.gmail.com", 465, timeout=10)
    server.login.assert_called_once_with("owner@example.com", "app-pass-123")
    server.send_message.assert_called_once()


def test_smtp_failure_becomes_a_mail_error_that_hides_the_password():
    with patch("app.mail.smtplib.SMTP_SSL") as smtp:
        smtp.return_value.__enter__.return_value.login.side_effect = OSError("bad app-pass-123")
        with pytest.raises(MailError) as error:
            send_notification(make_settings(**CONFIGURED), PAYLOAD)
    assert "app-pass-123" not in str(error.value)
