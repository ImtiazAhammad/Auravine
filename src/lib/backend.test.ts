import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BackendUnavailable, callBackend, clientIp } from './backend';

let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
    process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
    fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.BACKEND_INTERNAL_URL;
});

describe('callBackend', () => {
    it('posts JSON to the backend with the visitor ip', async () => {
        await callBackend('/contact', { body: { a: 1 }, ip: '203.0.113.9' });
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('https://backend.internal/contact');
        expect(init.method).toBe('POST');
        expect(init.headers).toMatchObject({ 'content-type': 'application/json', 'x-client-ip': '203.0.113.9' });
        expect(JSON.parse(init.body)).toEqual({ a: 1 });
        expect(init.signal).toBeInstanceOf(AbortSignal);
    });
    it('tolerates a trailing slash on the base url', async () => {
        process.env.BACKEND_INTERNAL_URL = 'https://backend.internal/';
        await callBackend('/chat', { body: {}, ip: 'x' });
        expect(fetchMock.mock.calls[0][0]).toBe('https://backend.internal/chat');
    });
    it('throws BackendUnavailable when the url is not configured or the call fails', async () => {
        delete process.env.BACKEND_INTERNAL_URL;
        await expect(callBackend('/chat', { body: {}, ip: 'x' })).rejects.toBeInstanceOf(BackendUnavailable);
        process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
        fetchMock.mockRejectedValue(new TypeError('fetch failed'));
        await expect(callBackend('/chat', { body: {}, ip: 'x' })).rejects.toBeInstanceOf(BackendUnavailable);
    });
});

describe('clientIp (Review Focus 4)', () => {
    const req = (headers: Record<string, string>) => new Request('http://x', { headers });
    it('uses the last x-forwarded-for entry, which the platform appends, not a spoofed first one', () => {
        expect(clientIp(req({ 'x-forwarded-for': '6.6.6.6, 203.0.113.9' }))).toBe('203.0.113.9');
    });
    it('falls back to x-real-ip then unknown', () => {
        expect(clientIp(req({ 'x-real-ip': '198.51.100.4' }))).toBe('198.51.100.4');
        expect(clientIp(req({}))).toBe('unknown');
    });
});
