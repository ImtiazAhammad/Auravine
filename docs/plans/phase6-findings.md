# Phase 6 findings (2026-11-25)

Hardening is done in code and tested. Two things need the owner (below). Phase 6 builds on the Phase 5 branch (`feat/admin`, PR #10).

## What was built

- **Login rate limiting.** `POST /login-attempt` (FastAPI, private) counts each admin sign-in attempt per visitor: 10 per 15 minutes and 50 per day, keyed by a salted hash of the real client address. The Next.js login handler calls it first and never sends a password to Supabase when the answer is 429 or when the limiter cannot answer (fails closed). There is **no shared budget on purpose**: with one, a stranger could use it up and lock the owner out.
- **Backups.** `uv run python -m app.backup ../backups/<date>` (run from `backend/`) writes one JSON file per table (projects, blog posts, FAQs, tech items, site settings, media, contact messages, admin profiles). A table file appears only once it was read in full; the command refuses a non-empty folder; errors never echo Supabase's response. `backups/` is git-ignored. **Do not upload a backup anywhere public**: it holds contact messages, and this repository's Actions artifacts are public. Checked against the real project: 11 projects, 5 posts, 6 FAQs, 51 tech items, 3 settings, 20 media rows, 0 messages, 1 admin. The free Supabase plan has no automatic backups, so run this after big editing sessions (monthly at least) and keep the folder somewhere private.
- **Keep-alive.** `.github/workflows/keep-alive.yml` reads one row through the public API every three days, so the free project does not pause. It fails loudly (a red run) if the two secrets are missing or Supabase does not answer 200. The same request returns 200 from this machine. GitHub switches off scheduled workflows after 60 days with no commits in a public repo; the file says how to re-enable.
- **Secret review.** Nothing credential-shaped is tracked or in any commit: the only matches in history were example keys inside `node_modules` that was committed early on (Next docs, a zod test) and has since been removed. `scripts/check-secrets.sh` (files, and `--history`) now runs in CI (`secrets.yml`); it prints file and line but never the value, and a planted fake key made it fail. No `NEXT_PUBLIC_` variable exists, and no log line prints a token, password or key. Secrets live only in Vercel and in git-ignored `.env` files.
- **Error handling.** An unhandled error in the Python API logs its traceback and answers a generic `500 {"detail":"Internal server error"}` with no internals. Every API answer carries `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`.
- **Security headers on the site.** `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` (camera, microphone and location off) on every page; `Cache-Control: no-store` on `/admin` and `/api/admin`. No Content-Security-Policy yet: the site uses inline scripts and third-party image hosts, so a CSP needs its own careful pass (report-only first).
- **RLS tests** already cover every table including the Phase 4 and 5 ones (`backend/tests/db`); nothing new was needed.

## Owner steps

1. **Keep-alive secrets.** In GitHub: Settings, Secrets and variables, Actions, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (the same two values as in Vercel; the anon key is public by design). Then run the "keep-alive" workflow once from the Actions tab and check it goes green. (The assistant was blocked from setting them and did not work around it.)
2. **Take a first backup** with the command above and keep the folder private.
3. Everything from `phase4-findings.md` and `phase5-findings.md` still applies (migrations 5 and 6, Auth sign-ups off, service key, email and LLM keys, first admin login).

## Not done, on purpose

- **Server-side logout and refresh-token race** (from Phase 5): a stolen cookie works until it expires; short-lived access tokens limit this. Revisit if more than one admin is added.
- **Content-Security-Policy**: see above.
- **Scheduled backups**: would need the service-role key in GitHub and a private place to store the files; not worth it for a site with one editor.
- **Alerting** when the contact mail fails: failures are visible in the admin inbox ("Not emailed"); no pager.
