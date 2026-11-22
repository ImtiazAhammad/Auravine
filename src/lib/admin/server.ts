import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminFetch } from './backend';
import { ACCESS_COOKIE, REFRESH_COOKIE } from './session';

/** Calls the admin API for a server page. A missing or no-longer-valid token sends the visitor
 *  through the refresh route and back to `returnTo` (client-side navigation does not re-run the
 *  panel layout, so each page has to handle a lapsed session itself). */
async function request(path: string, returnTo: string): Promise<Response> {
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;
    const hasRefresh = Boolean(jar.get(REFRESH_COOKIE)?.value);
    const bounce = () =>
        redirect(hasRefresh ? `/api/admin/refresh?next=${encodeURIComponent(returnTo)}` : '/admin/login');
    if (!token) bounce();
    const response = await adminFetch(path, { token: token! });
    if (response.status === 401) bounce();
    return response;
}

export async function adminGet<T>(path: string, returnTo: string): Promise<T> {
    const response = await request(path, returnTo);
    if (!response.ok) throw new Error(`admin API answered HTTP ${response.status}`);
    return response.json() as Promise<T>;
}

/** Like adminGet, but a missing item (404) is null. */
export async function adminGetOrNull<T>(path: string, returnTo: string): Promise<T | null> {
    const response = await request(path, returnTo);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`admin API answered HTTP ${response.status}`);
    return response.json() as Promise<T>;
}
