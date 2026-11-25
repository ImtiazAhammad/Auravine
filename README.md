<div align="center">

<img src="public/brand/auravine-logo.svg" alt="Auravine" height="56" />

# Auravine — AI-First Software Development

### AI voice agents · Custom chatbots · Computer vision · Business analytics

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## About

Auravine is an AI-first software development company based in Dhaka, Bangladesh. This repository is the company website: it presents our AI services, delivery process, case-study solutions, insights, and a free consultation booking form for local and international businesses.

### Services

- **AI Voice Agents**: 24/7 call answering in Bangla and English, appointment booking, and human handoff.
- **Custom Chatbots**: Website, WhatsApp, and Messenger assistants that answer from the client's own documents and cite their sources.
- **Computer Vision**: Face recognition attendance, defect detection, and video analytics.
- **Business Analytics**: Live dashboards, demand forecasting, and smart alerts.
- **Document AI**: Private knowledge assistants with page-level citations.
- **Custom Web & Mobile Software**: Full-stack platforms, admin panels, and integrations.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling & UI:** Tailwind CSS, Radix UI primitives, Framer Motion, GSAP, Lenis smooth scrolling
- **3D & Visuals:** Three.js with React Three Fiber, Rapier physics, custom GLSL shaders
- **Internationalization:** next-intl with English (`en`) and Bangla (`bn`), defaulting to English
- **Backend:** FastAPI (Python) in `backend/`, with Supabase (Postgres, Auth, Storage) for content, contact messages and admin sign-in
- **Admin:** a custom site at `/admin` (projects, blog posts, FAQs, tech lists, settings, messages, media), English and Bangla
- **Chat Assistant:** `/api/chat` forwards to the Python backend, grounded in the published content, using Groq with Google Gemini as fallback
- **Hosting:** Vercel (Next.js and the private Python service in one project, see `vercel.json`)

---

## Project Structure

```text
auravine-website/
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── api/                # Thin routes: chat, contact, revalidate, and the admin proxy
│   │   ├── admin/              # The admin site
│   │   ├── projects/           # Solutions (case studies)
│   │   ├── experience/         # Our process and engagement phases
│   │   ├── skills/             # Capabilities
│   │   ├── achievements/       # Commitments
│   │   ├── blog/               # Insights (articles)
│   │   ├── gallery/            # Studio gallery
│   │   ├── contact/            # Free consultation booking
│   │   └── resume/             # Company profile viewer (PDF)
│   ├── components/
│   │   ├── three/              # WebGL and R3F components
│   │   ├── sections/           # Page sections
│   │   └── ui/                 # Shared UI primitives and animated effects
│   ├── data/
│   │   └── portfolio.ts        # Fallback content (used until the cutover, see docs/BACKEND-PLAN.md)
│   ├── lib/content/            # Reads content from Supabase, falls back to portfolio.ts
│   ├── hooks/                  # Custom React hooks
│   └── i18n/ + lib/i18n.ts     # Locale configuration
├── messages/
│   ├── en.json                 # English copy
│   └── bn.json                 # Bangla copy
├── backend/                    # FastAPI service (contact, chat, admin API, backups)
├── supabase/migrations/        # SQL, applied by pasting into the Supabase SQL Editor
├── docs/                       # BACKEND-PLAN.md and the per-phase plans and findings
├── public/                     # Static assets (images, 3D models, PDFs)
├── next.config.ts
└── tailwind.config.ts
```

---

## Brand Assets

All imagery (logo, product screens, blog covers, badge textures, social image) is rendered from code so it always follows the design system in [DESIGN.md](DESIGN.md).

```bash
npm run assets:generate              # render every asset
npm run assets:generate -- shefa     # render only scenes whose name contains "shefa"
```

This needs Google Chrome or Chromium (set `CHROME_BIN` if it is not found automatically) and the Inter typeface installed. Scenes are defined in `scripts/brand-assets/scenes.mjs` and built from the helpers in `scripts/brand-assets/kit.mjs`. The logo is built separately by `scripts/brand-assets/build_logo.py`.

## Published Pages

Experience, Achievements, and Gallery are unpublished: they return 404 and are hidden from navigation. Edit `src/config/pages.ts` to publish them again.

## Updating Content

- **Company content** (projects, blog posts, FAQs, tech lists, contact details, social links) is edited in the admin at `/admin`, in English and Bangla. A save refreshes the public site within seconds. Sign in with the Supabase user that has a row in `admin_profiles`.
- **Interface copy** (page headings, buttons, the consultation form) lives in `messages/en.json` and `messages/bn.json`. Keep both files in sync when you change a key.
- **`src/data/portfolio.ts`** is only the fallback until the cutover (`CONTENT_SOURCE=supabase` turns the database on; anything else serves this file). Do not edit it for live changes.
- **Backups:** `cd backend && uv run python -m app.backup ../backups/<date>` exports every table to JSON. Keep the folder private (it holds contact messages).

---

## Local Development

### Prerequisites
- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone <your-repository-url> auravine-website
cd auravine-website
npm install
```

### Environment Variables

The Next.js app reads `.env.local` (copy `.env.example`: `CONTENT_SOURCE`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `REVALIDATE_SECRET`, `BACKEND_INTERNAL_URL`). The Python backend reads `backend/.env` (copy `backend/.env.example`: the service-role key, rate-limit salt, email and chat provider keys). Both files are git-ignored. In production the same names are set in the Vercel project. Never commit values.

```env
# Optional engineering-activity stats (GitHub, WakaTime)
NEXT_PUBLIC_GITHUB_USERNAME=your_github_org_or_user
GITHUB_TOKEN=your_github_token
WAKATIME_API_KEY=your_wakatime_key
```

### Run the Development Server

```bash
npm run dev          # the site: http://localhost:3000
npm run dev:api      # the Python backend: needs uv; see docs/BACKEND-PLAN.md ("Running locally")
```

Without Supabase variables the site serves `src/data/portfolio.ts`. Tests: `npx vitest run` (site) and `cd backend && uv run pytest -q` (backend). `scripts/check-secrets.sh` scans tracked files for credentials.

### Production Build

```bash
npm run build
npm start
```

---

## Before Going Live

- Replace placeholder contact details, social links, and the `metadataBase` URL in `src/app/layout.tsx`.
- Replace the sample case studies and insights with real client work and approved claims. Do not publish results or client names that you cannot verify.
- Replace the company logo, favicon, gallery photos, and certificate and profile PDFs in `public/`.
- Set `EMAIL_USER` and `EMAIL_APP_PASSWORD` in the Vercel project so consultation requests are emailed (they are stored in the database either way, and shown in the admin inbox). To use a CRM instead, change `backend/app/routes/contact.py`.
- Follow the owner steps in `docs/plans/phase4-findings.md`, `phase5-findings.md` and `phase6-findings.md` (migrations, sign-ups off, keys, keep-alive secrets), then the cutover in `docs/plans/phase7-cutover.md`.

---

## License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <p>Built in Dhaka, Bangladesh by Auravine</p>
</div>
