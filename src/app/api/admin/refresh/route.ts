import { NextResponse } from 'next/server';
import {
    AuthUnavailable, REFRESH_COOKIE, clearTokenCookies, readCookie, refreshTokens, safeNext,
    setTokenCookies,
} from '@/lib/admin/session';

/** Server pages cannot set cookies, so an expired session bounces through here and back. */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const next = safeNext(url.searchParams.get('next'));
    const login = new URL('/admin/login', url);
    const refresh = readCookie(request, REFRESH_COOKIE);
    if (!refresh) return NextResponse.redirect(login);
    try {
        const tokens = await refreshTokens(refresh);
        if (!tokens) {
            const response = NextResponse.redirect(login);
            clearTokenCookies(response);
            return response;
        }
        const response = NextResponse.redirect(new URL(next, url));
        setTokenCookies(response, tokens);
        return response;
    } catch (error) {
        if (!(error instanceof AuthUnavailable)) throw error;
        return NextResponse.redirect(login);
    }
}
