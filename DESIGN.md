# Auravine — Design System

This documents the system as implemented. Tokens live in `src/styles/globals.css` and `tailwind.config.ts`.

## Colour

A neutral foundation with one brand accent. Light and dark themes share the same roles.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#ffffff` | `#000000` | Page |
| `--foreground` | `#171717` | `#fafafa` | Body text |
| `--muted-foreground` | `#6b6b6b` | `#a6a6a6` | Secondary text (4.9:1 on the muted surface) |
| `--border` | `#e5e5e5` | `#333333` | Borders |
| `--accent` | `#f5f5f5` | `#262626` | shadcn hover backgrounds only, not the brand |
| `--brand` | `#047857` | `#34d399` | Links, icons, focus rings, one chart series, CTA fills |
| `--brand-hover` | `#065f46` | `#6ee7b7` | Hover for brand text and icons |

Tailwind: `text-brand`, `bg-brand`, `border-brand/50`, `fill-brand/10`, `text-brand-hover`.

Rules:
- One brand cluster per viewport. No brand body text.
- Brand text only on the page or card background (≥ 4.5:1). Never on the muted surface.
- Brand fills take white text in light mode and black text in dark mode.
- Do not use emerald-600 `#059669` for text (fails contrast on white).
- Semantic exceptions in product screens only: warning (amber text on a pale amber pill) and defect (red) where the meaning requires it.

Browser surfaces are themed: text selection uses the brand at 22% opacity, `:focus-visible` draws a 2px brand outline, and the input caret is brand.

## Type

Inter for everything, as loaded by `next/font` in `src/app/layout.tsx`. Brand assets use Inter Display SemiBold for the wordmark. Numerals in data are tabular.

## Logo

- Mark ("Doorway A"): a solid A with true 60° edges; an arched doorway is cut out of its base and holds one small round dot. Ink A plus a brand-emerald dot on light, Paper A plus a mint dot on dark. Files in `public/brand/`.
- Lockups: horizontal (primary) and stacked, with "Auravine" in Inter Display SemiBold, outlined (`scripts/brand-assets/wordmark.svgpath`). The A's base sits on the wordmark baseline. One-colour `-black`, `-white`, `-emerald` versions exist for every lockup and mark.
- Small-size cut: `auravine-mark-small.svg` (wider doorway, larger dot) below 24 px tall. Use the full mark above that.
- App icon and favicon: the small-size mark on a rounded Ink tile, Paper tile in dark UI (`public/Auravine_light.svg`, `public/Auravine_dark.svg`, adaptive `public/favicon.svg`, plus `favicon.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`, `site.webmanifest`).
- In the app: `src/components/layout/Logo.tsx` renders the lockup or mark and swaps light/dark artwork with the theme. It is used in the navbar and footer.
- Rebuild every SVG: `npm run assets:logo` (`scripts/brand-assets/build_logo.py`, standard library only). The PNG and ICO icons are rendered from `public/brand/app-icon.svg` and `app-icon-maskable.svg` with any SVG renderer.
- Full rules, colours, minimum sizes and misuse: `brand-kit/BRAND-GUIDELINES.md`. Presentation board: `brand-kit/presentation/`. Concept history: `brand-kit/concepts/`.
- Known gap: images rendered by `npm run assets:generate` before this change (`og-image.png`, the blog cover for "About Auravine", the lanyard textures, two chatbot avatars) still show the previous mark. `kit.mjs` already draws the new one. Re-render them on a machine with Inter installed so the type matches.

## Imagery

All imagery is rendered from code by `scripts/brand-assets/` (`npm run assets:generate`), so it always follows the tokens above:

- Product screens: realistic app windows and phones on a neutral dotted stage, with the soft brand glow top-right.
- Delivery-phase screens, blog covers, cursor-trail service tiles, value illustrations, the 3D badge texture, the lanyard strap, and the social share image.

Do not add stock photos of people. Use real photos of the team and clients' sites when they exist.

## Motion

The incumbent animation system is kept as-is (Framer Motion, GSAP, Lenis, 3D scenes). Remote Spline scenes fail soft: if they cannot load, a quiet fallback renders instead of an error page.
