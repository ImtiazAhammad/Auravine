import { BackendUnavailable } from '@/lib/backend';

const TIMEOUT_MS = 25_000;

/** Calls the Python admin API with the admin's access token. Throws BackendUnavailable. */
export async function adminFetch(
    path: string,
    init: { method?: string; token: string; body?: string; search?: string },
): Promise<Response> {
    const base = process.env.BACKEND_INTERNAL_URL?.trim().replace(/\/+$/, '');
    if (!base) throw new BackendUnavailable('BACKEND_INTERNAL_URL is not set');
    const headers: Record<string, string> = { authorization: `Bearer ${init.token}` };
    if (init.body !== undefined) headers['content-type'] = 'application/json';
    try {
        return await fetch(`${base}/admin${path}${init.search ?? ''}`, {
            method: init.method ?? 'GET',
            headers,
            body: init.body,
            signal: AbortSignal.timeout(TIMEOUT_MS),
            cache: 'no-store',
        });
    } catch (cause) {
        throw new BackendUnavailable(`admin backend request failed: ${(cause as Error).name}`);
    }
}
