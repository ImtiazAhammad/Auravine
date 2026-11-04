// Render Auravine's brand assets from code.
//
//   npm run assets:generate                 render every scene
//   npm run assets:generate -- shefa safar  render scenes whose name contains a filter
//
// Needs Google Chrome or Chromium (set CHROME_BIN if it is not found) and the
// Inter typeface installed for pixel-identical output. Scenes live in scenes.mjs.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { scenes } from './scenes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function findChrome() {
  const candidates = [
    process.env.CHROME_BIN,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  for (const name of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    try {
      const found = execFileSync('which', [name], { encoding: 'utf8' }).trim();
      if (found) return found;
    } catch {}
  }
  throw new Error('Chrome or Chromium not found. Set CHROME_BIN to its executable path.');
}

async function main() {
  const filters = process.argv.slice(2);
  const chosen = filters.length ? scenes.filter((s) => filters.some((f) => s.name.includes(f))) : scenes;
  if (!chosen.length) throw new Error(`No scene matches: ${filters.join(', ')}`);

  const chrome = findChrome();
  const work = path.join(tmpdir(), 'auravine-assets');
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });

  for (const scene of chosen) {
    const { name, out, width, height, scale = 1.5, transparent = false, html } = scene;
    const htmlPath = path.join(work, `${name}.html`);
    const pngPath = path.join(work, `${name}.png`);
    writeFileSync(htmlPath, html, 'utf8');

    const args = [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      `--force-device-scale-factor=${scale}`,
      // Headless Chrome's viewport is shorter than the window, so open a taller
      // window and crop to the exact canvas afterwards.
      `--window-size=${width},${height + 240}`,
      '--virtual-time-budget=2500',
      `--screenshot=${pngPath}`,
    ];
    if (transparent) args.push('--default-background-color=00000000');
    if (process.platform === 'linux' && process.getuid?.() === 0) args.push('--no-sandbox');
    execFileSync(chrome, [...args, pathToFileURL(htmlPath).href], { stdio: 'ignore' });

    const target = path.join(root, out);
    mkdirSync(path.dirname(target), { recursive: true });
    const img = sharp(pngPath).extract({ left: 0, top: 0, width: Math.round(width * scale), height: Math.round(height * scale) });
    if (out.endsWith('.webp')) await img.webp({ quality: 86, effort: 5, alphaQuality: 90 }).toFile(target);
    else await img.png({ compressionLevel: 9 }).toFile(target);
    const meta = await sharp(target).metadata();
    console.log(`${name.padEnd(28)} -> ${out} (${meta.width}x${meta.height})`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
