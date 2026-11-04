# Auravine Website: Task List

Auravine is an AI-first software development company in Dhaka, Bangladesh. This file tracks the move from the original personal portfolio template to the company site.

Legend: `[x]` done · `[ ]` needs your input or a follow-up

See also: [PRODUCT.md](PRODUCT.md) (product truth) and [DESIGN.md](DESIGN.md) (design system).

---

## 1. Asset audit

Every file that was in `public/` was checked against one question: is it right for Auravine, or is it left over from the template or the previous owner?

| Asset | Verdict | Action |
|---|---|---|
| `Arfazrll_*.svg` (old brand logo) | Previous owner | Deleted |
| `about/arfazrll.webp` (portrait) | Previous owner | Deleted |
| `assets/*` (23 school and employer logos) | Previous owner | Deleted |
| `certificate/*` (35 personal certificates) | Previous owner | Deleted |
| `experience/*`, `gallery/*`, `journey/*` (personal photos) | Previous owner | Deleted; every slot now shows product screens |
| `lanyard/desain-kartu.webp` (ID card with the owner's name and photo) | Previous owner | Replaced with an Auravine badge |
| `lanyard/lanyard.webp` (React-logo strap) | Template | Replaced with an Auravine strap |
| `feature/icons/*` (cartoon stickers: "BUG", "GAME OVER", skull) | Template | Replaced with brand service tiles |
| `project/parallax/*` (anime landscapes, a city skyline) | Template | Deleted; strip now shows each solution's screen |
| `project/*.webp` (old personal project screenshots) | Previous owner | Deleted |
| My earlier SVG mockups, blog SVGs, studio SVGs | Low quality | Replaced with rendered screens |
| Remote Spline 3D scenes (template author's account) | Template | Kept for the animation, now fail soft |
| `illustrations.popsy.co` images on the Capabilities cards | Third-party template art | Replaced with local brand illustrations |
| `grid.svg`, `noise.svg`, `mask.svg` | Generic textures | Kept |
| `lanyard/card.glb` (3D card model) | Generic geometry | Kept, with the new badge texture |

## 2. Pages

| Page | Decision | Why |
|---|---|---|
| Home `/` | Published | Main landing page |
| Solutions `/projects` and detail pages | Published | Shows the work |
| Capabilities `/skills` | Published | Services, how we work, technology |
| Insights `/blog` and articles | Published | Guides for business owners |
| Contact `/contact` | Published | The primary action |
| Experience `/experience` | **Unpublished** | Built as a personal CV timeline (education tab, career "journey" gallery). Our process is shown on the home page instead. |
| Achievements `/achievements` | **Unpublished** | Built as a personal certificate archive |
| Gallery `/gallery` | **Unpublished** | A personal photo archive; there are no studio photos yet |

Unpublished pages return 404, are marked `noindex`, and disappear from every navigation menu. They are listed in `src/config/pages.ts`. Remove a route from that list to publish it again. The code is kept.

---

## 3. Done in this round

### Design system
- [x] Brand tokens added: `--brand` and `--brand-hover`, as a Tailwind `brand` key, decided by the design debate (emerald `#047857` in light mode, `#34d399` in dark mode).
- [x] Light-mode muted text moved to `#6b6b6b` for contrast on the muted surface.
- [x] Off-system colours replaced with the brand: lime `#D1FF4D` and `#c1e44a`, the failing `#8cb815`, the hero's sky and yellow icons, blue and violet accents on the Solutions pages, the orange folder, cyan on the Insights closing, the blue CTA ribbons, and the rainbow 3D cube faces.
- [x] Browser surfaces themed: text selection, focus rings, and the input caret.
- [x] Dead legacy colour blocks (`glow`, `bento`) removed from `tailwind.config.ts`.

### Content
- [x] Hero headline: AI-FIRST / SOFT⚡WARE / PARTN🤖ERS, kept inline on mobile.
- [x] Service panels rewritten as Conversational AI, Vision & Analytics, and Product Engineering.
- [x] Removed every remaining first-person or template line: "Available for opportunity", "Discover my latest work", "Professional Journey", "Strategic Directives", "Engineering the Future", "Go to Workspace", "Contact Me", "Feature & Docs", Creative Commons claims.
- [x] Fabricated numbers removed: "10+ articles, +2 new", "2+ years experience", "12+ active deployments", the made-up weekly chart. Stats now use real counts.
- [x] Fake newsletter form on Insights replaced with a working consultation link.
- [x] Solutions filters rebuilt for the current categories (all filters were empty before).
- [x] Detail pages: "Source code" and "Live demo" only show when real links exist; every solution offers "Request a walkthrough".
- [x] Error page: Dhaka time and location, plain-language messages (was Jakarta, Indonesian date).

### Assets (rendered from code)
- [x] Logo system: mark, lockup, dark versions, app tiles, adaptive favicon (`public/brand/`).
- [x] 15 product screens for all 11 solutions (`public/project/featured/*.webp`).
- [x] 3 delivery-phase screens (`public/process/`), 5 blog covers, 8 service tiles, 6 value illustrations, badge and strap textures, social share image.
- [x] Pipeline: `npm run assets:generate` renders everything from `scripts/brand-assets/scenes.mjs`.

### Robustness
- [x] Remote 3D scenes no longer crash Solutions and Capabilities when they cannot load.
- [x] Gallery API gated with the Gallery page. Template utility route `downloadlanyard` removed.

---

## 4. Needs your input before launch

- [ ] **Real screenshots and photos.** The product screens are faithful concepts with sample data, not captures of the live products. Replace them with real captures when you can. Keep the file names, or update the paths in `src/data/portfolio.ts`.
- [ ] **Shefa metrics.** 24/7, under 5 seconds, and about 2 minutes are illustrative and labelled as such on the page. Replace them with pilot data.
- [ ] **Featured project details.** Start dates are placeholders (`2026-01-01`). Confirm statuses, tech stacks, and whether you may name the clients.
- [ ] **Contact details.** Business email, phone, and social links (all `#`). Set `EMAIL_USER` and `EMAIL_APP_PASSWORD` for the contact form.
- [ ] **Domain.** `metadataBase` in `src/app/layout.tsx` is still `https://your-domain.com`.
- [ ] **Next.js security upgrade.** The build reports that Next.js 16.4.0 has a known vulnerability. Upgrade before launch.

## 5. Follow-ups (not blocking)

Impeccable's design detector flagged these patterns, which belong to the original template's look. I kept them because the brief was to keep the animations and visual structure:

- [ ] Gradient text on several headings (Insights, Capabilities, Solutions stats, timeline).
- [ ] Spring "bounce" easing on the 3D folder animation.
- [ ] A thick accent border on a rounded card in the About section.
- [ ] The whole site uses Inter. A more distinctive display face would help the brand stand out.
- [ ] Tech logos load from `cdn.simpleicons.org`. Self-host them if you want the site to work without that CDN.
- [ ] Unpublished pages still contain their original template structure. Rework them before publishing.

---

## 6. Verification

- [x] `npx tsc --noEmit` passes.
- [x] `npm run build` passes.
- [x] Every published page loads with no failed local requests (home, solutions, four detail pages, capabilities, insights, two articles, contact).
- [x] Unpublished routes and `/api/gallery` return 404.
- [x] Visual review of rendered pages in dark and light mode, and the home hero at phone width.
