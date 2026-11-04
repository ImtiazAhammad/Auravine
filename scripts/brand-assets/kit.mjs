// Shared visual kit for Auravine's rendered brand assets.
// Everything follows the site's design system: pure neutrals, one emerald
// brand accent, Inter. Scenes are composed from these helpers in scenes.mjs.

export const t = {
  bg: '#ffffff',
  fg: '#171717',
  muted: '#6b6b6b',
  subtle: '#a3a3a3',
  border: '#e5e5e5',
  surface: '#f5f5f5',
  stage: '#ededed',
  brand: '#047857',
  brandHover: '#065f46',
  brandSoft: '#e7f3ef',
  brandDark: '#34d399',
  danger: '#b42318',
  dangerSoft: '#fdecea',
  warn: '#92400e',
  warnSoft: '#fdf3e3',
  ink: '#0a0a0a',
};

const css = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%}
body{font-family:"Inter","Inter Variable",system-ui,sans-serif;color:${t.fg};-webkit-font-smoothing:antialiased;
  font-feature-settings:"cv11","ss01";font-variant-numeric:tabular-nums}
.stage{position:absolute;inset:0;background:${t.stage};overflow:hidden}
.stage.dots{background-image:radial-gradient(rgba(0,0,0,.07) 1px,transparent 1.2px);background-size:22px 22px}
.stage.dark{background:#000}
.stage.dark.dots{background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1.2px)}
.glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.5}
.win{position:absolute;background:${t.bg};border:1px solid ${t.border};border-radius:16px;overflow:hidden;
  box-shadow:0 40px 80px -30px rgba(0,0,0,.28),0 12px 24px -12px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.05)}
.bar{height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;border-bottom:1px solid ${t.border};background:#fafafa}
.bar i{width:11px;height:11px;border-radius:50%;background:#d9d9d9;display:block}
.bar .ttl{margin-left:14px;font-size:12.5px;color:${t.muted};font-weight:500}
.shell{display:grid;grid-template-columns:var(--side,212px) 1fr;height:calc(100% - 40px)}
.win.auto .shell{height:auto}
.win.auto .main{padding-bottom:28px}
.side{border-right:1px solid ${t.border};padding:18px 12px;display:flex;flex-direction:column;gap:2px;background:#fcfcfc}
.side .logo{display:flex;align-items:center;gap:9px;font-weight:650;font-size:14.5px;padding:2px 8px 16px}
.side .logo b{width:24px;height:24px;border-radius:7px;background:${t.brand};display:grid;place-items:center;color:#fff;font-size:12px}
.nav{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;font-size:13px;color:${t.muted};font-weight:500}
.nav.on{background:${t.surface};color:${t.fg}}
.nav.on svg{color:${t.brand}}
.nav .n{margin-left:auto;font-size:11px;color:${t.subtle}}
.main{padding:24px 28px;display:flex;flex-direction:column;gap:18px;min-width:0}
.head{display:flex;align-items:center;justify-content:space-between;gap:16px}
.h1{font-size:21px;font-weight:650;letter-spacing:-.015em}
.sub{font-size:13px;color:${t.muted}}
.row{display:flex;gap:14px}
.col{display:flex;flex-direction:column;gap:14px}
.card{border:1px solid ${t.border};border-radius:12px;background:${t.bg};padding:16px}
.card .lbl{font-size:12px;color:${t.muted};font-weight:500}
.kpi .v{font-size:26px;font-weight:650;letter-spacing:-.02em;margin-top:6px}
.kpi .d{font-size:12px;color:${t.brand};font-weight:550;margin-top:4px}
.btn{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:9px;font-size:13px;font-weight:550;
  border:1px solid ${t.border};background:${t.bg};color:${t.fg};white-space:nowrap}
.btn.pri{background:${t.brand};border-color:${t.brand};color:#fff}
.btn.dark{background:${t.ink};border-color:${t.ink};color:#fff}
.pill{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 9px;border-radius:999px;font-size:11.5px;font-weight:550;
  background:${t.surface};color:${t.muted};white-space:nowrap}
.pill.brand{background:${t.brandSoft};color:${t.brand}}
.pill.danger{background:${t.dangerSoft};color:${t.danger}}
.pill.warn{background:${t.warnSoft};color:${t.warn}}
.pill.dark{background:${t.ink};color:#fff}
.dot{width:7px;height:7px;border-radius:50%;background:currentColor;display:inline-block}
table{width:100%;border-collapse:collapse;font-size:13px}
th{font-size:11.5px;color:${t.muted};font-weight:550;text-align:left;padding:0 10px 10px;border-bottom:1px solid ${t.border}}
td{padding:11px 10px;border-bottom:1px solid #f0f0f0;white-space:nowrap}
tr:last-child td{border-bottom:0}
.av{width:28px;height:28px;border-radius:50%;background:${t.surface};display:inline-grid;place-items:center;font-size:11px;font-weight:600;color:${t.muted};flex:none}
.flex{display:flex;align-items:center;gap:10px}
.grow{flex:1;min-width:0}
.mono{font-family:"JetBrains Mono",ui-monospace,monospace}
.phone{position:absolute;background:#0b0b0b;border-radius:52px;padding:12px;
  box-shadow:0 50px 90px -30px rgba(0,0,0,.45),0 18px 30px -16px rgba(0,0,0,.3),inset 0 0 0 1.5px #2a2a2a}
.screen{width:100%;height:100%;border-radius:41px;overflow:hidden;background:${t.bg};position:relative}
.notch{position:absolute;top:11px;left:50%;transform:translateX(-50%);width:104px;height:30px;border-radius:20px;background:#0b0b0b;z-index:5}
.status{height:52px;display:flex;align-items:flex-end;justify-content:space-between;padding:0 30px 8px;font-size:13px;font-weight:600}
.bn{font-family:"FreeSans","Noto Sans Bengali",sans-serif}
.track{height:8px;border-radius:99px;background:${t.surface};overflow:hidden}
.track>i{display:block;height:100%;background:${t.brand};border-radius:99px}
.chip{padding:8px 12px;border-radius:10px;border:1px solid ${t.border};font-size:13px;font-weight:550;text-align:center}
.chip.on{background:${t.brand};border-color:${t.brand};color:#fff}
.chip.off{color:${t.subtle};background:${t.surface};border-color:${t.surface};text-decoration:line-through}
`;

// One consistent 1.75px stroke icon set (24px grid).
const ICONS = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  bars: '<path d="M3 21h18M7 17V10M12 17V5M17 17v-4"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 18v2M16 18v2"/><circle cx="8" cy="14.5" r=".6"/><circle cx="16" cy="14.5" r=".6"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L22 14l-8 8-2.3-2.3a4 4 0 0 0-5-5L4 12l8-8z" transform="scale(.9) translate(1 1)"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="10" r="3"/><path d="M7 18a5 5 0 0 1 10 0"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shirt: '<path d="M20.4 6.6 16 4a4 4 0 0 1-8 0L3.6 6.6a1 1 0 0 0-.5 1.2l1.3 3.5a1 1 0 0 0 1.2.6L8 11v10h8V11l2.4.9a1 1 0 0 0 1.2-.6l1.3-3.5a1 1 0 0 0-.5-1.2z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  store: '<path d="M3 9 4.5 4h15L21 9"/><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/>',
  sparkle: '<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0M12 17v5"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
};

export function icon(name, size = 16, color = 'currentColor', stroke = 1.75) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" style="flex:none">${ICONS[name] || ''}</svg>`;
}

export function page(width, height, body, { transparent = false, extraCss = '' } = {}) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}
html,body{background:${transparent ? 'transparent' : t.stage}}
.canvas{position:relative;width:${width}px;height:${height}px;overflow:hidden}${extraCss}</style></head>
<body><div class="canvas">${body}</div></body></html>`;
}

export function stage(inner, { dark = false, dots = true, glow = true } = {}) {
  const g = glow
    ? `<div class="glow" style="width:620px;height:620px;right:-160px;top:-200px;background:${dark ? 'rgba(52,211,153,.22)' : 'rgba(4,120,87,.14)'}"></div>`
    : '';
  return `<div class="stage${dark ? ' dark' : ''}${dots ? ' dots' : ''}">${g}${inner}</div>`;
}

// A window either sits at a fixed position and size, or (center: true) sizes to
// its content and centres vertically on the stage, starting at `x` (or centred).
export function win({ x = null, y, w, h, title = '', body, z = 1, center = false }) {
  const chrome = `<div class="bar"><i></i><i></i><i></i><span class="ttl">${title}</span></div>${body}`;
  if (center) {
    const justify = x === null ? 'center' : 'flex-start';
    return `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:${justify};padding-left:${x ?? 0}px;z-index:${z}">
<div class="win auto" style="position:relative;width:${w}px">${chrome}</div></div>`;
  }
  return `<div class="win" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${z}">${chrome}</div>`;
}

export function shell({ product, mark = 'A', nav, active, main, side = 212 }) {
  const items = nav
    .map(([ic, label, n]) => `<div class="nav${label === active ? ' on' : ''}">${icon(ic, 16)}${label}${n ? `<span class="n">${n}</span>` : ''}</div>`)
    .join('');
  return `<div class="shell" style="--side:${side}px"><div class="side"><div class="logo"><b>${mark}</b>${product}</div>${items}</div>
<div class="main">${main}</div></div>`;
}

export function phone({ x, y, w = 330, h = 680, body, z = 3, rotate = 0 }) {
  return `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;z-index:${z};transform:rotate(${rotate}deg)">
<div class="screen"><div class="notch"></div><div class="status"><span>9:41</span><span style="display:flex;gap:6px;align-items:center">
<svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="1" fill="#171717"/><rect x="4.5" y="5" width="3" height="6" rx="1" fill="#171717"/><rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#171717"/><rect x="13.5" y="0" width="3" height="11" rx="1" fill="#171717"/></svg>
<svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="#171717" opacity=".4"/><rect x="2" y="2" width="16" height="8" rx="1.8" fill="#171717"/><rect x="22.5" y="4" width="1.8" height="4" rx=".9" fill="#171717" opacity=".4"/></svg></span></div>
${body}</div></div>`;
}

export function kpi(label, value, delta = '') {
  return `<div class="card kpi grow"><div class="lbl">${label}</div><div class="v">${value}</div>${delta ? `<div class="d">${delta}</div>` : ''}</div>`;
}

export function pill(text, tone = '') {
  return `<span class="pill ${tone}">${tone ? '<span class="dot"></span>' : ''}${text}</span>`;
}

export function table(cols, rows, { widths = [] } = {}) {
  const head = cols.map((c, i) => `<th style="${widths[i] ? `width:${widths[i]}` : ''}">${c}</th>`).join('');
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// Horizontal bars; one series in the brand colour.
export function hbars(items, { max } = {}) {
  const top = max || Math.max(...items.map((i) => i[1]));
  return items
    .map(
      ([label, v, note]) => `<div style="display:grid;grid-template-columns:92px 1fr 44px;align-items:center;gap:12px;font-size:13px">
<span style="color:${t.muted};font-weight:500">${label}</span><div class="track" style="height:10px"><i style="width:${(v / top) * 100}%"></i></div>
<span style="text-align:right;font-weight:600">${note ?? v}</span></div>`
    )
    .join('');
}

// Vertical column chart drawn in SVG; last N columns can be a forecast.
export function columns(values, { w = 520, h = 170, forecastFrom = null, labels = [] } = {}) {
  const max = Math.max(...values) * 1.15;
  const bw = w / values.length;
  const cols = values
    .map((v, i) => {
      const bh = (v / max) * (h - 22);
      const isF = forecastFrom !== null && i >= forecastFrom;
      return `<rect x="${i * bw + bw * 0.18}" y="${h - 22 - bh}" width="${bw * 0.64}" height="${bh}" rx="4"
fill="${isF ? 'none' : t.brand}" stroke="${isF ? t.brand : 'none'}" stroke-width="${isF ? 1.5 : 0}" stroke-dasharray="${isF ? '4 3' : ''}" opacity="${isF ? 1 : 0.92 - (values.length - i) * 0.012}"/>`;
    })
    .join('');
  const lab = labels
    .map((l, i) => `<text x="${i * bw + bw / 2}" y="${h - 4}" text-anchor="middle" font-size="11" fill="${t.subtle}" font-family="Inter">${l}</text>`)
    .join('');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${cols}${lab}</svg>`;
}

// Smooth line chart path in SVG.
export function line(values, { w = 520, h = 140, color = t.brand, fill = true } = {}) {
  const max = Math.max(...values) * 1.1;
  const min = Math.min(...values) * 0.85;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / (max - min)) * h]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  const area = fill ? `<path d="${d} L${w},${h} L0,${h} Z" fill="${color}" opacity=".08"/>` : '';
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible">${area}<path d="${d}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/></svg>`;
}

export function waveform(n = 48, { color = t.brand, h = 44, seed = 7 } = {}) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const bars = Array.from({ length: n }, (_, i) => {
    const env = Math.sin((i / n) * Math.PI) * 0.75 + 0.25;
    const bh = Math.max(4, env * (0.35 + rnd() * 0.65) * h);
    return `<rect x="${i * 6}" y="${(h - bh) / 2}" width="3.2" height="${bh}" rx="1.6" fill="${color}"/>`;
  }).join('');
  return `<svg width="${n * 6}" height="${h}" viewBox="0 0 ${n * 6} ${h}">${bars}</svg>`;
}

// The Auravine mark (same geometry as public/brand/auravine-mark.svg).
export function mark(size = 28, ink = t.fg, leaf = t.brand) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 48 48"><path d="M9 41 C 13 30, 18 18, 24 8 C 30 18, 35 30, 39 41" fill="none" stroke="${ink}" stroke-width="4.4" stroke-linecap="round"/><path d="M14.6 31.2 Q 22.8 22.2 33.4 26.2 Q 24.6 34 14.6 31.2 Z" fill="${leaf}"/></svg>`;
}
