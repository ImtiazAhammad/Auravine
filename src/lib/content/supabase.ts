import type { SiteSettingRow } from './rows';

export const CONTENT_TAG = 'content';
export const REVALIDATE_SECONDS = 300;
export const TIMEOUT_MS = 3000;

export class ContentFetchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ContentFetchError';
    }
}

type PublishedTable = 'projects' | 'blog_posts' | 'faqs' | 'tech_items';

/** Read env at call time. Server-only names: the anon key is public by design, but the app
 *  never needs it in the browser. Messages must never include the key. */
function config() {
    const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, '');
    const key = process.env.SUPABASE_ANON_KEY?.trim();
    if (!url || !key) throw new ContentFetchError('SUPABASE_URL or SUPABASE_ANON_KEY is not set');
    return { url, key };
}

async function get<T>(path: string): Promise<T[]> {
    const { url, key } = config();
    let response: Response;
    try {
        response = await fetch(`${url}/rest/v1/${path}`, {
            // Publishable keys are not JWTs, so only the apikey header is sent.
            headers: { apikey: key },
            next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] },
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
    } catch (cause) {
        throw new ContentFetchError(`request to ${path.split('?')[0]} failed: ${(cause as Error).name}`);
    }
    if (!response.ok) {
        throw new ContentFetchError(`${path.split('?')[0]} returned HTTP ${response.status}`);
    }
    let body: unknown;
    try {
        body = await response.json();
    } catch {
        throw new ContentFetchError(`${path.split('?')[0]} returned a body that is not JSON`);
    }
    if (!Array.isArray(body)) {
        throw new ContentFetchError(`${path.split('?')[0]} returned an unexpected body`);
    }
    return body as T[];
}

export function fetchPublished<T>(table: PublishedTable): Promise<T[]> {
    return get<T>(`${table}?select=*&status=eq.published&order=sort_order.asc`);
}

export function fetchSettings(): Promise<SiteSettingRow[]> {
    return get<SiteSettingRow>('site_settings?select=*');
}
