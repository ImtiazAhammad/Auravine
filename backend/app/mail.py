"""Owner notification email over Gmail SMTP. Kept behind `send_notification` so another
provider can replace it without touching the routes."""

import html
import smtplib
from email.message import EmailMessage

from app.config import Settings


class MailError(Exception):
    """Sending failed. The message is short and never contains credentials."""


def _line(value: str) -> str:
    """One header-safe line: no CR or LF."""
    return " ".join(value.replace("\r", " ").replace("\n", " ").split())


def build_message(settings: Settings, payload: dict) -> EmailMessage:
    if not settings.email_user or settings.email_app_password is None:
        raise MailError("email is not configured")
    name, email = _line(payload["name"]), _line(payload["email"])
    subject = _line(payload.get("subject") or "No subject")
    body = payload["message"]

    message = EmailMessage()
    message["From"] = settings.email_user
    message["To"] = settings.email_user
    message["Reply-To"] = email
    message["Subject"] = f"New message: {subject}"[:200]
    message.set_content(f"From: {name} <{email}>\n\n{body}")
    safe_body = html.escape(body).replace("\n", "<br />")
    message.add_alternative(
        '<div style="font-family:sans-serif;padding:20px;border:1px solid #eee;border-radius:8px">'
        f"<h3>New message from your website</h3><p><strong>Name:</strong> {html.escape(name)}</p>"
        f"<p><strong>Email:</strong> {html.escape(email)}</p><hr />"
        f'<p style="white-space:pre-wrap">{safe_body}</p></div>',
        subtype="html",
    )
    return message


def send_notification(settings: Settings, payload: dict) -> None:
    """Blocking; call it from a worker thread. Raises MailError."""
    message = build_message(settings, payload)
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=10) as server:
            server.login(settings.email_user, settings.email_app_password.get_secret_value())
            server.send_message(message)
    except (OSError, smtplib.SMTPException) as error:
        raise MailError(f"SMTP failed: {type(error).__name__}") from error
