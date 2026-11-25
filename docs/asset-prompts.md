# Image prompts for Auravine's site assets

Every file below already exists (drawn from code by `npm run assets:generate`), so the site shows something today. Generate better ones and **save each under the exact path and filename shown**. No code or database change is needed: the pages already point at these paths. Any format and size is fine when you save it (PNG, JPG, WebP); say "assets are in place" and I will convert to WebP at the target size, check it on the site, and commit.

Keep the same aspect ratio as the target. Generate at the "ask for" size or larger.

## Shared style (paste at the start of every prompt)

> Clean modern B2B software imagery. Neutral off-white stage (#fafafa) with a very faint dot grid, soft top-right glow in emerald green (#047857 mint #34d399), ink black text (#171717), light grey borders (#e5e5e5), generous white space, rounded 12 px corners, soft shadows. Realistic app windows or phone screens, flat and sharp, viewed straight on. One accent colour only: emerald. No stock photos of people, no faces, no real brand logos, no watermarks, no 3D clutter. UI text must be tiny and unreadable or plain placeholder lines; do not rely on legible words. Premium, calm, trustworthy.

**Text note:** image models garble words. If a result has broken text, regenerate or blur it. The logo, the share image (`og-image.png`) and the 3D badge textures (`public/lanyard/*`) stay code-rendered: never AI-generate those. I will re-render them with the right font.

## 1. Project hero images (16:9, ask for 2400 x 1350, save as .webp/.png)

| File | Prompt (after the shared style) |
|---|---|
| `public/project/featured/shefa-hero.webp` | A hospital front-desk console in a browser window titled "Live calls": a list of three active phone calls on the left with a waveform and a two-language transcript (English and Bangla script) on the right, small buttons "Take over call". Healthcare, calm greens. |
| `public/project/featured/shefa-gallery.webp` | Same product, second view: a doctors and departments booking calendar for Cardiology, Medicine and ENT with appointment slots, beside a phone showing an SMS booking confirmation. |
| `public/project/featured/safar-hero.webp` | A commuter app on a phone showing a Dhaka-style street map with a fixed shuttle route, a small electric shuttle icon approaching a stop, and an "arrives in 4 min" card; a fleet-map dashboard window faint behind it. Electric mobility. |
| `public/project/featured/safar-gallery.webp` | Fleet operations dashboard: map with 25 vehicle dots on fixed routes, battery level bars, a route list and a daily rides chart. |
| `public/project/featured/handset-depot-hero.webp` | An online phone shop on a laptop and a phone: a grid of smartphone listings with condition badges (Like new, Good, Fair), prices, and filters. Pre-owned and new devices. |
| `public/project/featured/handset-depot-gallery.webp` | Admin back office: trade-in intake form with device grading checklist, an inventory table and a repair-ticket board. |
| `public/project/featured/spanishstitch-hero.webp` | Garment buying-house platform: a pipeline board with columns RFQ, Quoted, Order, Production, Shipped, cards with small fabric swatch thumbnails and due dates. |
| `public/project/featured/spanishstitch-gallery.webp` | Order detail screen: tech-pack summary, size breakdown table, buyer and factory timeline, and a sales pipeline funnel chart. |
| `public/project/featured/chatbot-hero.webp` | A website with a chat widget open: the customer asks a question, the assistant answers and shows a small "Source: Returns policy, page 3" citation chip. A messenger-style phone beside it. |
| `public/project/featured/face-hero.webp` | A touchless attendance kiosk tablet at an office door with a face-detection frame on an abstract faceless silhouette, beside a live attendance dashboard (present, late, absent counts). |
| `public/project/featured/analytics-hero.webp` | Business analytics dashboard: revenue line chart with a dashed AI forecast, inventory bars, KPI tiles, and a region table. |
| `public/project/featured/docs-hero.webp` | A knowledge assistant: a search box with a question, an answer panel citing three source documents (contract, policy, report) shown as small file cards with highlighted passages. |
| `public/project/featured/cv-hero.webp` | A production-line camera view with items on a conveyor, bounding boxes (green OK, one amber defect), and a side log of decisions with timestamps. |
| `public/project/featured/recs-hero.webp` | An online store product page with a "Recommended for you" carousel and a smart search dropdown showing suggestions; a small chart of average order value rising. |
| `public/project/featured/clinic-hero.webp` | Clinic management SaaS: appointment calendar, patient record card and a billing summary, with a subtle AI assistant suggestion bubble. |

## 2. Blog covers (16:9, ask for 2400 x 1350)

They are cropped to cards on the site, so keep the subject centred with space around it. Editorial, abstract, no readable text.

| File | Prompt |
|---|---|
| `public/blog/ai-voice-agents-for-business.webp` | A phone handset outline with a soft sound-wave rising from it, a glowing emerald dot in the centre, reception-desk shapes in the background. |
| `public/blog/chatbots-that-cite-their-sources.webp` | A chat bubble connected by thin lines to three small document cards (source citations), emerald check marks. |
| `public/blog/face-recognition-attendance-privacy.webp` | An abstract faceless head outline inside a scanning frame with a shield and lock symbol, calm and privacy-focused. |
| `public/blog/analytics-before-ai.webp` | A simple bar-and-line chart rising on a grid, with a small spark above the last bar hinting at AI to come. |
| `public/blog/about-auravine.webp` | A bold solid "A" shaped doorway mark (an arched doorway cut out of the base, one small round emerald dot inside) on the neutral stage. This one should follow `public/brand/auravine-mark.svg` exactly: **better to keep it code-rendered; skip unless you have a trusted tool.** |

## 3. "How we work" phases (4:3, ask for 1800 x 1350)

| File | Prompt |
|---|---|
| `public/process/discovery.webp` | A workshop board: four columns of sticky notes (pains in pale amber, goals in pale green), a process map with arrows, a note "Draft proposal ready". |
| `public/process/build.webp` | A build view: a Kanban sprint board, a design preview next to a code editor panel, and a progress bar. |
| `public/process/operate.webp` | An operations monitor: uptime graph, alerts list, a "Model v2.3 rolled out" event log, and monthly report card. |

## 4. Home page image-trail tiles (square, ask for 512 x 512, **transparent background**)

Rounded-square app-icon tiles (corner radius about 22%), one centred glyph, soft drop shadow below, transparent corners. Save as PNG or WebP with alpha; I will resize to 256.

| File | Tile colour / glyph colour / symbol |
|---|---|
| `public/feature/icons/image1.webp` | emerald tile, white glyph, phone handset |
| `public/feature/icons/image2.webp` | ink black tile, white glyph, chat bubble |
| `public/feature/icons/image3.webp` | white tile, emerald glyph, scan frame |
| `public/feature/icons/image4.webp` | emerald tile, white glyph, bar chart |
| `public/feature/icons/image5.webp` | white tile, ink glyph, document |
| `public/feature/icons/image6.webp` | ink tile, dark emerald (#065f46) glyph, bus |
| `public/feature/icons/image7.webp` | white tile, emerald glyph, camera |
| `public/feature/icons/image8.webp` | emerald tile, white glyph, sparkle |

## 5. Capabilities illustrations (square, ask for 1200 x 1200, **transparent background**)

They sit on dark cards. White thin line art (about 2 px at 600 px) inside a faint circle, no fill, no text.

| File | Symbol |
|---|---|
| `public/skills/business-understanding.webp` | rising bar chart |
| `public/skills/clear-communication.webp` | speech bubble |
| `public/skills/transparency.webp` | magnifying glass |
| `public/skills/ownership.webp` | shield |
| `public/skills/localization.webp` | globe |
| `public/skills/collaboration.webp` | three people-silhouettes as plain circles and shoulders |

Prompt for all six: "Thin white line illustration of <symbol>, centred inside a faint concentric circle, minimal, transparent background, no text, no fill."

## Where it all goes

Drop files at the paths above inside the repo folder (for example `public/blog/analytics-before-ai.webp`). Then tell me which groups are done and I will convert, size and check them, run the site, and commit. Images added later through `/admin` upload to Supabase Storage instead and need no files in the repo.
