# Auravine: Logo Guidelines

Short on purpose. Write for people who are not designers.

## 1. The logo

**Idea:** a solid A that frames an arched doorway, with one small round presence inside. A welcome for the business owner, and the "aura" (the intelligence in the room) as a single emerald dot.

| Version | When to use | File |
|---|---|---|
| Horizontal (primary) | Headers, documents, email signatures, decks | `public/brand/auravine-logo.svg` |
| Stacked | Square or narrow spaces, covers, signage | `public/brand/auravine-logo-stacked.svg` |
| Symbol | Avatars, app icons, favicons, stamps | `public/brand/auravine-mark.svg` |
| Small-size symbol | Anything under 24 px tall | `public/brand/auravine-mark-small.svg` |

Every version also exists for dark backgrounds (`-dark`) and in one colour (`-black`, `-white`, `-emerald`).

## 2. Clear space

Keep a clear zone equal to **the width of the doorway** (about one third of the symbol's width) on all sides of the logo. Nothing enters this zone: no text, edges, or other logos. The zone scales with the logo.

## 3. Minimum size

| Version | Screen | Print |
|---|---|---|
| Horizontal | 120 px wide | 30 mm wide |
| Stacked | 72 px wide | 20 mm wide |
| Symbol | 24 px tall (below that, use the small-size symbol) | 8 mm tall |
| Small-size symbol | 16 px tall | 5 mm tall |

## 4. Colour

| Name | Role | HEX | RGB | CMYK (approx.) |
|---|---|---|---|---|
| Ink | The A and the wordmark on light | `#171717` | 23, 23, 23 | 0, 0, 0, 91 |
| Paper | The A and the wordmark on dark | `#FAFAFA` | 250, 250, 250 | 0, 0, 0, 2 |
| Emerald | The dot on light; one-colour brand version | `#047857` | 4, 120, 87 | 97, 0, 28, 53 |
| Mint | The dot on dark | `#34D399` | 52, 211, 153 | 75, 0, 27, 17 |

CMYK values are plain arithmetic conversions, not press-calibrated. Pantone references are not assigned: ask your printer to match the HEX on a proof before a print run.

Contrast, computed from the hex values: emerald on white 5.5:1, mint on Ink 9.3:1.

**Approved pairs:** colour on white or Paper · Paper version on Ink or black · one-colour black on any light surface · one-colour white on Ink, emerald, or a photo's calm area.

## 5. Typography

The wordmark is **Inter Display SemiBold**, already converted to outlines in every logo file. Never retype it. The website uses Inter throughout (see `DESIGN.md`). Inter is open source (SIL OFL).

## 6. App icon and favicon

The icon is the symbol on a rounded Ink tile (Paper tile in dark UI), with the dot in mint (or emerald on Paper). It uses the small-size symbol, so it stays legible at 16 px. Files: `public/Auravine_light.svg`, `public/Auravine_dark.svg`, `public/favicon.svg` (adapts to the browser theme), `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/icon-maskable-512.png`.

## 7. Don'ts

- Don't stretch, squash, rotate, or outline the logo.
- Don't recolour the dot (it is always emerald or mint) or put an emerald dot on an emerald surface. Use a one-colour version there.
- Don't use the full symbol below 24 px. Switch to the small-size symbol.
- Don't add shadows, gradients, glows, or effects.
- Don't rearrange or resize the parts of a lockup.
- Don't place it on busy imagery without a calm area or a solid container.
- Don't retype the wordmark, and don't use the previous logo (the thin arched A with a leaf).

## 8. Honest limits

- No trademark search has been done. Have a professional search before registering the mark. In review, the symbol was noted as loosely resembling other generic triangle marks.
- It can read as a tent or a house at a glance. That is acceptable here, but keep the wordmark next to it in first-contact uses.
- Raster images made earlier (social share image, blog covers, lanyard badge) still carry the previous mark until they are regenerated. See `DESIGN.md`.

## 9. Files and rebuilding

SVG masters live in `public/brand/`. Rebuild every SVG with `python3 scripts/brand-assets/build_logo.py` (standard library only). The PNG and ICO icons are rendered from `public/brand/app-icon.svg` and `public/brand/app-icon-maskable.svg`. Presentation board: `brand-kit/presentation/`. Concept history: `brand-kit/concepts/`.
