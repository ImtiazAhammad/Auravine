import { cache } from 'react';
import type { BlogPost, PortfolioData, Project } from '@/types';
import type { Locale } from './localize';
import { mapBlogPost, mapFaq, mapProject, mapSettings, mapTechRows } from './map';
import type { BlogPostRow, FaqRow, ProjectRow, TechItemRow } from './rows';
import { staticContent } from './static';
import { fetchPublished, fetchSettings } from './supabase';

/** The last good database copy of each collection, per language, kept for this server process.
 *  During an outage it is served instead of the static data, so content the owner has removed or
 *  unpublished does not come back. */
const lastGood = new Map<string, unknown>();

/** For tests. */
export function resetLastGood() {
    lastGood.clear();
}

/** A successful read, even an empty one, is authoritative (drafts must not reappear) and becomes
 *  the last good copy. A failed or malformed read serves that copy, or the static data only when
 *  this process has never had a good one, and logs why. */
async function orFallback<T>(name: string, locale: Locale, read: () => Promise<T>, fallback: T): Promise<T> {
    const key = `${locale}:${name}`;
    try {
        const value = await read();
        lastGood.set(key, value);
        return value;
    } catch (error) {
        const reason = error instanceof Error ? error.message : 'unknown error';
        if (lastGood.has(key)) {
            console.error(`[content] ${name} served last good copy: ${reason}`);
            return lastGood.get(key) as T;
        }
        console.error(`[content] ${name} fell back to static: ${reason}`);
        return fallback;
    }
}

export async function loadContent(locale: Locale): Promise<PortfolioData> {
    if (process.env.CONTENT_SOURCE !== 'supabase') return staticContent;

    const [projects, blogs, faqs, tech, personal] = await Promise.all([
        orFallback('projects', locale, async () =>
            (await fetchPublished<ProjectRow>('projects')).map((r) => mapProject(r, locale)),
            staticContent.projects),
        orFallback('blogs', locale, async () =>
            (await fetchPublished<BlogPostRow>('blog_posts')).map((r) => mapBlogPost(r, locale)),
            staticContent.blogs),
        orFallback('faqs', locale, async () =>
            (await fetchPublished<FaqRow>('faqs')).map((r) => mapFaq(r, locale)),
            staticContent.faqs),
        orFallback('tech', locale, async () => mapTechRows(await fetchPublished<TechItemRow>('tech_items')), {
            techStack: staticContent.techStack,
            tools: staticContent.tools,
            hardSkills: staticContent.hardSkills,
            softSkills: staticContent.softSkills,
        }),
        orFallback('personal', locale, async () => mapSettings(await fetchSettings()), staticContent.personal),
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
