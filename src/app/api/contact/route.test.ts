import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

const request = (body: unknown) =>
    new Request('http://localhost/api/contact', {
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

describe('POST /api/contact', () => {
    it('passes the backend answer through with the visitor ip', async () => {
        callBackend.mockResolvedValue(new Response(JSON.stringify({ message: 'Message received' }), { status: 200 }));
        const res = await POST(request({ name: 'A', email: 'a@b.co', message: 'hi' }));
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ message: 'Message received' });
        expect(sent()).toEqual(['/contact', { name: 'A', email: 'a@b.co', message: 'hi' }, '203.0.113.9']);
    });
    it('passes validation and rate-limit statuses through', async () => {
        callBackend.mockResolvedValue(new Response(JSON.stringify({ error: 'Too many' }), { status: 429 }));
        const res = await POST(request({}));
        expect(res.status).toBe(429);
        expect((await res.json()).error).toBe('Too many');
    });
    it('turns a backend outage into a generic 503', async () => {
        callBackend.mockRejectedValue(new TypeError('fetch failed down'));
        const res = await POST(request({ name: 'A' }));
        expect(res.status).toBe(503);
        expect(JSON.stringify(await res.json())).not.toContain('down');
    });
    it('rejects a body that is not JSON with 400', async () => {
        const res = await POST(new Request('http://localhost/api/contact', { method: 'POST', body: 'nope' }));
        expect(res.status).toBe(400);
        expect(callBackend).not.toHaveBeenCalled();
    });
});
