# Auravine Website: Task List

Transformation of the original personal portfolio into the website for **Auravine**, an AI-first software development company in Dhaka, Bangladesh.

Legend: `[x]` done · `[ ]` needs your input or a follow-up

---

## 1. Analysis of the original repository

The repository was a single-person portfolio (AI/ML engineer and researcher). Its content fell into these groups:

| Area | Where | What was personal |
|---|---|---|
| Identity and bio | `src/data/portfolio.ts` (`personal`) | Name, first-person bio, personal social handles, languages, location |
| Projects (22 entries) | `src/data/portfolio.ts` (`projects`) | Academic, freelance, and personal builds; personal repo links |
| Experience, leadership, volunteer | `src/data/portfolio.ts` (`experiences`) | Employers, labs, and organizations of the owner |
| Education, achievements, certificates | `src/data/portfolio.ts`, `public/certificate/` | Degree, competitions, personal certificates |
| Blog | `src/data/portfolio.ts` (`blogs`), `src/app/blog/[slug]/page.tsx` | Placeholder bodies and a first-person manifesto hardcoded per slug |
| Interface copy | `messages/en.json`, `messages/id.json` | First-person copy, Telkom and CPS Lab references, Indonesian locale |
| Components | `src/components/**` | Hardcoded school and employer boxes, orbit labels, "Hi, I'm…" hero copy, Kaggle and GitHub and WakaTime showcases |
| Chatbot | `src/app/api/chat/route.ts` | System prompt framed as the owner's personal assistant, Indonesian language rule |
| Metadata and config | `src/app/layout.tsx`, `package.json`, `LICENSE`, `README.md` | Personal name, copyright holder, Jakarta timezone |
| Assets | `public/` | Photos, certificates, resume PDF, ID-card model, logos (**kept as-is**, see section 4) |

---

## 2. Decisions

- **Brand:** kept the name **Auravine**, which the earlier commits had already introduced.
- **Location:** Dhaka, Bangladesh. Timezone changed from `Asia/Jakarta` (UTC+7) to `Asia/Dhaka` (UTC+6).
- **Second language:** Indonesian is wrong for a Dhaka company, so the `id` locale is now **Bangla (`bn`)**. `messages/id.json` was replaced by `messages/bn.json`, with the same keys as English.
- **Assets:** no image, PDF, or model file was deleted or renamed. Only the text and data that reference them changed.
- **Solutions instead of personal projects:** the 22 projects became **8 AI solutions** that match the services you listed (voice agent, chatbot, face recognition attendance, analytics, plus document AI, computer vision QA, recommendations, and clinic SaaS). Each one reuses an existing project image.
- **No invented facts:** there are no client names, metrics, awards, or pricing. The old "achievements" became **commitments** (responsible AI, secure delivery, Bangla and English support). Case-study wording describes what we deliver, not measured results.
- **Experience becomes "Our Process":** the three engagement phases (discovery and design, build and integrate, launch and operate). Education becomes one entry for **Auravine AI Lab** as the research and training group.
- **Dead code removed:** components that were never imported and held personal copy, and components that only rendered personal data, were deleted (see section 3).
- **Route names kept** (`/projects`, `/experience`, `/skills`, `/achievements`, `/blog`, `/resume`) so links and SEO do not break. Only their visible labels changed.

---

## 3. Completed tasks

### Content and data
- [x] Rewrote `src/data/portfolio.ts`: company profile, 8 solutions, 3 delivery phases, 1 research entry, 3 commitments, tech stack, service capabilities, soft skills, tools, 6 FAQs, 5 insight articles with full text, 4 gallery items.
- [x] Attached existing project images and gallery images to the new solutions (mapping in section 4).
- [x] Removed the Spotify handle, the personal Instagram handle, the Kaggle and personal GitHub and WakaTime references, and the Rickroll placeholder video from the gallery.
- [x] Rewrote `messages/en.json` (all keys kept).
- [x] Created `messages/bn.json` and removed `messages/id.json`.
- [x] Chatbot: rewrote the system prompt as a company sales assistant. It now says not to quote prices or timelines and to invite visitors to book a consultation.

### Locale, timezone, and labels
- [x] Locales changed from `en`/`id` to `en`/`bn` in `src/i18n/settings.ts`, `src/lib/i18n.ts`, and `src/components/layout/Navbar.tsx`. The language toggle label now shows "বাংলা".
- [x] Timezone changed to `Asia/Dhaka` in `src/i18n/request.ts`, `src/lib/i18n.ts`, `src/providers/I18nProvider.tsx`, and the footer clock (UTC+6).
- [x] Footer: name and location changed to AURAVINE and Dhaka, Bangladesh. Map link updated.
- [x] Hero, About, Experience, Achievements, Contact, and Blog copy rewritten in the company voice.
- [x] Visible "portfolio" wording removed from the resume page, the chat button label, and the gallery card.

### Metadata
- [x] Root metadata: title template, description, keywords, and Open Graph and Twitter copy now describe the company.
- [x] Section metadata (`skills`, `projects`, `achievements`, `experience`, `contact`) rewritten.
- [x] `package.json` and `package-lock.json` renamed to `auravine-website`.
- [x] `LICENSE` copyright holder changed to Auravine.

### Components and pages
- [x] `InnovativeExperienceHero`: orbit labels now describe research, process, and services.
- [x] `ExperienceStickyScroll`: school boxes replaced with "Auravine AI Lab" and client delivery boxes.
- [x] `AboutSection`: timeline now shows the three delivery phases.
- [x] `HeroVisual`, `MarqueeClosing`, `SmoothScrollHero`: first-person copy replaced.
- [x] `resume` page: now shows `public/resume.pdf` locally. It no longer embeds the owner's Google Drive file. The PDF viewer loads client-side only, which fixes a server-render crash.
- [x] `getProjectImages.ts`: stale comments that named personal projects removed.
- [x] Blog detail page (`src/app/blog/[slug]/page.tsx`): rewritten as one article renderer that reads `post.content`. The per-slug hardcoded bodies and the first-person manifesto were removed.

### Removed personal-only code
- [x] `src/components/ui/kaggle-showcase.tsx` and `src/app/api/kaggle-stats/route.ts` (personal Kaggle profile data)
- [x] `src/components/ui/github-showcase.tsx` and `src/components/ui/wakatime-showcase.tsx` (personal repos and coding stats)
- [x] `src/components/sections/CertificateHeroScroll.tsx` and `src/components/ui/certificate-marquee.tsx` (personal certificate lists)
- [x] `src/components/sections/ExperienceMarquee.tsx` (logo wall of former employers and schools)
- [x] Dead components with personal copy: `AboutMeHub.tsx`, `ExperienceTabsSection.tsx`, `blog/BlogBento.tsx`, `blog/ThoughtStreamClosing.tsx`, `blog/TypewriterCodeHero.tsx`, `projects/ProjectDetail.tsx`

### Documentation
- [x] `README.md` rewritten for the company: services, stack, structure, content-update guide, environment variables, and a pre-launch checklist.

---

## 4. Needs your input before launch

### Blocking for a public launch
- [ ] **Contact details.** The email and phone fields in `src/data/portfolio.ts` are empty. Add the business email, phone, and WhatsApp number.
- [ ] **Consultation form delivery.** Set `EMAIL_USER` and `EMAIL_APP_PASSWORD` in the hosting environment. Without them, form submissions cannot be sent.
- [ ] **Social links.** All links are `#` and the handles are the placeholder `auravine`. Replace with the real accounts.
- [ ] **Case studies.** The 8 solutions are realistic showcases, not verified client work. Replace them with real delivered projects, or label them clearly as sample solutions, before publishing. Do not add client names or results you cannot verify.
- [ ] **Domain.** `metadataBase` in `src/app/layout.tsx` is still `https://your-domain.com`.
- [ ] **Logo and favicon.** `src/app/layout.tsx` points to `/Auravine_light.svg` and `/Auravine_dark.svg`, which are **not in `public/`**. The folder only has `Arfazrll_light.svg` and `Arfazrll_dark.svg`, which belong to the old brand. Add the Auravine logo files at those paths.

### Assets to replace (kept as files, per your request)
- [ ] **Project images.** Each solution uses an image from the original project. They will look unrelated until you replace them:

  | Solution (`src/data/portfolio.ts`) | Current image(s) |
  |---|---|
  | AI Voice Agent for Customer Calls | `/project/swarmaiblogwriter1.webp` (+ 2, 3) |
  | Custom AI Chatbot for Customer Support | `/project/creativeportfoliowebsite1.webp` (+ 2, 3, 4) |
  | Face Recognition Smart Attendance | `/project/snbtinplatformpersiapansnbt20251.webp` (+ 20252) |
  | Business Analytics & Forecasting Dashboard | `/project/terraflowplatform1.webp` (+ terraflowplatform2) |
  | Document Intelligence & Knowledge Assistant | `/project/parallax/image1.webp` (+ 2, 3) |
  | Computer Vision Quality Inspection | `/project/parallax/image5.webp` (+ 6) |
  | AI Product Recommendations for E-Commerce | `/project/parallax/image7.webp` (+ 8) |
  | Clinic Management SaaS with AI Assistance | `/project/parallax/image9.webp` (+ 10) |

- [ ] **Resume / company profile.** `public/resume.pdf` is still the owner's CV. The "Company Profile" page (`/resume`) displays it. Replace the file with your company profile PDF, keeping the same name.
- [ ] **Certificates.** `public/certificate/` holds the owner's personal certificates (PDFs and images). They are no longer shown on the site. Delete them, or replace them with company certifications.
- [ ] **Lanyard 3D badge.** `public/lanyard/desain-kartu.webp` (the badge face) and `public/lanyard/card.glb` are used by the 3D badge on the contact page. Check them, and replace with a company badge design if they show the owner's identity.
- [ ] **Photos.** `public/gallery/` and `public/journey/` contain the owner's personal photos. The About timeline and the About page collage still use some of them. The Gallery page now uses stock images. Replace with studio photos.
- [ ] **Partner logos.** `public/assets/` contains logos of the owner's former schools, employers, and organizations. Nothing displays them any more. Remove them, or keep only logos of partners you are authorized to show.
- [ ] **Blog and gallery images.** These are Unsplash stock URLs. Replace with your own imagery when available.

### Optional configuration
- [ ] **Engineering stats.** `NEXT_PUBLIC_GITHUB_USERNAME`, `GITHUB_TOKEN`, and `WAKATIME_API_KEY` are optional. The GitHub and WakaTime showcases were removed from the About page, so these only matter if you bring the widgets back with company accounts.

---

## 5. Follow-up cleanups (not blocking)

- [ ] `src/app/experience/page.tsx` and `src/components/sections/ExperienceStickyScroll.tsx` still contain logo-inversion checks named after former employers. This is code only, not visible text, and the logo lookups are no longer fed by data. Remove when convenient.
- [ ] `src/components/ui/showcase-stack.tsx` is no longer used.
- [ ] `graphify-out/` (generated code graph) was checked and contains no personal names. Regenerate it when the code settles.
- [ ] Gallery captions, insight article images, and FAQ wording were written for a generic AI services company. Review them with the team before launch.

---

## 6. Verification

- [x] `npx tsc --noEmit` passes. The only error at first was stale generated types in `.next/dev/types/validator.ts`, which still referenced the deleted Kaggle route. Running `next dev` regenerated them; the regenerated `validator.ts` and `routes.d.ts` are committed so a fresh checkout builds.
- [x] `npm run build` passes (27 static pages).
- [x] Started the built server and requested `/`, `/projects`, `/projects/ai-voice-agent`, `/experience`, `/skills`, `/achievements`, `/blog`, `/blog/ai-voice-agents-for-business`, `/gallery`, `/contact`, and `/resume`. All returned 200. The Bangla locale home page also returned 200.
- [x] Fixed `/resume` returning 500 during server rendering (`DOMMatrix is not defined` from `react-pdf`). The PDF viewer now loads only in the browser. This failure predates these changes.
- [ ] Visual review in a browser (light and dark themes, mobile width, both languages). Not done.
- [ ] Final copy review by someone at Auravine before launch.

