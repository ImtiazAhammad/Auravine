import { cookies } from 'next/headers';
import { adminFetch } from './backend';
import { ACCESS_COOKIE } from './session';

/** Server-component read from the admin API with the current access token. */
export async function adminGet<T>(path: string): Promise<T> {
    const token = (await cookies()).get(ACCESS_COOKIE)?.value;
    if (!token) throw new Error('not signed in');
    const response = await adminFetch(path, { token });
    if (!response.ok) throw new Error(`admin API answered HTTP ${response.status}`);
    return response.json() as Promise<T>;
}
