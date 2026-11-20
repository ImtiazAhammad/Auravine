# Phase 0 findings (2026-11-21)

Spike: the Phase 1 FastAPI backend plus the existing Next.js app, deployed together to Vercel Hobby with a throwaway route that called the Python service. The spike route and branch were deleted; `vercel.json` is kept.

| Question | Answer |
|---|---|
| Does Vercel Services work on Hobby? | **Yes.** The deployment built and ran on the Hobby plan. |
| Does the existing Next.js app work at the repo root? | **Yes.** `"root": "."` was accepted for the `frontend` service; no `frontend/` folder is needed. |
| How is Python reached? | Through a **service binding**: `BACKEND_INTERNAL_URL` is injected into the frontend at runtime. The backend has no public rewrite, so `GET /health` on the public URL is 404 while a Next.js route handler can call it. Result: `{"backendStatus":200,"body":{"status":"ok"}}`. |
| Project name | `auravine.vercel.app` is **taken** (someone else's site). Chosen: **`auravine-ai`** (`https://auravine-ai.vercel.app`). Other probed names were unclaimed. |

## Other things learned

- The Python function bundle was 14.9 MB (limit 500 MB). Both services deployed to region `iad1` (US East). A region closer to Dhaka may be worth choosing later.
- The first deployment of a project becomes production, so `auravine-ai.vercel.app` is publicly reachable. Preview deployments are protected by Vercel Authentication.
- `vercel link` could not connect the GitHub repo: the Vercel account needs a GitHub login connection first. CLI deploys work without it.
- Routing into a service is final and the service receives the original request path, so Python routes keep their full path. Next.js shares the `/api` namespace; keep Python private behind route handlers.
- `.vercel/` and `.env.local` (created by `vercel link`, holds a Vercel token) are git-ignored.

## Still open

- Create the Supabase project and set the four backend secrets in Vercel (`vercel env add`), so none pass through chat or git.
- Optional: connect GitHub for automatic deploys.
