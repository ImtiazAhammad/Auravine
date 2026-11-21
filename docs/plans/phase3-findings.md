# Phase 3 findings (2026-11-22)

The public site can read its content from Supabase. It is switched by `CONTENT_SOURCE`, and **production is still on `static`**.

## What was built

- `src/lib/content/`: cached read (anon key, 3 s timeout, 300 s Data Cache, tag `content`), row-to-site mapping with Bangla-to-English fallback, `getContent(locale)` with per-collection static fallback, `getProject`, `getBlogPost`.
- `ContentProvider` / `useContent()` in `src/providers/`; the root layout loads content once per request. About 35 pages and components moved from `import { portfolioData }` to `useContent()`; only `src/lib/content/static.ts` still imports the old data (a test enforces this).
- `POST /api/revalidate` (header `Authorization: Bearer <REVALIDATE_SECRET>`): drops the cache so an admin save shows at once.
- `npm run verify:parity -- <staticBase> <supabaseBase>` compares the visible text of every public route on two servers.
- vitest (devDependency), 63 tests. `@types/node` moved to 22 because vitest 5 needs it.

## Results

| Check | Result |
|---|---|
| Parity, local, live database | 21 of 21 routes identical (home, projects and each detail, blog and each post, skills, contact), 0 fallbacks logged |
| Draft hides a page | Project set to draft: still served from cache, 404 right after `/api/revalidate`, 200 again once restored |
| Wrong or missing secret on `/api/revalidate` | 401; with no secret configured: 500 (fails closed) |
| Preview deploy, live database | Reads the database (draft 404 after revalidate, restored 200), `/gallery` 404, wrong secret 401, the shared `REVALIDATE_SECRET` works |
| Database unreachable | Pages render the static copy (HTTP 200) and log `[content] <name> fell back to static`. This happened by accident during the first local run (quoted URL from `.env`): 21 of 21 routes still identical |
| Bangla cookie | `<html lang="bn">`; Bangla content shows where `bn` is filled, English elsewhere (unit-tested; no Bangla is seeded yet) |
| Preview latency | about 0.5 to 0.6 s per `/blog` request through `vercel curl`; production static `/` 0.6 s warm |

## Findings

- **There is no full-page ISR.** The root layout reads the locale cookie, so every route is rendered per request (the build lists all routes as dynamic). Freshness comes from the Data Cache instead: 300 s, or immediately through `/api/revalidate`. Visitors see no difference.
- **`revalidateTag(tag, 'max')` serves the old copy once after a save.** Found in the live test. The endpoint uses `{ expire: 0 }`, so the first request after a save already shows the change.
- **`backend/.env` values may be quoted** (`KEY="value"`); a shell that copies them as-is sends the quotes along. Next.js and the Python loader strip them, a shell `cut` does not.
- Unpublished or draft content is a 404, never the static copy. Static is used only when the database read fails.
- The old `projects/[slug]` page's `generateStaticParams` was removed (pointless on a dynamic route, and it would have listed deleted projects).
- A stray `console.log('SHOWCASE MEMBERS')` in `AboutSection` went with the refactor.

## Vercel settings made

| Variable | Production | Preview |
|---|---|---|
| `SUPABASE_ANON_KEY` (publishable key) | set | set |
| `CONTENT_SOURCE` | `static` | `supabase` |
| `SUPABASE_URL`, `REVALIDATE_SECRET` | already set | already set |

## Still open

- Re-enter `SUPABASE_SERVICE_ROLE_KEY` (the `sb_secret_…` key) in Vercel; its value cannot be checked. Nothing in the Next.js app uses it.
- Cutover (Phase 7): set Production `CONTENT_SOURCE=supabase`, redeploy, then delete `static.ts` and `portfolio.ts`. Until then every database failure is invisible to visitors, so watch the logs for `[content] … fell back`.
- `npm run lint` is broken (`next lint` no longer exists in Next 16 and there is no ESLint config). Pre-existing.
