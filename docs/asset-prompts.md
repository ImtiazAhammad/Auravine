# Image prompts for the remaining Auravine site images

These are the images that are still the older code-drawn versions. Each prompt is **complete on its own**: paste it as it is, no shared style to prepend. Save the result at the exact path shown. Any format is fine (PNG, JPG, WebP). Tell me which groups are in place and I will convert to WebP at the right size, check them on the site and deploy.

Already replaced (do not redo): `shefa-hero`, `shefa-gallery`, `cv-hero`, `face-hero`, `handset-depot-hero`, `recs-hero` and the `ai-voice-agents-for-business` blog cover.

## The look to ask for: a real screenshot, not a mockup

The old images read as "designed concepts". These prompts ask for the opposite: **a plain screenshot of a working product**, the kind you would take on your own screen.

What that means in practice (every prompt below already says it):

- Flat, straight-on, edge to edge. No device frames, no perspective tilt, no floating cards on a gradient, no glow, no 3D.
- Dense and ordinary. Real tables with real rows, small text, scrollbars, a sidebar, a top bar, a few empty or half-filled fields. Real products are not tidy.
- Believable data: Bangladeshi names, BDT amounts, local place names, dates in 2026, timestamps like 14:32. Numbers that do not round neatly.
- Light interface, white and grey, one emerald accent (#047857) for primary buttons and "good" states. Amber for warnings. That keeps every screenshot in one family with the site.
- No brand logos, no real people's photos. Avatars are plain coloured initials.

If an image model returns garbled words, regenerate once; small garbled text is fine because the screenshots are shown small. Large headings must read correctly.

Sizes: project images are 16:9, ask for 2400 x 1350. Blog covers 16:9, 2400 x 1350. Process images 4:3, 1800 x 1350.

---

## 1. Project images (16:9, 2400 x 1350)

### `public/project/featured/safar-hero.webp`

> A real full-screen screenshot of a commuter web app for an electric shuttle service in Dhaka, light theme, flat and straight-on with no device frame. Left 35%: a booking panel with the route "Uttara Sector 7 to Gulshan 2", a "Next shuttle arrives in 4 min" card, a fare of "BDT 80", seat count "9 of 14 free", and a green "Reserve a seat" button. Right 65%: a street map of Dhaka with a fixed shuttle route drawn as a thick green line, a small electric shuttle marker approaching a stop, stop names on the line. Browser address bar visible at the top. Ordinary, slightly busy, real product feel. Light grey and white interface, emerald green accent only. No logos, no photos of people, no glow, no 3D.

### `public/project/featured/safar-gallery.webp`

> A real screenshot of a fleet operations dashboard for an electric shuttle company, light theme, flat and straight-on, no device frame. A left sidebar (Live map, Vehicles, Routes, Charging, Reports). Main area: a map with 25 small vehicle dots on fixed routes, one dot flagged amber; a table of vehicles on the right with columns Vehicle ID (SF-014), Route, Battery %, Speed, Status (On route / Charging / Idle); a small bar chart "Rides per day" for the last 14 days. Realistic numbers (battery 82%, 41%, 17%). Dense, ordinary, a few scrollbars. Emerald green accent, amber for the low-battery warning. No logos, no glow.

### `public/project/featured/handset-depot-gallery.webp`

> A real screenshot of the back office of a phone resale shop, light theme, flat and straight-on, no device frame. Left sidebar: Inventory, Trade-ins, Repairs, Orders, Reports. Main area split in three: a trade-in intake form with a device grading checklist (screen, body, battery health 87%, face unlock, a "Grade B" badge); an inventory table with columns IMEI (last 4 digits), Model, Storage, Grade, Cost, Price in BDT; and a small repair-ticket board with three columns To do, In progress, Done holding five cards. Realistic phone model names kept generic ("Galaxy A54", "iPhone 12"). Dense and ordinary. Emerald accent only. No brand logos, no glow.

### `public/project/featured/spanishstitch-hero.webp`

> A real screenshot of an order pipeline board for a garment buying house, light theme, flat and straight-on, no device frame. Top bar with search and a user avatar showing initials "RK". Kanban columns: RFQ, Quoted, Order, Production, Shipped. Each card shows a buyer name (made-up European brands), style number like "ST-2231", a quantity such as "12,000 pcs", an FOB price in USD, a due date, and a small square fabric swatch thumbnail. Eighteen cards in total, uneven column heights, one card marked with an amber "Due in 3 days" chip. Column counts in the headers. Ordinary and slightly crowded like a real tool. Emerald accent only. No logos, no glow.

### `public/project/featured/spanishstitch-gallery.webp`

> A real screenshot of an order detail page in a garment buying-house system, light theme, flat and straight-on, no device frame. Header with the order number "PO-24-0871", buyer, status "In production" as an emerald badge. Tabs: Overview, Tech pack, Samples, Timeline. Body: a tech-pack summary block with fabric composition "60% cotton 40% polyester" and GSM 220; a size breakdown table with sizes S to XXL and quantities; a vertical timeline of milestones with dates; a small funnel chart of the sales pipeline on the right. Realistic numbers. Dense, ordinary. Emerald accent only. No logos, no glow.

### `public/project/featured/chatbot-hero.webp`

> A real screenshot of a webshop's support chat window opened on a normal storefront page, light theme, flat and straight-on, no device frame, browser address bar visible. The storefront shows a faded product grid behind. The chat panel at bottom right shows a conversation: customer asks "Can I return it after 10 days?", the assistant answers "Yes. Returns are accepted within 7 days of delivery with tags attached. After that, we can offer an exchange.", followed by a small source chip "Returns policy, section 3" with a document icon, and a "Talk to a person" link under the reply. A text input at the bottom. Realistic, ordinary. Emerald accent on the send button and the source chip only. No logos, no glow.

### `public/project/featured/analytics-hero.webp`

> A real screenshot of a business analytics dashboard for a retail company, light theme, flat and straight-on, no device frame. Top row of six KPI tiles with small deltas: Revenue BDT 4.82M (+6.4%), Orders 3,214, Avg order BDT 1,500, Stock-outs 17, Returns 2.1%, Repeat buyers 38%. Middle: a revenue line chart for twelve months with a dashed forecast continuing for three months, labelled "Forecast". Below left: a bar chart of stock by category; below right: a table by region (Dhaka, Chattogram, Sylhet, Khulna) with revenue and growth. Date range picker and a filter row at the top. Dense, ordinary. Emerald line and accents only, grey for everything else. No logos, no glow.

### `public/project/featured/docs-hero.webp`

> A real screenshot of an internal "ask your documents" search tool, light theme, flat and straight-on, no device frame. A search box at the top holding the question "What is the notice period in the supplier contract?". Below, an answer panel with a two-sentence answer and three numbered citations. On the right, a list of three source file cards: "Supplier-Agreement-2025.pdf", "HR-Policy-v4.pdf", "Q3-Report.docx", each with a page number and a highlighted yellow passage excerpt. A left sidebar with folders and a recent questions list. Ordinary, slightly busy. Emerald accent on the search button and citation numbers only. No logos, no glow.

### `public/project/featured/clinic-hero.webp`

> A real screenshot of a clinic management web app, light theme, flat and straight-on, no device frame. Left sidebar: Calendar, Patients, Billing, Pharmacy, Reports. Main area: a weekly appointment calendar with colour-coded blocks (consultation, follow-up, procedure), a patient record side panel open on the right (name, age, allergies "Penicillin", last visit, vitals), and a small billing summary card (Total BDT 2,400, Paid BDT 1,500, Due BDT 900). A subtle "Suggested: follow-up in 2 weeks" assistant note in a small card with an emerald icon. Dense, ordinary. Emerald accent only, amber for the allergy warning. No logos, no glow.

---

## 2. Blog covers (16:9, 2400 x 1350)

Cropped to cards (16:10) on the home page and the blog, so keep the subject centred with space around it. These stay natural and real: either a plain screenshot or a quiet, soft-light photo. No readable headline text.

### `public/blog/chatbots-that-cite-their-sources.webp`

> A real screenshot, cropped tight, of a support chat conversation on a pale grey page: one dark bubble from the customer asking a short question, one white answer bubble with a small document-icon chip reading "Returns policy, section 3" underneath. Flat, straight-on, soft grey background with a very faint dot grid, emerald used only on the chip icon. Centred with generous empty space around it. No logos, no people, no glow.

### `public/blog/face-recognition-attendance-privacy.webp`

> A natural, soft-daylight photograph of a wall-mounted attendance tablet beside an office glass door, the screen showing a simple green "Checked in 09:02" confirmation and a camera lens at the top. No people, no faces, shallow depth of field, neutral grey and white office tones with a hint of green from the screen. Calm, realistic, not stock-photo glossy.

### `public/blog/analytics-before-ai.webp`

> A real screenshot, cropped tight, of a clean analytics chart: a bar-and-line chart of weekly sales over twelve weeks on a pale grey grid, the line rising gently, one small emerald highlighted bar at the end with a tooltip "Week 12, BDT 412k". Flat, straight-on, light interface, emerald accent only. Centred with generous empty space. No logos, no glow, no 3D.

### `public/blog/about-auravine.webp`

Keep this one code-rendered. It follows the brand mark exactly (`public/brand/auravine-mark.svg`), and an image model will not reproduce it faithfully. Skip.

---

## 3. "How we work" phases (4:3, 1800 x 1350)

### `public/process/discovery.webp`

> A real screenshot of an online whiteboard during a discovery workshop, flat and straight-on, light canvas with a faint dot grid. Four columns of sticky notes: pains in pale amber, goals in pale green, plus a simple process map made of boxes and arrows between the columns, and one note reading "Draft proposal ready". Small text on the notes, a floating toolbar on the left edge, a zoom control at the bottom right, two coloured collaborator cursors with name tags. Ordinary and a bit messy like a real board. No logos, no photos.

### `public/process/build.webp`

> A real screenshot of a software team's workspace, flat and straight-on, light theme. Left half: a sprint board with columns To do, In progress, In review, Done holding about twelve small cards with labels and tiny avatars with initials. Right half: a code editor panel showing a few lines of TypeScript beside a small UI preview of a form. A progress bar "Sprint 3, 72%" along the top. Ordinary and dense. Emerald accent on the progress bar and the "Done" column only. No logos.

### `public/process/operate.webp`

> A real screenshot of a monitoring dashboard, flat and straight-on, light theme. An uptime graph for the last 30 days at 99.97%, a response-time line chart, an alerts list with two resolved and one open item, an event log with the entry "Model v2.3 rolled out" and timestamps, and a small card "Monthly report ready" with a download button. Dense and ordinary. Emerald for healthy states, amber for the one open alert. No logos.

---

## 4. Home page icon tiles (square, 512 x 512, transparent background)

These are app-icon tiles, not screenshots, so the "real" rule means a clean, believable app-store icon.

> A single app icon, rounded square with corners at about 22% radius, soft realistic drop shadow underneath, transparent background outside the tile, one centred flat glyph, no text. <tile colour> tile with a <glyph colour> <symbol> glyph.

Fill in the placeholder from this table.

| File | Tile / glyph / symbol |
|---|---|
| `public/feature/icons/image1.webp` | emerald (#047857) / white / phone handset |
| `public/feature/icons/image2.webp` | ink black (#171717) / white / chat bubble |
| `public/feature/icons/image3.webp` | white / emerald / scan frame |
| `public/feature/icons/image4.webp` | emerald / white / bar chart |
| `public/feature/icons/image5.webp` | white / ink black / document |
| `public/feature/icons/image6.webp` | ink black / dark emerald (#065f46) / bus |
| `public/feature/icons/image7.webp` | white / emerald / camera |
| `public/feature/icons/image8.webp` | emerald / white / sparkle |

---

## 5. Capability illustrations (optional, square, 1200 x 1200, transparent background)

They sit on dark cards, so they stay as thin white line art. The current code-drawn ones already fit; replace them only if you want a different hand. Use this prompt for each, changing the symbol:

> Thin white line illustration of <symbol>, centred inside a faint concentric circle, minimal, transparent background, no text, no fill.

| File | Symbol |
|---|---|
| `public/skills/business-understanding.webp` | rising bar chart |
| `public/skills/clear-communication.webp` | speech bubble |
| `public/skills/transparency.webp` | magnifying glass |
| `public/skills/ownership.webp` | shield |
| `public/skills/localization.webp` | globe |
| `public/skills/collaboration.webp` | three people as plain circles and shoulders |

---

## Where it goes

Drop each file at its path inside the repo folder. Do not worry about format or size. Then tell me which groups are done and I will convert them, check every page, and deploy. Images added later through `/admin` upload to Supabase Storage and need no files in the repo.
