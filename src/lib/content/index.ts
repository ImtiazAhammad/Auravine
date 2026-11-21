import { cache } from 'react';
import type { BlogPost, PortfolioData, Project } from '@/types';
import type { Locale } from './localize';
import { mapBlogPost, mapFaq, mapProject, mapSettings, mapTechRows } from './map';
import type { BlogPostRow, FaqRow, ProjectRow, TechItemRow } from './rows';
import { staticContent } from './static';
import { fetchPublished, fetchSettings } from './supabase';

/** A failed or malformed read uses the static copy of that collection and logs why.
 *  A successful read, even an empty one, is authoritative: drafts must not reappear. */
async function orFallback<T>(name: string, read: () => Promise<T>, fallback: T): Promise<T> {
    try {
        return await read();
    } catch (error) {
        const reason = error instanceof Error ? error.message : 'unknown error';
        console.error(`[content] ${name} fell back to static: ${reason}`);
        return fallback;
    }
}

export async function loadContent(locale: Locale): Promise<PortfolioData> {
    if (process.env.CONTENT_SOURCE !== 'supabase') return staticContent;

    const [projects, blogs, faqs, tech, personal] = await Promise.all([
        orFallback('projects', async () =>
            (await fetchPublished<ProjectRow>('projects')).map((r) => mapProject(r, locale)),
            staticContent.projects),
        orFallback('blogs', async () =>
            (await fetchPublished<BlogPostRow>('blog_posts')).map((r) => mapBlogPost(r, locale)),
            staticContent.blogs),
        orFallback('faqs', async () =>
            (await fetchPublished<FaqRow>('faqs')).map((r) => mapFaq(r, locale)),
            staticContent.faqs),
        orFallback('tech', async () => mapTechRows(await fetchPublished<TechItemRow>('tech_items')), {
            techStack: staticContent.techStack,
            tools: staticContent.tools,
            hardSkills: staticContent.hardSkills,
            softSkills: staticContent.softSkills,
        }),
        orFallback('personal', async () => mapSettings(await fetchSettings()), staticContent.personal),
    ]);

    return {
        ...staticContent, // experiences, education, achievements, gallery are not in the database
        personal, projects, blogs, faqs, ...tech,
    };
}

/** One database read per render, however many components ask. */
export const getContent = cache(loadContent);

export async function getProject(slug: string, locale: Locale): Promise<Project | null> {
    return (await getContent(locale)).projects.find((p) => p.slug === slug) ?? null;
}

export async function getBlogPost(slug: string, locale: Locale): Promise<BlogPost | null> {
    return (await getContent(locale)).blogs.find((p) => p.slug === slug) ?? null;
}
