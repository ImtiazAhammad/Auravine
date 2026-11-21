import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GET, POST } from './route';

const request = (body: unknown) =>
    new Request('http://localhost/api/chat', {
        method: 'POST', headers: { 'x-forwarded-for': '203.0.113.9' }, body: JSON.stringify(body),
    });

const callBackend = vi.fn();
beforeEach(() => {
    callBackend.mockReset();
    process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
    vi.stubGlobal('fetch', callBackend);
});
afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.BACKEND_INTERNAL_URL;
});

/** What the proxy sent to the backend: [path, parsed body, ip]. */
const sent = () => {
    const [url, init] = callBackend.mock.calls[0];
    return [new URL(url).pathname, JSON.parse(init.body), init.headers['x-client-ip']];
};

describe('POST /api/chat', () => {
    it('returns the reply and provider unchanged', async () => {
        callBackend.mockResolvedValue(new Response(JSON.stringify({ reply: 'hi', provider: 'groq' }), { status: 200 }));
        const body = { messages: [{ role: 'user', content: 'hello' }], locale: 'en' };
        const res = await POST(request(body));
        expect(await res.json()).toEqual({ reply: 'hi', provider: 'groq' });
        expect(sent()).toEqual(['/chat', body, '203.0.113.9']);
    });
    it('passes a friendly 503 from the backend through', async () => {
        callBackend.mockResolvedValue(new Response(JSON.stringify({ error: 'try later' }), { status: 503 }));
        const res = await POST(request({ messages: [] }));
        expect(res.status).toBe(503);
        expect((await res.json()).error).toBe('try later');
    });
    it('turns a backend outage into a generic 503 error', async () => {
        callBackend.mockRejectedValue(new TypeError('fetch failed boom'));
        const res = await POST(request({ messages: [{ role: 'user', content: 'x' }] }));
        expect(res.status).toBe(503);
        expect(typeof (await res.json()).error).toBe('string');
    });
});

describe('GET /api/chat', () => {
    it('does not reveal which providers are configured', async () => {
        const res = await GET();
        expect(await res.json()).toEqual({ status: 'ok' });
    });
});
