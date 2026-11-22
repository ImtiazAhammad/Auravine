import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
    usePathname: () => '/admin',
    useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
}));

import { emptyProjectForm } from '@/lib/admin/payload';
import { BlogEditor } from './BlogEditor';
import { FaqManager } from './FaqManager';
import { MediaLibrary } from './MediaLibrary';
import { MessageInbox } from './MessageInbox';
import { ProjectEditor } from './ProjectEditor';
import { ResourceList } from './ResourceList';
import { SettingsEditor } from './SettingsEditor';
import { TechManager } from './TechManager';

const render = (node: React.ReactElement) => renderToStaticMarkup(node);

describe('ProjectEditor', () => {
    const item = {
        id: 'p1', slug: 'shefa', status: 'published', sort_order: 1, delivery_status: 'ongoing',
        title: { en: 'Shefa agent', bn: 'শেফা' }, description: { en: 'Agent' }, details: { en: { highlights: ['A'] } },
        tech_stack: ['Python'], tools: [], gallery_images: [], hero_image: '/h.webp',
    };
    it('shows the saved values in its fields', () => {
        const html = render(<ProjectEditor item={item} />);
        for (const expected of ['value="shefa"', 'value="Shefa agent"', 'Python', 'Edit project', 'Delete']) expect(html).toContain(expected);
    });
    it('a new project has no delete button', () => {
        const html = render(<ProjectEditor item={null} />);
        expect(html).toContain('New project');
        expect(html).not.toContain('>Delete<');
    });
    it('blocks saving and shows the problem when details JSON is invalid', () => {
        const html = render(<ProjectEditor item={null} initialForm={{ ...emptyProjectForm(), detailsText: '{ not json' }} />);
        expect(html).toContain('Details is not valid JSON');
        expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Save<\/button>|<button[^>]*disabled=""[^>]*>[^<]*Save/);
    });
});

describe('BlogEditor', () => {
    it('previews the article as rendered Markdown', () => {
        const html = render(<BlogEditor item={{ id: 'b1', slug: 'a', status: 'draft', sort_order: 0, title: { en: 'T' }, excerpt: { en: 'E' }, content: { en: '## Big heading\n\nText' } }} />);
        expect(html).toContain('Big heading</h2>');
        expect(html).toContain('Article (Markdown)');
    });
});

describe('ResourceList', () => {
    it('lists items with status and a link to each', () => {
        const html = render(<ResourceList title="Projects" base="/admin/projects" noun="project" items={[{ id: 'x1', slug: 's', title: { en: 'Hello' }, status: 'draft', sort_order: 2 }]} />);
        expect(html).toContain('href="/admin/projects/x1"');
        expect(html).toContain('Hello');
        expect(html).toContain('draft');
        expect(html).toContain('href="/admin/projects/new"');
    });
});

describe('FaqManager and TechManager', () => {
    it('render each saved item', () => {
        const faq = render(<FaqManager items={[{ id: 'f1', key: 'q', status: 'published', sort_order: 0, question: { en: 'What is it?' }, answer: { en: 'A thing' } }]} />);
        expect(faq).toContain('What is it?');
        const tech = render(<TechManager items={[{ id: 't1', key: 'tech-py', kind: 'tech', name: 'Python', status: 'published', sort_order: 0, extra: {} }]} />);
        expect(tech).toContain('value="Python"');
        expect(tech).toContain('Technology (1)');
    });
});

describe('SettingsEditor', () => {
    it('shows the company details and social links', () => {
        const html = render(<SettingsEditor settings={{ personal: { name: 'AURAVINE', title: 'T', subtitle: 'S', bio: 'B', avatar: '', location: 'L', email: '' }, social_links: [{ platform: 'GitHub', url: 'https://github.com/x', icon: 'github' }], languages: [] }} />);
        expect(html).toContain('value="AURAVINE"');
        expect(html).toContain('value="GitHub"');
        expect(html).toContain('Languages');
    });
});

describe('MessageInbox', () => {
    const base = { name: 'Ada', email: 'ada@x.co', message: 'Hello', handled: false, created_at: '2026-01-01T00:00:00Z' };
    it('flags messages that could not be emailed', () => {
        const html = render(<MessageInbox messages={[{ ...base, id: 'm1', emailed_at: null, email_error: 'SMTP failed' }]} />);
        expect(html).toContain('Not emailed');
        expect(html).toContain('Hello');
    });
    it('does not flag emailed or pending messages, and hides handled ones by default', () => {
        const emailed = render(<MessageInbox messages={[{ ...base, id: 'm2', emailed_at: '2026-01-01T00:00:01Z', email_error: null }]} />);
        expect(emailed).not.toContain('Not emailed');
        const handled = render(<MessageInbox messages={[{ ...base, id: 'm3', handled: true }]} />);
        expect(handled).not.toContain('Hello');
        expect(handled).toContain('No messages here');
    });
});

describe('MediaLibrary', () => {
    it('shows images with their links and no delete control', () => {
        const html = render(<MediaLibrary items={[{ id: 'a', path: 'uploads/2026/a.png', public_url: 'https://x.supabase.co/storage/v1/object/public/media/uploads/2026/a.png', alt: { en: 'A cat' } }]} />);
        expect(html).toContain('alt="A cat"');
        expect(html).toContain('Copy link');
        expect(html).not.toContain('>Delete<');
    });
});
