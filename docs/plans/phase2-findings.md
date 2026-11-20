# Phase 2 findings (2026-11-21)

Schema, row-level security and seed are applied to the live Supabase project and verified.

## Live results

| Check | Result |
|---|---|
| Rows seeded | 11 projects, 5 blog posts, 6 FAQs, 51 tech items, 3 settings, 20 media paths |
| Seed run twice | Counts unchanged: upserts, no duplicates |
| Anonymous reads | Sees exactly the seeded published rows on all six content tables |
| Anonymous write | Rejected (HTTP 401) |
| `contact_messages`, `admin_profiles` | Not readable by anonymous (HTTP 401) |
| Draft hiding | A project set to draft dropped from 11 to 10 for anonymous, then was restored |

## What the live run taught us

- **Newer Supabase projects do not grant `service_role` privileges on new tables.** The first seed failed with HTTP 403 (`permission denied for table projects`). The test database had granted privileges by default, which hid this. Fix: the test bootstrap no longer grants by default, and migration `20261121000003_service_role_grants.sql` grants explicitly. Rule going forward: **every new table needs explicit grants in its migration**.
- Migrations 1 and 2 were already applied when this surfaced, so the fix is a new migration, not an edit.
- Migrations are applied by pasting them into the Supabase SQL Editor ("Run with RLS" for the one that creates tables).
- Tests run on a private throwaway Postgres built from local server binaries (no Docker needed).

## Re-running

`npm run seed:export`, then `cd backend && uv run python -m app.seed.load seed/portfolio.json`, then `uv run python -m app.seed.verify seed/portfolio.json --toggle-draft`. Needs `backend/.env` (git-ignored).

## Still open

- Create the first admin: Supabase **Authentication → Users → Add user**, then in the SQL Editor `insert into admin_profiles (user_id) values ('<uuid>');`.
- Only English text is seeded. Bangla is added through the admin (Phase 5); readers fall back to English.
