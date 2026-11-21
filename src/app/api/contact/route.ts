import { NextResponse } from 'next/server';
import { BackendUnavailable, callBackend, clientIp } from '@/lib/backend';

/** The form posts here; storing, emailing and rate limiting happen in the Python backend. */
export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    try {
        const res = await callBackend('/contact', { body, ip: clientIp(req) });
        return new Response(await res.text(), {
            status: res.status,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        if (!(error instanceof BackendUnavailable)) throw error;
        console.error('[contact]', error.message);
        return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 503 });
    }
}
