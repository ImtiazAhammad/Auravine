import { NextResponse } from 'next/server';
import { BackendUnavailable, callBackend, clientIp } from '@/lib/backend';

/** The chat widget posts here; prompt building, provider calls and rate limiting happen in the
 *  Python backend, so no AI keys exist in the Next.js app. */
export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    try {
        const res = await callBackend('/chat', { body, ip: clientIp(req) });
        return new Response(await res.text(), {
            status: res.status,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        if (!(error instanceof BackendUnavailable)) throw error;
        console.error('[chat]', error.message);
        return NextResponse.json(
            { error: 'The assistant is unavailable right now. Please try again later.' },
            { status: 503 },
        );
    }
}

export async function GET() {
    return NextResponse.json({ status: 'ok' });
}
