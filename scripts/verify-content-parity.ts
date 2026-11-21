/**
 * Compares the visible text of the same pages on two running servers, one started with
 * CONTENT_SOURCE=static and one with CONTENT_SOURCE=supabase.
 *
 *   npm run verify:parity -- http://localhost:3000 http://localhost:3001
 */
import { portfolioData } from '../src/data/portfolio';

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'", '&nbsp;': ' ' };

export function normalize(html: string): string {
    return html
        .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<!--[\s\S]*?-->/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&(?:amp|lt|gt|quot|nbsp|#x27|#39);/g, (e) => ENTITIES[e])
        .replace(/\s+/g, ' ')
        .trim();
}

export interface RouteResult { route: string; same: boolean; firstDiff?: string }

async function load(base: string, route: string) {
    const res = await fetch(base + route, { headers: { 'user-agent': 'parity-check' }, redirect: 'follow' });
    return { status: res.status, text: normalize(await res.text()) };
}

export async function compare(staticBase: string, supabaseBase: string, routes: string[]): Promise<RouteResult[]> {
    const results: RouteResult[] = [];
    for (const route of routes) {
        const [a, b] = await Promise.all([load(staticBase, route), load(supabaseBase, route)]);
        if (a.status !== b.status) {
            results.push({ route, same: false, firstDiff: `status ${a.status} vs ${b.status}` });
            continue;
        }
        if (a.text === b.text) { results.push({ route, same: true }); continue; }
        let i = 0;
        while (i < a.text.length && a.text[i] === b.text[i]) i++;
        const excerpt = (t: string) => t.slice(Math.max(0, i - 40), i + 80);
        results.push({ route, same: false, firstDiff: `static: …${excerpt(a.text)}…\nsupabase: …${excerpt(b.text)}…` });
    }
    return results;
}

const ROUTES = [
    '/', '/projects', ...portfolioData.projects.map((p) => `/projects/${p.slug}`),
    '/blog', ...portfolioData.blogs.map((b) => `/blog/${b.slug}`), '/skills', '/contact',
];

async function main() {
    const [staticBase, supabaseBase] = process.argv.slice(2);
    if (!staticBase || !supabaseBase) throw new Error('usage: verify-content-parity <staticBase> <supabaseBase>');
    const results = await compare(staticBase, supabaseBase, ROUTES);
    for (const r of results) console.log(`${r.same ? 'same' : 'DIFF'}  ${r.route}${r.firstDiff ? `\n${r.firstDiff}` : ''}`);
    const bad = results.filter((r) => !r.same).length;
    console.log(`${results.length - bad}/${results.length} routes identical`);
    process.exit(bad ? 1 : 0);
}

if (process.argv[1]?.endsWith('verify-content-parity.ts')) void main();
