# Contact and Chat in Python (Phase 4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (Native, inline). Steps use checkbox (`- [ ]`) syntax.

**Goal:** The contact form and the chatbot run in the FastAPI backend: messages are stored first and emailed second, both endpoints are rate limited with a Supabase-backed counter, and LLM keys and the mail password live only in the Python service.

**Architecture:** `POST /contact` and `POST /chat` in FastAPI (private Vercel service). The existing Next.js routes `/api/contact` and `/api/chat` become thin proxies to `BACKEND_INTERNAL_URL` that forward the visitor's IP and keep the response shapes the browser code already expects. Rate limits call a Postgres function (`hit_rate_limit`) through PostgREST RPC with the service-role key and fail closed.

**Tech Stack:** FastAPI, pydantic, httpx2 (MockTransport in tests), `smtplib`, Postgres (migration 5), Next.js route handlers, vitest.

**Spec:** `docs/BACKEND-PLAN.md` (Phase 4; rate limiting and email rows in Risks), `docs/plans/phase3-findings.md`. Existing behaviour: `src/app/api/contact/route.ts`, `src/app/api/chat/route.ts` (browser contracts: contact `{message}` or `{error}`; chat `{reply, provider}` or `{error}`).

## Global Constraints

- **Secrets stay in env, never in git, logs or responses.** Needed in the Python service environment: `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `GROQ_API_KEY`, `GEMINI_API_KEY`, `RATE_LIMIT_SALT`. None of the first four exist in Vercel today (checked with `vercel env ls`); the owner supplies them, the assistant only checks names.
- **Optional settings.** The new settings are optional so `/health` and the existing app still start without them; the endpoint that needs a missing one answers 503 with a generic message.
- **Store first, then email.** A valid contact message is inserted into `contact_messages` before any email attempt. Email failure never loses the message and never shows the visitor an error if the insert worked.
- **Fail closed:** if the rate-limit check itself fails, contact and chat return 503.
- **No provider detail to the browser.** Provider errors are logged server-side only.
- **Every new table or function needs explicit grants** (Phase 2 rule): `service_role` only, RLS on, nothing for `anon`/`authenticated`.
- Limits (owner-delegated defaults): contact 5/hour per visitor and 200/day overall; chat 20 per 10 minutes per visitor and 500/day overall. Visitor key is `sha256(ip + RATE_LIMIT_SALT)`; raw IPs are never stored.
- Contact validation: name 1-100, email format, subject at most 200, message 1-5000, hidden honeypot field `website` must be empty (a filled honeypot returns success without storing).
- Chat: at most 20 messages of at most 2000 characters, roles `user`/`assistant`; Groq `llama-3.1-8b-instant` first, then Gemini (current free Flash model, name checked against Google's docs at implementation time); 15 s timeout per provider.
- Migrations only add; no destructive change to existing tables.

## Review Focus

1. **Email down or misconfigured:** the visitor still gets success once the row is stored; `emailed_at` stays null and `email_error` records a short reason (never the password). (Task 3)
2. **Rate-limit store down:** 503, not unlimited use. (Task 2)
3. **Provider failure details never reach the browser** (the old route leaked them in `details`). (Task 4)
4. **Spoofed `x-forwarded-for`:** the Next.js proxy forwards only the platform-set client IP; the backend never trusts a client-supplied header directly. (Task 5)
5. **Header/HTML injection in the email** (newlines in name/subject, HTML in message). (Task 3)

---

## File Structure

| File | Responsibility |
|---|---|
| `supabase/migrations/20261122000001_contact_chat.sql` | `contact_messages.emailed_at/email_error`, `rate_limits` table, `hit_rate_limit()` function, grants |
| `backend/tests/db/test_rate_limit.py` | DB tests for the function and grants |
| `backend/app/config.py` | Optional settings: email, LLM keys, salt |
| `backend/app/ratelimit.py` | `visitor_key(ip, salt)`, `check(bucket, key, window, limit)` via RPC, fail closed |
| `backend/app/routes/contact.py` | `POST /contact` |
| `backend/app/mail.py` | `send_notification(message)` with `smtplib`, safe headers, timeout |
| `backend/app/routes/chat.py`, `backend/app/llm.py`, `backend/app/prompt.py` | `POST /chat`, provider calls, prompt from published content (5 min cache) |
| `src/app/api/contact/route.ts`, `src/app/api/chat/route.ts` | Proxies to the backend |

---

### Task 1: Migration 5, grants and DB tests

**Files:** Create `supabase/migrations/20261122000001_contact_chat.sql`, `backend/tests/db/test_rate_limit.py`.

**Interfaces — Produces:** `public.hit_rate_limit(p_bucket text, p_key text, p_window_seconds int, p_max int) returns boolean` (true = allowed), `security definer`, `set search_path = public`, executable by `service_role` only; `rate_limits(bucket, key, window_start, count)` primary key `(bucket, key, window_start)`; `contact_messages.emailed_at timestamptz null`, `contact_messages.email_error text null`.

- [ ] **Step 1: Write failing DB tests** (use the existing `tests/db/conftest.py` fixtures): first `p_max` calls in one window return true and the next returns false; a different key or bucket is independent; a call after the window rolls over is allowed again (use a 1-second window and `pg_sleep`); rows older than 2 days are deleted by a call; `anon` and `authenticated` cannot execute the function or select `rate_limits`; `service_role` can; `contact_messages` has the two new nullable columns and `anon` still cannot read it.
- [ ] **Step 2:** `cd backend && uv run pytest tests/db/test_rate_limit.py -q` — Expected: FAIL.
- [ ] **Step 3: Write the migration.** Atomic `insert ... on conflict do update set count = rate_limits.count + 1 returning count`, window start is `to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds)`, opportunistic `delete where window_start < now() - interval '2 days'`, `revoke all ... from public, anon, authenticated`, `grant execute ... to service_role`, enable RLS on `rate_limits`, `grant select, insert, update, delete on rate_limits to service_role`.
- [ ] **Step 4:** run the new tests and the full `uv run pytest -q` — Expected: PASS.
- [ ] **Step 5: Commit** `feat(db): rate limit counter and contact email status columns`.

### Task 2: Settings and rate-limit client

**Files:** Modify `backend/app/config.py`; create `backend/app/ratelimit.py`, `backend/tests/test_ratelimit.py`; modify `backend/tests/test_config.py`.

**Interfaces — Produces:** `Settings` gains optional `email_user: str | None`, `email_app_password: SecretStr | None`, `groq_api_key: SecretStr | None`, `gemini_api_key: SecretStr | None`, `rate_limit_salt: SecretStr | None`; `visitor_key(ip: str, salt: str) -> str`; `async def allowed(client, settings, bucket: str, key: str, window_seconds: int, max_calls: int) -> bool` raising `RateLimitUnavailable` on any transport or HTTP failure.

- [ ] **Step 1: Failing tests:** settings load without the new variables and with them (blank values count as unset); secrets never appear in `repr`; `visitor_key` is deterministic, differs per salt, is 64 hex chars and does not contain the IP; `allowed` posts to `/rest/v1/rpc/hit_rate_limit` with the service-role headers and the four parameters and returns the boolean; a 500, a timeout and a non-boolean body each raise `RateLimitUnavailable` (MockTransport).
- [ ] **Step 2:** run — Expected: FAIL. **Step 3:** implement. **Step 4:** run full backend suite and `uv run ruff check .` — Expected: PASS.
- [ ] **Step 5: Commit** `feat(backend): optional settings and rate-limit client`.

### Task 3: `POST /contact` and mail

**Files:** Create `backend/app/mail.py`, `backend/app/routes/contact.py`, `backend/tests/test_contact.py`, `backend/tests/test_mail.py`; modify `backend/app/main.py` (register router).

**Interfaces — Consumes:** Task 2. **Produces:** `POST /contact` body `{name, email, subject?, message, website?, locale?}` with header `x-client-ip` (set by the Next.js proxy); `200 {"message": "Message received"}`; `422` invalid; `429 {"error": ...}` limited; `503 {"error": ...}` when the rate limiter is unavailable or both store and email fail. `send_notification(settings, message: dict) -> None` raises `MailError`.

- [ ] **Step 1: Failing tests** (FastAPI `TestClient`, dependency-injected httpx client and mail sender): valid message inserts into `contact_messages` then calls the sender then patches `emailed_at`; honeypot filled returns 200 and does nothing; each validation bound (101-char name, bad email, 201-char subject, 5001-char message, empty message) returns 422; 6th call within an hour returns 429 and stores nothing; limiter unavailable returns 503 and stores nothing; **Review Focus 1:** sender raises, insert OK, response is 200 and the row is patched with `email_error` (short reason, no secret); insert fails but email works returns 200; both fail returns 503; **Review Focus 5:** mail test with `name = "A\r\nBcc: x@y.z"` yields no extra header and a message body with `<script>` is escaped in the HTML part; mail without configured credentials raises `MailError("not configured")`.
- [ ] **Step 2:** run — Expected: FAIL. **Step 3:** implement (`smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)` run in `anyio.to_thread`; build with `email.message.EmailMessage`, header values stripped of CR/LF; `reply_to` set to the visitor email). **Step 4:** run backend suite + ruff — Expected: PASS.
- [ ] **Step 5: Commit** `feat(backend): POST /contact stores then emails`.

### Task 4: `POST /chat`

**Files:** Create `backend/app/llm.py`, `backend/app/prompt.py`, `backend/app/routes/chat.py`, tests `backend/tests/test_chat.py`, `backend/tests/test_llm.py`, `backend/tests/test_prompt.py`; modify `backend/app/main.py`.

**Interfaces — Consumes:** Task 2. **Produces:** `POST /chat` body `{messages: [{role, content}], locale?}` with header `x-client-ip`; `200 {"reply", "provider": "groq"|"gemini"}`; `400` bad shape; `429`; `503 {"error": "<friendly bilingual message pointing to the contact page>"}`. `build_system_prompt(content: dict, locale: str) -> str`; `async def complete(settings, client, messages, system) -> tuple[str, str]` trying Groq then Gemini.

- [ ] **Step 1: Failing tests:** more than 20 messages keeps the last 20; a 2001-character message, a bad role or an empty list returns 400; Groq success returns provider `groq` and sends the system prompt first; Groq 500 then Gemini success returns `gemini`; **Review Focus 3:** both fail returns 503 whose body contains neither provider text nor the words `groq`/`gemini` and the keys appear nowhere in the response or captured logs; a provider timeout counts as failure; missing keys skip that provider (both missing returns 503); limit bucket `chat` 20 per 600 s per visitor and 500 per day overall; prompt includes published project titles and descriptions and the company name, omits drafts and `#` links, and is cached for 300 s (second call within the window makes no Supabase request).
- [ ] **Step 2:** run — Expected: FAIL. **Step 3:** implement with `httpx2`; Gemini endpoint `generateContent` with the current free Flash model (confirm name in Google's docs; it must be one setting constant). **Step 4:** run suite + ruff — Expected: PASS.
- [ ] **Step 5: Commit** `feat(backend): POST /chat with Groq then Gemini`.

### Task 5: Next.js proxies

**Files:** Modify `src/app/api/contact/route.ts`, `src/app/api/chat/route.ts`; create `src/lib/backend.ts`, `src/lib/backend.test.ts`, route tests; remove `nodemailer` and `@types/nodemailer` from `package.json`.

**Interfaces — Produces:** `callBackend(path: string, init: { body: unknown; ip: string }): Promise<Response>` using `process.env.BACKEND_INTERNAL_URL` (throws a clear error when unset); `clientIp(request: Request): string` takes the last entry of `x-forwarded-for` that Vercel appends (falls back to `x-real-ip`, then `'unknown'`).

- [ ] **Step 1: Failing tests:** `callBackend` posts JSON to `${BACKEND_INTERNAL_URL}${path}` with `x-client-ip`; `clientIp` ignores a client-supplied leading `x-forwarded-for` value (**Review Focus 4**); contact route passes through status and `{message}`/`{error}` bodies; a backend network error becomes a generic 503 `{error}`; the chat route returns `{reply, provider}` unchanged; the chat `GET` health route no longer reveals which providers are configured.
- [ ] **Step 2:** run — Expected: FAIL. **Step 3:** implement; delete the old prompt/provider/mail code from both routes. **Step 4:** `npm test`, `npx tsc --noEmit`, `npm run build` — Expected: PASS and the build lists both routes.
- [ ] **Step 5: Commit** `refactor: contact and chat routes proxy to the Python backend`.

### Task 6: Local end-to-end, preview deploy, docs

- [ ] **Step 1: Local end-to-end** with `npm run dev:api` plus `npm run dev` and `BACKEND_INTERNAL_URL=http://localhost:8000`: contact form with no mail credentials stores a row (verify through the service-role client, then delete only that test row) and returns success; chat without keys returns the friendly 503 and no provider text.
- [ ] **Step 2: Ask the owner for exactly these (names only; values go straight into Vercel by the owner or via a piped CLI, never through chat):** apply migration 5 in the SQL Editor (the assistant copies it to the clipboard), `EMAIL_USER`, `EMAIL_APP_PASSWORD` (Gmail app password), `GROQ_API_KEY`, `GEMINI_API_KEY`. The assistant generates `RATE_LIMIT_SALT` itself and pipes it into Vercel without printing it.
- [ ] **Step 3: Preview deploy** after the secrets exist: contact form sends one real email to the owner; chat answers; hammer the limit (6th contact and 21st chat call return 429); provider failure drill by setting a bad Groq key on Preview only.
- [ ] **Step 4:** write `docs/plans/phase4-findings.md`, update `docs/BACKEND-PLAN.md` status. **Commit** `docs: phase 4 findings`.

---

## Self-review

- **Spec coverage:** BACKEND-PLAN Phase 4 (store in `contact_messages`, then email; chat in FastAPI; rate limiting; remove old Node routes) maps to Tasks 1-5; the rate-limit decision recorded in its Risks table is Postgres-backed (Task 1).
- **Type consistency:** `visitor_key`, `allowed`, `RateLimitUnavailable`, `send_notification`, `MailError`, `build_system_prompt`, `complete`, `callBackend`, `clientIp`, header `x-client-ip` and bucket names `contact`/`chat` are used identically across tasks.
- **Human steps are isolated in Task 6, Step 2:** one migration paste and four secret values. Everything before that runs on tests and mocks.
- **Not in this phase:** admin (Phase 5), keep-alive and backups (Phase 6), the unpublished-project fallback edge case (decide before Phase 7).
