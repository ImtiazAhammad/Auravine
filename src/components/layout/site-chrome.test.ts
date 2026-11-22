import { describe, expect, it } from 'vitest';
import { isAdminPath } from './admin-path';

describe('isAdminPath', () => {
    it('is true for the admin area only', () => {
        for (const p of ['/admin', '/admin/', '/admin/projects', '/admin/blog/123']) expect(isAdminPath(p)).toBe(true);
        for (const p of ['/', '/projects', '/blog/admin', '/administrator', '/adminx', null, undefined, '']) {
            expect(isAdminPath(p as string)).toBe(false);
        }
    });
});
