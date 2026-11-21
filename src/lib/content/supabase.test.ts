import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
    CONTENT_TAG, ContentFetchError, REVALIDATE_SECONDS, fetchPublished, fetchSettings,
} from './supabase';

const KEY = 'sb_publishable_SECRETVALUE123';
const URL_BASE = 'https://proj.supabase.co';

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
    process.env.SUPABASE_URL = URL_BASE;
    process.env.SUPABASE_ANON_KEY = KEY;
    fetchMock = vi.fn(async () => new Response(JSON.stringify([{ a: 1 }]), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_ANON_KEY;
});

describe('fetchPublished', () => {
    it('requests published rows in order with the anon key, cache tag and a timeout', async () => {
        const rows = await fetchPublished('projects');
        expect(rows).toEqual([{ a: 1 }]);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe(`${URL_BASE}/rest/v1/projects?select=*&status=eq.published&order=sort_order.asc`);
        expect(init.headers).toEqual({ apikey: KEY });
        expect(init.next).toEqual({ revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] });
        expect(init.signal).toBeInstanceOf(AbortSignal);
        expect(REVALIDATE_SECONDS).toBe(300);
        expect(CONTENT_TAG).toBe('content');
    });
    it('tolerates a trailing slash on SUPABASE_URL', async () => {
        process.env.SUPABASE_URL = `${URL_BASE}/`;
        await fetchPublished('faqs');
        expect(fetchMock.mock.calls[0][0]).toBe(`${URL_BASE}/rest/v1/faqs?select=*&status=eq.published&order=sort_order.asc`);
    });
});

describe('fetchSettings', () => {
    it('reads site_settings with no status filter', async () => {
        await fetchSettings();
        expect(fetchMock.mock.calls[0][0]).toBe(`${URL_BASE}/rest/v1/site_settings?select=*`);
    });
});

describe('failures', () => {
    it.each(['SUPABASE_URL', 'SUPABASE_ANON_KEY'])('throws without %s and makes no request', async (name) => {
        delete process.env[name];
        await expect(fetchPublished('projects')).rejects.toBeInstanceOf(ContentFetchError);
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('throws on an HTTP error, naming the status but not the key', async () => {
        fetchMock.mockResolvedValue(new Response('nope', { status: 401 }));
        const error = await fetchPublished('projects').catch((e) => e);
        expect(error).toBeInstanceOf(ContentFetchError);
        expect(error.message).toContain('401');
        expect(error.message).not.toContain(KEY);
        expect(JSON.stringify(error)).not.toContain(KEY);
    });
    it('throws when fetch rejects (network, timeout)', async () => {
        fetchMock.mockRejectedValue(new DOMException('timed out', 'TimeoutError'));
        await expect(fetchPublished('projects')).rejects.toBeInstanceOf(ContentFetchError);
    });
    it('throws when the body is not an array', async () => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ message: 'x' }), { status: 200 }));
        await expect(fetchPublished('projects')).rejects.toBeInstanceOf(ContentFetchError);
    });
    it('throws when the body is not JSON', async () => {
        fetchMock.mockResolvedValue(new Response('<html>', { status: 200 }));
        await expect(fetchPublished('projects')).rejects.toBeInstanceOf(ContentFetchError);
    });
});
