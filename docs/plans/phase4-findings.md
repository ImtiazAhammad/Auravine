# Phase 4 findings (2026-11-22)

Contact and chat now run in the FastAPI backend. The code is finished and tested, but **three things only the owner can do keep it from working live** (see "Owner steps").

## What was built

- **Migration 5** (`supabase/migrations/20261122000001_contact_chat.sql`): `contact_messages.emailed_at` / `email_error`, `rate_limits` table, `hit_rate_limit()` function. `service_role` only; visitors get nothing. Additive.
- **Backend:** `POST /contact` (validate, honeypot, rate limit, **store first, then email**, mark `emailed_at` or `email_error`) and `POST /chat` (rate limit, prompt from published Supabase content cached 5 min, Groq then Gemini, friendly bilingual 503 with no provider detail). Optional settings, so the app starts and fails closed without credentials.
- **Next.js:** `/api/contact` and `/api/chat` are thin proxies (`src/lib/backend.ts`) that forward the platform-set client IP in `x-client-ip`. `nodemailer` is gone; the chat route holds no AI keys. The contact page has a hidden honeypot field.
- **Tests:** backend 199 (including database tests for the limiter), frontend 76.

## Limits (owner-delegated defaults)

| | per visitor | per visitor per day | everyone per day |
|---|---|---|---|
| Contact | 5 per hour | 20 | 200 |
| Chat | 20 per 10 min | 100 | 500 |

IPv6 visitors are keyed by their /64. If the limiter cannot be reached, both endpoints answer 503 (fail closed).

## Checked

| Check | Result |
|---|---|
| Local wiring (Next.js to FastAPI) | honeypot 200, no salt 503, chat friendly 503, invalid 422 |
| Vercel preview, new code | same results through the service binding; `/api/revalidate` 401 without the secret; migration 5 not applied, so contact and chat answer 503 (fail closed), as designed |
| Whole-branch review | 1 Critical, 3 Important, all fixed with a failing test first (below); 11 minors deferred |

Review fixes: a long replayed assistant turn used to make every later chat request fail (422); IPv6 rotation and one visitor exhausting the day's shared budget; contact could store a message and still show an error when SMTP was slow; malformed content or a failing content read broke chat or retried on every request.

## Owner steps (nothing else is blocking)

1. **Apply migration 5** in the Supabase SQL Editor (paste `supabase/migrations/20261122000001_contact_chat.sql`; "Run with RLS" is fine).
2. **Contact email:** `EMAIL_USER` and `EMAIL_APP_PASSWORD` (a Gmail App Password) as Vercel env vars (Production and Preview).
3. **Chat:** `GROQ_API_KEY` and `GEMINI_API_KEY` as Vercel env vars. After the first real run, confirm the Gemini model: the default is `gemini-2.5-flash`, override with `GEMINI_MODEL` (Google's docs and search results disagree on the current free Flash name; checked 2026-11-22).
4. `RATE_LIMIT_SALT` is already set in Vercel (generated, never printed).

Until then the contact form returns "Service temporarily unavailable" and the chat shows its friendly 503 message; nothing is lost silently.

## Rulings made

- Bad chat shapes return 422 (FastAPI default); the browser only checks `res.ok`.
- Gemini key goes in the `x-goog-api-key` header, not the URL (the old route logged it in URLs); Gemini model is a setting.
- The chat limit for exhausting the shared daily budget is handled by per-visitor daily caps, not by "store but do not email once the shared cap is hit" (revisit if abused).
- Repo checks (`gstack-checks`) were not trusted or run; `tsc`, `npm test`, `pytest`, `ruff` and `next build` were run directly. `npm run lint` is still the broken `next lint`.

## Deferred minors

`_mark` ignores HTTP status; Gemini 2.5 thinking tokens count against `maxOutputTokens` (consider `thinkingBudget: 0`, verify live); `security definer` search path should be empty; housekeeping DELETE not indexed on `window_start`; email regex allows `,;<>` in the local part; honeypot hits are not logged and autofill could trip the field; chat 429 and proxy outage messages are English only; proxy labels non-JSON bodies as JSON; `x-client-ip` is trusted without a shared secret (fine while the backend has no public rewrite); a `#` demo link and `repo_url` handling in the prompt; Gemini turn order (history starts with the assistant greeting) unverified offline; contact limits not pinned by a route test beyond the new one.
