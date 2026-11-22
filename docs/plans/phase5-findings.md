# Phase 5 findings (2026-11-22)

The admin site is built and tested. **Nobody has logged in yet**: the assistant has no admin credentials, so the first real login and save are owner steps (below).

## What was built

- **Backend (`/admin/*`, FastAPI):** every route needs a valid Supabase token **and** a row in `admin_profiles` (401 no or invalid token, 403 signed-up non-admin, 503 if Auth or the database is down; nothing touches the database before that check). CRUD for projects, blog posts, FAQs and tech items, site settings (`personal`, `social_links`, `languages`), contact messages (list, mark handled), media (signed upload, register, list). Every write calls the site's revalidate endpoint and reports `revalidated` (a failed refresh never fails the save).
- **Next.js:** login/logout/refresh route handlers with httpOnly `SameSite=Strict` cookies (`av_access`, `av_refresh`), a same-origin check on every state-changing call, and an authenticated proxy `/api/admin/*` that refreshes an expired token once and retries. The panel (`/admin`) has no site chrome, is `noindex`, and `robots.txt` disallows it.
- **Screens:** dashboard, projects and blog posts (English/Bangla tabs, image picker with upload, Markdown preview, delete with confirm), FAQs, tech/tools/skills, site settings, media library, message inbox (shows "Not emailed").
- **Blog bodies are Markdown** (`react-markdown`, raw HTML off). The five existing posts render with the same headings and paragraphs as before.
- **Images:** the browser uploads straight to Supabase Storage through a signed URL (5 MB, WebP/PNG/JPEG/GIF/SVG/AVIF); migration 6 creates the public `media` bucket. No Storage deletes in v1.
- **Public pages:** when the database fails they now serve the last good database copy first, so removed or unpublished content does not come back from the old static data (static is used only if this server process never had a good copy).

## Checked

| Check | Result |
|---|---|
| Tests | backend 425, frontend 189 |
| Local, real servers | login page 200 and `noindex`; every admin page redirects to login when logged out; backend `/admin/*` without or with a garbage token is 401 |
| Vercel preview, real Supabase Auth | forged cookie through Next.js, the service binding and Python is refused (401); wrong password 401; foreign `Origin` 403; `/admin/me` on the public host is 404 (the Python API is not public) |
| Panel rendering | project and blog editors screenshot-checked at 1280 px against a throwaway fake backend serving the real seed rows |
| Whole-branch review | no Critical; 5 Important found and fixed with failing tests first (below); 14 minors deferred |

Review fixes: hard and soft skills could never be saved (their keys contain `_`); the seeded social links (`#`) were refused and blank fields could not be saved; pages errored or showed "not found" an hour after sign-in (client navigation skips the panel layout); a blog category outside the four with public labels, and a post published without a date ("Invalid date"), broke public pages; a cover image from another website would not load through `next/image`. A new test sends **every seeded row** through the editors and the API schemas so this class of mismatch cannot return.

## Owner steps

1. **Apply migrations 5 and 6** in the Supabase SQL Editor (`20261122000001_contact_chat.sql`, `20261122000002_media_bucket.sql`).
2. In Supabase **Authentication settings turn off "Allow new users to sign up"** (a signed-up stranger cannot use the admin anyway, but there is no reason to allow it).
3. **Log in at `/admin/login`** with your admin user. Check one save end to end: edit a FAQ, then see it on the public page (needs Production `CONTENT_SOURCE=supabase`; Preview already has it).
4. Still open from earlier phases: the `sb_secret_…` key in Vercel, and the Gmail/Groq/Gemini values for contact and chat.

## Rulings made

- `SiteChrome` is tested through its pure `isAdminPath` predicate (the component imports heavy animation libraries); component tests are server renders, with no DOM test library added.
- An expired session bounces through `GET /api/admin/refresh` (server pages cannot set cookies) and each page returns to its own path.
- No read policy on `storage.objects`: a public bucket serves files by URL without one, and listing stays closed.
- Blog cover images must be a `/path` or an upload in this project's bucket (others cannot load through `next/image`). Image optimization is allowed only for this project's Storage host, taken from `SUPABASE_URL` at build time.

## Deferred minors

Auto-generated FAQ/tech keys can collide (`C++` and `C#`) with no key field to change, and a Bangla-only question gives an empty key; login returns 403 (not 401) for a correct password on a non-admin account; double click on "Yes, delete" can show a 404 after a successful delete; a saved new FAQ/tech row can render twice after a later refresh; `MessageInbox` can lose a quick second toggle (stale closure); media registration does not check that the file exists in Storage and a failed registration leaves an orphaned object; SVG uploads are allowed (script runs only if someone opens the file URL directly); the signed upload does not bind the content type; a failed logout request still navigates to login; no unsaved-changes warning in editors; Markdown images load from any address; the last-good copy is per server process, so a cold instance during an outage still falls back to static (a sturdier plan: let revalidation fail so Next keeps the cached page; settle before Phase 7 deletes the static data); migration 6 keeps an existing `media` bucket's settings (`on conflict do nothing`). Not decided: login rate limiting (Supabase's limits apply to Vercel's shared egress addresses), server-side session revocation on logout, refresh-token race between concurrent calls.
