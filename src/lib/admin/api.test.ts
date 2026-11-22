import { describe, expect, it, vi } from 'vitest';
import { AdminApiError, createAdminApi, describeError } from './api';
import { uploadImage } from './upload';

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });

describe('createAdminApi', () => {
    it('sends JSON to /api/admin and returns the parsed body', async () => {
        const fetchImpl = vi.fn(async () => json({ item: { id: 1 } }));
        const api = createAdminApi(fetchImpl as never, vi.fn());
        expect(await api.send('POST', '/projects', { slug: 'x' })).toEqual({ item: { id: 1 } });
        const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
        expect(url).toBe('/api/admin/projects');
        expect(init.method).toBe('POST');
        expect(JSON.parse(init.body as string)).toEqual({ slug: 'x' });
        expect((init.headers as Record<string, string>)['content-type']).toBe('application/json');
    });
    it('GET sends no body', async () => {
        const fetchImpl = vi.fn(async () => json({ items: [] }));
        await createAdminApi(fetchImpl as never, vi.fn()).get('/projects');
        expect((fetchImpl.mock.calls[0] as unknown as [string, RequestInit])[1].body).toBeUndefined();
    });
    it('throws AdminApiError with a readable message', async () => {
        const api = createAdminApi((async () => json({ detail: 'That slug or key already exists' }, 409)) as never, vi.fn());
        await expect(api.send('POST', '/projects', {})).rejects.toMatchObject({ status: 409, message: 'That slug or key already exists' });
    });
    it('calls onUnauthorized on 401', async () => {
        const onUnauthorized = vi.fn();
        const api = createAdminApi((async () => json({ error: 'Not signed in' }, 401)) as never, onUnauthorized);
        await expect(api.get('/projects')).rejects.toBeInstanceOf(AdminApiError);
        expect(onUnauthorized).toHaveBeenCalled();
    });
    it('wraps network failures', async () => {
        const api = createAdminApi((async () => { throw new TypeError('offline'); }) as never, vi.fn());
        await expect(api.get('/x')).rejects.toMatchObject({ status: 0 });
    });
});

describe('describeError', () => {
    it('turns validation lists into field messages', () => {
        const message = describeError({ detail: [
            { loc: ['body', 'title', 'en'], msg: 'English text is required' },
            { loc: ['body', 'slug'], msg: 'String should match pattern' },
        ] });
        expect(message).toContain('title.en: English text is required');
        expect(message).toContain('slug: String should match pattern');
    });
    it('falls back to error, then to a generic message', () => {
        expect(describeError({ error: 'Too many' })).toBe('Too many');
        expect(describeError({})).toBe('Something went wrong');
    });
});

describe('uploadImage', () => {
    const file = new File(['bytes'], 'My Photo.png', { type: 'image/png' });
    const sign = { path: 'uploads/2026/ab-my-photo.png', upload_url: 'https://x.supabase.co/storage/v1/object/upload/sign/media/uploads/2026/ab-my-photo.png?token=t', public_url: 'https://x.supabase.co/storage/v1/object/public/media/uploads/2026/ab-my-photo.png' };

    it('signs, uploads straight to Storage, then registers the file', async () => {
        const calls: [string, RequestInit][] = [];
        const fetchImpl = vi.fn(async (url: string, init: RequestInit) => {
            calls.push([url, init]);
            if (url === '/api/admin/media/sign') return json(sign);
            if (url === '/api/admin/media') return json({ item: { ...sign, id: 'm1', public_url: sign.public_url } }, 201);
            return new Response('', { status: 200 });
        });
        const result = await uploadImage(file, { fetchImpl: fetchImpl as never, alt: 'A photo' });
        expect(result.public_url).toBe(sign.public_url);
        expect(calls.map(([u]) => u)).toEqual(['/api/admin/media/sign', sign.upload_url, '/api/admin/media']);
        expect(JSON.parse(calls[0][1].body as string)).toEqual({ filename: 'My Photo.png', content_type: 'image/png', size: 5 });
        expect(calls[1][1].method).toBe('PUT');
        expect((calls[1][1].headers as Record<string, string>)['content-type']).toBe('image/png');
        expect(JSON.parse(calls[2][1].body as string)).toMatchObject({ path: sign.path, alt: { en: 'A photo' } });
    });
    it('stops and reports when signing is refused', async () => {
        const fetchImpl = vi.fn(async () => json({ detail: 'nope' }, 422));
        await expect(uploadImage(file, { fetchImpl: fetchImpl as never })).rejects.toMatchObject({ message: 'nope' });
        expect(fetchImpl).toHaveBeenCalledTimes(1);
    });
    it('does not register a file whose upload failed', async () => {
        const fetchImpl = vi.fn(async (url: string) =>
            url === '/api/admin/media/sign' ? json(sign) : new Response('denied', { status: 400 }));
        await expect(uploadImage(file, { fetchImpl: fetchImpl as never })).rejects.toThrow(/upload/i);
        expect(fetchImpl).toHaveBeenCalledTimes(2);
    });
});
