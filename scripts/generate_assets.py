#!/usr/bin/env python3
"""Generate Auravine's illustrative website assets as SVG.

Run from the repository root:
    python3 scripts/generate_assets.py

Outputs (all overwritten on each run):
    public/Auravine_light.svg, public/Auravine_dark.svg   logo marks (light and dark theme)
    public/project/featured/<key>-hero.svg                hero visuals for solutions
    public/blog/<slug>.svg                                blog cover images
    public/studio/<key>.svg                               studio gallery images
    public/og-image.svg                                   social share image source (1200x630)
    public/og-image.png                                   social share image (needs headless Chrome, see render_og_png)

Every visual is illustrative. Replace them with real photos or screenshots when available.
"""
import os
import shutil
import subprocess
import textwrap
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
FONT = "Inter, Arial, sans-serif"

# Auravine palette: aurora gradient (teal -> indigo -> amber) on deep navy.
TEAL, INDIGO, AMBER = "#2dd4bf", "#6366f1", "#f59e0b"
NAVY, INK = "#0b1220", "#e2e8f0"
MUTED = "#94a3b8"


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"wrote {path.relative_to(ROOT)}")


def svg(w: int, h: int, label: str, body: str, defs: str = "") -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="{escape(label)}">\n'
        f"  <defs>{defs}</defs>\n{body}\n</svg>\n"
    )


def aurora(id_: str, x1=0, y1=0, x2=1, y2=1) -> str:
    return (
        f'<linearGradient id="{id_}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">'
        f'<stop offset="0" stop-color="{TEAL}"/><stop offset="0.55" stop-color="{INDIGO}"/>'
        f'<stop offset="1" stop-color="{AMBER}"/></linearGradient>'
    )


def background(id_: str, c1: str, c2: str) -> str:
    return (
        f'<linearGradient id="{id_}" x1="0" y1="0" x2="1" y2="1">'
        f'<stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>'
    )


def text(x, y, s, size=28, weight=400, fill=INK, anchor="start", family=FONT) -> str:
    return (
        f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" '
        f'fill="{fill}" text-anchor="{anchor}">{escape(s)}</text>'
    )


def lines(x, y, s, width_chars, size, weight, fill, step, anchor="start") -> str:
    out = []
    for i, line in enumerate(textwrap.wrap(s, width_chars)):
        out.append(text(x, y + i * step, line, size, weight, fill, anchor))
    return "\n  ".join(out)


# ---------------------------------------------------------------- logo
def logo(dark_mark: bool) -> str:
    if dark_mark:  # for light backgrounds: ink mark on a light tile
        tile = f'<rect x="16" y="16" width="480" height="480" rx="120" fill="#f8fafc" stroke="{INDIGO}" stroke-width="10"/>'
        ink = NAVY
        spark = AMBER
    else:  # for dark backgrounds: aurora tile with white mark
        tile = '<rect x="16" y="16" width="480" height="480" rx="120" fill="url(#au)"/>'
        ink = "#ffffff"
        spark = "#fde68a"
    body = f"""  {tile}
  <path d="M142 378 L256 132 L370 378" fill="none" stroke="{ink}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M196 292 L316 292" stroke="{ink}" stroke-width="36" stroke-linecap="round"/>
  <circle cx="392" cy="128" r="28" fill="{spark}"/>"""
    return svg(512, 512, "Auravine logo", body, aurora("au"))


# ---------------------------------------------------------------- panels (hero motifs)
def panel_frame(px, py, w, h, accent) -> str:
    return (
        f'<rect x="{px}" y="{py}" width="{w}" height="{h}" rx="32" fill="#0f172a" stroke="{accent}" stroke-opacity="0.5" stroke-width="2"/>'
    )


def motif_chat(px, py, w, h, accent):
    rows = [
        (0, 70, False, "Hi, I'd like to book a visit."),
        (1, 150, True, "Sure. Three slots are open."),
        (0, 230, False, "The 10:15 slot, please."),
        (1, 310, True, "Confirmed. Reference #2841."),
    ]
    out = [panel_frame(px, py, w, h, accent)]
    for side, y, mine, msg in rows:
        bw = 420
        bx = px + (w - bw - 40 if mine else 40)
        fill = accent if mine else "#1e293b"
        out.append(f'<rect x="{bx}" y="{py + y + 40}" width="{bw}" height="64" rx="22" fill="{fill}"/>')
        out.append(text(bx + 24, py + y + 80, msg, 24, 500, "#ffffff" if mine else INK))
    out.append(f'<rect x="{px + 40}" y="{py + h - 110}" width="{w - 80}" height="58" rx="29" fill="#1e293b"/>')
    out.append(text(px + 70, py + h - 73, "Type a message...", 22, 400, MUTED))
    return "\n  ".join(out)


def motif_scan(px, py, w, h, accent):
    cx, cy = px + w / 2, py + h / 2
    out = [panel_frame(px, py, w, h, accent)]
    for r, o in [(230, 0.25), (170, 0.4), (110, 0.6)]:
        out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{accent}" stroke-opacity="{o}" stroke-width="3"/>')
    out.append(f'<ellipse cx="{cx}" cy="{cy - 20}" rx="70" ry="92" fill="none" stroke="{accent}" stroke-width="7"/>')
    out.append(f'<path d="M{cx - 120} {cy - 160} v-30 h30 M{cx + 90} {cy - 190} h30 v30 M{cx - 120} {cy + 150} v30 h30 M{cx + 90} {cy + 180} h30 v-30" fill="none" stroke="{accent}" stroke-width="6" stroke-linecap="round"/>')
    out.append(f'<rect x="{px + 30}" y="{cy + 40}" width="{w - 60}" height="6" fill="{accent}" opacity="0.8"/>')
    out.append(text(cx, py + h - 60, "Liveness check passed", 26, 600, INK, "middle"))
    return "\n  ".join(out)


def motif_chart(px, py, w, h, accent):
    out = [panel_frame(px, py, w, h, accent)]
    heights = [120, 200, 160, 260, 220, 320]
    base = py + h - 120
    for i, hh in enumerate(heights):
        x = px + 60 + i * 90
        out.append(f'<rect x="{x}" y="{base - hh}" width="56" height="{hh}" rx="12" fill="{accent}" opacity="{0.45 + 0.09 * i:.2f}"/>')
    pts = " ".join(f"{px + 88 + i * 90},{base - hh - 30}" for i, hh in enumerate(heights))
    out.append(f'<polyline points="{pts}" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="12 10"/>')
    out.append(text(px + 40, py + 60, "Demand forecast", 28, 700, INK))
    out.append(text(px + 40, py + 98, "Next 6 weeks · illustrative", 20, 400, MUTED))
    out.append(f'<line x1="{px + 40}" y1="{base}" x2="{px + w - 40}" y2="{base}" stroke="#334155" stroke-width="2"/>')
    return "\n  ".join(out)


def motif_grid(px, py, w, h, accent):
    out = [panel_frame(px, py, w, h, accent)]
    defects = {(0, 2), (2, 1), (3, 0)}
    for r in range(3):
        for c in range(4):
            x = px + 50 + c * 135
            y = py + 110 + r * 135
            if (c, r) in defects:
                out.append(f'<rect x="{x}" y="{y}" width="110" height="110" rx="18" fill="#3f1d1d" stroke="#f87171" stroke-width="4" stroke-dasharray="10 6"/>')
            else:
                out.append(f'<rect x="{x}" y="{y}" width="110" height="110" rx="18" fill="#1e293b"/>')
                out.append(f'<rect x="{x + 22}" y="{y + 22}" width="66" height="66" rx="14" fill="{accent}" opacity="0.35"/>')
    out.append(text(px + 40, py + 60, "Line 2 · Live inspection", 28, 700, INK))
    out.append(text(px + 40, py + 96, "2 defects flagged · images logged", 20, 400, MUTED))
    return "\n  ".join(out)


def motif_products(px, py, w, h, accent):
    out = [panel_frame(px, py, w, h, accent)]
    out.append(text(px + 40, py + 60, "Recommended for you", 28, 700, INK))
    for i in range(3):
        x = px + 40 + i * 190
        y = py + 120
        out.append(f'<rect x="{x}" y="{y}" width="170" height="260" rx="24" fill="#1e293b" stroke="{accent}" stroke-opacity="{0.9 if i == 1 else 0.3}" stroke-width="{4 if i == 1 else 2}"/>')
        out.append(f'<circle cx="{x + 85}" cy="{y + 95}" r="50" fill="{accent}" opacity="{0.5 + 0.2 * i:.2f}"/>')
        out.append(f'<rect x="{x + 22}" y="{y + 175}" width="126" height="14" rx="7" fill="#475569"/>')
        out.append(f'<rect x="{x + 22}" y="{y + 200}" width="80" height="14" rx="7" fill="#334155"/>')
    out.append(f'<rect x="{px + 40}" y="{py + 430}" width="{w - 80}" height="120" rx="22" fill="{accent}" opacity="0.18"/>')
    out.append(text(px + 70, py + 478, "Search: \"blue cotton kurta\"", 24, 500, INK))
    out.append(text(px + 70, py + 516, "Typo-tolerant · Bangla & English", 20, 400, MUTED))
    return "\n  ".join(out)


def motif_calendar(px, py, w, h, accent):
    out = [panel_frame(px, py, w, h, accent)]
    out.append(text(px + 40, py + 60, "Doctor schedule · This week", 28, 700, INK))
    days = ["M", "T", "W", "T", "F", "S", "S"]
    for i, d in enumerate(days):
        out.append(text(px + 70 + i * 80, py + 120, d, 22, 600, MUTED, "middle"))
    for r in range(3):
        for c in range(7):
            x = px + 40 + c * 80
            y = py + 140 + r * 70
            lit = (r + c) % 4 == 0
            fill = accent if lit else "#1e293b"
            out.append(f'<rect x="{x}" y="{y}" width="64" height="52" rx="14" fill="{fill}" opacity="{0.85 if lit else 1}"/>')
    out.append(f'<rect x="{px + 40}" y="{py + 380}" width="{w - 80}" height="58" rx="16" fill="#1e293b"/>')
    out.append(text(px + 64, py + 418, "10:15 · Serial 14 · Confirmed", 22, 500, INK))
    out.append(f'<rect x="{px + 40}" y="{py + 456}" width="{w - 80}" height="58" rx="16" fill="#1e293b"/>')
    out.append(text(px + 64, py + 494, "11:00 · Reminder sent by SMS", 22, 500, INK))
    out.append(f'<rect x="{px + 40}" y="{py + 532}" width="230" height="44" rx="22" fill="{AMBER}" opacity="0.9"/>')
    out.append(text(px + 155, py + 561, "No-show risk: high", 20, 700, NAVY, "middle"))
    return "\n  ".join(out)


def motif_docs(px, py, w, h, accent):
    out = [panel_frame(px, py, w, h, accent)]
    for i in range(3):
        x = px + 60 + i * 30
        y = py + 90 + i * 30
        out.append(f'<rect x="{x}" y="{y}" width="360" height="440" rx="18" fill="#1e293b" stroke="#334155" stroke-width="2"/>')
    for j in range(7):
        out.append(f'<rect x="{px + 100}" y="{py + 170 + j * 46}" width="{300 - (j % 3) * 60}" height="12" rx="6" fill="#475569"/>')
    out.append(f'<rect x="{px + 100}" y="{py + 170 + 3 * 46 - 6}" width="260" height="30" rx="8" fill="{accent}" opacity="0.5"/>')
    out.append(f'<rect x="{px + 300}" y="{py + 500}" width="280" height="110" rx="22" fill="{accent}"/>')
    out.append(text(px + 322, py + 540, "Notice period: 60 days", 21, 600, "#ffffff"))
    out.append(text(px + 322, py + 578, "Source: contract p. 12 · §4.2", 17, 400, "#ffffff"))
    return "\n  ".join(out)


MOTIFS = {
    "chat": motif_chat, "scan": motif_scan, "chart": motif_chart, "grid": motif_grid,
    "products": motif_products, "calendar": motif_calendar, "docs": motif_docs,
}

# Solutions that still use old project screenshots: key, slug, title, category, subtitle, highlights, motif, colors.
SOLUTION_HEROES = [
    ("chatbot", "custom-business-chatbot", "Custom AI Chatbot for Customer Support", "Conversational AI",
     "Website, WhatsApp, and Messenger assistants that answer from your own documents.",
     ["Website & WhatsApp", "Cites sources", "Human handoff"], "chat", ("#0b1220", "#1e1b4b", "#818cf8")),
    ("face", "face-recognition-attendance", "Face Recognition Smart Attendance", "Computer Vision",
     "Touchless check-in with liveness checks and payroll-ready reports.",
     ["Touchless check-in", "Liveness detection", "Payroll exports"], "scan", ("#042f2e", "#0f172a", "#2dd4bf")),
    ("analytics", "business-analytics-dashboard", "Business Analytics & Forecasting Dashboard", "Business Intelligence",
     "Sales, stock, and operations in one view, with AI demand forecasts and smart alerts.",
     ["Unified data", "Demand forecasts", "Smart alerts"], "chart", ("#0f172a", "#1e293b", "#f59e0b")),
    ("docs", "document-intelligence-rag", "Document Intelligence & Knowledge Assistant", "Generative AI",
     "Search contracts and policies across your company, with page-level citations.",
     ["Page-level citations", "Respects access rights", "Private hosting"], "docs", ("#111827", "#312e81", "#a78bfa")),
    ("cv", "computer-vision-quality-inspection", "Computer Vision Quality Inspection", "Computer Vision",
     "Camera-based defect detection on the production line, with image traceability.",
     ["Real-time detection", "Image traceability", "Edge deployment"], "grid", ("#052e16", "#0f172a", "#4ade80")),
    ("recs", "ai-sales-and-recommendations", "AI Product Recommendations for E-Commerce", "E-Commerce AI",
     "Personalized recommendations and smart search that understands Bangla and English.",
     ["Personalized picks", "Typo-tolerant search", "Store integrations"], "products", ("#1f1235", "#3b0764", "#f472b6")),
    ("clinic", "clinic-management-saas", "Clinic Management SaaS with AI Assistance", "Enterprise SaaS",
     "Appointments, records, and billing for clinics, with no-show prediction.",
     ["Appointments & billing", "No-show prediction", "Role-based privacy"], "calendar", ("#0c4a6e", "#0f172a", "#38bdf8")),
]


def solution_hero(key, title, category, subtitle, highlights, motif, colors) -> str:
    c1, c2, accent = colors
    defs = background("bg", c1, c2) + aurora("au")
    body = [f'<rect width="1600" height="1000" fill="url(#bg)"/>']
    body.append(f'<rect x="{110}" y="120" width="{14 + len(category) * 13}" height="46" rx="23" fill="{accent}" opacity="0.2"/>')
    body.append(text(132, 152, category.upper(), 22, 700, accent))
    body.append(lines(110, 280, title, 20, 66, 800, "#ffffff", 80))
    body.append(lines(110, 560, subtitle, 42, 30, 400, "#cbd5e1", 42))
    for i, chip in enumerate(highlights):
        cx = 110 + (i % 2) * 330
        cy = 720 + (i // 2) * 74
        body.append(f'<rect x="{cx}" y="{cy}" width="{len(chip) * 13 + 40}" height="50" rx="25" fill="#ffffff" fill-opacity="0.08" stroke="{accent}" stroke-opacity="0.6"/>')
        body.append(text(cx + 20, cy + 33, chip, 22, 500, "#ffffff"))
    body.append(MOTIFS[motif](880, 160, 610, 680, accent))
    body.append(text(110, 940, "Sample visual · illustrative only", 20, 400, MUTED))
    return svg(1600, 1000, title, "\n  ".join(body), defs)


# ---------------------------------------------------------------- blog covers
BLOG_COVERS = [
    ("ai-voice-agents-for-business", "Why Every Business Needs an AI Voice Agent Now", "Applied AI", ("#0b1220", "#0f3d4a")),
    ("chatbots-that-cite-their-sources", "Chatbots That Cite Their Sources", "Applied AI", ("#0b1220", "#1e1b4b")),
    ("face-recognition-attendance-privacy", "Face Recognition Attendance: Accuracy, Liveness, and Privacy", "Software", ("#052e16", "#0f172a")),
    ("analytics-before-ai", "Start with Analytics Before You Start with AI", "Applied AI", ("#0f172a", "#422006")),
    ("about-auravine", "About Auravine: AI-First Software from Dhaka", "About Us", ("#0b1220", "#312e81")),
]


def blog_cover(title, category, colors) -> str:
    c1, c2 = colors
    defs = background("bg", c1, c2) + aurora("au")
    body = ['<rect width="1600" height="900" fill="url(#bg)"/>']
    for i, (y, op) in enumerate([(560, 0.35), (640, 0.25), (720, 0.18)]):
        body.append(f'<path d="M0 {y} C 320 {y - 120}, 640 {y + 120}, 960 {y} S 1440 {y - 90}, 1600 {y}" fill="none" stroke="url(#au)" stroke-width="{10 - i * 2}" opacity="{op + 0.3}"/>')
    body.append(f'<circle cx="1330" cy="180" r="150" fill="url(#au)" opacity="0.25"/>')
    body.append(f'<rect x="110" y="110" width="{14 + len(category) * 13}" height="46" rx="23" fill="#ffffff" fill-opacity="0.1"/>')
    body.append(text(132, 142, category.upper(), 22, 700, "#ffffff"))
    body.append(lines(110, 340, title, 24, 78, 800, "#ffffff", 92))
    body.append(text(110, 820, "Auravine · AI-first software from Dhaka", 26, 500, "#cbd5e1"))
    return svg(1600, 900, title, "\n  ".join(body), defs)


# ---------------------------------------------------------------- studio gallery
STUDIO = [
    ("discovery-workshop", "Discovery Workshop", "Mapping business processes with a client team.", "arcs"),
    ("product-demo", "Product Demo Session", "Walking stakeholders through a working prototype.", "screen"),
    ("computer-vision-lab", "Computer Vision Lab", "Testing detection models on real camera feeds.", "dots"),
    ("team-build-day", "Team Build Day", "Planning the next quarter of AI product development.", "triangles"),
]


def studio(title, caption, kind) -> str:
    defs = background("bg", NAVY, "#1e1b4b") + aurora("au")
    body = ['<rect width="1200" height="800" fill="url(#bg)"/>']
    if kind == "arcs":
        for i, r in enumerate([70, 120, 170, 220]):
            body.append(f'<circle cx="600" cy="290" r="{r}" fill="none" stroke="url(#au)" stroke-width="{12 - i * 2}" opacity="0.85"/>')
    elif kind == "screen":
        body.append('<rect x="300" y="90" width="600" height="340" rx="26" fill="#0f172a" stroke="url(#au)" stroke-width="6"/>')
        body.append('<rect x="330" y="120" width="180" height="280" rx="16" fill="#1e293b"/><rect x="540" y="120" width="330" height="120" rx="16" fill="#1e293b"/><rect x="540" y="260" width="330" height="120" rx="16" fill="url(#au)" opacity="0.6"/>')
    elif kind == "dots":
        for r in range(5):
            for c in range(10):
                col = TEAL if (r * c) % 7 == 3 else "#334155"
                body.append(f'<circle cx="{180 + c * 90}" cy="{110 + r * 70}" r="{14 if col == TEAL else 9}" fill="{col}"/>')
    else:  # triangles
        for i, x in enumerate([330, 600, 870]):
            body.append(f'<path d="M{x} {110 + i * 20} L{x + 150} {400} L{x - 150} {400} Z" fill="url(#au)" opacity="{0.45 + i * 0.2:.2f}"/>')
    body.append(text(600, 560, title, 52, 800, "#ffffff", "middle"))
    body.append(text(600, 612, caption, 26, 400, "#cbd5e1", "middle"))
    body.append(text(600, 700, "Sample visual · illustrative only", 20, 400, MUTED, "middle"))
    return svg(1200, 800, title, "\n  ".join(body), defs)


def og_image() -> str:
    defs = background("bg", NAVY, "#1e1b4b") + aurora("au")
    tile = (
        '<rect x="90" y="200" width="230" height="230" rx="54" fill="url(#au)"/>'
        '<path d="M130 390 L205 228 L280 390" fill="none" stroke="#ffffff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>'
        '<path d="M160 340 L250 340" stroke="#ffffff" stroke-width="24" stroke-linecap="round"/>'
        '<circle cx="290" cy="210" r="18" fill="#fde68a"/>'
    )
    body = [
        '<rect width="1200" height="630" fill="url(#bg)"/>',
        '<circle cx="1100" cy="80" r="260" fill="url(#au)" opacity="0.18"/>',
        tile,
        text(380, 290, "Auravine", 92, 800, "#ffffff"),
        text(380, 360, "AI-first software from Dhaka, Bangladesh", 34, 500, "#cbd5e1"),
        text(380, 430, "AI voice agents · Chatbots · Computer vision · Analytics", 28, 400, MUTED),
    ]
    return svg(1200, 630, "Auravine: AI-first software from Dhaka", "\n  ".join(body), defs)


def render_og_png() -> None:
    """Rasterize og-image.svg to og-image.png with headless Chrome.

    Set CHROME_BIN to your Chrome or Chromium binary if it is not on PATH.
    If no browser is found, the step is skipped and the SVG is used instead.
    """
    candidates = [os.environ.get("CHROME_BIN"), "google-chrome", "chromium", "chromium-browser", "chrome"]
    browser = next((shutil.which(c) for c in candidates if c and shutil.which(c)), None)
    if not browser:
        print("skipped og-image.png: no Chrome/Chromium found (set CHROME_BIN to enable)")
        return
    out = PUBLIC / "og-image.png"
    subprocess.run(
        [browser, "--headless", "--no-sandbox", "--disable-gpu", "--window-size=1200,630",
         f"--screenshot={out}", (PUBLIC / "og-image.svg").as_uri()],
        check=False, capture_output=True, timeout=120,
    )
    print(f"wrote {out.relative_to(ROOT)}" if out.exists() else "og-image.png was not produced")


def main() -> None:
    write(PUBLIC / "Auravine_light.svg", logo(dark_mark=True))
    write(PUBLIC / "Auravine_dark.svg", logo(dark_mark=False))
    for key, slug, title, category, subtitle, highlights, motif, colors in SOLUTION_HEROES:
        write(PUBLIC / "project" / "featured" / f"{key}-hero.svg",
              solution_hero(key, title, category, subtitle, highlights, motif, colors))
    for slug, title, category, colors in BLOG_COVERS:
        write(PUBLIC / "blog" / f"{slug}.svg", blog_cover(title, category, colors))
    for key, title, caption, kind in STUDIO:
        write(PUBLIC / "studio" / f"{key}.svg", studio(title, caption, kind))
    write(PUBLIC / "og-image.svg", og_image())
    render_og_png()


if __name__ == "__main__":
    main()
