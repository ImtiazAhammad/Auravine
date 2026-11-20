// One-off export of the site's content (src/data/portfolio.ts) to JSON for the database seed.
//   npm run seed:export     writes backend/seed/portfolio.json (git-ignored)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { portfolioData } from '../src/data/portfolio';

const out = resolve(process.cwd(), 'backend/seed/portfolio.json');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(portfolioData, null, 2) + '\n');

const counts = Object.fromEntries(
    Object.entries(portfolioData).map(([key, value]) => [key, Array.isArray(value) ? value.length : 'object'])
);
console.log(`wrote ${out}`);
console.log(JSON.stringify(counts));
