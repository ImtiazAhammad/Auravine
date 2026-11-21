import type { BlogPost, FAQ, PersonalInfo, Project, Skill, SoftSkill, TechStack, Tool } from '@/types';
import { type Locale, pick, pickDetails } from './localize';
import type { BlogPostRow, FaqRow, ProjectRow, SiteSettingRow, TechItemRow } from './rows';

/** Shown where the database has no image: the site's neutral placeholder. */
export const PLACEHOLDER_IMAGE = '/grid.svg';

/** The old site used "#" for "no link"; components still test for it. */
const link = (url: string | null) => url ?? '#';

/** Drop null and undefined so optional properties stay absent, as in the static data. */
function compact<T extends object>(value: T): T {
    return Object.fromEntries(
        Object.entries(value).filter(([, v]) => v !== null && v !== undefined),
    ) as T;
}

export function mapProject(row: ProjectRow, locale: Locale): Project {
    const details = pickDetails(row.details as { en: object; bn?: object }, locale);
    return compact({
        id: row.id ?? row.slug,
        slug: row.slug,
        title: pick(row.title, locale) ?? '',
        description: pick(row.description, locale) ?? '',
        longDescription: pick(row.long_description, locale),
        image: row.hero_image ?? PLACEHOLDER_IMAGE,
        // Absent, not empty: the page treats any array (even []) as "has a gallery".
        galleryImages: row.gallery_images.length > 0 ? row.gallery_images : undefined,
        techStack: row.tech_stack,
        tools: row.tools,
        status: row.delivery_status,
        repoUrl: link(row.repo_url),
        demoUrl: link(row.demo_url),
        startDate: row.start_date ?? '',
        endDate: row.end_date,
        role: pick(row.role, locale),
        team: pick(row.team, locale),
        category: pick(row.category, locale),
        customTimeline: pick(row.custom_timeline, locale),
        ...details,
    }) as Project;
}

export function mapBlogPost(row: BlogPostRow, locale: Locale): BlogPost {
    return {
        id: row.id ?? row.slug,
        slug: row.slug,
        title: pick(row.title, locale) ?? '',
        excerpt: pick(row.excerpt, locale) ?? '',
        content: pick(row.content, locale) ?? '',
        image: row.cover_image ?? PLACEHOLDER_IMAGE,
        date: row.published_at ?? '',
        category: row.category ?? '',
        tags: row.tags,
        author: { name: pick(row.author_name, locale) ?? 'Auravine', avatar: PLACEHOLDER_IMAGE },
        readTime: String(row.read_time_minutes ?? 1),
    };
}

export function mapFaq(row: FaqRow, locale: Locale): FAQ {
    return { question: pick(row.question, locale) ?? '', answer: pick(row.answer, locale) ?? '' };
}

export function mapTechRows(rows: TechItemRow[]): {
    techStack: TechStack[];
    tools: Tool[];
    hardSkills: Skill[];
    softSkills: SoftSkill[];
} {
    const of = (kind: TechItemRow['kind']) =>
        rows.filter((r) => r.kind === kind).sort((a, b) => a.sort_order - b.sort_order);
    const base = (r: TechItemRow) => ({ name: r.name, ...r.extra });
    return {
        techStack: of('tech').map((r) => compact({
            ...base(r), icon: r.icon ?? PLACEHOLDER_IMAGE, category: r.category ?? 'tool', url: r.url,
        })) as unknown as TechStack[],
        tools: of('tool').map((r) => compact({
            ...base(r), icon: r.icon ?? PLACEHOLDER_IMAGE, category: r.category ?? 'other',
        })) as unknown as Tool[],
        hardSkills: of('hard_skill').map((r) => compact({
            ...base(r), category: r.category ?? 'other',
        })) as unknown as Skill[],
        softSkills: of('soft_skill').map((r) => base(r)) as unknown as SoftSkill[],
    };
}

export function mapSettings(rows: SiteSettingRow[]): PersonalInfo {
    const value = (key: string) => rows.find((r) => r.key === key)?.value;
    const personal = value('personal');
    if (!personal || typeof personal !== 'object') {
        throw new Error("site_settings has no 'personal' row");
    }
    return compact({
        ...(personal as object),
        socialLinks: value('social_links') ?? [],
        languages: value('languages'),
    }) as unknown as PersonalInfo;
}
