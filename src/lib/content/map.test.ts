import { describe, expect, it } from 'vitest';
import { portfolioData } from '@/data/portfolio';
import fixture from './__fixtures__/seed-rows.json';
import { mapBlogPost, mapFaq, mapProject, mapSettings, mapTechRows } from './map';
import type { BlogPostRow, FaqRow, ProjectRow, SiteSettingRow, TechItemRow } from './rows';

const rows = fixture as unknown as {
    projects: ProjectRow[];
    blog_posts: BlogPostRow[];
    faqs: FaqRow[];
    tech_items: TechItemRow[];
    site_settings: SiteSettingRow[];
};

// Database ids are generated uuids; the old data had hand-written ids. They are only React keys.
const withoutId = <T extends { id?: string }>(items: T[]) => items.map(({ id: _id, ...rest }) => rest);

describe('golden: rows rebuild the static site data', () => {
    it('projects', () => {
        const mapped = rows.projects.map((r) => mapProject(r, 'en'));
        expect(withoutId(mapped)).toEqual(withoutId(portfolioData.projects));
    });
    it('blog posts', () => {
        const mapped = rows.blog_posts.map((r) => mapBlogPost(r, 'en'));
        expect(withoutId(mapped)).toEqual(withoutId(portfolioData.blogs));
    });
    it('faqs', () => {
        expect(rows.faqs.map((r) => mapFaq(r, 'en'))).toEqual(portfolioData.faqs);
    });
    it('tech stack, tools, hard skills, soft skills', () => {
        const tech = mapTechRows(rows.tech_items);
        expect(tech.techStack).toEqual(portfolioData.techStack);
        expect(tech.tools).toEqual(portfolioData.tools);
        expect(tech.hardSkills).toEqual(portfolioData.hardSkills);
        expect(tech.softSkills).toEqual(portfolioData.softSkills);
    });
    it('personal info', () => {
        expect(mapSettings(rows.site_settings)).toEqual(portfolioData.personal);
    });
});

describe('faithful details', () => {
    it('restores "#" for missing project links (the UI treats "#" as no link)', () => {
        const row = { ...rows.projects[0], demo_url: null, repo_url: null };
        const project = mapProject(row, 'en');
        expect(project.demoUrl).toBe('#');
        expect(project.repoUrl).toBe('#');
    });
    it('real links pass through', () => {
        const row = { ...rows.projects[0], demo_url: 'https://x.test' };
        expect(mapProject(row, 'en').demoUrl).toBe('https://x.test');
    });
    it('gives blog posts a string read time and the standard author', () => {
        const post = mapBlogPost(rows.blog_posts[0], 'en');
        expect(post.readTime).toBe('5');
        expect(post.author).toEqual({ name: 'Auravine Team', avatar: '/grid.svg' });
    });
});

describe('minimal rows (admin-made, nearly empty) stay safe to render', () => {
    const minimalProject: ProjectRow = {
        slug: 'bare', status: 'published', sort_order: 0, delivery_status: 'planned',
        category: null, title: { en: 'T' }, description: { en: 'D' }, long_description: null,
        details: { en: {} }, tech_stack: [], tools: [], hero_image: null, gallery_images: [],
        demo_url: null, repo_url: null, start_date: null, end_date: null, role: null, team: null,
        custom_timeline: null,
    };
    it('project', () => {
        const project = mapProject(minimalProject, 'en');
        expect(project).toMatchObject({
            id: 'bare', slug: 'bare', title: 'T', description: 'D', status: 'planned',
            image: '/grid.svg', techStack: [], tools: [], startDate: '',
        });
        expect(project.galleryImages).toBeUndefined();
        expect(project.features).toBeUndefined();
        expect(project.endDate).toBeUndefined();
    });
    it('blog post', () => {
        const post = mapBlogPost({
            slug: 'bare', status: 'published', sort_order: 0, title: { en: 'T' },
            excerpt: { en: 'E' }, content: { en: 'C' }, cover_image: null, published_at: null,
            category: null, tags: [], author_name: null, read_time_minutes: null,
        }, 'en');
        expect(post).toMatchObject({
            id: 'bare', image: '/grid.svg', date: '', category: '', tags: [], readTime: '1',
            author: { name: 'Auravine', avatar: '/grid.svg' },
        });
    });
    it('tech and tool rows without icon or category', () => {
        const tech = mapTechRows([
            { key: 'tech-x', status: 'published', sort_order: 0, kind: 'tech', name: 'X', icon: null, category: null, url: null, extra: {} },
            { key: 'tool-y', status: 'published', sort_order: 0, kind: 'tool', name: 'Y', icon: null, category: null, url: null, extra: {} },
        ]);
        expect(tech.techStack[0]).toEqual({ name: 'X', icon: '/grid.svg', category: 'tool' });
        expect(tech.tools[0]).toEqual({ name: 'Y', icon: '/grid.svg', category: 'other' });
    });
});

describe('Bangla', () => {
    it('uses Bangla where present and English elsewhere', () => {
        const row = { ...rows.projects[0], title: { en: 'T', bn: 'শিরোনাম' } };
        const project = mapProject(row, 'bn');
        expect(project.title).toBe('শিরোনাম');
        expect(project.description).toBe(rows.projects[0].description.en);
    });
    it('overlays Bangla details per key', () => {
        const row = { ...rows.projects[0], details: { en: { highlights: ['a'], metrics: [{ value: '1', label: 'x' }] }, bn: { highlights: ['ক'] } } };
        const project = mapProject(row, 'bn');
        expect(project.highlights).toEqual(['ক']);
        expect(project.metrics).toEqual([{ value: '1', label: 'x' }]);
    });
});

describe('settings', () => {
    it('throws when the personal row is missing', () => {
        expect(() => mapSettings([{ key: 'social_links', value: [] }])).toThrow(/personal/);
    });
});
