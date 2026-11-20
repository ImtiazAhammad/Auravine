# Schema, RLS and Seed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put Auravine's editable content into Supabase Postgres with row-level security that keeps drafts and private data private, and seed it from `src/data/portfolio.ts`.

**Architecture:** SQL migrations in `supabase/migrations/` define the tables and policies. They are tested on every change against a throwaway Postgres container with Supabase's roles stubbed, then applied once to the real project and checked there. A pure Python mapping turns the existing content into rows, and a thin loader upserts them with the service-role key, so re-running it never duplicates anything.

**Tech Stack:** PostgreSQL 16 (Supabase), pytest, psycopg, testcontainers (Docker), httpx2, Supabase REST (PostgREST), `tsx` for the one-off TypeScript export.

**Spec:** `docs/BACKEND-PLAN.md` (Data model section); foundation in `docs/plans/2026-11-21-backend-foundation.md`; Phase 0 results in `docs/plans/phase0-findings.md`.

## Global Constraints

- Every table in the `public` schema has row-level security **enabled**. Writes happen only through the Python backend with the service-role key (which bypasses RLS). No insert, update or delete policy exists for `anon` or `authenticated`.
- Translatable text columns are `jsonb` shaped `{"en": "...", "bn": "..."}`. **`en` is required and non-empty; `bn` is optional** (no current content has Bangla; readers fall back to `en`).
- Content tables have `status text` in (`draft`, `published`) defaulting to `draft`, `sort_order int`, `created_at`, `updated_at` (kept current by trigger).
- Supabase free tier: 500 MB database. Store image *paths*, never image bytes, in tables.
- Secrets (`SUPABASE_SERVICE_ROLE_KEY`, DB password) never appear in git, chat or logs. Real values live in Vercel env settings and the git-ignored `backend/.env`.
- Python 3.12, `uv`, ruff line length 100. Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Review Focus

1. A new table added without RLS (Task 2): a test fails if any `public` table has `rowsecurity = false`.
2. Draft rows visible to visitors (Task 2): anonymous queries return only `published` rows, for every content table.
3. Bangla text, emoji, markdown and very long text in `jsonb` (Task 1): stored and read back byte-identical.
4. A record with no English text, or a blank one (Task 1): rejected by a CHECK constraint, not stored.
5. Re-running the seed (Task 4): sends identical upserts and creates no duplicates.

---

## Data model

`<L>` = bilingual `jsonb` (CHECK: object with non-blank `en`). Common columns on content tables: `id uuid pk default gen_random_uuid()`, `status`, `sort_order`, `created_at`, `updated_at`.

| Table | Columns beyond the common ones |
|---|---|
| `projects` | `slug text unique not null`, `delivery_status text` (`ongoing`/`completed`/`planned`), `category text`, `title <L>`, `description <L>`, `long_description <L> null`, `details jsonb not null default '{}'` (shape `{"en": {highlights, metrics, features, installation, challenges, challengesAndSolutions}}`), `tech_stack text[]`, `tools text[]`, `hero_image text`, `gallery_images text[]`, `demo_url text`, `repo_url text`, `start_date date`, `end_date date null`, `role text`, `team text`, `custom_timeline text` |
| `blog_posts` | `slug text unique not null`, `title <L>`, `excerpt <L>`, `content <L>` (markdown), `cover_image text`, `published_at date`, `category text`, `tags text[]`, `author_name text`, `read_time_minutes int` |
| `faqs` | `key text unique not null`, `question <L>`, `answer <L>` |
| `tech_items` | `key text unique not null`, `kind text` (`tech`/`tool`/`hard_skill`/`soft_skill`), `name text`, `icon text null`, `category text null`, `url text null`, `extra jsonb not null default '{}'` |
| `site_settings` | `key text primary key`, `value jsonb not null`, `updated_at` (public, so **never** store secrets here) |
| `media_assets` | `id`, `path text unique not null`, `kind text` (`image`/`video`/`file`), `source text` (`repo`/`storage`), `alt jsonb null`, `width int null`, `height int null`, `created_at` |
| `contact_messages` | `id`, `name text`, `email text`, `subject text null`, `message text`, `locale text null`, `handled boolean default false`, `created_at`; CHECKs: `char_length(name) between 1 and 200`, `char_length(email) between 3 and 320`, `char_length(message) between 1 and 5000` |
| `admin_profiles` | `user_id uuid primary key references auth.users(id) on delete cascade`, `role text default 'admin'` (CHECK `role = 'admin'`), `created_at` |

Policies: `anon` and `authenticated` may `select` rows where `status = 'published'` on `projects`, `blog_posts`, `faqs`, `tech_items`; may `select` all rows on `site_settings` and `media_assets`; have no access at all to `contact_messages` and `admin_profiles` (RLS on, no policies, and privileges revoked).

## File Structure

```
supabase/migrations/20261121000001_schema.sql
supabase/migrations/20261121000002_rls.sql
backend/tests/db/bootstrap.sql        # roles + auth stub for the test database
backend/tests/db/conftest.py          # Postgres container, migration runner, role helper
backend/tests/db/test_schema.py
backend/tests/db/test_rls.py
backend/tests/fixtures/portfolio_sample.json
backend/app/seed/{__init__,mapping,load}.py
backend/tests/test_seed_mapping.py
backend/tests/test_seed_load.py
backend/scripts/verify_live.py        # run against the real project
scripts/export-portfolio.ts           # TS content -> backend/seed/portfolio.json
```

---

### Task 1: Schema migration and test database

**Files:**
- Create: `supabase/migrations/20261121000001_schema.sql`, `backend/tests/db/bootstrap.sql`, `backend/tests/db/conftest.py`, `backend/tests/db/test_schema.py`
- Modify: `backend/pyproject.toml` (dev group: `psycopg[binary]`, `testcontainers[postgres]`; pytest marker `db`)

**Interfaces:**
- Produces: tables per the Data model; function `public.set_updated_at() returns trigger`; pytest fixtures `pg_url: str` (session-scoped, migrations applied, skips if Docker is unavailable) and `connect(role: str, user_id: str | None = None) -> psycopg.Connection` (autocommit connection that has run `SET ROLE <role>` and set the `request.jwt.claim.sub` setting to `user_id`).

- [ ] **Step 1: Write failing tests** in `test_schema.py`:
  - `test_all_tables_exist`: the eight table names are in `information_schema.tables` for schema `public`.
  - `test_bilingual_round_trip`: insert a `faqs` row with `question = {"en": "Q?", "bn": "প্রশ্ন? 😀"}` and a 20,000-character markdown `answer`; read back equal (Review Focus 3).
  - `test_missing_or_blank_english_is_rejected` (parametrized: `{}`, `{"bn": "x"}`, `{"en": ""}`, `{"en": "  "}`, `"plain string"`): insert into `faqs` raises `psycopg.errors.CheckViolation` (Review Focus 4).
  - `test_slug_is_unique_and_status_defaults_to_draft` on `projects`.
  - `test_updated_at_changes_on_update`.
  - `test_contact_message_length_limits`: a 5,001-character message raises `CheckViolation`.
- [ ] **Step 2: Run to see failures.** `cd backend && uv sync && uv run pytest tests/db -q`. Expected: FAIL (missing tables) or SKIP with a clear message if Docker is not running, in which case start Docker first.
- [ ] **Step 3: Implement.** `bootstrap.sql` creates roles `anon`, `authenticated`, `service_role` (`bypassrls`), schema `auth`, table `auth.users(id uuid primary key)`, and `auth.uid()` returning `nullif(current_setting('request.jwt.claim.sub', true), '')::uuid` (this matches how Supabase defines it). `conftest.py` starts `postgres:16` via testcontainers once per session, runs `bootstrap.sql` then every file in `supabase/migrations/` in name order. The migration creates the tables, CHECKs (a helper `public.is_bilingual(jsonb) returns boolean` used by every `<L>` column) and the `set_updated_at` trigger.
- [ ] **Step 4: Run tests.** `uv run pytest tests/db -q`. Expected: all pass.
- [ ] **Step 5: Commit** `feat(db): schema migration and Postgres test harness`.

### Task 2: Row-level security

**Files:**
- Create: `supabase/migrations/20261121000002_rls.sql`, `backend/tests/db/test_rls.py`

**Interfaces:**
- Consumes: Task 1 fixtures `connect(role, user_id)`, tables and `status` columns.
- Produces: RLS enabled on all eight tables and the policies listed under Data model.

- [ ] **Step 1: Write failing tests** in `test_rls.py` (seed rows through a `service_role` connection):
  - `test_every_public_table_has_rls_enabled`: no row in `pg_tables` for schema `public` has `rowsecurity = false` (Review Focus 1).
  - `test_anon_sees_only_published` parametrized over `projects`, `blog_posts`, `faqs`, `tech_items`: with one draft and one published row each, `anon` and `authenticated` select exactly the published one (Review Focus 2).
  - `test_anon_reads_settings_and_media`: both rows visible.
  - `test_anon_cannot_write` parametrized over every table and over `insert`, `update`, `delete`: raises `psycopg.errors.InsufficientPrivilege` or affects 0 rows (assert one of the two).
  - `test_private_tables_are_invisible`: `anon` and a signed-in non-admin `authenticated` user selecting from `contact_messages` and `admin_profiles` raises `InsufficientPrivilege`.
  - `test_service_role_can_do_everything`: insert, update, delete a `projects` row.
- [ ] **Step 2: Run to see failures.** `uv run pytest tests/db/test_rls.py -q`. Expected: FAIL (tables readable or writable without policies).
- [ ] **Step 3: Implement** the migration: enable RLS on all eight tables; the four `select ... using (status = 'published')` policies; `select ... using (true)` on `site_settings` and `media_assets`; `revoke all on contact_messages, admin_profiles from anon, authenticated`; `revoke insert, update, delete` on every other table from `anon, authenticated`.
- [ ] **Step 4: Run all backend tests.** `uv run pytest -q`. Expected: all pass.
- [ ] **Step 5: Commit** `feat(db): row-level security policies`.

### Task 3: Seed mapping (pure functions)

**Files:**
- Create: `backend/app/seed/__init__.py`, `backend/app/seed/mapping.py`, `backend/tests/fixtures/portfolio_sample.json`, `backend/tests/test_seed_mapping.py`

**Interfaces:**
- Produces in `app.seed.mapping`:
  - `slugify(text: str) -> str` (lowercase ASCII, hyphens, trimmed)
  - `bilingual(text: str) -> dict[str, str]` returning `{"en": text}`
  - `map_project(raw: dict, index: int) -> dict`, `map_blog_post(raw: dict, index: int) -> dict`, `map_faq(raw: dict, index: int) -> dict`
  - `map_tech_items(portfolio: dict) -> list[dict]` (`techStack`→`tech`, `tools`→`tool`, `hardSkills`→`hard_skill`, `softSkills`→`soft_skill`)
  - `map_site_settings(portfolio: dict) -> list[dict]` (one row per top-level `personal` group: `personal`, `social_links`, `languages`)
  - `collect_media(projects: list[dict], blogs: list[dict]) -> list[dict]`
  - `build_seed(portfolio: dict) -> dict[str, list[dict]]` keyed by table name; every content row has `status = "published"` and `sort_order = index`.
- The fixture is a trimmed copy of the real shape: one project with nested `features`, `metrics`, `highlights` and `challengesAndSolutions`; one blog with a multi-paragraph markdown `content` and `readTime: "5"`; two FAQs; one item per tech kind.

- [ ] **Step 1: Write failing tests**, each using the fixture:
  - `test_map_project_wraps_text_and_nests_details`: `title == {"en": <original>}`; `details["en"]` holds `highlights`, `metrics`, `features`, `challengesAndSolutions`; `hero_image` is the original `image`; `delivery_status` is the original `status`; `start_date` unchanged.
  - `test_map_blog_post_keeps_markdown_and_converts_read_time`: `content["en"]` is byte-identical to the original; `read_time_minutes == 5`; `published_at` is the original `date`.
  - `test_faq_key_is_stable_slug_of_question`: calling twice gives the same `key`.
  - `test_tech_items_cover_all_kinds_with_unique_keys`.
  - `test_collect_media_deduplicates_paths_and_marks_repo_source`.
  - `test_build_seed_table_names_and_sort_order`: keys are `projects`, `blog_posts`, `faqs`, `tech_items`, `site_settings`, `media_assets`; `sort_order` runs 0..n-1.
  - `test_unpublishable_input_is_not_invented`: a project missing `description` raises `ValueError` naming the slug (no silent blank).
- [ ] **Step 2: Run to see failures.** `uv run pytest tests/test_seed_mapping.py -q`. Expected: FAIL, module missing.
- [ ] **Step 3: Implement** the functions per Interfaces. Missing optional fields map to `None` or empty arrays; missing required fields raise `ValueError`.
- [ ] **Step 4: Run all backend tests.** Expected: all pass.
- [ ] **Step 5: Commit** `feat(seed): map portfolio content to database rows`.

### Task 4: Export script and idempotent loader

**Files:**
- Create: `scripts/export-portfolio.ts`, `backend/app/seed/load.py`, `backend/tests/test_seed_load.py`
- Modify: `package.json` (script `"seed:export": "npx tsx scripts/export-portfolio.ts"`), `backend/pyproject.toml` (move `httpx2` to runtime dependencies), `.gitignore` (`backend/seed/portfolio.json`)

**Interfaces:**
- Consumes: `app.seed.mapping.build_seed`, `app.config.Settings`.
- Produces in `app.seed.load`: `UPSERT_KEYS: dict[str, str]` (`projects`→`slug`, `blog_posts`→`slug`, `faqs`→`key`, `tech_items`→`key`, `site_settings`→`key`, `media_assets`→`path`); `build_requests(seed: dict[str, list[dict]], settings: Settings, batch_size: int = 200) -> list[httpx2.Request]`; `load_seed(seed: dict, settings: Settings, client: httpx2.Client | None = None) -> dict[str, int]` (rows sent per table); CLI `uv run python -m app.seed.load seed/portfolio.json`.
- The script `export-portfolio.ts` writes `portfolioData` as JSON to `backend/seed/portfolio.json` and prints the length of each array.

- [ ] **Step 1: Write failing tests** in `test_seed_load.py` using `httpx2.MockTransport` and a `Settings` built from dummy values:
  - `test_one_upsert_request_per_batch_with_conflict_key`: URL is `<SUPABASE_URL>/rest/v1/<table>?on_conflict=<key>`; header `Prefer` contains `resolution=merge-duplicates`; method POST.
  - `test_batches_are_capped`: 450 rows with `batch_size=200` give 3 requests.
  - `test_service_key_is_sent_only_as_headers_never_in_url_or_body`.
  - `test_running_twice_sends_identical_requests` (Review Focus 5).
  - `test_error_response_raises_and_names_the_table`: a mocked 409 or 500 raises `RuntimeError` mentioning the table and not the key.
- [ ] **Step 2: Run to see failures.** Expected: FAIL, module missing.
- [ ] **Step 3: Implement** `build_requests` and `load_seed` per Interfaces (PostgREST upsert is `POST` with `on_conflict` and `Prefer: resolution=merge-duplicates,return=minimal`). Write the TypeScript export (read the Next.js docs only if it touches Next code; this script does not).
- [ ] **Step 4: Run tests, then the export.** `uv run pytest -q` passes; `npm run seed:export` prints the array lengths and writes the file. Expected: file exists, git does not show it.
- [ ] **Step 5: Commit** `feat(seed): idempotent loader and portfolio export`.

### Task 5: Apply to the real project and verify (needs the owner)

**Files:**
- Create: `backend/scripts/verify_live.py`, `docs/plans/phase2-findings.md`

**Interfaces:**
- Consumes: migrations (Tasks 1 and 2), loader (Task 4). `verify_live.py` reads `SUPABASE_URL` and `SUPABASE_ANON_KEY` (public key) from the environment, not from `Settings`.

- [ ] **Step 1 (you): Apply the migrations.** In the Supabase dashboard open **SQL Editor**, paste `20261121000001_schema.sql`, run, then `20261121000002_rls.sql`, run. Expected: "Success" for both and eight tables under **Table Editor**. (A CLI push needs the database password at an interactive prompt, so the editor avoids secrets in chat.)
- [ ] **Step 2 (you): Create `backend/.env`** from `.env.example` with the real values (git-ignored; never paste them in chat).
- [ ] **Step 3: Seed.** `npm run seed:export`, then `cd backend && uv run python -m app.seed.load seed/portfolio.json`. Expected: per-table row counts printed.
- [ ] **Step 4: Verify counts and RLS with `verify_live.py`** (write it first; it prints PASS/FAIL per check): anonymous `GET /rest/v1/projects` returns only published rows and their count equals the export; anonymous `POST` to `projects` is rejected (401/403); anonymous `GET` on `contact_messages` and `admin_profiles` is rejected or empty; setting a project to `draft` via the dashboard makes it disappear for anonymous reads, then restore it. Expected: all PASS.
- [ ] **Step 5 (you): Create the first admin.** In **Authentication → Users → Add user** create your login, copy its UUID, and run in the SQL Editor: `insert into admin_profiles (user_id) values ('<uuid>');`.
- [ ] **Step 6: Record** the outcomes in `docs/plans/phase2-findings.md` and commit `docs: record phase 2 results`.

---

## Self-review

- **Spec coverage:** all eight tables, bilingual `jsonb`, RLS (public read of published only, no anonymous writes), seed from `portfolio.ts`, and the first-admin bootstrap are covered. The spec's `experiences`, `education` and `achievements` are intentionally not migrated (their pages are unpublished); the plan leaves them in `portfolio.ts`.
- **Placeholders:** none; unknown counts are printed by the export, not assumed.
- **Type consistency:** `build_seed` table names match `UPSERT_KEYS` and the Data model; `connect`, `pg_url`, `bilingual`, `build_requests` are used with the same signatures in every task.
- **Review Focus mapping:** items 1 and 2 are pinned in Task 2, 3 and 4 in Task 1, 5 in Task 4.
- **Proportion:** the tests carry the detail; function bodies are left to the implementer.
