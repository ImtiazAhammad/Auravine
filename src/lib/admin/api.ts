export class AdminApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'AdminApiError';
    }
}

type Json = Record<string, unknown>;

/** A readable message from an API error body (FastAPI validation lists, `detail`, `error`). */
export function describeError(body: unknown): string {
    const data = (body ?? {}) as { detail?: unknown; error?: unknown };
    if (typeof data.detail === 'string') return data.detail;
    if (Array.isArray(data.detail)) {
        const parts = data.detail.map((entry: { loc?: unknown[]; msg?: string }) => {
            const where = (entry.loc ?? []).filter((p) => p !== 'body').join('.');
            return where ? `${where}: ${entry.msg}` : String(entry.msg);
        });
        if (parts.length) return parts.join('; ');
    }
    if (typeof data.error === 'string') return data.error;
    return 'Something went wrong';
}

type FetchLike = typeof fetch;

export function createAdminApi(fetchImpl: FetchLike, onUnauthorized: () => void) {
    async function request(method: string, path: string, body?: unknown) {
        let response: Response;
        try {
            response = await fetchImpl(`/api/admin${path}`, {
                method,
                headers: body === undefined ? {} : { 'content-type': 'application/json' },
                body: body === undefined ? undefined : JSON.stringify(body),
            });
        } catch {
            throw new AdminApiError(0, 'Could not reach the server');
        }
        const data = await response.json().catch(() => ({}));
        if (response.status === 401) onUnauthorized();
        if (!response.ok) throw new AdminApiError(response.status, describeError(data));
        return data as Json;
    }
    return {
        get: (path: string) => request('GET', path),
        send: (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, body?: unknown) => request(method, path, body),
    };
}

export type AdminApi = ReturnType<typeof createAdminApi>;
