# Auravine Backend Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the Python (FastAPI) backend skeleton, prove it can run next to the Next.js app on Vercel Hobby, and create the Supabase project, so the content, contact, chat and admin work can build on a verified base.

**Architecture:** A `backend/` FastAPI app, tested with pytest, deployed on Vercel as a Python service behind the existing Next.js app (or as a second Vercel project if Services is not on Hobby). Supabase holds Postgres, Auth and Storage. Only phases 0 and 1 are detailed here; phases 2 to 7 are outlined and get their own task-level plan once phase 0 fixes the deployment layout.

**Tech Stack:** Python 3.12, FastAPI, pydantic-settings, uv, pytest, ruff, GitHub Actions; Next.js 16 (read `node_modules/next/dist/docs/` before writing any Next.js code, per `AGENTS.md`); Supabase; Vercel Hobby.

**Spec:** `docs/BACKEND-PLAN.md`

## Global Constraints

- Hosting is Vercel Hobby (non-commercial only); move to paid hosting before commercial use.
- Python 3.12 (Vercel's default; 3.13 and 3.14 also supported). Dependencies in `pyproject.toml`; Vercel bundle limit 500 MB uncompressed; Hobby function duration max 300 s.
- The Supabase service-role key exists only in the Python backend's environment. It never appears in the Next.js bundle, client code, logs or git.
- No CORS: the browser talks only to Next.js; Next.js forwards to Python.
- Do not use a root `api/` folder for Python (collides with `src/app/api/*`).
- Public reads must never depend on Python being awake.
- Bilingual content fields are `jsonb` shaped `{"en": "...", "bn": "..."}`.
- UI strings in `messages/en.json` and `bn.json` stay in code.
- Commit trailer: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.

## Review Focus

Most likely to bite first. Each is pinned by a test in the owning task or phase.

1. Blank or missing environment variables (Task 2): the app must still serve `/health`, and any code that needs a secret must fail with an error naming the variable, never use an empty string.
2. Expired, forged, or wrong-audience Supabase tokens on admin routes (phase 5): must return 401, never 500 or 200.
3. A signed-in user who is not an admin calling an admin route (phase 5): must return 403.
4. Bangla text, emoji and very long messages in the contact form (phase 4): stored and emailed intact, over-limit input rejected with 422.
5. Supabase paused or the Python service asleep (phase 3): public pages still render the last cached content.

Also known: `src/app/api/chat/route.ts` builds its prompt from keys that do not exist in `portfolioData` (`experience`, `skills`), so the assistant today sees little of the site. Phase 4 fixes this when chat moves to Python.

---

## Phase 0: Verify the platform (about half a day, needs your accounts)

### Task 0: Supabase project, Vercel link, Services spike

**Files:**
- Create: `docs/plans/phase0-findings.md` (the recorded answers)
- Create (throwaway branch `spike/services`, not merged): `backend/app/main.py`, `vercel.json`

**Interfaces:**
- Produces: answers to four questions recorded in `phase0-findings.md`: (a) Services works on Hobby? (b) frontend root `./` accepted, or a `frontend/` folder required? (c) how a Python route is exposed to the browser; (d) final Vercel project name and whether `auravine.vercel.app` was free.

- [ ] **Step 1: Create the Supabase project (you).** At supabase.com create a project named `auravine`, region nearest Dhaka (Singapore or Mumbai). Save the Project URL, anon key and service-role key in a password manager, not in the repo.
- [ ] **Step 2: Log in to Vercel (you).** Run `! npx vercel login`, then `npx vercel link` in the repo and choose the project name `auravine` (note whether Vercel offers `auravine.vercel.app` or a suffixed name).
- [ ] **Step 3: Spike branch.** `git checkout -b spike/services`. Add `backend/app/main.py` with a FastAPI `app` exposing `GET /health` returning `{"status": "ok"}`, `backend/pyproject.toml` with `fastapi` as the only dependency, and a root `vercel.json` with `services` entries `backend` (`"root": "backend/"`, `"framework": "fastapi"`, `"entrypoint": "app.main:app"`) and `frontend` (`"framework": "nextjs"`, `"root"` as `"./"`), plus a service binding exposing `BACKEND_URL` to the frontend and a catch-all rewrite to `frontend`. Run `npx vercel project update --framework services` if the dashboard preset requires it.
- [ ] **Step 3b: If `root: "./"` is rejected,** try moving nothing yet: record the exact error in `phase0-findings.md` and test the same config with the Next.js app under `frontend/` on a scratch copy.
- [ ] **Step 4: Deploy a preview.** `npx vercel deploy`. Expected: the existing site loads at the preview URL.
- [ ] **Step 5: Prove the Python service answers.** Add a Next.js route handler (read the Next.js 16 docs first) that fetches `process.env.BACKEND_URL + '/health'` and returns it; request it on the preview. Expected: `{"status":"ok"}`.
- [ ] **Step 6: Decide and record.** If Services works on Hobby, keep it. If not, the fallback is a second Vercel project rooted at `backend/`; test that the same `/health` works there and record the URL. Write all four answers in `docs/plans/phase0-findings.md`, delete the spike branch, and commit the findings on `main` via a PR.

---

## Phase 1: Backend foundation (TDD, all local, no accounts needed)

Layout produced by this phase:

```
backend/
  pyproject.toml          # deps, ruff and pytest config
  .python-version         # 3.12
  .env.example            # variable names only
  app/main.py             # create_app() and app
  app/config.py           # Settings, get_settings()
  app/routes/health.py    # GET /health
  tests/test_health.py
  tests/test_config.py
.github/workflows/backend.yml
```

### Task 1: FastAPI app with a health route

**Files:**
- Create: `backend/pyproject.toml`, `backend/.python-version`, `backend/app/__init__.py`, `backend/app/main.py`, `backend/app/routes/__init__.py`, `backend/app/routes/health.py`, `backend/tests/test_health.py`
- Modify: `.gitignore` (add `backend/.venv/`, `__pycache__/`, `.pytest_cache/`, `.ruff_cache/`, `.env`)

**Interfaces:**
- Produces: `app.main.create_app() -> FastAPI`; module attribute `app.main.app`; router `app.routes.health.router` serving `GET /health` as `{"status": "ok"}` with status 200.

- [ ] **Step 1: Write the failing test** in `backend/tests/test_health.py`:

```python
from fastapi.testclient import TestClient
from app.main import create_app

def test_health_returns_ok():
    response = TestClient(create_app()).get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_unknown_route_is_404_json():
    response = TestClient(create_app()).get("/nope")
    assert response.status_code == 404
    assert response.json() == {"detail": "Not Found"}
```

- [ ] **Step 2: Run it to see it fail.** `cd backend && uv sync && uv run pytest -q`. Expected: FAIL, `ModuleNotFoundError: app.main`.
- [ ] **Step 3: Implement** `create_app()` in `app/main.py` (include the health router, no import-time settings access) and the router in `app/routes/health.py`. Dependencies in `pyproject.toml`: `fastapi`, `uvicorn[standard]`, `pydantic-settings`; dev group: `pytest`, `httpx`, `ruff`. `requires-python = ">=3.12"`.
- [ ] **Step 4: Run tests.** `uv run pytest -q`. Expected: 2 passed.
- [ ] **Step 5: Commit** `feat(backend): FastAPI skeleton with health route`.

### Task 2: Typed settings that fail loudly

**Files:**
- Create: `backend/app/config.py`, `backend/.env.example`, `backend/tests/test_config.py`

**Interfaces:**
- Consumes: `app.main.create_app` (Task 1).
- Produces: `app.config.Settings(BaseSettings)` with `supabase_url: str`, `supabase_service_role_key: SecretStr`, `revalidate_url: str`, `revalidate_secret: SecretStr` (all required, min length 1; read from env or `backend/.env`); `app.config.get_settings() -> Settings` cached with `functools.lru_cache`.

- [ ] **Step 1: Write the failing tests** in `tests/test_config.py`:

```python
import pytest
from pydantic import ValidationError
from fastapi.testclient import TestClient
from app.config import Settings
from app.main import create_app

REQUIRED = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "REVALIDATE_URL", "REVALIDATE_SECRET"]

@pytest.fixture
def clean_env(monkeypatch):
    for name in REQUIRED:
        monkeypatch.delenv(name, raising=False)

def test_missing_variable_is_named_in_the_error(clean_env):
    with pytest.raises(ValidationError) as err:
        Settings(_env_file=None)
    assert "supabase_service_role_key" in str(err.value)

def test_blank_value_is_rejected(clean_env, monkeypatch):
    for name in REQUIRED:
        monkeypatch.setenv(name, "x")
    monkeypatch.setenv("SUPABASE_URL", "")
    with pytest.raises(ValidationError):
        Settings(_env_file=None)

def test_secrets_do_not_leak_in_repr(clean_env, monkeypatch):
    for name in REQUIRED:
        monkeypatch.setenv(name, "topsecret")
    assert "topsecret" not in repr(Settings(_env_file=None))

def test_health_works_without_any_environment(clean_env):
    assert TestClient(create_app()).get("/health").status_code == 200
```

- [ ] **Step 2: Run to see failures.** `uv run pytest tests/test_config.py -q`. Expected: FAIL, `app.config` missing.
- [ ] **Step 3: Implement** `Settings` and `get_settings()` in `app/config.py` per the Interfaces block; `.env.example` lists the four names with empty values and a comment that real values live in `backend/.env` (git-ignored) and Vercel environment settings.
- [ ] **Step 4: Run all tests.** `uv run pytest -q`. Expected: 6 passed.
- [ ] **Step 5: Commit** `feat(backend): typed settings that fail loudly on missing secrets`.

### Task 3: Lint, local run command, CI

**Files:**
- Create: `.github/workflows/backend.yml`
- Modify: `backend/pyproject.toml` (ruff config: `line-length = 100`, rules `E,F,I,B,UP`), `package.json` (add script `"dev:api": "uv run --directory backend uvicorn app.main:app --reload --port 8000"`), `docs/BACKEND-PLAN.md` (a "Running locally" section)

**Interfaces:**
- Consumes: the backend from Tasks 1 and 2.
- Produces: `npm run dev:api` serving `http://localhost:8000/health`; a CI job named `backend` that fails on lint errors or test failures.

- [ ] **Step 1: Add ruff config and run `uv run ruff check .`** in `backend/`. Expected: no findings (fix any).
- [ ] **Step 2: Add the `dev:api` script and check it.** Run `npm run dev:api` and, in another shell, `curl -s localhost:8000/health`. Expected: `{"status":"ok"}`; stop the server.
- [ ] **Step 3: Write `.github/workflows/backend.yml`:** triggers on push and pull request touching `backend/**`; steps: checkout, `astral-sh/setup-uv`, `uv sync --locked`, `uv run ruff check .`, `uv run pytest -q`, all with working directory `backend`.
- [ ] **Step 4: Prove CI fails when it should.** On a scratch commit, break a test, push, confirm the `backend` job fails, then revert.
- [ ] **Step 5: Commit** `chore(backend): ruff, local run script, CI`, open a PR; merge when CI is green.

---

## Phases 2 to 7 (outline; detailed in a follow-up plan after phase 0)

| Phase | Deliverable | Verification |
|---|---|---|
| 2 Schema, RLS, seed | `supabase/migrations/*.sql` for the tables in `docs/BACKEND-PLAN.md`; `scripts/export_portfolio.ts` plus a Python loader; seed run | Row counts equal `portfolio.ts`; anonymous query returns only `published`; anonymous insert is denied |
| 3 Read path | `src/lib/content/` Supabase readers with ISR, flag `CONTENT_SOURCE=db\|static` | Every public page identical in both modes; kill Supabase access and the cached page still renders (Review Focus 5) |
| 4 Contact and chat | FastAPI `/contact` (store, then email) and `/chat` (content from the database, rate-limited); old Node routes removed | Bangla/emoji round trip, over-limit input returns 422 (Review Focus 4); chat answers from real content |
| 5 Admin | Supabase Auth login, `require_admin` dependency, CRUD screens, signed uploads, revalidate on save | Forged, expired and wrong-audience tokens give 401; non-admin gives 403 (Review Focus 2 and 3) |
| 6 Hardening | RLS tests, secret review, keep-alive cron, backup export | CI green; Supabase pause test documented |
| 7 Cutover | Flip the flag, delete fallback data, update `DESIGN.md` and README | Production smoke test of every public page and the admin |

## Self-review

- **Spec coverage:** phase 0 covers the spec's open points (Services on Hobby, root layout, project name); phase 1 covers foundation; phases 2 to 7 map one-to-one to the spec's phases.
- **Type consistency:** `create_app`, `Settings`, `get_settings` names match across Tasks 1 to 3.
- **Review Focus:** items 1 maps to Task 2 tests; items 2 to 5 are pinned in the outline rows with named verification, to become tests in the follow-up plan.
- **Known limit:** phases 2 to 7 deliberately have no task-level steps yet, because phase 0's result changes the folder layout and routing they depend on.
