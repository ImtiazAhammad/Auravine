/** Server-to-server calls to the private Python service (Vercel service binding). */

export class BackendUnavailable extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BackendUnavailable';
    }
}

const TIMEOUT_MS = 70_000; // worst case: limiter + content reads, then two providers at 15 s each

export async function callBackend(path: string, init: { body: unknown; ip: string }): Promise<Response> {
    const base = process.env.BACKEND_INTERNAL_URL?.trim().replace(/\/+$/, '');
    if (!base) throw new BackendUnavailable('BACKEND_INTERNAL_URL is not set');
    try {
        return await fetch(`${base}${path}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'x-client-ip': init.ip },
            body: JSON.stringify(init.body),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
    } catch (cause) {
        throw new BackendUnavailable(`backend request failed: ${(cause as Error).name}`);
    }
}

/** Vercel appends the real client address as the last x-forwarded-for entry; earlier entries
 *  can be supplied by the visitor, so they are never trusted. */
export function clientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const last = forwarded?.split(',').map((part) => part.trim()).filter(Boolean).pop();
    return last || request.headers.get('x-real-ip')?.trim() || 'unknown';
}
