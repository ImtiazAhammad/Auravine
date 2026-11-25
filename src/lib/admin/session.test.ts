import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const store = new Map<string, string>();
vi.mock('next/headers', () => ({
    cookies: async () => ({ get: (name: string) => (store.has(name) ? { name, value: store.get(name) } : undefined) }),
}));

import {
    ACCESS_COOKIE, AuthUnavailable, REFRESH_COOKIE, cookieOptions, getAdmin, readCookie,
    refreshTokens, safeNext, sameOrigin, signIn,
} from './session';

let fetchMock: ReturnType<typeof vi.fn>;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const TOKENS = { access_token: 'acc', refresh_token: 'ref', expires_in: 3600 };

beforeEach(() => {
    store.clear();
    process.env.SUPABASE_URL = 'https://proj.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'anon-key';
    process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
    vi.unstubAllGlobals();
    for (const n of ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'BACKEND_INTERNAL_URL']) delete process.env[n];
});

describe('signIn', () => {
    it('posts credentials to Supabase Auth with the anon key and returns the tokens', async () => {
        fetchMock.mockResolvedValue(json(TOKENS));
        expect(await signIn('a@b.co', 'pw')).toEqual({ access: 'acc', refresh: 'ref', expiresIn: 3600 });
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('https://proj.supabase.co/auth/v1/token?grant_type=password');
        expect(init.headers.apikey).toBe('anon-key');
        expect(JSON.parse(init.body)).toEqual({ email: 'a@b.co', password: 'pw' });
    });
    it('returns null for wrong credentials', async () => {
        fetchMock.mockResolvedValue(json({ error: 'invalid_grant' }, 400));
        expect(await signIn('a@b.co', 'bad')).toBeNull();
    });
    it('throws AuthUnavailable when Supabase is down or not configured', async () => {
        fetchMock.mockResolvedValue(json({}, 500));
        await expect(signIn('a@b.co', 'pw')).rejects.toBeInstanceOf(AuthUnavailable);
        fetchMock.mockRejectedValue(new TypeError('network'));
        await expect(signIn('a@b.co', 'pw')).rejects.toBeInstanceOf(AuthUnavailable);
        delete process.env.SUPABASE_ANON_KEY;
        await expect(signIn('a@b.co', 'pw')).rejects.toBeInstanceOf(AuthUnavailable);
    });
});

describe('refreshTokens', () => {
    it('exchanges a refresh token and returns null when it is rejected', async () => {
        fetchMock.mockResolvedValueOnce(json(TOKENS));
        expect((await refreshTokens('old'))?.access).toBe('acc');
        expect(fetchMock.mock.calls[0][0]).toBe('https://proj.supabase.co/auth/v1/token?grant_type=refresh_token');
        fetchMock.mockResolvedValueOnce(json({ error: 'invalid' }, 400));
        expect(await refreshTokens('old')).toBeNull();
    });
});

describe('cookies (Review Focus 3)', () => {
    it('are httpOnly and strict, and Secure in production', () => {
        expect(cookieOptions(60)).toMatchObject({ httpOnly: true, sameSite: 'strict', path: '/', maxAge: 60 });
        vi.stubEnv('NODE_ENV', 'production');
        expect(cookieOptions(60).secure).toBe(true);
        vi.unstubAllEnvs();
    });
    it('readCookie parses the request header', () => {
        const request = new Request('http://x', { headers: { cookie: 'a=1; av_access=tok%3D; b=2' } });
        expect(readCookie(request, 'av_access')).toBe('tok=');
        expect(readCookie(request, 'missing')).toBeUndefined();
    });
});

describe('sameOrigin (Review Focus 2)', () => {
    const req = (headers: Record<string, string>) => new Request('https://site.test/api/admin/x', { method: 'POST', headers });
    it('accepts the site\'s own origin', () => {
        expect(sameOrigin(req({ origin: 'https://site.test', host: 'site.test' }))).toBe(true);
    });
    it('rejects another origin, a missing origin and an unparseable one', () => {
        expect(sameOrigin(req({ origin: 'https://evil.test', host: 'site.test' }))).toBe(false);
        expect(sameOrigin(req({ host: 'site.test' }))).toBe(false);
        expect(sameOrigin(req({ origin: 'null', host: 'site.test' }))).toBe(false);
    });
    it('uses x-forwarded-host when the platform sets it', () => {
        expect(sameOrigin(req({ origin: 'https://auravine-ai.vercel.app', host: 'internal', 'x-forwarded-host': 'auravine-ai.vercel.app' }))).toBe(true);
    });
});

describe('safeNext', () => {
    it('only allows admin paths on this site', () => {
        expect(safeNext('/admin/projects')).toBe('/admin/projects');
        for (const bad of ['//evil.test', 'https://evil.test', '/other', '/admin/../x', null, '']) {
            expect(safeNext(bad as string | null)).toBe('/admin');
        }
    });
});

describe('getAdmin', () => {
    it('is anonymous without cookies and makes no call', async () => {
        expect(await getAdmin()).toEqual({ status: 'anonymous' });
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('is ok when the backend accepts the token', async () => {
        store.set(ACCESS_COOKIE, 'acc');
        fetchMock.mockResolvedValue(json({ id: 'u1', email: 'o@x.co' }));
        expect(await getAdmin()).toEqual({ status: 'ok', admin: { id: 'u1', email: 'o@x.co' } });
        expect(fetchMock.mock.calls[0][1].headers.authorization).toBe('Bearer acc');
    });
    it('asks for a refresh when the token expired but a refresh cookie exists', async () => {
        store.set(REFRESH_COOKIE, 'ref');
        expect(await getAdmin()).toEqual({ status: 'expired' });
        store.set(ACCESS_COOKIE, 'old');
        fetchMock.mockResolvedValue(json({}, 401));
        expect(await getAdmin()).toEqual({ status: 'expired' });
    });
    it('is forbidden for a non-admin and unavailable when the backend is down', async () => {
        store.set(ACCESS_COOKIE, 'acc');
        fetchMock.mockResolvedValueOnce(json({}, 403));
        expect(await getAdmin()).toEqual({ status: 'forbidden' });
        fetchMock.mockRejectedValueOnce(new TypeError('down'));
        expect(await getAdmin()).toEqual({ status: 'unavailable' });
    });
});
