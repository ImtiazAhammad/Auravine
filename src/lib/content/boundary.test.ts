import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = path.resolve(import.meta.dirname, '../..');
const ALLOWED = new Set([
    'lib/content/static.ts',
    'lib/content/map.test.ts',
    'lib/content/index.test.ts',
    'data/portfolio.ts',
]);

function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const full = path.join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
    });
}

describe('content boundary', () => {
    it('only the content layer imports the static portfolio data', () => {
        const offenders = walk(ROOT)
            .filter((f) => /\.(ts|tsx)$/.test(f))
            .map((f) => path.relative(ROOT, f))
            .filter((f) => !ALLOWED.has(f))
            .filter((f) => /from\s+['"]@\/data\/portfolio['"]/.test(readFileSync(path.join(ROOT, f), 'utf8')));
        expect(offenders).toEqual([]);
    });
});
