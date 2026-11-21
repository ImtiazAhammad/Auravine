import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { CONTENT_TAG } from '@/lib/content/supabase';

/** Called by the backend after an admin save so changes show without waiting for the cache. */
export async function POST(request: Request) {
    const secret = process.env.REVALIDATE_SECRET?.trim();
    if (!secret) return Response.json({ error: 'not configured' }, { status: 500 });

    const header = request.headers.get('authorization') ?? '';
    const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
    const a = Buffer.from(token);
    const b = Buffer.from(secret);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
    }

    // expire: 0, not 'max': an admin who just saved must not be served the old copy once more.
    revalidateTag(CONTENT_TAG, { expire: 0 });
    return Response.json({ revalidated: true });
}
