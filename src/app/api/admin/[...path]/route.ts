import { NextResponse } from 'next/server';
import { BackendUnavailable } from '@/lib/backend';
import { adminFetch } from '@/lib/admin/backend';
import {
    ACCESS_COOKIE, AuthUnavailable, REFRESH_COOKIE, clearTokenCookies, readCookie, refreshTokens,
    sameOrigin, setTokenCookies, type Tokens,
} from '@/lib/admin/session';

const SEGMENT = /^[A-Za-z0-9_-][A-Za-z0-9_.-]*$/;
const NO_BODY = new Set(['GET', 'HEAD', 'DELETE']);

type Context = { params: Promise<{ path: string[] }> };

/** Authenticated pass-through to the Python admin API. The browser never sees a token. */
async function handle(request: Request, context: Context): Promise<Response> {
    const { path } = await context.params;
    if (!path.every((segment) => SEGMENT.test(segment) && segment !== '..')) {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    const method = request.method;
    if (method !== 'GET' && method !== 'HEAD' && !sameOrigin(request)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const access = readCookie(request, ACCESS_COOKIE);
    const refresh = readCookie(request, REFRESH_COOKIE);
    if (!access && !refresh) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });

    const body = NO_BODY.has(method) ? undefined : await request.text();
    const search = new URL(request.url).search;
    const call = (token: string) => adminFetch(`/${path.join('/')}`, { method, token, body, search });

    let fresh: Tokens | null = null;
    try {
        let upstream = access ? await call(access) : null;
        if ((!upstream || upstream.status === 401) && refresh) {
            fresh = await refreshTokens(refresh);
            if (!fresh) {
                const expired = NextResponse.json({ error: 'Not signed in' }, { status: 401 });
                clearTokenCookies(expired);
                return expired;
            }
            upstream = await call(fresh.access);
        }
        if (!upstream) return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
        const response = new NextResponse(await upstream.text(), {
            status: upstream.status,
            headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
        });
        if (fresh) setTokenCookies(response, fresh);
        return response;
    } catch (error) {
        if (error instanceof BackendUnavailable || error instanceof AuthUnavailable) {
            console.error('[admin proxy]', error.message);
            return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
        }
        throw error;
    }
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
