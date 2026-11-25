import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { portfolioData } from '@/data/portfolio';
import fixture from './__fixtures__/seed-rows.json';
import { getBlogPost, getProject, loadContent, resetLastGood } from './index';

const rows = fixture as unknown as Record<string, any[]>;
const TABLE_OF: Record<string, string> = {
    projects: 'projects', blog_posts: 'blog_posts', faqs: 'faqs', tech_items: 'tech_items',
    site_settings: 'site_settings',
};
const KEY = 'sb_publishable_SECRETVALUE123';

type Override = Partial<Record<string, any[] | Error>>;
function stubFetch(overrides: Override = {}) {
    const mock = vi.fn(async (url: string) => {
        const table = Object.keys(TABLE_OF).find((t) => url.includes(`/rest/v1/${t}?`))!;
        const value = overrides[table] ?? rows[table];
        if (value instanceof Error) throw value;
        return new Response(JSON.stringify(value), { status: 200 });
    });
    vi.stubGlobal('fetch', mock);
    return mock;
}

let errors: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
    resetLastGood();
    process.env.SUPABASE_URL = 'https://proj.supabase.co';
    process.env.SUPABASE_ANON_KEY = KEY;
    process.env.CONTENT_SOURCE = 'supabase';
    errors = vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    for (const name of ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'CONTENT_SOURCE']) delete process.env[name];
});

describe('flag', () => {
    it.each([undefined, 'static', 'nonsense'])('CONTENT_SOURCE=%s returns static data and never fetches', async (value) => {
        if (value === undefined) delete process.env.CONTENT_SOURCE; else process.env.CONTENT_SOURCE = value;
        const mock = stubFetch();
        expect(await loadContent('en')).toBe(portfolioData);
        expect(mock).not.toHaveBeenCalled();
    });
});

describe('supabase source', () => {
    it('builds the content from rows and keeps database-less sections static', async () => {
        stubFetch();
        const content = await loadContent('en');
        expect(content.projects.map((p) => p.slug)).toEqual(rows.projects.map((p) => p.slug));
        expect(content.blogs).toHaveLength(rows.blog_posts.length);
        expect(content.personal.name).toBe(portfolioData.personal.name);
        expect(content.experiences).toBe(portfolioData.experiences);
        expect(content.education).toBe(portfolioData.education);
        expect(content.achievements).toBe(portfolioData.achievements);
        expect(content.gallery).toBe(portfolioData.gallery);
        expect(errors).not.toHaveBeenCalled();
    });
    it('uses Bangla where present for bn and English elsewhere', async () => {
        const projects = structuredClone(rows.projects);
        projects[0].title = { en: projects[0].title.en, bn: 'শিরোনাম' };
        stubFetch({ projects });
        const content = await loadContent('bn');
        expect(content.projects[0].title).toBe('শিরোনাম');
        expect(content.projects[1].title).toBe(rows.projects[1].title.en);
    });
});

describe('fallback (Review Focus 1)', () => {
    it('falls back per collection', async () => {
        stubFetch({ projects: new Error('boom') });
        const content = await loadContent('en');
        expect(content.projects).toBe(portfolioData.projects);
        expect(content.blogs.map((b) => b.slug)).toEqual(rows.blog_posts.map((b) => b.slug));
        expect(errors).toHaveBeenCalledTimes(1);
        expect(String(errors.mock.calls[0][0])).toMatch(/^\[content\] projects fell back to static: /);
    });
    it('falls back entirely when every read fails, without throwing', async () => {
        vi.stubGlobal('fetch', vi.fn(async () => { throw new DOMException('timed out', 'TimeoutError'); }));
        const content = await loadContent('en');
        expect(content).toEqual(portfolioData);
        expect(errors.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
    it('falls back when env is missing', async () => {
        delete process.env.SUPABASE_ANON_KEY;
        const mock = stubFetch();
        expect(await loadContent('en')).toEqual(portfolioData);
        expect(mock).not.toHaveBeenCalled();
    });
    it('treats a settings response without a personal row as a failure for personal only', async () => {
        stubFetch({ site_settings: [{ key: 'social_links', value: [] }] });
        const content = await loadContent('en');
        expect(content.personal).toBe(portfolioData.personal);
        expect(content.projects).not.toBe(portfolioData.projects);
    });
    it('falls back for a collection with a malformed row instead of throwing', async () => {
        stubFetch({ projects: [{ slug: 'x' }] as any });
        const content = await loadContent('en');
        expect(content.projects).toBe(portfolioData.projects);
        expect(content.faqs).not.toBe(portfolioData.faqs);
    });
    it('never logs the key', async () => {
        stubFetch({ projects: new Error(`bad ${KEY}`) });
        await loadContent('en');
        expect(JSON.stringify(errors.mock.calls)).not.toContain(KEY);
    });
});

describe('unpublished content (Review Focus 2)', () => {
    it('a project missing from a healthy response is not served from static', async () => {
        const [hidden, ...rest] = rows.projects;
        stubFetch({ projects: rest });
        expect(await getProject(hidden.slug, 'en')).toBeNull();
        expect(await getProject(rest[0].slug, 'en')).not.toBeNull();
    });
    it('an empty healthy response is authoritative', async () => {
        stubFetch({ projects: [], blog_posts: [] });
        const content = await loadContent('en');
        expect(content.projects).toEqual([]);
        expect(content.blogs).toEqual([]);
        expect(await getBlogPost(rows.blog_posts[0].slug, 'en')).toBeNull();
    });
});


describe('last good copy (an outage must not bring back removed content)', () => {
    it('serves the last good database copy, not static, when a later read fails', async () => {
        const [hidden, ...rest] = rows.projects;
        stubFetch({ projects: rest });
        const first = await loadContent('en');
        expect(first.projects).toHaveLength(rest.length);

        stubFetch({ projects: new Error('outage') });
        const during = await loadContent('en');
        expect(during.projects.map((p) => p.slug)).toEqual(rest.map((p) => p.slug));
        expect(during.projects.some((p) => p.slug === hidden.slug)).toBe(false);
        expect(String(errors.mock.calls.at(-1)?.[0])).toMatch(/projects served last good copy/);
    });
    it('uses static only when this process never had a good copy', async () => {
        stubFetch({ projects: new Error('outage') });
        expect((await loadContent('en')).projects).toBe(portfolioData.projects);
    });
    it('an empty successful read becomes the last good copy', async () => {
        stubFetch({ projects: [] });
        await loadContent('en');
        stubFetch({ projects: new Error('outage') });
        expect((await loadContent('en')).projects).toEqual([]);
    });
    it('keeps copies per language', async () => {
        stubFetch();
        await loadContent('en');
        stubFetch({ projects: new Error('outage') });
        expect((await loadContent('bn')).projects).toBe(portfolioData.projects);
    });
    it('recovers: a later success replaces the last good copy', async () => {
        stubFetch({ projects: rows.projects.slice(0, 3) });
        await loadContent('en');
        stubFetch({ projects: rows.projects.slice(0, 5) });
        await loadContent('en');
        stubFetch({ projects: new Error('outage') });
        expect((await loadContent('en')).projects).toHaveLength(5);
    });
});
