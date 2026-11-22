import { describe, expect, it } from 'vitest';
import {
    emptyBlogForm, emptyProjectForm, fromBlog, fromProject, parseDetails, toBlogPayload, toProjectPayload,
} from './payload';

describe('parseDetails', () => {
    it('accepts valid details and empty text', () => {
        expect(parseDetails('')).toEqual({ ok: true, value: { en: {} } });
        const text = JSON.stringify({ en: { highlights: ['a'], features: [{ title: 't', items: ['i'] }] }, bn: { highlights: ['ক'] } });
        expect(parseDetails(text)).toMatchObject({ ok: true });
    });
    it('reports invalid JSON readably', () => {
        const result = parseDetails('{ nope');
        expect(result.ok).toBe(false);
        expect(!result.ok && result.error).toMatch(/JSON/);
    });
    it('rejects wrong shapes and unknown keys, naming the problem', () => {
        for (const bad of [
            { en: { features: 'text' } }, { en: { title: 'x' } }, { en: { metrics: [{ value: '1' }] } },
            { en: { features: [{ title: 't', items: null }] } }, ['array'], 'string', { en: [] },
        ]) {
            const result = parseDetails(JSON.stringify(bad));
            expect(result.ok, JSON.stringify(bad)).toBe(false);
        }
    });
});

describe('toProjectPayload', () => {
    const form = () => ({
        ...emptyProjectForm(), slug: ' shefa ', title: { en: ' Shefa ', bn: ' ' }, description: { en: 'Agent', bn: 'এজেন্ট' },
        techStack: 'Python, FastAPI ,, ', galleryImages: '/a.webp\n\n https://x.test/b.png ', sortOrder: '3',
        demoUrl: '  ', heroImage: '/h.webp',
    });
    it('trims, drops empty Bangla, maps blanks to null and splits lists', () => {
        const payload = toProjectPayload(form());
        expect(payload.ok && payload.value).toMatchObject({
            slug: 'shefa', title: { en: 'Shefa' }, description: { en: 'Agent', bn: 'এজেন্ট' },
            tech_stack: ['Python', 'FastAPI'], gallery_images: ['/a.webp', 'https://x.test/b.png'],
            sort_order: 3, demo_url: null, hero_image: '/h.webp', long_description: null, category: null,
        });
    });
    it('blocks the save when details JSON is invalid', () => {
        const result = toProjectPayload({ ...form(), detailsText: '{bad' });
        expect(result.ok).toBe(false);
    });
    it('round-trips an API item through the form', () => {
        const item = {
            id: 'p1', slug: 'a', status: 'draft', sort_order: 2, delivery_status: 'planned',
            title: { en: 'T', bn: 'শি' }, description: { en: 'D' }, long_description: null, category: { en: 'C' },
            details: { en: { highlights: ['x'] } }, tech_stack: ['Py'], tools: [], hero_image: null,
            gallery_images: ['/g.webp'], demo_url: null, repo_url: 'https://r.test', start_date: '2026-01-01',
            end_date: null, role: null, team: null, custom_timeline: null,
        };
        const result = toProjectPayload(fromProject(item as never));
        expect(result.ok && result.value).toMatchObject({
            slug: 'a', status: 'draft', sort_order: 2, title: { en: 'T', bn: 'শি' }, category: { en: 'C' },
            details: { en: { highlights: ['x'] } }, tech_stack: ['Py'], gallery_images: ['/g.webp'],
            repo_url: 'https://r.test', start_date: '2026-01-01', end_date: null,
        });
    });
});

describe('toBlogPayload', () => {
    it('builds the payload and treats a blank read time as null', () => {
        const result = toBlogPayload({ ...emptyBlogForm(), slug: 'hello', title: { en: 'Hi', bn: '' }, excerpt: { en: 'E', bn: '' }, content: { en: '## B', bn: '' }, tags: 'ai, voice', readTime: '', publishedAt: '2026-03-20' });
        expect(result.ok && result.value).toMatchObject({ slug: 'hello', tags: ['ai', 'voice'], read_time_minutes: null, published_at: '2026-03-20', content: { en: '## B' } });
    });
    it('round-trips an API item', () => {
        const item = { id: 'b1', slug: 'a', status: 'published', sort_order: 1, title: { en: 'T' }, excerpt: { en: 'E' }, content: { en: 'C' }, cover_image: '/c.webp', published_at: '2026-03-20', category: 'ai', tags: ['x'], author_name: { en: 'Team' }, read_time_minutes: 5 };
        const round = toBlogPayload(fromBlog(item as never));
        expect(round.ok && round.value).toMatchObject({ read_time_minutes: 5, author_name: { en: 'Team' }, cover_image: '/c.webp', category: 'ai' });
    });
});
