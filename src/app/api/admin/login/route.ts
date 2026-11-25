import { NextResponse } from 'next/server';
import { BackendUnavailable, callBackend, clientIp } from '@/lib/backend';
import { adminFetch } from '@/lib/admin/backend';
import { AuthUnavailable, sameOrigin, setTokenCookies, signIn } from '@/lib/admin/session';

export async function POST(request: Request) {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    let body: { email?: unknown; password?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    const { email, password } = body;
    if (
        typeof email !== 'string' || typeof password !== 'string' ||
        email.length < 3 || email.length > 320 || password.length < 1 || password.length > 1024
    ) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    try {
        // Count the attempt before any password reaches Supabase. Fails closed: if the limiter
        // cannot answer, nobody signs in (the admin API needs the same backend anyway).
        const attempt = await callBackend('/login-attempt', { body: {}, ip: clientIp(request) });
        if (attempt.status === 429) {
            return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
        }
        if (attempt.status !== 200) {
            console.error('[admin login] limiter answered', attempt.status);
            return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
        }
        const tokens = await signIn(email.trim(), password);
        if (!tokens) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
        // A valid Supabase account is not enough: it must also be an admin.
        const me = await adminFetch('/me', { token: tokens.access });
        if (me.status === 403) return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
        if (me.status !== 200) {
            return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
        }
        const response = NextResponse.json({ ok: true });
        setTokenCookies(response, tokens);
        return response;
    } catch (error) {
        if (error instanceof AuthUnavailable || error instanceof BackendUnavailable) {
            console.error('[admin login]', error.message);
            return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
        }
        throw error;
    }
}
