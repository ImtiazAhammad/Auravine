import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
    usePathname: () => '/admin/projects',
    useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

import { AdminShell, NAV_ITEMS } from './AdminShell';

describe('AdminShell', () => {
    const html = renderToString(<AdminShell email="owner@example.com"><p>Body text</p></AdminShell>);
    it('links to every admin section', () => {
        for (const label of ['Dashboard', 'Projects', 'Blog', 'FAQs', 'Tech', 'Settings', 'Media', 'Messages']) {
            expect(html).toContain(label);
        }
        expect(NAV_ITEMS.map((i) => i.href)).toEqual(expect.arrayContaining(['/admin', '/admin/projects', '/admin/blog', '/admin/faqs', '/admin/tech', '/admin/settings', '/admin/media', '/admin/messages']));
    });
    it('shows who is signed in, a logout button and the page content', () => {
        expect(html).toContain('owner@example.com');
        expect(html).toContain('Log out');
        expect(html).toContain('Body text');
    });
    it('marks the current section', () => {
        expect(html).toMatch(/aria-current="page"[^>]*>[^<]*Projects|Projects[^<]*<\/a>/);
        expect(html.match(/aria-current="page"/g)?.length).toBe(1);
    });
});
