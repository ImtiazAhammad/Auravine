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

## Review fixes (migration 4, applied live)

A whole-branch review found three Important issues, all fixed and confirmed live:

- The seed is **insert-only**: re-running it never overwrites admin edits (status, order, Bangla).
- `projects.category/role/team/custom_timeline` and `blog_posts.author_name` are translatable (`{"en": ...}`); `blog_posts.category` stays a plain filter key; `projects.details` must hold an English object.
- Whitespace-only English text (newline, tab, no-break and zero-width spaces) is rejected by the database (live write attempt returned HTTP 400).

## State

- The first admin exists (`admin_profiles` has one row, role `admin`).
- Only English text is seeded. Bangla is added through the admin (Phase 5); readers fall back to English.
- Migrations applied live: 1 schema, 2 RLS, 3 service_role grants, 4 review fixes (pasted in the SQL Editor; there is no automated log, so this list is the record).
- Deferred minors from the review are listed in the commit history and the branch review notes: failed-seed partial writes, FAQ key follows question text, `media_assets` has no `updated_at`, unpinned `tsx`, verifier restores `published` unconditionally, no database-level idempotence test.
