import { NextResponse } from 'next/server';
import { clearTokenCookies, sameOrigin } from '@/lib/admin/session';

export async function POST(request: Request) {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const response = NextResponse.json({ ok: true });
    clearTokenCookies(response);
    return response;
}
