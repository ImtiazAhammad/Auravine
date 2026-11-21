# Auravine backend and admin: plan

Status: phases 0 to 4 done (phase 4 waits on owner steps, see `docs/plans/phase4-findings.md`); production still serves the static content until cutover. Decisions made 2026-11-21 are marked **Decided**.

## Goals

- Move the site's editable content (projects, blog posts, FAQs, tech stack, site settings) and its image assets out of `src/data/portfolio.ts` and `public/` into a database and file storage.
- A protected admin site where the owner edits content in English and Bangla and uploads images.
- Python backend. Host on free tiers.

## Decided

| Topic | Decision |
|---|---|
| Hosting | **Vercel Hobby** now. It is for non-commercial use only (Vercel fair-use guidelines). When Auravine goes commercial, move to paid hosting (Vercel Pro or other) before taking paying traffic. |
| Database, auth, files | **Supabase** free (Postgres, Auth, Storage, row-level security). |
| Backend language | **Python (FastAPI)**. |
| Admin | Custom `/admin` inside the Next.js app, Supabase Auth login. |
| Users | One owner, two machines (home, office). No team to coordinate with. |

## Architecture

```
Browser
  |-- public pages ---> Next.js (Vercel) --reads published rows--> Supabase (anon key, RLS read-only)
  |-- /admin pages  --> Next.js (Vercel) --JWT--> FastAPI (Vercel Python) --service role--> Supabase
  |-- contact form  --> FastAPI --> insert contact_messages + send email
  |-- chat widget   --> FastAPI --> Gemini / Groq (keys live only in Python)
```

Rules that keep it safe and cheap:

1. **Public reads never depend on Python.** Next.js reads published content from Supabase on the server and caches it (ISR with `revalidate`). If the API or the database is slow or paused, visitors still see the last good page.
2. **All writes go through FastAPI.** It verifies the Supabase JWT, checks the caller is an admin, and uses the service-role key. The service-role key never reaches the browser or the Next.js bundle.
3. **After an admin save**, FastAPI calls a Next.js revalidation endpoint so changes appear without a redeploy.
4. **Same-origin routing**, so no CORS: the browser only talks to Next.js; Next.js forwards `/admin` API calls to FastAPI.

### How Python runs on Vercel (to verify first)

Vercel's current docs describe **Services**: a root `vercel.json` with a `services` object (for example a `backend` service with `"framework": "fastapi"` and an `entrypoint`, plus a `frontend` service for Next.js and a service binding that injects `BACKEND_URL`). Python 3.12 (default), 3.13 and 3.14 are supported with `pyproject.toml` or `requirements.txt`. Limits: 500 MB uncompressed bundle; Hobby function duration max 300 s.

Open points, none confirmed in the docs I read:

- Is **Services available on Hobby**?
- Does Services accept the existing Next.js app at the repo root, or does it require a `frontend/` folder?
- The exact rule to expose a Python route publicly (the starter keeps Python private behind a Next.js route).

Do not use a root `api/` folder for Python: it collides with the existing `src/app/api/*` Next.js routes.

**Fallback if Services is not on Hobby:** deploy `backend/` as a second Vercel project (its own `*.vercel.app` URL, also Hobby) and let Next.js call it server-to-server with a shared secret. Another fallback is Render's free tier, which sleeps after 15 minutes idle.

## Data model (Postgres)

Bilingual fields are `jsonb` shaped `{"en": "...", "bn": "..."}`. Every content table has `id`, `slug` (where public), `status` (`draft` or `published`), `sort_order`, `created_at`, `updated_at`.

| Table | Source today | Notes |
|---|---|---|
| `projects` | `portfolioData.projects` | title, summary, body, tags, links, hero and gallery image ids |
| `blog_posts` | `portfolioData.blogs` | title, excerpt, body, cover image id, published_at |
| `faqs` | `portfolioData.faqs` | question, answer |
| `tech_items` | `techStack`, `tools`, skills lists | name, category, icon |
| `site_settings` | `portfolioData.personal` | key/value rows (contact email, social links, hero text) |
| `media_assets` | `public/` images | storage path, alt text (bilingual), width, height, kind |
| `contact_messages` | none (today emailed only) | name, email, subject, message, created_at, handled |
| `admin_profiles` | none | user id, role (`admin`); only these users can write |

UI strings in `messages/en.json` and `bn.json` stay in code. They are interface text, not content.

Row-level security: anonymous users may `select` rows where `status = 'published'` and nothing else. No anonymous insert, update or delete. Writes happen only with the service-role key in FastAPI.

## Phases

Each phase ends with something you can open and check.

0. **Spike (about half a day).** Confirm Services on Hobby with a throwaway "hello" FastAPI behind the real Next.js app on a preview deploy. Create the Supabase project. Pick the final Vercel project name and check `auravine.vercel.app` is free (names are first come, first served).
1. **Foundation.** `backend/` FastAPI project with `uv`, `pyproject.toml`, health route, config, tests. Env vars set locally and in Vercel. Document local run.
2. **Schema, RLS, seed.** SQL migrations for the tables above. A one-off script exports `portfolio.ts` to JSON and a Python loader seeds Supabase. Check row counts match.
3. **Read path (done, behind `CONTENT_SOURCE`).** Replace `portfolioData` reads with cached Supabase reads (Data Cache plus on-demand `/api/revalidate`; full-page ISR is not possible because the layout reads the locale cookie), keeping `portfolio.ts` as a fallback behind a flag until cutover. Verify every public page is unchanged.
4. **Contact and chat in Python.** Move `contact` (store in `contact_messages`, then email) and `chat` into FastAPI with rate limiting. Remove the old Node routes once verified.
5. **Admin.** Supabase Auth login, admin-only guard, CRUD screens for each table, bilingual fields, image upload through signed Supabase Storage URLs, revalidate on save.
6. **Hardening.** Tests for the API and RLS policies, secret review, error handling, a scheduled keep-alive so the free Supabase project does not pause, backup export.
7. **Cutover.** Turn the flag, delete the fallback data, update `DESIGN.md` and a README for running everything.

## Running locally

The Python backend lives in `backend/` and needs [uv](https://docs.astral.sh/uv/).

```bash
cd backend && uv sync          # install (Python 3.12, fetched by uv if missing)
uv run pytest -q               # tests
uv run ruff check .            # lint
cp .env.example .env           # then fill in values (git-ignored)
npm run dev:api                # from the repo root: http://localhost:8000/health
```

CI (`.github/workflows/backend.yml`) runs the same lint and test commands on every change under `backend/`.

## Risks and how we handle them

| Risk | Handling |
|---|---|
| Supabase free projects pause after a week idle | Scheduled ping (GitHub Actions cron); pages served from cache meanwhile; Pro is $25/month if needed |
| Free limits: 500 MB database, 1 GB storage, 5 GB egress | Store originals once, serve optimized webp, lazy-load; check usage monthly |
| Python cold starts on Vercel | Public pages never wait on Python; only admin, contact and chat do |
| Rate limiting on serverless (in-memory limits do not persist) | Use a Postgres-backed counter or Vercel's firewall rules; decide in phase 4 |
| Gmail SMTP from serverless is fragile | Keep for now, switch to a transactional email API (free tier) if it fails |
| Hobby is non-commercial | Fine pre-launch; plan the move to paid hosting before commercial use |
| `*.vercel.app` name may be taken | Check in phase 0; fall back to a close variant |
| Images generated by `scripts/brand-assets` vs admin uploads | Generated art stays in the repo; admin uploads go to Storage; the admin shows both |

## Not decided yet

- Email provider (keep Gmail SMTP or switch).
- Whether blog bodies are Markdown or rich text.
- Whether `experiences`, `education` and `achievements` move to the database (their pages are currently unpublished).
