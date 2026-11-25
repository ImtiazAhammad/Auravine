import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST as login } from './login/route';
import * as logoutModule from './logout/route';
import { GET as refresh } from './refresh/route';
import { DELETE, GET, POST, PUT } from './[...path]/route';

const logout = logoutModule.POST;
const TOKENS = { access_token: 'acc-secret', refresh_token: 'ref-secret', expires_in: 3600 };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const ORIGIN = { origin: 'https://site.test', host: 'site.test' };

let fetchMock: ReturnType<typeof vi.fn>;
let backend: (url: string, init: RequestInit) => Response | Promise<Response>;
let authToken: (url: string, init: RequestInit) => Response;
let attempt: (init: RequestInit) => Response;

beforeEach(() => {
    process.env.SUPABASE_URL = 'https://proj.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'anon-key';
    process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
    authToken = () => json(TOKENS);
    backend = () => json({ items: [] });
    attempt = () => json({ ok: true });
    fetchMock = vi.fn(async (url: string, init: RequestInit) =>
        url.includes('/auth/v1/token') ? authToken(url, init)
            : url.endsWith('/login-attempt') ? attempt(init) : backend(url, init));
    vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
    vi.unstubAllGlobals();
    for (const n of ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'BACKEND_INTERNAL_URL']) delete process.env[n];
});

const post = (url: string, body: unknown, headers: Record<string, string> = ORIGIN, cookie = '') =>
    new Request(`https://site.test${url}`, {
        method: 'POST', body: JSON.stringify(body), headers: { ...headers, ...(cookie ? { cookie } : {}) },
    });
const setCookies = (res: Response) => res.headers.getSetCookie().join('\n');
const ctx = (...path: string[]) => ({ params: Promise.resolve({ path }) });

describe('POST /api/admin/login', () => {
    it('counts the attempt against the visitor first, using the real client address', async () => {
        backend = () => json({ id: 'u1', email: 'o@x.co' });
        const request = new Request('https://site.test/api/admin/login', {
            method: 'POST', body: JSON.stringify({ email: 'o@x.co', password: 'pw' }),
            headers: { ...ORIGIN, 'x-forwarded-for': '6.6.6.6, 9.9.9.9' },
        });
        await login(request);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('https://backend.internal/login-attempt');
        expect((init.headers as Record<string, string>)['x-client-ip']).toBe('9.9.9.9');
    });
    it('too many attempts: 429 and the password is never sent to Supabase', async () => {
        attempt = () => json({ error: 'Too many attempts' }, 429);
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }));
        expect(res.status).toBe(429);
        expect(fetchMock.mock.calls.some(([u]) => String(u).includes('/auth/v1/token'))).toBe(false);
        expect(setCookies(res)).toBe('');
    });
    it.each([503, 500, 404])('limiter answering %i fails closed: 503, no password sent', async (status) => {
        attempt = () => json({}, status);
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }));
        expect(res.status).toBe(503);
        expect(fetchMock.mock.calls.some(([u]) => String(u).includes('/auth/v1/token'))).toBe(false);
    });
    it('backend unreachable fails closed: 503, no password sent', async () => {
        fetchMock.mockImplementationOnce(async () => { throw new TypeError('down'); });
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }));
        expect(res.status).toBe(503);
        expect(fetchMock.mock.calls.some(([u]) => String(u).includes('/auth/v1/token'))).toBe(false);
    });
    it('sets httpOnly strict cookies and returns no token (Review Focus 3)', async () => {
        backend = () => json({ id: 'u1', email: 'o@x.co' });
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }));
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ ok: true });
        const cookies = setCookies(res);
        expect(cookies).toContain('av_access=acc-secret');
        expect(cookies).toContain('av_refresh=ref-secret');
        expect(cookies.match(/HttpOnly/gi)?.length).toBe(2);
        expect(cookies.match(/SameSite=strict/gi)?.length).toBe(2);
    });
    it('wrong credentials: generic 401, no cookies', async () => {
        authToken = () => json({ error: 'invalid_grant' }, 400);
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'bad' }));
        expect(res.status).toBe(401);
        expect(setCookies(res)).toBe('');
        expect(JSON.stringify(await res.json())).not.toContain('invalid_grant');
    });
    it('valid account that is not an admin: 403 and no cookies', async () => {
        backend = () => json({ detail: 'Not an admin' }, 403);
        const res = await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }));
        expect(res.status).toBe(403);
        expect(setCookies(res)).toBe('');
    });
    it('refuses a foreign origin and bad bodies without calling Supabase', async () => {
        expect((await login(post('/api/admin/login', {}, { origin: 'https://evil.test', host: 'site.test' }))).status).toBe(403);
        expect((await login(post('/api/admin/login', { email: 1, password: 'x' }))).status).toBe(400);
        expect((await login(post('/api/admin/login', { email: 'a@b.co', password: 'x'.repeat(1025) }))).status).toBe(400);
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('answers 503 when Supabase Auth is down', async () => {
        authToken = () => json({}, 500);
        expect((await login(post('/api/admin/login', { email: 'o@x.co', password: 'pw' }))).status).toBe(503);
    });
});

describe('logout', () => {
    it('clears both cookies for a same-origin POST', async () => {
        const res = await logout(post('/api/admin/logout', {}));
        expect(res.status).toBe(200);
        expect(setCookies(res)).toMatch(/av_access=;/);
        expect(setCookies(res)).toMatch(/av_refresh=;/);
    });
    it('rejects a foreign origin and GET', async () => {
        expect((await logout(post('/api/admin/logout', {}, { origin: 'https://evil.test', host: 'site.test' }))).status).toBe(403);
        expect('GET' in logoutModule).toBe(false);
    });
});

describe('GET /api/admin/refresh', () => {
    const get = (cookie: string, next = '/admin/projects') =>
        new Request(`https://site.test/api/admin/refresh?next=${encodeURIComponent(next)}`, { headers: { cookie } });
    it('refreshes, sets cookies and redirects to a safe admin path', async () => {
        const res = await refresh(get('av_refresh=old'));
        expect(res.status).toBe(307);
        expect(res.headers.get('location')).toBe('https://site.test/admin/projects');
        expect(setCookies(res)).toContain('av_access=acc-secret');
    });
    it('never redirects off-site', async () => {
        const res = await refresh(get('av_refresh=old', '//evil.test'));
        expect(res.headers.get('location')).toBe('https://site.test/admin');
    });
    it('sends the visitor to login and clears cookies when the refresh token is rejected', async () => {
        authToken = () => json({}, 400);
        const res = await refresh(get('av_refresh=old'));
        expect(res.headers.get('location')).toBe('https://site.test/admin/login');
        expect(setCookies(res)).toMatch(/av_refresh=;/);
    });
});

describe('/api/admin/[...path] proxy', () => {
    const request = (method: string, cookie: string, body?: unknown, headers: Record<string, string> = ORIGIN, search = '') =>
        new Request(`https://site.test/api/admin/projects${search}`, {
            method, headers: { ...headers, cookie }, body: body === undefined ? undefined : JSON.stringify(body),
        });

    it('401 with no cookies and no backend call', async () => {
        expect((await GET(request('GET', ''), ctx('projects'))).status).toBe(401);
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('forwards method, path, query, body and the bearer token', async () => {
        backend = () => json({ item: { id: 1 } }, 201);
        const res = await POST(request('POST', 'av_access=acc', { slug: 'x' }, ORIGIN, '?a=1'), ctx('projects'));
        expect(res.status).toBe(201);
        expect(await res.json()).toEqual({ item: { id: 1 } });
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe('https://backend.internal/admin/projects?a=1');
        expect(init.method).toBe('POST');
        expect(init.headers.authorization).toBe('Bearer acc');
        expect(JSON.parse(init.body)).toEqual({ slug: 'x' });
    });
    it('does not forward the browser cookie header to the backend', async () => {
        await GET(request('GET', 'av_access=acc; other=1'), ctx('projects'));
        expect(JSON.stringify(fetchMock.mock.calls[0][1].headers)).not.toContain('other=1');
    });
    it('refreshes once on a 401, retries, and rewrites the cookies', async () => {
        let calls = 0;
        backend = (_url, init) => {
            calls++;
            return (init.headers as Record<string, string>).authorization === 'Bearer acc-secret'
                ? json({ ok: true }) : json({}, 401);
        };
        const res = await GET(request('GET', 'av_access=stale; av_refresh=old'), ctx('projects'));
        expect(res.status).toBe(200);
        expect(calls).toBe(2);
        expect(setCookies(res)).toContain('av_access=acc-secret');
    });
    it('uses the refresh token when the access cookie has lapsed', async () => {
        const res = await GET(request('GET', 'av_refresh=old'), ctx('projects'));
        expect(res.status).toBe(200);
        expect(setCookies(res)).toContain('av_refresh=ref-secret');
    });
    it('a failed refresh clears the cookies and answers 401', async () => {
        backend = () => json({}, 401);
        authToken = () => json({}, 400);
        const res = await GET(request('GET', 'av_access=stale; av_refresh=old'), ctx('projects'));
        expect(res.status).toBe(401);
        expect(setCookies(res)).toMatch(/av_access=;/);
    });
    it('refuses state-changing requests without a same-origin Origin (Review Focus 2)', async () => {
        const bad: Record<string, string>[] = [{ origin: 'https://evil.test', host: 'site.test' }, { host: 'site.test' }];
        for (const headers of bad) {
            for (const handler of [POST, PUT, DELETE]) {
                const res = await handler(request(handler === POST ? 'POST' : handler === PUT ? 'PUT' : 'DELETE', 'av_access=acc', {}, headers), ctx('projects'));
                expect(res.status).toBe(403);
            }
        }
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('rejects path traversal', async () => {
        expect((await GET(request('GET', 'av_access=acc'), ctx('..', 'secret'))).status).toBe(400);
        expect((await GET(request('GET', 'av_access=acc'), ctx('projects', 'a/b'))).status).toBe(400);
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('turns a backend outage into a generic 503', async () => {
        backend = () => { throw new TypeError('fetch failed secret-detail'); };
        const res = await GET(request('GET', 'av_access=acc'), ctx('projects'));
        expect(res.status).toBe(503);
        expect(JSON.stringify(await res.json())).not.toContain('secret-detail');
    });
});
