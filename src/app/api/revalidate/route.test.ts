import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { revalidateTag } = vi.hoisted(() => ({ revalidateTag: vi.fn() }));
vi.mock('next/cache', () => ({ revalidateTag }));

import { POST } from './route';

const SECRET = 'rev-secret-123';
const call = (headers: Record<string, string> = {}) =>
    POST(new Request('http://localhost/api/revalidate', { method: 'POST', headers }));

beforeEach(() => {
    revalidateTag.mockClear();
    process.env.REVALIDATE_SECRET = SECRET;
});
afterEach(() => { delete process.env.REVALIDATE_SECRET; });

describe('POST /api/revalidate', () => {
    it('fails closed with 500 when the secret is not configured', async () => {
        delete process.env.REVALIDATE_SECRET;
        const res = await call({ authorization: `Bearer ${SECRET}` });
        expect(res.status).toBe(500);
        expect(revalidateTag).not.toHaveBeenCalled();
    });
    it.each([
        ['no header', {}],
        ['wrong scheme', { authorization: `Basic ${SECRET}` }],
        ['wrong secret', { authorization: 'Bearer nope' }],
        ['same-length wrong secret', { authorization: `Bearer ${'x'.repeat(SECRET.length)}` }],
        ['empty bearer', { authorization: 'Bearer ' }],
    ])('401 for %s', async (_name, headers) => {
        const res = await call(headers);
        expect(res.status).toBe(401);
        expect(revalidateTag).not.toHaveBeenCalled();
    });
    it('revalidates the content tag with the right secret', async () => {
        const res = await call({ authorization: `Bearer ${SECRET}` });
        expect(res.status).toBe(200);
        expect(await res.json()).toEqual({ revalidated: true });
        expect(revalidateTag).toHaveBeenCalledOnce();
        expect(revalidateTag).toHaveBeenCalledWith('content', { expire: 0 });
    });
});
