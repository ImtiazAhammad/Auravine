// Scene definitions for Auravine's rendered brand assets.
// Each scene is a full HTML page rendered by render.mjs to the `out` path.
// All names, figures and messages inside the screens are sample UI data.
import { t, icon, page, stage, win, shell, phone, kpi, pill, table, hbars, columns, line, waveform, mark } from './kit.mjs';

const W = 1600;
const H = 900;
const scenes = [];
const add = (s) => scenes.push({ width: W, height: H, scale: 1.5, ...s });

/* ------------------------------------------------------------------ Shefa */
const shefaNav = [
  ['phone', 'Live calls', '3'],
  ['calendar', 'Bookings'],
  ['users', 'Doctors'],
  ['layers', 'Departments'],
  ['chart', 'Reports'],
  ['settings', 'Settings'],
];

function bubble(who, text, { bn = false, gloss = '', mine = false } = {}) {
  return `<div style="display:flex;flex-direction:column;align-items:${mine ? 'flex-end' : 'flex-start'};gap:4px">
<span style="font-size:11px;color:${t.subtle};font-weight:550">${who}</span>
<div style="max-width:86%;padding:10px 13px;border-radius:14px;${mine ? `background:${t.brand};color:#fff;border-bottom-right-radius:4px` : `background:${t.surface};border-bottom-left-radius:4px`};font-size:14px;line-height:1.45">
<div class="${bn ? 'bn' : ''}" style="${bn ? 'font-size:15px' : ''}">${text}</div>
${gloss ? `<div style="font-size:12px;margin-top:4px;opacity:.72">${gloss}</div>` : ''}</div></div>`;
}

const shefaConsole = shell({
  product: 'Shefa',
  mark: 'S',
  nav: shefaNav,
  active: 'Live calls',
  main: `
<div class="head"><div><div class="h1">Live calls</div><div class="sub">Cardiology, Medicine and ENT booking lines</div></div>
<div class="flex">${pill('3 calls in progress', 'brand')}<span class="btn">${icon('users', 15)}Take over call</span></div></div>
<div style="display:grid;grid-template-columns:1.25fr 1fr;gap:16px;min-height:0">
  <div class="card" style="display:flex;flex-direction:column;gap:14px">
    <div class="flex"><div class="av" style="background:${t.brandSoft};color:${t.brand}">${icon('phone', 14, t.brand)}</div>
      <div class="grow"><div style="font-weight:600;font-size:14px">+880 17•• ••• 214</div><div class="sub" style="font-size:12px">Inbound · Cardiology line</div></div>
      ${pill('Bangla')}<span class="mono" style="font-size:13px;color:${t.muted}">01:42</span></div>
    <div style="padding:6px 0">${waveform(64, { h: 40 })}</div>
    <div style="display:flex;flex-direction:column;gap:11px">
      ${bubble('Patient', 'আমি কাল সকালে একজন হৃদরোগ বিশেষজ্ঞ দেখাতে চাই।', { bn: true, gloss: 'I want to see a cardiologist tomorrow morning.' })}
      ${bubble('Shefa', 'Dr. Nusrat Karim has three morning slots tomorrow. Which time suits you?', { mine: true })}
      ${bubble('Patient', 'সকাল দশটার দিকে হলে ভালো হয়।', { bn: true, gloss: 'Around ten would be good.' })}
      ${bubble('Shefa', 'Booked for 10:15. Your serial number is 14 and your expected visit time is 10:40 AM.', { mine: true })}
    </div>
  </div>
  <div class="col">
    <div class="card" style="display:flex;flex-direction:column;gap:12px">
      <div class="flex"><div class="grow"><div style="font-weight:600;font-size:14px">Cardiology · Tomorrow</div><div class="sub" style="font-size:12px">Dr. Nusrat Karim</div></div>${pill('Live availability', 'brand')}</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        <div class="chip off">09:30</div><div class="chip off">09:45</div><div class="chip on">10:15</div>
        <div class="chip">10:30</div><div class="chip">11:00</div><div class="chip">11:15</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:2px">
        <div style="background:${t.surface};border-radius:10px;padding:12px"><div class="lbl" style="font-size:11.5px;color:${t.muted}">Serial number</div><div style="font-size:24px;font-weight:650;margin-top:2px">14</div></div>
        <div style="background:${t.surface};border-radius:10px;padding:12px"><div class="lbl" style="font-size:11.5px;color:${t.muted}">Expected visit</div><div style="font-size:24px;font-weight:650;margin-top:2px">10:40 AM</div></div></div>
      <span class="btn pri" style="justify-content:center">${icon('check', 15, '#fff')}Confirm and send SMS</span>
    </div>
    <div class="card" style="display:flex;flex-direction:column;gap:10px">
      <div style="font-weight:600;font-size:13.5px">Booked in the last hour</div>
      ${[
        ['RA', 'Medicine', 'Serial 22 · 11:50 AM'],
        ['SH', 'ENT', 'Serial 9 · 12:10 PM'],
        ['MK', 'Cardiology', 'Serial 13 · 10:25 AM'],
      ]
        .map(
          ([a, d, s]) => `<div class="flex"><span class="av">${a}</span><div class="grow"><div style="font-size:13px;font-weight:550">${d}</div><div class="sub" style="font-size:12px">${s}</div></div>${pill('Confirmed', 'brand')}</div>`
        )
        .join('')}
    </div>
  </div>
</div>`,
});

const shefaSms = `<div style="padding:6px 22px 0;display:flex;flex-direction:column;gap:18px">
<div style="text-align:center"><div class="av" style="width:52px;height:52px;margin:0 auto;background:${t.brandSoft}">${mark(28)}</div>
<div style="font-weight:650;margin-top:8px">City Care Hospital</div><div class="sub" style="font-size:12px">Text message · now</div></div>
<div style="background:${t.surface};border-radius:18px;border-bottom-left-radius:5px;padding:14px;font-size:14px;line-height:1.5">
<div class="bn" style="font-size:15px;margin-bottom:8px">আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে।</div>
Cardiology with Dr. Nusrat Karim, tomorrow.<br><b>Serial 14</b> · expected at <b>10:40 AM</b>.<br><span style="color:${t.muted}">Reply 1 to cancel.</span></div>
<div style="border:1px solid ${t.border};border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px">
<div class="flex" style="font-size:13px"><span style="color:${t.brand}">${icon('calendar', 16, t.brand)}</span><span class="grow">Tomorrow, 10:40 AM</span></div>
<div class="flex" style="font-size:13px"><span>${icon('pin', 16, t.muted)}</span><span class="grow">Cardiology, Level 3</span></div>
<div class="flex" style="font-size:13px"><span>${icon('clock', 16, t.muted)}</span><span class="grow">Please arrive 15 minutes early</span></div></div>
</div>`;

add({
  name: 'shefa-hero',
  out: 'public/project/featured/shefa-hero.webp',
  html: page(W, H, stage(win({ x: 60, y: 80, w: 1100, h: 740, title: 'Shefa · Front desk', body: shefaConsole }) + phone({ x: 1196, y: 132, body: shefaSms }))),
});

add({
  name: 'shefa-gallery',
  out: 'public/project/featured/shefa-gallery.webp',
  html: page(
    W,
    H,
    stage(
      win({
        x: 90,
        y: 70,
        w: 1420,
        h: 760,
        title: 'Shefa · Bookings',
        body: shell({
          product: 'Shefa',
          mark: 'S',
          nav: shefaNav,
          active: 'Bookings',
          main: `<div class="head"><div><div class="h1">Bookings today</div><div class="sub">All departments · updated live</div></div>
<div class="flex"><span class="btn">${icon('calendar', 15)}Today</span><span class="btn dark">${icon('file', 15, '#fff')}Export</span></div></div>
<div class="row">${kpi('Calls answered', '412')}${kpi('Appointments booked', '286')}${kpi('Handed to reception', '31')}${kpi('Average wait', '4 sec')}</div>
<div class="card" style="padding:14px 6px 6px">${table(
            ['Time', 'Patient', 'Doctor', 'Department', 'Serial', 'Language', 'Status'],
            [
              ['10:40 AM', '+880 17•• ••• 214', 'Dr. Nusrat Karim', 'Cardiology', '14', 'Bangla', pill('Confirmed', 'brand')],
              ['10:52 AM', '+880 18•• ••• 903', 'Dr. Imran Hossain', 'Medicine', '18', 'Bangla', pill('Confirmed', 'brand')],
              ['11:05 AM', '+880 19•• ••• 377', 'Dr. Sabrina Akter', 'ENT', '7', 'English', pill('Confirmed', 'brand')],
              ['11:20 AM', '+880 16•• ••• 548', 'Dr. Nusrat Karim', 'Cardiology', '15', 'Bangla', pill('With reception', 'warn')],
              ['11:35 AM', '+880 15•• ••• 120', 'Dr. Tanvir Ahmed', 'Orthopedics', '11', 'Bangla', pill('Confirmed', 'brand')],
              ['11:50 AM', '+880 17•• ••• 662', 'Dr. Imran Hossain', 'Medicine', '22', 'English', pill('Confirmed', 'brand')],
              ['12:10 PM', '+880 13•• ••• 851', 'Dr. Sabrina Akter', 'ENT', '9', 'Bangla', pill('Cancelled')],
            ]
          )}</div>`,
        }),
      })
    )
  ),
});


/* ------------------------------------------------------------------ Safar */
function cityMap(w, h, { route = true, shuttles = [] } = {}) {
  const roads = [
    'M-20 120 L 420 90 L 760 140', 'M-20 300 C 200 280, 380 330, 760 300', 'M60 -20 L 120 420 L 140 900',
    'M300 -20 C 280 200, 320 400, 300 900', 'M520 -20 L 560 300 L 520 900', 'M-20 520 L 760 560', 'M-20 720 C 260 700, 480 760, 760 730',
  ];
  const stops = [[110, 640, 'Jashimuddin'], [210, 470, 'Rajlakshmi'], [370, 330, 'House Building'], [540, 170, 'Uttara North Metro']];
  const routeD = 'M110 640 C 150 560, 170 500, 210 470 S 320 360, 370 330 S 500 200, 540 170';
  return `<svg width="${w}" height="${h}" viewBox="0 0 700 800" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0">
<rect width="700" height="800" fill="#f2f2f0"/>
<path d="M430 420 h200 v120 h-200z M40 340 h120 v110 h-120z M190 40 h150 v90 h-150z" fill="#e6efe9"/>
${roads.map((d) => `<path d="${d}" stroke="#ffffff" stroke-width="16" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#e3e3e3" stroke-width="1" fill="none"/>`).join('')}
${route ? `<path d="${routeD}" stroke="${t.brand}" stroke-width="7" fill="none" stroke-linecap="round" opacity=".95"/>` : ''}
${stops.map(([x, y, n], i) => { const last = i === stops.length - 1; return `<circle cx="${x}" cy="${y}" r="9" fill="#fff" stroke="${t.brand}" stroke-width="4"/><text x="${last ? x - 16 : x + 16}" y="${y + 5}" text-anchor="${last ? 'end' : 'start'}" font-size="15" font-family="Inter" font-weight="600" fill="${t.fg}">${n}</text>`; }).join('')}
${shuttles.map(([x, y, n]) => `<g transform="translate(${x} ${y})"><rect x="-22" y="-15" width="44" height="30" rx="9" fill="${t.ink}"/><text x="0" y="5" font-size="13" font-weight="700" fill="#fff" text-anchor="middle" font-family="Inter">${n}</text></g>`).join('')}
</svg>`;
}

const safarApp = `<div style="position:absolute;inset:52px 0 0 0">
${cityMap(306, 600, { shuttles: [[160, 545, '07'], [452, 268, '12']] })}
<div style="position:absolute;left:14px;right:14px;top:10px;background:#fff;border-radius:14px;padding:11px 13px;box-shadow:0 6px 18px rgba(0,0,0,.12);display:flex;align-items:center;gap:10px;font-size:13px">
${icon('search', 16, t.muted)}<span style="color:${t.muted}">Jashimuddin → Uttara North Metro</span></div>
<div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-radius:22px 22px 0 0;padding:16px 18px 26px;box-shadow:0 -10px 30px rgba(0,0,0,.1);display:flex;flex-direction:column;gap:12px">
<div style="width:38px;height:4px;border-radius:9px;background:#dcdcdc;margin:0 auto"></div>
<div class="flex"><div class="av" style="width:40px;height:40px;background:${t.brandSoft}">${icon('bus', 20, t.brand)}</div>
<div class="grow"><div style="font-weight:650;font-size:16px">Shuttle 07 · 4 min</div><div class="sub" style="font-size:12.5px">Arriving at Jashimuddin stop</div></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center">
<div style="background:${t.surface};border-radius:10px;padding:9px"><div style="font-weight:650">12</div><div class="sub" style="font-size:11px">Seats free</div></div>
<div style="background:${t.surface};border-radius:10px;padding:9px"><div style="font-weight:650">18 min</div><div class="sub" style="font-size:11px">To metro</div></div>
<div style="background:${t.surface};border-radius:10px;padding:9px"><div style="font-weight:650">4 stops</div><div class="sub" style="font-size:11px">On route</div></div></div>
<span class="btn pri" style="justify-content:center;height:42px;border-radius:12px">Book a seat</span></div></div>`;

const safarNav = [['activity', 'Fleet'], ['route', 'Routes'], ['pin', 'Stops'], ['users', 'Drivers'], ['chart', 'Ridership'], ['settings', 'Settings']];
const fleetRows = [
  ['07', 'Jashimuddin → Uttara North', '12 / 20', pill('On route', 'brand'), '4 min'],
  ['12', 'Uttara North → Jashimuddin', '5 / 20', pill('On route', 'brand'), '9 min'],
  ['03', 'Sector 11 → Uttara North', '0 / 20', pill('Charging'), '—'],
  ['15', 'Sector 4 → Airport Road', '14 / 20', pill('On route', 'brand'), '2 min'],
  ['21', 'Uttara North → Sector 13', '9 / 20', pill('Delayed', 'warn'), '11 min'],
].map(([n, r, seats, st, eta]) => [`<span class="flex"><span class="av" style="background:${t.ink};color:#fff;width:30px;height:24px;border-radius:7px">${n}</span></span>`, r, seats, st, eta]);

const safarDash = (rows) => shell({
  product: 'Safar Ops',
  mark: 'S',
  nav: safarNav,
  active: 'Fleet',
  main: `<div class="head"><div><div class="h1">Fleet</div><div class="sub">25 electric shuttles · Uttara routes</div></div>
<div class="flex">${pill('21 on route', 'brand')}${pill('3 charging')}${pill('1 delayed', 'warn')}</div></div>
<div class="card" style="padding:14px 6px 6px">${table(['Shuttle', 'Route', 'Seats taken', 'Status', 'Next stop'], rows)}</div>`,
});

add({
  name: 'safar-hero',
  out: 'public/project/featured/safar-hero.webp',
  html: page(W, H, stage(win({ x: 60, w: 1040, center: true, title: 'Safar · Fleet operations', body: safarDash(fleetRows) }) + phone({ x: 1150, y: 110, w: 340, h: 700, body: safarApp }))),
});

add({
  name: 'safar-gallery',
  out: 'public/project/featured/safar-gallery.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Safar · Live map', body: shell({
      product: 'Safar Ops', mark: 'S', nav: safarNav, active: 'Routes',
      main: `<div class="head"><div><div class="h1">Jashimuddin – Uttara North Metro</div><div class="sub">Route 1 · 4 stops · every 8 minutes</div></div><div class="flex">${pill('6 shuttles on this route', 'brand')}</div></div>
<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:16px;height:560px">
<div class="card" style="position:relative;overflow:hidden;padding:0">${cityMap(760, 560, { shuttles: [[160, 545, '07'], [300, 400, '19'], [452, 268, '12']] })}</div>
<div class="col">${kpi('Riders this morning', '1,284')}${kpi('Average wait at stops', '6 min')}
<div class="card col" style="gap:10px"><div style="font-weight:600;font-size:13.5px">Stops</div>${['Jashimuddin', 'Rajlakshmi', 'House Building', 'Uttara North Metro'].map((n, i) => `<div class="flex" style="font-size:13px"><span class="av" style="width:22px;height:22px;font-size:10px;background:${t.brandSoft};color:${t.brand}">${i + 1}</span><span class="grow">${n}</span><span class="sub" style="font-size:12px">${[2, 6, 9, 14][i]} riders waiting</span></div>`).join('')}</div></div></div>`,
    }),
  }))),
});

/* --------------------------------------------------------- Handset Depot */
function handset(color = '#1f1f1f', w = 92, h = 180) {
  return `<div style="width:${w}px;height:${h}px;border-radius:18px;background:${color};position:relative;box-shadow:inset 0 0 0 2px rgba(255,255,255,.14),0 14px 22px -12px rgba(0,0,0,.45)">
<div style="position:absolute;inset:6px;border-radius:13px;background:linear-gradient(160deg,#2b2b2b,#0d0d0d)"></div>
<div style="position:absolute;top:11px;left:50%;transform:translateX(-50%);width:26px;height:7px;border-radius:9px;background:#000"></div></div>`;
}
function productCard(name, tag, tone, price, color) {
  return `<div class="card" style="display:flex;flex-direction:column;gap:10px;padding:14px">
<div style="height:200px;border-radius:10px;background:${t.surface};display:grid;place-items:center">${handset(color)}</div>
<div class="flex">${pill(tag, tone)}</div><div style="font-weight:600;font-size:14px">${name}</div>
<div class="flex"><span style="font-weight:650">${price}</span><span class="sub grow" style="font-size:12px;text-align:right">In stock</span></div></div>`;
}
const depotStore = `<div style="padding:18px 26px;display:flex;flex-direction:column;gap:16px">
<div class="flex"><div style="font-weight:700;font-size:18px;letter-spacing:-.01em">The Handset Depot</div>
<div class="flex grow" style="justify-content:center;gap:22px;font-size:13.5px;color:${t.muted};font-weight:500"><span style="color:${t.fg}">Phones</span><span>Sell your phone</span><span>Servicing</span><span>Accessories</span></div>
<span class="btn">${icon('search', 15)}Search</span><span class="btn dark">${icon('cart', 15, '#fff')}Cart · 2</span></div>
<div style="border-radius:14px;background:${t.ink};color:#fff;padding:26px 28px;display:flex;align-items:center;gap:24px">
<div class="grow"><div style="font-size:26px;font-weight:650;letter-spacing:-.02em">Certified pre-owned phones</div>
<div style="font-size:14px;opacity:.7;margin-top:6px">Inspected, graded and backed by our service team.</div></div>
<span class="btn pri">Shop pre-owned</span></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
${productCard('Pre-owned flagship, 256 GB', 'Grade A', 'brand', '৳ 64,500', '#3a3a3a')}
${productCard('New mid-range, 128 GB', 'New', 'dark', '৳ 28,900', '#30455a')}
${productCard('Pre-owned compact, 128 GB', 'Grade B', '', '৳ 21,000', '#5a4a3a')}
${productCard('New camera phone, 512 GB', 'New', 'dark', '৳ 97,000', '#2c2c2c')}</div></div>`;

add({
  name: 'handset-depot-hero',
  out: 'public/project/featured/handset-depot-hero.webp',
  html: page(W, H, stage(win({ x: 60, w: 1180, center: true, title: 'thehandsetdepot · Store', body: depotStore }) +
    win({ x: 1060, y: 380, w: 480, h: 440, title: 'Service ticket', z: 4, body: `<div style="padding:18px;display:flex;flex-direction:column;gap:12px">
<div class="flex"><div class="grow"><div style="font-weight:650;font-size:16px">Ticket #1048</div><div class="sub" style="font-size:12.5px">Screen replacement · received today</div></div>${pill('Repairing', 'warn')}</div>
${['Received', 'Diagnosed', 'Repairing', 'Ready for pickup'].map((st, i) => `<div class="flex" style="font-size:13.5px"><span class="av" style="width:24px;height:24px;${i < 2 ? `background:${t.brand};color:#fff` : i === 2 ? `background:${t.warnSoft};color:${t.warn}` : ''}">${i < 2 ? icon('check', 13, '#fff') : i + 1}</span><span class="grow" style="${i > 2 ? `color:${t.subtle}` : ''}">${st}</span></div>`).join('')}
<div style="background:${t.surface};border-radius:10px;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
<div><div class="sub" style="font-size:11.5px">Parts</div><b>৳ 6,800</b></div><div><div class="sub" style="font-size:11.5px">Service</div><b>৳ 1,500</b></div></div>
<span class="btn pri" style="justify-content:center">${icon('message', 15, '#fff')}Notify customer</span></div>` }))),
});

add({
  name: 'handset-depot-gallery',
  out: 'public/project/featured/handset-depot-gallery.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Handset Depot · Admin', body: shell({
      product: 'Depot Admin', mark: 'H',
      nav: [['inbox', 'Orders', '18'], ['box', 'Stock'], ['wrench', 'Servicing', '7'], ['users', 'Partners'], ['chart', 'Profit'], ['settings', 'Settings']],
      active: 'Profit',
      main: `<div class="head"><div><div class="h1">Profit this month</div><div class="sub">Phones, accessories and servicing</div></div><div class="flex"><span class="btn">${icon('calendar', 15)}This month</span></div></div>
<div class="row">${kpi('Sales', '৳ 18.4 L')}${kpi('Gross profit', '৳ 3.1 L')}${kpi('Service jobs closed', '64')}${kpi('Phones in stock', '212')}</div>
<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:16px">
<div class="card col"><div style="font-weight:600;font-size:13.5px">Profit by week</div>${columns([42, 55, 48, 61, 58, 70, 66, 74], { w: 640, h: 220, labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] })}</div>
<div class="card col" style="gap:14px"><div style="font-weight:600;font-size:13.5px">Margin by category</div>${hbars([['Pre-owned', 24, '24%'], ['New phones', 9, '9%'], ['Servicing', 38, '38%'], ['Accessories', 31, '31%']], { max: 40 })}</div></div>`,
    }),
  }))),
});

/* --------------------------------------------------------- SpanishStitch */
const ssNav = [['grid', 'Dashboard'], ['inbox', 'RFQs', '12'], ['box', 'Orders'], ['users', 'Clients'], ['shirt', 'Styles'], ['edit', 'Website'], ['settings', 'Settings']];
add({
  name: 'spanishstitch-hero',
  out: 'public/project/featured/spanishstitch-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'SpanishStitch · Buying house', body: shell({
      product: 'SpanishStitch', mark: 'S', nav: ssNav, active: 'Dashboard',
      main: `<div class="head"><div><div class="h1">Good morning</div><div class="sub">Here is where every RFQ, order and style stands today.</div></div><span class="btn pri">${icon('inbox', 15, '#fff')}New RFQ</span></div>
<div class="row">${kpi('Open RFQs', '12', '3 need costing')}${kpi('Active orders', '27', '6 shipping this week')}${kpi('Clients', '18', '4 potential')}${kpi('Sales this quarter', '$ 1.24 M')}</div>
<div style="display:grid;grid-template-columns:1fr 1.35fr;gap:16px">
<div class="card col" style="gap:16px"><div style="font-weight:600;font-size:13.5px">Styles in production</div>${hbars([['Knit', 46], ['Woven', 31], ['Denim', 22], ['Sweater', 14]])}</div>
<div class="card" style="padding:14px 6px 6px">${table(['RFQ', 'Client', 'Category', 'Quantity', 'Stage'], [
        ['RFQ-2241', 'Nordwear', 'Knit polo', '24,000', pill('Costing', 'warn')],
        ['RFQ-2238', 'Maison Lune', 'Woven shirt', '12,500', pill('Sampling')],
        ['RFQ-2235', 'Blue Harbor', 'Denim jacket', '8,000', pill('Order confirmed', 'brand')],
        ['RFQ-2230', 'Fjord & Co', 'Sweater', '6,200', pill('Sampling')],
      ])}</div></div>`,
    }),
  }))),
});

add({
  name: 'spanishstitch-gallery',
  out: 'public/project/featured/spanishstitch-gallery.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'SpanishStitch · Website editor', body: shell({
      product: 'SpanishStitch', mark: 'S', nav: ssNav, active: 'Website',
      main: `<div class="head"><div><div class="h1">Website content</div><div class="sub">Edit every section of the public site. Changes go live when you publish.</div></div><div class="flex"><span class="btn">Preview</span><span class="btn pri">Publish changes</span></div></div>
<div style="display:grid;grid-template-columns:260px 1fr;gap:16px">
<div class="card col" style="gap:6px;padding:10px">${['Hero', 'About the buying house', 'Knit', 'Woven', 'Denim', 'Sweater', 'Compliance', 'Contact'].map((n, i) => `<div class="nav${i === 2 ? ' on' : ''}" style="padding:9px 10px">${icon(i === 2 ? 'shirt' : 'file', 15)}${n}</div>`).join('')}</div>
<div class="card col" style="gap:16px">
<div><div class="lbl" style="font-size:12px;color:${t.muted};margin-bottom:6px">Section title</div><div style="border:1px solid ${t.border};border-radius:9px;padding:10px 12px;font-size:14px">Knitwear for global brands</div></div>
<div><div class="lbl" style="font-size:12px;color:${t.muted};margin-bottom:6px">Description</div><div style="border:1px solid ${t.brand};box-shadow:0 0 0 3px ${t.brandSoft};border-radius:9px;padding:10px 12px;font-size:14px;line-height:1.55;height:96px">Jersey, pique and fleece programs from certified factories, with sampling in two weeks and full compliance documentation.</div></div>
<div><div class="lbl" style="font-size:12px;color:${t.muted};margin-bottom:6px">Images</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">${['#d8dfe4', '#e4ddd3', '#d9e4dc', '#e2e2e2'].map((c) => `<div style="height:110px;border-radius:10px;background:${c};display:grid;place-items:center">${icon('shirt', 34, 'rgba(0,0,0,.35)', 1.4)}</div>`).join('')}</div></div>
<div class="flex" style="font-size:13px;color:${t.muted}">${icon('layers', 15)}Styles in production shown on this section: <b style="color:${t.fg}">46</b></div></div></div>`,
    }),
  }))),
});

/* ------------------------------------------------------- Other solutions */
function waChat(lines) {
  return `<div style="position:absolute;inset:52px 0 0 0;background:#f3f3f1;display:flex;flex-direction:column">
<div style="background:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid ${t.border}"><div class="av" style="background:${t.brandSoft}">${mark(18)}</div><div><div style="font-weight:650;font-size:14px">Shop assistant</div><div style="font-size:11.5px;color:${t.brand}">Online · replies instantly</div></div></div>
<div style="padding:14px;display:flex;flex-direction:column;gap:9px">${lines.map(([me, txt, src]) => `<div style="align-self:${me ? 'flex-end' : 'flex-start'};max-width:84%;background:${me ? t.brand : '#fff'};color:${me ? '#fff' : t.fg};padding:9px 12px;border-radius:14px;font-size:13px;line-height:1.45;box-shadow:0 1px 1px rgba(0,0,0,.05)">${txt}${src ? `<div style="margin-top:7px;font-size:11px;color:${t.brand};display:flex;gap:5px;align-items:center">${icon('file', 12, t.brand)}${src}</div>` : ''}</div>`).join('')}</div></div>`;
}
add({
  name: 'chatbot-hero',
  out: 'public/project/featured/chatbot-hero.webp',
  html: page(W, H, stage(win({
    x: 60, w: 1060, center: true, title: 'Assistant · Conversations', body: shell({
      product: 'Assistant', nav: [['message', 'Conversations', '128'], ['file', 'Knowledge'], ['users', 'Handoffs', '4'], ['chart', 'Insights'], ['settings', 'Channels']], active: 'Conversations',
      main: `<div class="head"><div><div class="h1">Conversations</div><div class="sub">Website, WhatsApp and Messenger</div></div><div class="flex">${pill('82% resolved without handoff', 'brand')}</div></div>
<div class="card" style="padding:14px 6px 6px">${table(['Customer', 'Channel', 'Topic', 'Answered from', 'Status'], [
        ['Rafiq H.', 'WhatsApp', 'Delivery time', 'Shipping policy', pill('Resolved', 'brand')],
        ['Anika S.', 'Website', 'Return an item', 'Returns guide', pill('Resolved', 'brand')],
        ['Tanvir A.', 'Messenger', 'Bulk order price', '—', pill('With sales team', 'warn')],
        ['Mitu R.', 'WhatsApp', 'Size guide', 'Product catalog', pill('Resolved', 'brand')],
        ['Jamal K.', 'Website', 'Warranty claim', 'Warranty terms', pill('Resolved', 'brand')],
      ])}</div>
<div class="card col" style="gap:10px"><div style="font-weight:600;font-size:13.5px">Questions the assistant could not answer this week</div>${['Do you ship to Chattogram on Fridays?', 'Is cash on delivery available for bulk orders?'].map((q) => `<div class="flex" style="font-size:13px"><span>${icon('message', 15, t.muted)}</span><span class="grow">${q}</span><span class="btn" style="height:28px">Add answer</span></div>`).join('')}</div>`,
    }),
  }) + phone({ x: 1160, y: 110, w: 340, h: 700, body: waChat([
    [true, 'How long does delivery to Sylhet take?'],
    [false, 'Delivery to Sylhet takes 2 to 3 working days. Orders placed before 2 PM ship the same day.', 'Shipping policy, section 2'],
    [true, 'Can I return a shirt if the size is wrong?'],
    [false, 'Yes. You can exchange or return it within 7 days if the tags are attached.', 'Returns guide'],
    [true, 'Great, thanks!'],
  ]) }))),
});

add({
  name: 'face-hero',
  out: 'public/project/featured/face-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Attendance · Live presence', body: shell({
      product: 'Attendance', nav: [['scan', 'Live presence'], ['users', 'Employees'], ['clock', 'Shifts'], ['file', 'Payroll export'], ['shield', 'Privacy'], ['settings', 'Settings']], active: 'Live presence',
      main: `<div class="head"><div><div class="h1">Live presence</div><div class="sub">Head office and Factory 2 · morning shift</div></div><div class="flex">${pill('Liveness check on', 'brand')}<span class="btn dark">${icon('file', 15, '#fff')}Export for payroll</span></div></div>
<div class="row">${kpi('Present', '318')}${kpi('Late arrivals', '12')}${kpi('On leave', '9')}${kpi('Not checked in', '21')}</div>
<div style="display:grid;grid-template-columns:1fr 1.5fr;gap:16px">
<div class="card" style="position:relative;height:330px;padding:0;overflow:hidden;background:#1c1c1c">
<div style="position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 100%,#3a3a3a,#141414)"></div>
<div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:150px;height:186px;border-radius:46% 46% 42% 42%;background:linear-gradient(#5a5a5a,#3c3c3c)"></div>
<div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:200px;height:236px;border:2.5px solid ${t.brandDark};border-radius:16px"></div>
<div style="position:absolute;left:16px;top:14px">${pill('Gate 1 camera', 'dark')}</div>
<div style="position:absolute;left:16px;right:16px;bottom:16px;background:rgba(255,255,255,.96);border-radius:12px;padding:11px 13px;display:flex;align-items:center;gap:10px;font-size:13px"><span>${icon('check', 16, t.brand)}</span><span class="grow"><b>Nadia Islam</b> checked in · 08:57</span>${pill('Live', 'brand')}</div></div>
<div class="card" style="padding:14px 6px 6px">${table(['Employee', 'Department', 'Check-in', 'Shift', 'Status'], [
        ['Nadia Islam', 'Accounts', '08:57', '09:00', pill('On time', 'brand')],
        ['Sajid Rahman', 'Production', '09:14', '09:00', pill('Late', 'warn')],
        ['Farzana Akter', 'Quality', '08:49', '09:00', pill('On time', 'brand')],
        ['Mehedi Hasan', 'Logistics', '—', '09:00', pill('Not checked in')],
        ['Ruma Begum', 'Production', '08:52', '09:00', pill('On time', 'brand')],
      ])}</div></div>`,
    }),
  }))),
});

add({
  name: 'analytics-hero',
  out: 'public/project/featured/analytics-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Analytics · Overview', body: shell({
      product: 'Analytics', nav: [['grid', 'Overview'], ['chart', 'Sales'], ['box', 'Inventory'], ['bars', 'Forecasts'], ['bell', 'Alerts', '2'], ['settings', 'Sources']], active: 'Overview',
      main: `<div class="head"><div><div class="h1">Business overview</div><div class="sub">All 6 outlets · last 12 weeks · forecast for the next 4</div></div><div class="flex"><span class="btn">${icon('calendar', 15)}12 weeks</span></div></div>
<div class="row">${kpi('Revenue', '৳ 2.86 Cr', '+8.4% vs previous period')}${kpi('Gross margin', '31.2%', '+1.1 pts')}${kpi('Stock cover', '23 days')}${kpi('Repeat customers', '42%')}</div>
<div style="display:grid;grid-template-columns:1.55fr 1fr;gap:16px">
<div class="card col"><div class="flex"><div class="grow" style="font-weight:600;font-size:13.5px">Weekly revenue and forecast</div><span class="sub" style="font-size:12px">Dashed bars are forecast</span></div>
${columns([31, 34, 33, 37, 36, 40, 39, 43, 42, 46, 45, 49, 50, 52, 51, 54], { w: 760, h: 260, forecastFrom: 12 })}</div>
<div class="col"><div class="card col" style="gap:12px"><div style="font-weight:600;font-size:13.5px">Alerts</div>
<div class="flex" style="font-size:13px"><span>${icon('bell', 15, t.warn)}</span><span class="grow">Basmati rice 5 kg will run out at Mirpur in 6 days</span></div>
<div class="flex" style="font-size:13px"><span>${icon('bell', 15, t.warn)}</span><span class="grow">Dhanmondi sales 14% below forecast this week</span></div></div>
<div class="card col" style="gap:14px"><div style="font-weight:600;font-size:13.5px">Revenue by outlet</div>${hbars([['Gulshan', 92, '৳ 62 L'], ['Dhanmondi', 74, '৳ 50 L'], ['Mirpur', 66, '৳ 45 L'], ['Uttara', 58, '৳ 39 L']])}</div></div></div>`,
    }),
  }))),
});

add({
  name: 'docs-hero',
  out: 'public/project/featured/docs-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Knowledge assistant', body: shell({
      product: 'Knowledge', nav: [['message', 'Ask'], ['file', 'Documents'], ['layers', 'Collections'], ['shield', 'Access'], ['settings', 'Settings']], active: 'Ask',
      main: `<div class="head"><div><div class="h1">Ask your documents</div><div class="sub">2,418 contracts, policies and reports · private deployment</div></div>${pill('Answers cite their sources', 'brand')}</div>
<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:16px">
<div class="card col" style="gap:14px">
<div style="align-self:flex-end;background:${t.surface};border-radius:14px;padding:11px 14px;font-size:14px;max-width:80%">What is the notice period in our warehouse lease, and can we exit early?</div>
<div style="font-size:14.5px;line-height:1.65">The notice period is <b>90 days</b> in writing <sup style="color:${t.brand};font-weight:700">1</sup>. You can exit early after the first <b>24 months</b> if you pay <b>two months' rent</b> as an early termination fee <sup style="color:${t.brand};font-weight:700">2</sup>. The lease renews automatically for 12 months unless notice is given <sup style="color:${t.brand};font-weight:700">1</sup>.</div>
<div class="col" style="gap:8px">${[['1', 'Warehouse lease, Tejgaon', 'Page 7 · Clause 14.2'], ['2', 'Warehouse lease, Tejgaon', 'Page 9 · Clause 17.1']].map(([n, d, p]) => `<div class="flex" style="border:1px solid ${t.border};border-radius:10px;padding:10px 12px;font-size:13px"><span class="av" style="width:22px;height:22px;font-size:11px;background:${t.brandSoft};color:${t.brand}">${n}</span><span class="grow">${d}</span><span class="sub" style="font-size:12px">${p}</span></div>`).join('')}</div>
<div style="border:1px solid ${t.border};border-radius:12px;padding:12px 14px;font-size:14px;color:${t.subtle};display:flex;align-items:center;gap:10px">${icon('message', 16, t.subtle)}Ask a follow-up question</div></div>
<div class="card" style="background:${t.surface};padding:22px;display:flex;flex-direction:column;gap:10px">
<div class="flex"><div class="grow" style="font-weight:600;font-size:13.5px">Warehouse lease, Tejgaon</div>${pill('Page 7')}</div>
<div style="background:#fff;border-radius:8px;padding:22px 24px;display:flex;flex-direction:column;gap:9px;font-size:12px;line-height:1.6;color:${t.muted};box-shadow:0 1px 2px rgba(0,0,0,.06)">
<div style="font-weight:650;color:${t.fg};font-size:12.5px">14. Term and notice</div>
<div>14.1 The initial term of this lease is thirty-six (36) months from the commencement date.</div>
<div style="background:${t.brandSoft};color:${t.fg};border-radius:4px;padding:4px 6px;margin:0 -6px">14.2 Either party may terminate this lease by giving ninety (90) days' written notice to the other party.</div>
<div>14.3 Unless notice is given under clause 14.2, the lease renews for a further twelve (12) months.</div>
<div style="height:8px"></div><div style="font-weight:650;color:${t.fg};font-size:12.5px">15. Rent review</div><div>15.1 Rent is reviewed every twelve (12) months in line with clause 6.</div></div></div></div>`,
    }),
  }))),
});

function item(defect) {
  return `<div style="width:118px;height:118px;border-radius:14px;background:radial-gradient(circle at 35% 30%,#4a4a4a,#2a2a2a);position:relative;box-shadow:0 8px 14px -8px rgba(0,0,0,.6)">
<div style="position:absolute;inset:-9px;border:2px solid ${defect ? '#f87171' : t.brandDark};border-radius:18px"></div>
<span style="position:absolute;top:-30px;left:-9px;font-size:11px;font-weight:650;color:#fff;background:${defect ? '#b42318' : t.brand};padding:2px 7px;border-radius:5px">${defect ? 'Scratch 0.94' : 'OK 0.99'}</span></div>`;
}
add({
  name: 'cv-hero',
  out: 'public/project/featured/cv-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Inspection · Line 2', body: shell({
      product: 'Inspection', nav: [['camera', 'Live lines'], ['scan', 'Defects', '14'], ['layers', 'Models'], ['chart', 'Quality'], ['settings', 'Cameras']], active: 'Live lines',
      main: `<div class="head"><div><div class="h1">Line 2 · Packaging</div><div class="sub">Camera 2A · edge device online</div></div><div class="flex">${pill('Model v3.2', 'dark')}${pill('Inspecting', 'brand')}</div></div>
<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:16px">
<div class="card" style="padding:0;overflow:hidden;height:420px;position:relative;background:#161616">
<div style="position:absolute;left:0;right:0;top:150px;height:170px;background:repeating-linear-gradient(90deg,#262626 0 40px,#202020 40px 80px)"></div>
<div style="position:absolute;left:70px;right:70px;top:176px;display:flex;justify-content:space-between">${item(false)}${item(true)}${item(false)}</div>
<div style="position:absolute;left:16px;top:14px;display:flex;gap:8px">${pill('Camera 2A', 'dark')}<span class="pill dark mono">42 items / min</span></div></div>
<div class="col"><div class="row">${kpi('Inspected today', '18,240')}${kpi('Defects', '14')}</div>
<div class="card col" style="gap:10px"><div style="font-weight:600;font-size:13.5px">Latest rejects</div>${[['Scratch', '10:42:18', '0.94'], ['Missing seal', '10:31:05', '0.97'], ['Dent', '10:12:44', '0.91']].map(([d, tm, c]) => `<div class="flex" style="font-size:13px"><span class="av" style="width:34px;height:34px;border-radius:8px;background:#2a2a2a"></span><span class="grow"><b>${d}</b><div class="sub" style="font-size:12px">${tm} · confidence ${c}</div></span>${pill('Rejected', 'danger')}</div>`).join('')}</div></div></div>`,
    }),
  }))),
});

function shirt(bg) {
  return `<div style="height:170px;border-radius:10px;background:${bg};display:grid;place-items:center">${icon('shirt', 70, 'rgba(0,0,0,.42)', 1.2)}</div>`;
}
add({
  name: 'recs-hero',
  out: 'public/project/featured/recs-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Store · Product page', body: `<div style="padding:22px 30px;display:flex;flex-direction:column;gap:18px">
<div class="flex"><div style="font-weight:700;font-size:18px">Nokshi</div><div style="border:1px solid ${t.border};border-radius:10px;padding:9px 12px;font-size:13.5px;display:flex;gap:9px;align-items:center;margin-left:30px;width:420px">${icon('search', 15, t.muted)}blu cotton panjabi</div>
<span class="sub" style="font-size:12.5px">Showing results for <b style="color:${t.fg}">blue cotton panjabi</b></span><span class="grow"></span><span class="btn dark">${icon('cart', 15, '#fff')}Cart</span></div>
<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:28px">
<div style="height:420px;border-radius:14px;background:#d9e0ea;display:grid;place-items:center">${icon('shirt', 200, 'rgba(0,0,0,.38)', 1)}</div>
<div class="col" style="gap:14px;padding-top:8px"><div class="sub">Men · Panjabi</div><div style="font-size:28px;font-weight:650;letter-spacing:-.02em">Blue cotton panjabi</div><div style="font-size:20px;font-weight:600">৳ 2,450</div>
<div class="flex">${['S', 'M', 'L', 'XL'].map((sz, i) => `<div class="chip${i === 2 ? ' on' : ''}" style="width:52px">${sz}</div>`).join('')}</div>
<span class="btn pri" style="height:44px;justify-content:center;width:280px">Add to cart</span>
<div class="sub" style="font-size:13px;line-height:1.6;max-width:480px">Soft handloom cotton with a straight cut. Machine washable.</div></div></div>
<div><div class="flex" style="margin-bottom:12px"><div class="grow" style="font-weight:650;font-size:16px">Picked for you</div>${pill('Based on this visit', 'brand')}</div>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px">${[['Navy pajama', '৳ 1,150', '#cfd6e2'], ['White kurta', '৳ 1,950', '#ececec'], ['Leather sandals', '৳ 2,200', '#e3d7c6'], ['Cotton vest', '৳ 1,350', '#d8e3dc'], ['Prayer cap', '৳ 350', '#e6e6e6']].map(([n, pr, c]) => `<div class="col" style="gap:8px">${shirt(c)}<div style="font-size:13.5px;font-weight:550">${n}</div><div class="sub" style="font-size:13px">${pr}</div></div>`).join('')}</div></div></div>`,
  }))),
});

add({
  name: 'clinic-hero',
  out: 'public/project/featured/clinic-hero.webp',
  html: page(W, H, stage(win({
    x: 90, w: 1420, center: true, title: 'Clinic · Appointments', body: shell({
      product: 'Clinic', nav: [['calendar', 'Appointments'], ['users', 'Patients'], ['file', 'Prescriptions'], ['tag', 'Billing'], ['chart', 'Reports'], ['settings', 'Settings']], active: 'Appointments',
      main: `<div class="head"><div><div class="h1">Thursday appointments</div><div class="sub">3 doctors · 46 appointments · 5 flagged for reminders</div></div><span class="btn pri">${icon('calendar', 15, '#fff')}New appointment</span></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">${[
        ['Dr. Rumana Haque', 'General medicine', [['09:00', 'Arif M.', ''], ['09:20', 'Lipi S.', 'warn'], ['09:40', 'Kamal U.', ''], ['10:00', 'Open slot', 'open'], ['10:20', 'Tania B.', '']]],
        ['Dr. Asif Chowdhury', 'Pediatrics', [['09:00', 'Ayaan R.', ''], ['09:30', 'Zara K.', ''], ['10:00', 'Rafi H.', 'warn'], ['10:30', 'Mim A.', ''], ['11:00', 'Open slot', 'open']]],
        ['Dr. Selina Parvin', 'Dermatology', [['10:00', 'Shila D.', ''], ['10:30', 'Open slot', 'open'], ['11:00', 'Noman S.', 'warn'], ['11:30', 'Priya G.', ''], ['12:00', 'Sohel R.', '']]],
      ].map(([d, sp, slots]) => `<div class="card col" style="gap:10px"><div class="flex"><span class="av">${d.split(' ')[1][0]}${d.split(' ')[2][0]}</span><div class="grow"><div style="font-weight:600;font-size:13.5px">${d}</div><div class="sub" style="font-size:12px">${sp}</div></div></div>
${slots.map(([tm, p, st]) => `<div class="flex" style="border:1px ${st === 'open' ? 'dashed' : 'solid'} ${t.border};border-radius:10px;padding:9px 11px;font-size:13px;${st === 'open' ? `color:${t.subtle}` : ''}"><span class="mono" style="font-size:12px;width:44px">${tm}</span><span class="grow">${p}</span>${st === 'warn' ? pill('No-show risk', 'warn') : st === 'open' ? '' : pill('Confirmed', 'brand')}</div>`).join('')}</div>`).join('')}</div>`,
    }),
  }))),
});


/* ------------------------------------------ Cursor-trail service tiles */
// Used by the home page image trail (Bucket). 256px square, transparent corners.
const tiles = [
  ['image1', 'phone', t.brand, '#fff'], ['image2', 'message', t.ink, '#fff'], ['image3', 'scan', '#fff', t.brand],
  ['image4', 'bars', t.brand, '#fff'], ['image5', 'file', '#fff', t.ink], ['image6', 'bus', t.ink, t.brandDark],
  ['image7', 'camera', '#fff', t.brand], ['image8', 'sparkle', t.brand, '#fff'],
];
for (const [file, ic, bg, fg] of tiles) {
  scenes.push({
    name: `tile-${file}`, out: `public/feature/icons/${file}.webp`, width: 256, height: 256, scale: 1, transparent: true,
    html: page(256, 256, `<div style="position:absolute;inset:14px;border-radius:56px;background:${bg};display:grid;place-items:center;
box-shadow:0 18px 30px -16px rgba(0,0,0,.4),inset 0 0 0 1px rgba(0,0,0,.06)">${icon(ic, 112, fg, 1.6)}</div>`, { transparent: true }),
  });
}

/* ----------------------------------------------- Delivery phase screens */
const PW = 1200;
const PH = 900;
const addPhase = (sc) => scenes.push({ width: PW, height: PH, scale: 1.5, ...sc });
const sticky = (txt, tone = '') => `<div style="background:${tone === 'pain' ? t.warnSoft : tone === 'goal' ? t.brandSoft : '#fff'};border:1px solid ${t.border};border-radius:10px;padding:11px 12px;font-size:13px;line-height:1.4;box-shadow:0 2px 4px rgba(0,0,0,.04)">${txt}</div>`;
addPhase({
  name: 'phase-discovery',
  out: 'public/process/discovery.webp',
  html: page(PW, PH, stage(win({ w: 1060, center: true, title: 'Discovery workshop · Process map', body: `<div style="padding:24px 28px;display:flex;flex-direction:column;gap:18px">
<div class="head"><div><div class="h1">How appointments are booked today</div><div class="sub">Mapped with the reception team · 2 sessions</div></div>${pill('Draft proposal ready', 'brand')}</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
${[['Patient calls', ['Line busy from 8 AM', 'Average 6 rings before pickup'], 'pain'], ['Reception answers', ['Checks paper roster', 'Writes serial by hand'], 'pain'], ['Doctor schedule', ['Updated on WhatsApp', 'Leave days missed'], 'pain'], ['Patient arrives', ['No reminder sent', 'Unsure of wait time'], 'pain']]
  .map(([h, notes, tone]) => `<div class="col" style="gap:10px"><div class="flex" style="font-weight:600;font-size:13.5px"><span class="av" style="width:24px;height:24px;background:${t.ink};color:#fff">${icon('arrow', 12, '#fff')}</span>${h}</div>${notes.map((n) => sticky(n, tone)).join('')}</div>`).join('')}</div>
<div class="card" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;background:${t.surface};border-color:${t.surface}">
${[['Goal', 'Every booking call answered within seconds'], ['First step', 'AI agent for the cardiology line, then all departments'], ['Measure', 'Answer rate, bookings per day, staff handoffs']].map(([h, b]) => `<div><div class="sub" style="font-size:12px;font-weight:550">${h}</div><div style="font-size:14.5px;font-weight:600;margin-top:4px;line-height:1.4">${b}</div></div>`).join('')}</div></div>` })),
  ),
});
addPhase({
  name: 'phase-build',
  out: 'public/process/build.webp',
  html: page(PW, PH, stage(win({ w: 1060, center: true, title: 'Sprint board', body: `<div style="padding:24px 28px;display:flex;flex-direction:column;gap:18px">
<div class="head"><div><div class="h1">Sprint 4</div><div class="sub">Working demo with the client on Thursday</div></div><div class="flex">${pill('On track', 'brand')}<span class="btn">${icon('calendar', 15)}Demo Thu 3:00 PM</span></div></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
${[['To do', ['Bangla date parsing', 'SMS template approval']], ['In progress', ['Doctor leave sync', 'Takeover button for reception']], ['In review', ['Slot locking at confirm', 'Call summary for staff']], ['Done', ['Calendar integration', 'Department routing', 'Call recording notice']]]
  .map(([col, cards]) => `<div style="background:${t.surface};border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:10px;min-height:330px"><div class="flex" style="font-size:12.5px;font-weight:600;color:${t.muted}">${col}<span class="grow"></span>${cards.length}</div>
${cards.map((c, i) => `<div style="background:#fff;border:1px solid ${t.border};border-radius:10px;padding:12px;font-size:13.5px;font-weight:550;line-height:1.4">${c}<div class="flex" style="margin-top:10px">${pill(col === 'Done' ? 'Shipped' : ['Voice', 'Web', 'API'][i % 3], col === 'Done' ? 'brand' : '')}<span class="grow"></span><span class="av" style="width:22px;height:22px;font-size:9.5px">${['AR', 'MN', 'SK'][i % 3]}</span></div></div>`).join('')}</div>`).join('')}</div></div>` })),
  ),
});
addPhase({
  name: 'phase-operate',
  out: 'public/process/operate.webp',
  html: page(PW, PH, stage(win({ w: 1060, center: true, title: 'Monitoring', body: `<div style="padding:24px 28px;display:flex;flex-direction:column;gap:16px">
<div class="head"><div><div class="h1">Production health</div><div class="sub">Shefa · City Care Hospital · last 30 days</div></div>${pill('All systems normal', 'brand')}</div>
<div class="row">${kpi('Uptime', '99.95%')}${kpi('Calls handled', '11,820')}${kpi('Intent accuracy', '96.4%')}</div>
<div class="card col"><div class="flex"><div class="grow" style="font-weight:600;font-size:13.5px">Intent accuracy after each retrain</div>${pill('Retrained on Oct 28', 'dark')}</div>${line([91.2, 92, 91.6, 93.1, 93.4, 94.2, 94.6, 95.1, 95.6, 96.4], { w: 960, h: 150 })}</div>
<div class="card col" style="gap:10px"><div style="font-weight:600;font-size:13.5px">Recent events</div>
${[['check', 'Security patches applied', 'Nov 2'], ['layers', 'Model v2.3 rolled out to all departments', 'Oct 28'], ['file', 'Monthly report sent to hospital management', 'Oct 31']].map(([ic, e, d]) => `<div class="flex" style="font-size:13px"><span>${icon(ic, 15, t.brand)}</span><span class="grow">${e}</span><span class="sub" style="font-size:12px">${d}</span></div>`).join('')}</div></div>` })),
  ),
});

/* ------------------------------------------------------------ Blog covers */
// Covers are cropped to cards on the site, so each composition is scaled up
// around the centre to fill the frame.
function cover(name, inner, zoom = 1.5) {
  const scaled = `<div style="position:absolute;inset:0;transform:scale(${zoom});transform-origin:50% 50%">${inner}</div>`;
  add({ name: `blog-${name}`, out: `public/blog/${name}.webp`, html: page(W, H, stage(scaled)) });
}
cover('ai-voice-agents-for-business', `<div style="position:absolute;inset:0;display:grid;place-items:center">
<div class="win auto" style="position:relative;width:980px;padding:34px 38px;display:flex;flex-direction:column;gap:22px">
<div class="flex"><div class="av" style="width:56px;height:56px;background:${t.brandSoft}">${icon('phone', 26, t.brand)}</div><div class="grow"><div style="font-size:24px;font-weight:650">Incoming call · Cardiology line</div><div class="sub" style="font-size:15px">Answered by Shefa in 2 seconds</div></div>${pill('Bangla', '')}</div>
<div>${waveform(150, { h: 110, seed: 3 })}</div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">${['09:30', '10:15', '10:30', '11:00'].map((s, i) => `<div class="chip${i === 1 ? ' on' : ''}" style="font-size:18px;padding:14px">${s}</div>`).join('')}</div></div></div>`);
cover('chatbots-that-cite-their-sources', `<div style="position:absolute;inset:0;display:grid;place-items:center">
<div style="width:820px;display:flex;flex-direction:column;gap:18px">
<div style="align-self:flex-end;background:${t.ink};color:#fff;border-radius:22px;border-bottom-right-radius:6px;padding:18px 24px;font-size:24px;box-shadow:0 20px 40px -20px rgba(0,0,0,.4)">Can I return an item after 10 days?</div>
<div style="align-self:flex-start;background:#fff;border:1px solid ${t.border};border-radius:22px;border-bottom-left-radius:6px;padding:22px 26px;font-size:24px;line-height:1.45;max-width:780px;box-shadow:0 30px 60px -30px rgba(0,0,0,.3)">Returns are accepted within <b>7 days</b> of delivery with tags attached. After that, we can offer an exchange.
<div class="flex" style="margin-top:16px;font-size:16px;color:${t.brand};font-weight:600">${icon('file', 18, t.brand)}Returns policy · section 3</div></div></div></div>`);
cover('face-recognition-attendance-privacy', `<div style="position:absolute;inset:0;display:grid;place-items:center">
<div style="display:flex;gap:30px;align-items:center">
<div style="width:520px;height:600px;border-radius:28px;background:radial-gradient(120% 90% at 50% 100%,#3a3a3a,#121212);position:relative;box-shadow:0 40px 80px -30px rgba(0,0,0,.5)">
<div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:210px;height:262px;border-radius:46% 46% 42% 42%;background:linear-gradient(#5a5a5a,#3a3a3a)"></div>
<div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);width:280px;height:330px;border:3px solid ${t.brandDark};border-radius:22px"></div>
<div style="position:absolute;left:22px;right:22px;bottom:22px;background:#fff;border-radius:16px;padding:16px 18px;display:flex;align-items:center;gap:12px;font-size:18px">${icon('check', 22, t.brand)}<span class="grow"><b>Liveness check passed</b></span></div></div>
<div class="col" style="gap:14px;width:420px">${[['shield', 'Templates encrypted, not photos'], ['users', 'Access limited by role'], ['clock', 'Retention set by HR policy']].map(([ic, txt]) => `<div class="card flex" style="padding:20px;font-size:19px;font-weight:550;gap:14px;box-shadow:0 20px 40px -24px rgba(0,0,0,.25)"><span>${icon(ic, 24, t.brand)}</span>${txt}</div>`).join('')}</div></div></div>`, 1.2);
cover('analytics-before-ai', `<div style="position:absolute;inset:0;display:grid;place-items:center">
<div class="win auto" style="position:relative;width:1080px;padding:34px 38px;display:flex;flex-direction:column;gap:18px">
<div class="flex"><div class="grow"><div style="font-size:24px;font-weight:650">Weekly revenue and forecast</div><div class="sub" style="font-size:15px">Clean data first, then prediction</div></div>${pill('Forecast', 'brand')}</div>
${columns([31, 34, 33, 37, 36, 40, 39, 43, 42, 46, 45, 49, 50, 52, 51, 54], { w: 1000, h: 420, forecastFrom: 12 })}</div></div>`, 1.18);
cover('about-auravine', `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:70px">
<div style="width:300px;height:300px;border-radius:72px;background:#fff;display:grid;place-items:center;box-shadow:0 40px 80px -30px rgba(0,0,0,.3),inset 0 0 0 1px ${t.border}">${mark(190)}</div>
<div class="col" style="gap:14px"><img src="file://${process.cwd()}/public/brand/auravine-logo.svg" style="height:86px;align-self:flex-start">
<div style="font-size:28px;color:${t.muted};font-weight:500">AI-first software partners</div>
<div class="flex" style="font-size:20px;color:${t.muted};gap:10px">${icon('pin', 22, t.brand)}Dhaka, Bangladesh · 23.81° N, 90.41° E</div></div></div>`, 1.35);

/* ------------------------------------------------------- Lanyard textures */
// Front and back of the 3D badge sit side by side, as the card model's UVs expect.
scenes.push({
  name: 'lanyard-card', out: 'public/lanyard/desain-kartu.webp', width: 1250, height: 1406, scale: 3,
  html: page(1250, 1406, `<div style="position:absolute;inset:0;background:#fff"></div>
<div style="position:absolute;left:0;top:0;width:625px;height:1068px;background:#fff;display:flex;flex-direction:column">
  <div style="height:640px;background:${t.ink};position:relative;overflow:hidden;display:grid;place-items:center">
    <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.1) 1.4px,transparent 1.6px);background-size:26px 26px"></div>
    <div style="width:300px;height:300px;border-radius:80px;background:${t.brandDark};display:grid;place-items:center;position:relative">${mark(200, t.ink, t.ink)}</div></div>
  <div style="padding:46px 48px;display:flex;flex-direction:column;gap:16px">
    <div style="font-size:64px;font-weight:700;letter-spacing:-.03em;line-height:1">Auravine</div>
    <div style="font-size:28px;color:${t.muted};font-weight:500">AI-first software partners</div>
    <div class="flex" style="font-size:24px;color:${t.brand};font-weight:600;margin-top:18px;gap:12px">${icon('pin', 28, t.brand)}Dhaka, Bangladesh</div></div></div>
<div style="position:absolute;left:625px;top:0;width:625px;height:1068px;background:${t.ink};color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:56px 50px;overflow:hidden">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">${Array.from({ length: 16 }, (_, i) => `<div style="aspect-ratio:1;border-radius:${i % 3 === 0 ? '50%' : '28px'};background:${i % 5 === 0 ? t.brandDark : 'rgba(255,255,255,.08)'};display:grid;place-items:center">${i % 5 === 0 ? mark(70, t.ink, t.ink) : ''}</div>`).join('')}</div>
  <div class="col" style="gap:14px"><div style="font-size:34px;font-weight:650">Book a free consultation</div>
  <div style="font-size:24px;opacity:.65;line-height:1.4">Voice agents, chatbots, computer vision and analytics for your business.</div></div></div>`),
});
scenes.push({
  name: 'lanyard-strap', out: 'public/lanyard/lanyard.webp', width: 1025, height: 250, scale: 1,
  html: page(1025, 250, `<div style="position:absolute;inset:0;background:${t.ink};display:flex;align-items:center;justify-content:center;gap:28px">
${mark(110, '#fafafa', t.brandDark)}<span style="font-size:84px;font-weight:700;letter-spacing:-.03em;color:#fafafa">Auravine</span></div>`),
});

/* ------------------------------------------------------- Social share image */
scenes.push({
  name: 'og-image', out: 'public/og-image.png', width: 1200, height: 630, scale: 1,
  html: page(1200, 630, stage(`<div style="position:absolute;left:72px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:22px;width:560px;z-index:3">
<img src="file://${process.cwd()}/public/brand/auravine-logo-dark.svg" style="height:58px;align-self:flex-start">
<div style="font-size:46px;font-weight:650;letter-spacing:-.025em;line-height:1.1;color:#fafafa">AI-first software partners from Dhaka</div>
<div style="font-size:21px;color:#a6a6a6;line-height:1.45">Voice agents, chatbots, computer vision and business analytics for companies in Bangladesh and worldwide.</div></div>
<div style="position:absolute;left:700px;top:90px;width:760px;height:520px;border-radius:16px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.6);border:1px solid #262626">
<img src="file://${process.cwd()}/public/project/featured/shefa-hero.webp" style="width:1120px;margin:-60px 0 0 -70px"></div>`, { dark: true })),
});


/* ------------------------------------------- "How we work" illustrations */
// Line illustrations for the Capabilities page cards (dark cards, so white line art).
const values = [
  ['business-understanding', 'chart'], ['clear-communication', 'message'], ['transparency', 'search'],
  ['ownership', 'shield'], ['localization', 'globe'], ['collaboration', 'users'],
];
for (const [slug, ic] of values) {
  scenes.push({
    name: `value-${slug}`, out: `public/skills/${slug}.webp`, width: 600, height: 600, scale: 1, transparent: true,
    html: page(600, 600, `<svg width="600" height="600" viewBox="0 0 600 600" style="position:absolute;inset:0">
<circle cx="300" cy="300" r="210" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
<circle cx="300" cy="300" r="150" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="2" stroke-dasharray="6 10"/>
<circle cx="300" cy="90" r="9" fill="${t.brandDark}"/><circle cx="510" cy="300" r="6" fill="#ffffff" opacity=".7"/><circle cx="152" cy="448" r="7" fill="${t.brandDark}" opacity=".8"/></svg>
<div style="position:absolute;inset:0;display:grid;place-items:center">${icon(ic, 190, '#ffffff', 1.25)}</div>`, { transparent: true }),
  });
}

export { scenes };
