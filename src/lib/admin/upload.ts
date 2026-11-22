import { AdminApiError, createAdminApi } from './api';

export interface UploadedImage { id: string; path: string; public_url: string }

/** Browser to Storage in three steps: ask the backend for a signed URL, PUT the file straight to
 *  Supabase Storage (so it never passes through a 4.5 MB function limit), then register it. */
export async function uploadImage(
    file: File,
    options: { fetchImpl?: typeof fetch; alt?: string; width?: number; height?: number } = {},
): Promise<UploadedImage> {
    const fetchImpl = options.fetchImpl ?? fetch;
    const api = createAdminApi(fetchImpl, () => undefined);
    const signed = (await api.send('POST', '/media/sign', {
        filename: file.name, content_type: file.type, size: file.size,
    })) as { path: string; upload_url: string; public_url: string };

    let put: Response;
    try {
        put = await fetchImpl(signed.upload_url, {
            method: 'PUT', headers: { 'content-type': file.type }, body: file,
        });
    } catch {
        throw new AdminApiError(0, 'The upload could not reach storage');
    }
    if (!put.ok) throw new AdminApiError(put.status, `The upload was refused by storage (HTTP ${put.status})`);

    const registered = (await api.send('POST', '/media', {
        path: signed.path,
        ...(options.alt?.trim() ? { alt: { en: options.alt.trim() } } : {}),
        ...(options.width ? { width: options.width } : {}),
        ...(options.height ? { height: options.height } : {}),
    })) as { item: UploadedImage };
    return registered.item;
}
