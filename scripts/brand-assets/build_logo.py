"""Build the Auravine logo files from one geometry (standard library only).

    python3 scripts/brand-assets/build_logo.py            # writes public/brand and public/*.svg

The mark ("Doorway A") is a solid A with true 60 degree edges. An arched doorway is
cut out of its base and holds one small round "presence" (the aura, the AI core).
Drawn on a 256 grid; every path is a filled outline, no strokes, no live text.

The wordmark is "Auravine" in Inter Display SemiBold, already converted to outlines in
`wordmark.svgpath` (40 px set, cap height 29.08, width 157.81), so no font is needed here.
PNG / ICO rasters (apple-touch-icon, icon-192/512, maskable, favicon.ico) are rendered
from the SVGs this script writes; see DESIGN.md.
"""
import math
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
BRAND = ROOT / "public" / "brand"
PUBLIC = ROOT / "public"

WORD_D = (HERE / "wordmark.svgpath").read_text().strip()
WORD_W, WORD_CAP = 157.81, 29.08

# Palette (matches --brand / --foreground in src/styles/globals.css).
INK_L, DOT_L = "#171717", "#047857"      # on light surfaces
INK_D, DOT_D = "#fafafa", "#34d399"      # on dark surfaces
EMERALD = "#047857"

# ---------------------------------------------------------------- geometry
APEX = (128, 43.9)
BASE_L, BASE_R, BASE_Y = 24, 232, 224
DOOR = "M92 224 V170 A36 36 0 0 1 164 170 V224 Z"
DOT = (128, 195, 16)                      # cx, cy, r
CORNER = [26, 16, 16]                     # apex, base-right, base-left rounding

# Small-size cut (favicon, app icon, <= 24 px): wider door, bigger dot, sharper corners.
SMALL_DOOR = "M88 224 V164 A40 40 0 0 1 168 164 V224 Z"
SMALL_DOT = (128, 190, 20)
SMALL_CORNER = [18, 10, 10]


def rounded_poly(pts, radii):
    n = len(pts)
    segs = []
    for i in range(n):
        p0, p1, p2 = pts[i - 1], pts[i], pts[(i + 1) % n]

        def toward(a, b, d):
            length = math.hypot(b[0] - a[0], b[1] - a[1])
            return (a[0] + (b[0] - a[0]) * d / length, a[1] + (b[1] - a[1]) * d / length)

        segs.append((toward(p1, p0, radii[i]), p1, toward(p1, p2, radii[i])))
    d = f"M{segs[0][0][0]:.2f} {segs[0][0][1]:.2f}"
    for i, (a, v, b) in enumerate(segs):
        if i:
            d += f" L{a[0]:.2f} {a[1]:.2f}"
        d += f" Q{v[0]:.2f} {v[1]:.2f} {b[0]:.2f} {b[1]:.2f}"
    return d + " Z", segs


def bbox(segs):
    xs, ys = [], []
    for a, v, b in segs:
        for t in [i / 20 for i in range(21)]:
            xs.append((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * v[0] + t * t * b[0])
            ys.append((1 - t) ** 2 * a[1] + 2 * (1 - t) * t * v[1] + t * t * b[1])
    return min(xs), min(ys), max(xs), max(ys)


def mark_paths(ink, dot, small=False):
    tri, _ = rounded_poly([APEX, (BASE_R, BASE_Y), (BASE_L, BASE_Y)], SMALL_CORNER if small else CORNER)
    door = SMALL_DOOR if small else DOOR
    cx, cy, r = SMALL_DOT if small else DOT
    return (f'<path d="{tri} {door}" fill="{ink}" fill-rule="evenodd"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{dot}"/>')


_, SEGS = rounded_poly([APEX, (BASE_R, BASE_Y), (BASE_L, BASE_Y)], CORNER)
X0, Y0, X1, Y1 = bbox(SEGS)               # tight bounds of the mark on the 256 grid
MW, MH = X1 - X0, Y1 - Y0


def svg(vb, body, title="Auravine"):
    x, y, w, h = vb
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.2f} {y:.2f} {w:.2f} {h:.2f}" role="img" '
            f'aria-label="{title}"><title>{title}</title>{body}</svg>\n')


def wordmark(x, baseline, cap, fill):
    s = cap / WORD_CAP
    return f'<path transform="translate({x:.2f} {baseline - cap:.2f}) scale({s:.4f})" d="{WORD_D}" fill="{fill}"/>', WORD_W * s


# Horizontal lockup: the mark's base sits on the wordmark baseline, apex rises above cap height.
CAP, GAP = 150, 44


def horizontal(ink, dot, word):
    wm, ww = wordmark(X1 + GAP, BASE_Y, CAP, word)
    return svg((X0, Y0, X1 + GAP + ww - X0, MH), mark_paths(ink, dot) + wm)


# Stacked lockup: mark centred above the wordmark.
def stacked(ink, dot, word):
    cap = 112
    s = cap / WORD_CAP
    ww = WORD_W * s
    scale = 1.18
    mw, mh = MW * scale, MH * scale
    gap = 52
    width = max(ww, mw)
    mx = (width - mw) / 2 - X0 * scale
    my = -Y0 * scale
    body = (f'<g transform="translate({mx:.2f} {my:.2f}) scale({scale})">{mark_paths(ink, dot)}</g>'
            + wordmark((width - ww) / 2, mh + gap + cap, cap, word)[0])
    return svg((0, 0, width, mh + gap + cap), body)


def mark_only(ink, dot, small=False):
    if small:
        return svg((0, 0, 256, 256), mark_paths(ink, dot, small=True))
    return svg((X0, Y0, MW, MH), mark_paths(ink, dot))


def tile(bg, ink, dot, scale=0.72, small=True, rx=58):
    """Rounded app-icon tile with the mark optically centred (nudged up 2 %)."""
    cy_mark = (Y0 + Y1) / 2
    tx = 128 - 128 * scale
    ty = 128 - cy_mark * scale - 0.02 * 256
    return svg((0, 0, 256, 256),
               f'<rect width="256" height="256" rx="{rx}" fill="{bg}"/>'
               f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale})">{mark_paths(ink, dot, small=small)}</g>')


def favicon_adaptive():
    body = ('<style>.t{fill:#171717}.a{fill:#fafafa}.d{fill:#34d399}'
            '@media (prefers-color-scheme: dark){.t{fill:#fafafa}.a{fill:#171717}.d{fill:#047857}}</style>')
    scale = 0.72
    cy_mark = (Y0 + Y1) / 2
    tx, ty = 128 - 128 * scale, 128 - cy_mark * scale - 0.02 * 256
    tri, _ = rounded_poly([APEX, (BASE_R, BASE_Y), (BASE_L, BASE_Y)], SMALL_CORNER)
    cx, cy, r = SMALL_DOT
    body += ('<rect class="t" width="256" height="256" rx="58"/>'
             f'<g transform="translate({tx:.2f} {ty:.2f}) scale({scale})">'
             f'<path class="a" d="{tri} {SMALL_DOOR}" fill-rule="evenodd"/><circle class="d" cx="{cx}" cy="{cy}" r="{r}"/></g>')
    return svg((0, 0, 256, 256), body)


def write(path: Path, text: str):
    path.write_text(text, encoding="utf-8")


def main():
    BRAND.mkdir(parents=True, exist_ok=True)
    # Colour: ink A + emerald dot on light; paper A + mint dot on dark.
    write(BRAND / "auravine-mark.svg", mark_only(INK_L, DOT_L))
    write(BRAND / "auravine-mark-dark.svg", mark_only(INK_D, DOT_D))
    write(BRAND / "auravine-mark-small.svg", mark_only(INK_L, DOT_L, small=True))
    write(BRAND / "auravine-logo.svg", horizontal(INK_L, DOT_L, INK_L))
    write(BRAND / "auravine-logo-dark.svg", horizontal(INK_D, DOT_D, INK_D))
    write(BRAND / "auravine-logo-stacked.svg", stacked(INK_L, DOT_L, INK_L))
    write(BRAND / "auravine-logo-stacked-dark.svg", stacked(INK_D, DOT_D, INK_D))
    # One-colour: black, white, brand emerald.
    for tag, c in [("black", "#000000"), ("white", "#ffffff"), ("emerald", EMERALD)]:
        write(BRAND / f"auravine-mark-{tag}.svg", mark_only(c, c))
        write(BRAND / f"auravine-logo-{tag}.svg", horizontal(c, c, c))
    # App icons / favicons (Auravine_light is used in light UI, Auravine_dark in dark UI).
    write(PUBLIC / "Auravine_light.svg", tile(INK_L, INK_D, DOT_D))
    write(PUBLIC / "Auravine_dark.svg", tile(INK_D, INK_L, DOT_L))
    write(PUBLIC / "favicon.svg", favicon_adaptive())
    # Sources for the raster icon set (rendered by the maintainer; see DESIGN.md).
    write(BRAND / "app-icon.svg", tile(INK_L, INK_D, DOT_D))
    write(BRAND / "app-icon-maskable.svg", tile(INK_L, INK_D, DOT_D, scale=0.56, rx=0))
    print("logo files written to", BRAND)


if __name__ == "__main__":
    main()
