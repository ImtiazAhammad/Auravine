import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const jar = new Map<string, string>();
vi.mock('next/headers', () => ({
    cookies: async () => ({ get: (n: string) => (jar.has(n) ? { name: n, value: jar.get(n) } : undefined) }),
}));
class Redirect extends Error { constructor(public url: string) { super(`redirect:${url}`); } }
vi.mock('next/navigation', () => ({ redirect: (url: string) => { throw new Redirect(url); } }));

import { adminGet, adminGetOrNull } from './server';

let fetchMock: ReturnType<typeof vi.fn>;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

beforeEach(() => {
    jar.clear();
    process.env.BACKEND_INTERNAL_URL = 'https://backend.internal';
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => { vi.unstubAllGlobals(); delete process.env.BACKEND_INTERNAL_URL; });

describe('adminGet: an hour-old session must not turn pages into errors', () => {
    it('returns the data with a valid token', async () => {
        jar.set('av_access', 'acc');
        fetchMock.mockResolvedValue(json({ items: [1] }));
        expect(await adminGet('/projects', '/admin/projects')).toEqual({ items: [1] });
        expect(fetchMock.mock.calls[0][1].headers.authorization).toBe('Bearer acc');
    });
    it('bounces through refresh, back to the same page, when the access cookie lapsed', async () => {
        jar.set('av_refresh', 'ref');
        await expect(adminGet('/projects/abc', '/admin/projects/abc')).rejects.toMatchObject({
            url: '/api/admin/refresh?next=%2Fadmin%2Fprojects%2Fabc',
        });
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('does the same when the backend says the token is no longer valid', async () => {
        jar.set('av_access', 'old'); jar.set('av_refresh', 'ref');
        fetchMock.mockResolvedValue(json({}, 401));
        await expect(adminGet('/blog-posts', '/admin/blog')).rejects.toMatchObject({
            url: '/api/admin/refresh?next=%2Fadmin%2Fblog',
        });
    });
    it('goes to the login page when there is no session at all', async () => {
        await expect(adminGet('/projects', '/admin/projects')).rejects.toMatchObject({ url: '/admin/login' });
    });
    it('a server error is a plain error, not a redirect', async () => {
        jar.set('av_access', 'acc');
        fetchMock.mockResolvedValue(json({}, 500));
        await expect(adminGet('/projects', '/admin/projects')).rejects.toThrow(/HTTP 500/);
    });
});

describe('adminGetOrNull', () => {
    it('is null for a missing item and still redirects for an expired session', async () => {
        jar.set('av_access', 'acc'); jar.set('av_refresh', 'ref');
        fetchMock.mockResolvedValueOnce(json({ detail: 'Not found' }, 404));
        expect(await adminGetOrNull('/projects/x', '/admin/projects/x')).toBeNull();
        fetchMock.mockResolvedValueOnce(json({}, 401));
        await expect(adminGetOrNull('/projects/x', '/admin/projects/x')).rejects.toBeInstanceOf(Redirect);
    });
});
