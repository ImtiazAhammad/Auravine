"""Build the Auravine logo files: mark, wordmark lockup, and favicons.

The wordmark is "Auravine" in Inter Display SemiBold, shaped with HarfBuzz
(real kerning) and converted to outlines so the SVGs need no font.
"""
import sys
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONT = "/usr/share/fonts/opentype/inter/InterDisplay-SemiBold.otf"
OUT = Path(sys.argv[1])

INK_LIGHT, LEAF_LIGHT = "#171717", "#047857"
INK_DARK, LEAF_DARK = "#fafafa", "#34d399"

# The mark, drawn on a 48x48 grid: arched A with a leaf crossbar.
LEGS = "M9 41 C 13 30, 18 18, 24 8 C 30 18, 35 30, 39 41"
LEAF = "M14.6 31.2 Q 22.8 22.2 33.4 26.2 Q 24.6 34 14.6 31.2 Z"


def mark_group(ink: str, leaf: str, x: float = 0, y: float = 0, scale: float = 1) -> str:
    return (
        f'<g transform="translate({x} {y}) scale({scale})">'
        f'<path d="{LEGS}" fill="none" stroke="{ink}" stroke-width="4.4" stroke-linecap="round"/>'
        f'<path d="{LEAF}" fill="{leaf}"/></g>'
    )


def wordmark_path(text: str, size: float, tracking_em: float):
    """Return (svg path d, width, cap height) for text set at `size` px."""
    blob = hb.Blob.from_file_path(FONT)
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})

    tt = TTFont(FONT)
    glyph_set = tt.getGlyphSet()
    upem = tt["head"].unitsPerEm
    scale = size / upem
    cap = tt["OS/2"].sCapHeight * scale
    order = tt.getGlyphOrder()

    pen = SVGPathPen(glyph_set)
    x = 0.0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        # Flip y (font units are y-up) and place on a baseline at y = cap height.
        t = TransformPen(pen, (scale, 0, 0, -scale, x + pos.x_offset * scale, cap))
        glyph_set[name].draw(t)
        x += pos.x_advance * scale + tracking_em * size
    width = x - tracking_em * size
    return pen.getCommands(), width, cap


def svg(w: float, h: float, body: str, label: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" role="img" aria-label="{label}">'
        f"{body}</svg>\n"
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "brand").mkdir(exist_ok=True)

    # Mark only.
    for name, ink, leaf in [("auravine-mark", INK_LIGHT, LEAF_LIGHT), ("auravine-mark-dark", INK_DARK, LEAF_DARK)]:
        (OUT / "brand" / f"{name}.svg").write_text(svg(48, 48, mark_group(ink, leaf), "Auravine"), encoding="utf-8")

    # Lockup: mark + wordmark. Wordmark cap height matches the mark's optical height.
    size = 40
    d, width, cap = wordmark_path("Auravine", size, -0.012)
    mark_scale = 1.0
    gap = 10
    total_w = 48 * mark_scale + gap + width
    h = 48
    text_y = (h - cap) / 2 + 1.5
    for name, ink, leaf in [("auravine-logo", INK_LIGHT, LEAF_LIGHT), ("auravine-logo-dark", INK_DARK, LEAF_DARK)]:
        body = mark_group(ink, leaf) + f'<path transform="translate({48 + gap} {text_y:.2f})" d="{d}" fill="{ink}"/>'
        (OUT / "brand" / f"{name}.svg").write_text(svg(total_w, h, body, "Auravine"), encoding="utf-8")

    # App-icon tiles for favicons (layout.tsx uses Auravine_light.svg in light UI, Auravine_dark.svg in dark UI).
    def tile(fill: str, ink: str) -> str:
        return svg(
            48,
            48,
            f'<rect width="48" height="48" rx="12" fill="{fill}"/>'
            f'<g transform="translate(6.6 5.4) scale(0.725)">'
            f'<path d="{LEGS}" fill="none" stroke="{ink}" stroke-width="5" stroke-linecap="round"/>'
            f'<path d="{LEAF}" fill="{ink}"/></g>',
            "Auravine",
        )

    (OUT / "Auravine_light.svg").write_text(tile(LEAF_LIGHT, "#ffffff"), encoding="utf-8")
    (OUT / "Auravine_dark.svg").write_text(tile(LEAF_DARK, "#000000"), encoding="utf-8")
    # favicon.svg adapts to the browser theme on its own.
    adaptive = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><style>'
        ".t{fill:#047857}.m{stroke:#fff}.l{fill:#fff}"
        "@media (prefers-color-scheme: dark){.t{fill:#34d399}.m{stroke:#000}.l{fill:#000}}"
        "</style>"
        '<rect class="t" width="48" height="48" rx="12"/>'
        '<g transform="translate(6.6 5.4) scale(0.725)">'
        f'<path class="m" d="{LEGS}" fill="none" stroke-width="5" stroke-linecap="round"/>'
        f'<path class="l" d="{LEAF}"/></g></svg>\n'
    )
    (OUT / "favicon.svg").write_text(adaptive, encoding="utf-8")
    print("logo files written to", OUT)


if __name__ == "__main__":
    main()
