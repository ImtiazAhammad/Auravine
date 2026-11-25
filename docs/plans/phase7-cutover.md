# Phase 7: cutover runbook

Phase 7 has two parts. Part A turns the database on in Production and is reversible in one minute. Part B deletes the old static data and is not, so it waits until Part A has run cleanly for a while. Nothing in this file has been done yet.

## Before Part A (all owner steps; the assistant cannot do them)

- [ ] Migrations 5 and 6 applied in the Supabase SQL Editor (`20261122000001_contact_chat.sql`, `20261122000002_media_bucket.sql`).
- [ ] Auth: "Allow new users to sign up" is off.
- [ ] Vercel has `SUPABASE_SERVICE_ROLE_KEY` (the `sb_secret_…` key), `RATE_LIMIT_SALT`, `SUPABASE_ANON_KEY`, `REVALIDATE_SECRET`, `REVALIDATE_URL`.
- [ ] PR #10 (admin) and #11 (hardening) are merged and Production is deployed from `main`.
- [ ] You can sign in at `/admin/login`, edit one FAQ, and see it on the Preview site (Preview already uses `CONTENT_SOURCE=supabase`).
- [ ] A first backup exists (`cd backend && uv run python -m app.backup ../backups/<date>`).
- [ ] Optional now, needed for contact and chat: `EMAIL_USER`, `EMAIL_APP_PASSWORD`, `GROQ_API_KEY`, `GEMINI_API_KEY`.

## Part A: turn the database on

1. Run the parity check against the real database: `npm run verify:parity` (needs the Supabase values in `.env.local`; expect 21 of 21 pages equal to the static run).
2. In Vercel, set Production `CONTENT_SOURCE=supabase` and redeploy Production.
3. Check: home, `/projects`, a project page, `/blog`, a blog post, `/skills`, in English and Bangla. Edit one FAQ in the admin and confirm the public page changes within seconds.
4. **Rollback:** set Production `CONTENT_SOURCE=static` and redeploy. Nothing is lost; the data stays in Supabase.

## Part B: delete the static data (a later, separate PR)

Do this only after Part A has run for a few weeks without a fallback. Check the Vercel logs for "falling back" lines from `src/lib/content`: if there are none, the static copy is not being used.

Settle one design question first (from `phase5-findings.md`): today a cold server during a database outage falls back to the static data. Without it, the choices are (a) let the page error, or (b) let revalidation fail so Next keeps serving the cached page. Choose (b): on a failed read, throw so the Data Cache keeps the stale entry, and show a plain error only when nothing is cached.

Then, in one PR:

- Delete `src/data/portfolio.ts` and `src/lib/content/static.ts`, and remove the fallbacks in `src/lib/content/index.ts` and the `CONTENT_SOURCE` switch.
- Keep a copy of `portfolio.ts` as `backend/seed/portfolio.json` (already exported; it is git-ignored) only if you may want to reseed; otherwise delete `scripts/export-portfolio.ts`, `scripts/verify-content-parity.ts`, `backend/app/seed/` and their tests.
- Update `README.md` ("Updating Content") and `docs/BACKEND-PLAN.md`, and note in `DESIGN.md` that content is no longer in code.
- Remove `CONTENT_SOURCE` from Vercel and `.env.example`.
