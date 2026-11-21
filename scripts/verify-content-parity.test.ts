import { describe, expect, it, vi } from 'vitest';
import { compare, normalize } from './verify-content-parity';

describe('normalize', () => {
    it('ignores scripts, styles, attributes, ids and whitespace', () => {
        const a = '<html><head><style>a{}</style><script>var x=1</script></head><body><div id=":R1:" data-x="1"><h1>Hello   world</h1></div></body></html>';
        const b = '<html><head><style>b{}</style><script>var x=2</script></head><body><div id=":R9:" data-x="2"><h1>Hello world</h1></div></body></html>';
        expect(normalize(a)).toBe(normalize(b));
    });
    it('keeps visible text differences', () => {
        expect(normalize('<h1>Hello</h1>')).not.toBe(normalize('<h1>Hullo</h1>'));
    });
    it('decodes common entities so escaping style does not matter', () => {
        expect(normalize('<p>A &amp; B&#x27;s</p>')).toBe(normalize("<p>A & B's</p>"));
    });
});

describe('compare', () => {
    const page = (text: string) => new Response(`<body><h1>${text}</h1></body>`, { status: 200 });
    it('reports identical routes as same', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => page('Same')));
        const result = await compare('http://a', 'http://b', ['/', '/x']);
        expect(result.map((r) => r.same)).toEqual([true, true]);
        vi.unstubAllGlobals();
    });
    it('reports a differing route with an excerpt of the first difference', async () => {
        vi.stubGlobal('fetch', vi.fn(async (url: string) => page(url.startsWith('http://a') ? 'Old title' : 'New title')));
        const [result] = await compare('http://a', 'http://b', ['/p']);
        expect(result.same).toBe(false);
        expect(result.firstDiff).toContain('Old');
        expect(result.firstDiff).toContain('New');
        vi.unstubAllGlobals();
    });
    it('treats different status codes as a difference', async () => {
        vi.stubGlobal('fetch', vi.fn(async (url: string) => url.startsWith('http://a') ? page('x') : new Response('nf', { status: 404 })));
        const [result] = await compare('http://a', 'http://b', ['/p']);
        expect(result.same).toBe(false);
        expect(result.firstDiff).toMatch(/200.*404/);
        vi.unstubAllGlobals();
    });
});
