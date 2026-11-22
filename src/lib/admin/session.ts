import { cookies } from 'next/headers';
import { BackendUnavailable } from '@/lib/backend';
import { adminFetch } from './backend';

/** Tokens live only in these httpOnly cookies. They are never put in a response body, URL or log. */
export const ACCESS_COOKIE = 'av_access';
export const REFRESH_COOKIE = 'av_refresh';
const REFRESH_MAX_AGE = 60 * 60 * 24 * 30;
const AUTH_TIMEOUT_MS = 8000;

export interface Tokens { access: string; refresh: string; expiresIn: number }

export class AuthUnavailable extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthUnavailable';
    }
}

async function authToken(grant: 'password' | 'refresh_token', body: object): Promise<Tokens | null> {
    const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '');
    const anon = process.env.SUPABASE_ANON_KEY?.trim();
    if (!url || !anon) throw new AuthUnavailable('Supabase is not configured');
    let response: Response;
    try {
        response = await fetch(`${url}/auth/v1/token?grant_type=${grant}`, {
            method: 'POST',
            headers: { apikey: anon, 'content-type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(AUTH_TIMEOUT_MS),
            cache: 'no-store',
        });
    } catch (cause) {
        throw new AuthUnavailable(`Supabase Auth request failed: ${(cause as Error).name}`);
    }
    if (response.status === 400 || response.status === 401) return null;
    if (!response.ok) throw new AuthUnavailable(`Supabase Auth answered HTTP ${response.status}`);
    const data = await response.json().catch(() => null);
    if (!data?.access_token || !data?.refresh_token) throw new AuthUnavailable('unexpected Auth response');
    return { access: data.access_token, refresh: data.refresh_token, expiresIn: Number(data.expires_in) || 3600 };
}

export const signIn = (email: string, password: string) => authToken('password', { email, password });
export const refreshTokens = (refresh: string) => authToken('refresh_token', { refresh_token: refresh });

export function cookieOptions(maxAge: number) {
    return {
        httpOnly: true,
        sameSite: 'strict' as const,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge,
    };
}

/** Adds the two cookies to a response (NextResponse). */
export function setTokenCookies(
    response: { cookies: { set: (name: string, value: string, options: object) => unknown } },
    tokens: Tokens,
) {
    response.cookies.set(ACCESS_COOKIE, tokens.access, cookieOptions(tokens.expiresIn));
    response.cookies.set(REFRESH_COOKIE, tokens.refresh, cookieOptions(REFRESH_MAX_AGE));
}

export function clearTokenCookies(
    response: { cookies: { set: (name: string, value: string, options: object) => unknown } },
) {
    response.cookies.set(ACCESS_COOKIE, '', cookieOptions(0));
    response.cookies.set(REFRESH_COOKIE, '', cookieOptions(0));
}

export function readCookie(request: Request, name: string): string | undefined {
    const header = request.headers.get('cookie') ?? '';
    for (const part of header.split(';')) {
        const [key, ...rest] = part.trim().split('=');
        if (key === name) {
            try { return decodeURIComponent(rest.join('=')); } catch { return undefined; }
        }
    }
    return undefined;
}

/** State-changing requests must come from this site (the cookies are also SameSite=Strict). */
export function sameOrigin(request: Request): boolean {
    const origin = request.headers.get('origin');
    if (!origin) return false;
    const expected =
        request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? new URL(request.url).host;
    try {
        return new URL(origin).host === expected;
    } catch {
        return false;
    }
}

/** Where to go after a refresh: an admin path on this site, never anywhere else. */
export function safeNext(next: string | null): string {
    if (!next || !/^\/admin(\/[A-Za-z0-9_\-./]*)?$/.test(next) || next.includes('..') || next.includes('//')) {
        return '/admin';
    }
    return next;
}

export type AdminState =
    | { status: 'ok'; admin: { id: string; email: string | null } }
    | { status: 'anonymous' }
    | { status: 'expired' }
    | { status: 'forbidden' }
    | { status: 'unavailable' };

/** For server components: who is logged in, judged by the backend (the source of truth). */
export async function getAdmin(): Promise<AdminState> {
    const jar = await cookies();
    const access = jar.get(ACCESS_COOKIE)?.value;
    const hasRefresh = Boolean(jar.get(REFRESH_COOKIE)?.value);
    const lapsed: AdminState = hasRefresh ? { status: 'expired' } : { status: 'anonymous' };
    if (!access) return lapsed;
    try {
        const response = await adminFetch('/me', { token: access });
        if (response.status === 200) return { status: 'ok', admin: await response.json() };
        if (response.status === 401) return lapsed;
        if (response.status === 403) return { status: 'forbidden' };
        return { status: 'unavailable' };
    } catch (error) {
        if (error instanceof BackendUnavailable) return { status: 'unavailable' };
        throw error;
    }
}
