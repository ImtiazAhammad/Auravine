<div align="center">

<img src="public/Arfazrll_light.svg" alt="Auravine logo" width="80" height="80" />

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
- **Chat Assistant:** `/api/chat` route, grounded in the company data in `src/data/portfolio.ts`, using Groq with Google Gemini as fallback

---

## Project Structure

```text
auravine-website/
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── api/                # Chat, contact, and optional stats routes
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
│   │   └── portfolio.ts        # Single source of company content
│   ├── hooks/                  # Custom React hooks
│   └── i18n/ + lib/i18n.ts     # Locale configuration
├── messages/
│   ├── en.json                 # English copy
│   └── bn.json                 # Bangla copy
├── public/                     # Static assets (images, 3D models, PDFs)
├── next.config.ts
└── tailwind.config.ts
```

---

## Updating Content

Most of the company content lives in two places:

1. **`src/data/portfolio.ts`**: company profile, solutions (case studies), delivery phases, research and training, commitments, technology stack, FAQs, insights (blog articles), and gallery items.
2. **`messages/en.json` and `messages/bn.json`**: interface copy, page headings, and the consultation form. Keep both files in sync when you change a key.

Images referenced from `portfolio.ts` live in `public/`. Replace the files at the same paths, or update the paths in the data file.

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

Create a `.env.local` file in the project root. All variables are optional unless a feature that needs them is in use.

```env
# AI assistant (chat widget)
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key

# Contact form (messages are emailed to EMAIL_USER via Gmail SMTP)
EMAIL_USER=hello@your-company.com
EMAIL_APP_PASSWORD=your_app_password

# Optional engineering-activity stats (GitHub, WakaTime)
NEXT_PUBLIC_GITHUB_USERNAME=your_github_org_or_user
GITHUB_TOKEN=your_github_token
WAKATIME_API_KEY=your_wakatime_key
```

### Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000`.

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
- Set `EMAIL_USER` and `EMAIL_APP_PASSWORD` in your hosting environment so consultation requests reach your team. To use a CRM instead, update `src/app/api/contact/route.ts`.

---

## License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <p>Built in Dhaka, Bangladesh by Auravine</p>
</div>
