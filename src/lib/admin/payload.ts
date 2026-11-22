/* Form state <-> API payloads for projects and blog posts. The backend validates everything again;
   this keeps obviously wrong input from being sent and turns blanks into nulls. */

export interface Bi { en: string; bn: string }
export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

const bi = (value?: { en?: string; bn?: string } | null): Bi => ({ en: value?.en ?? '', bn: value?.bn ?? '' });

/** {en, bn?} for the payload, or null when the English text is empty. */
function toBi(value: Bi): { en: string; bn?: string } | null {
    const en = value.en.trim();
    if (!en) return null;
    const bn = value.bn.trim();
    return bn ? { en, bn } : { en };
}

const text = (value: string) => value.trim() || null;
const list = (value: string, separator: RegExp) =>
    value.split(separator).map((part) => part.trim()).filter(Boolean);

// ---------------------------------------------------------------- details
const DETAIL_KEYS = ['highlights', 'challenges', 'metrics', 'features', 'challengesAndSolutions', 'installation'];
const isStr = (v: unknown): v is string => typeof v === 'string';
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const strings = (v: unknown) => Array.isArray(v) && v.every(isStr);
const objects = (v: unknown, ok: (o: Record<string, unknown>) => boolean) =>
    Array.isArray(v) && v.every((o) => isObj(o) && ok(o));

const DETAIL_CHECKS: Record<string, [(v: unknown) => boolean, string]> = {
    highlights: [strings, 'a list of text lines'],
    challenges: [strings, 'a list of text lines'],
    metrics: [(v) => objects(v, (o) => isStr(o.value) && isStr(o.label)), 'a list of {"value", "label"}'],
    features: [(v) => objects(v, (o) => isStr(o.title) && strings(o.items)), 'a list of {"title", "items": [...]}'],
    challengesAndSolutions: [(v) => objects(v, (o) => isStr(o.problem) && isStr(o.solution)), 'a list of {"problem", "solution"}'],
    installation: [(v) => objects(v, (o) => isStr(o.title) && (o.type === 'code' || o.type === 'text')), 'a list of {"title", "type": "code" | "text"}'],
};

export function parseDetails(source: string): Result<{ en: Item; bn?: Item }> {
    if (!source.trim()) return { ok: true, value: { en: {} } };
    let data: unknown;
    try {
        data = JSON.parse(source);
    } catch {
        return { ok: false, error: 'Details is not valid JSON' };
    }
    if (!isObj(data)) return { ok: false, error: 'Details must be an object like {"en": {...}, "bn": {...}}' };
    for (const key of Object.keys(data)) {
        if (key !== 'en' && key !== 'bn') return { ok: false, error: `Details: unknown top-level key "${key}" (use "en" and "bn")` };
    }
    for (const side of ['en', 'bn'] as const) {
        const part = data[side];
        if (part === undefined) continue;
        if (!isObj(part)) return { ok: false, error: `Details "${side}" must be an object` };
        for (const [key, value] of Object.entries(part)) {
            if (!DETAIL_KEYS.includes(key)) return { ok: false, error: `Details ${side}: unknown key "${key}"` };
            const [check, expected] = DETAIL_CHECKS[key];
            if (!check(value)) return { ok: false, error: `Details ${side}.${key} must be ${expected}` };
        }
    }
    return { ok: true, value: { en: (data.en as Item) ?? {}, ...(data.bn ? { bn: data.bn as Item } : {}) } };
}

// ---------------------------------------------------------------- projects
export interface ProjectForm {
    slug: string; status: 'draft' | 'published'; sortOrder: string;
    deliveryStatus: 'ongoing' | 'completed' | 'planned';
    title: Bi; description: Bi; longDescription: Bi; category: Bi; role: Bi; team: Bi; customTimeline: Bi;
    techStack: string; tools: string; heroImage: string; galleryImages: string;
    demoUrl: string; repoUrl: string; startDate: string; endDate: string; detailsText: string;
}

export const emptyProjectForm = (): ProjectForm => ({
    slug: '', status: 'draft', sortOrder: '0', deliveryStatus: 'ongoing',
    title: bi(), description: bi(), longDescription: bi(), category: bi(), role: bi(), team: bi(), customTimeline: bi(),
    techStack: '', tools: '', heroImage: '', galleryImages: '', demoUrl: '', repoUrl: '',
    startDate: '', endDate: '', detailsText: '',
});

export function fromProject(item: Item): ProjectForm {
    const hasDetails = item.details && Object.values(item.details).some((side) => isObj(side) && Object.keys(side).length);
    return {
        slug: item.slug ?? '', status: item.status ?? 'draft', sortOrder: String(item.sort_order ?? 0),
        deliveryStatus: item.delivery_status ?? 'ongoing',
        title: bi(item.title), description: bi(item.description), longDescription: bi(item.long_description),
        category: bi(item.category), role: bi(item.role), team: bi(item.team), customTimeline: bi(item.custom_timeline),
        techStack: (item.tech_stack ?? []).join(', '), tools: (item.tools ?? []).join(', '),
        heroImage: item.hero_image ?? '', galleryImages: (item.gallery_images ?? []).join('\n'),
        demoUrl: item.demo_url ?? '', repoUrl: item.repo_url ?? '',
        startDate: item.start_date ?? '', endDate: item.end_date ?? '',
        detailsText: hasDetails ? JSON.stringify(item.details, null, 2) : '',
    };
}

function sortOrder(value: string): Result<number> {
    const n = Number(value.trim() === '' ? 0 : value);
    return Number.isInteger(n) && n >= 0 ? { ok: true, value: n } : { ok: false, error: 'Sort order must be a whole number, 0 or more' };
}

export function toProjectPayload(form: ProjectForm): Result<Item> {
    const details = parseDetails(form.detailsText);
    if (!details.ok) return details;
    const order = sortOrder(form.sortOrder);
    if (!order.ok) return order;
    return {
        ok: true,
        value: {
            slug: form.slug.trim(), status: form.status, sort_order: order.value, delivery_status: form.deliveryStatus,
            category: toBi(form.category), title: toBi(form.title), description: toBi(form.description),
            long_description: toBi(form.longDescription), details: details.value,
            tech_stack: list(form.techStack, /,/), tools: list(form.tools, /,/),
            hero_image: text(form.heroImage), gallery_images: list(form.galleryImages, /\n/),
            demo_url: text(form.demoUrl), repo_url: text(form.repoUrl),
            start_date: text(form.startDate), end_date: text(form.endDate),
            role: toBi(form.role), team: toBi(form.team), custom_timeline: toBi(form.customTimeline),
        },
    };
}

// ---------------------------------------------------------------- blog posts
export interface BlogForm {
    slug: string; status: 'draft' | 'published'; sortOrder: string;
    title: Bi; excerpt: Bi; content: Bi; coverImage: string; publishedAt: string;
    category: string; tags: string; authorName: Bi; readTime: string;
}

export const emptyBlogForm = (): BlogForm => ({
    slug: '', status: 'draft', sortOrder: '0', title: bi(), excerpt: bi(), content: bi(),
    coverImage: '', publishedAt: '', category: '', tags: '', authorName: bi(), readTime: '',
});

export function fromBlog(item: Item): BlogForm {
    return {
        slug: item.slug ?? '', status: item.status ?? 'draft', sortOrder: String(item.sort_order ?? 0),
        title: bi(item.title), excerpt: bi(item.excerpt), content: bi(item.content),
        coverImage: item.cover_image ?? '', publishedAt: item.published_at ?? '',
        category: item.category ?? '', tags: (item.tags ?? []).join(', '),
        authorName: bi(item.author_name), readTime: item.read_time_minutes ? String(item.read_time_minutes) : '',
    };
}

export function toBlogPayload(form: BlogForm): Result<Item> {
    const order = sortOrder(form.sortOrder);
    if (!order.ok) return order;
    const minutes = form.readTime.trim() === '' ? null : Number(form.readTime);
    if (minutes !== null && (!Number.isInteger(minutes) || minutes < 1)) {
        return { ok: false, error: 'Read time must be a whole number of minutes' };
    }
    return {
        ok: true,
        value: {
            slug: form.slug.trim(), status: form.status, sort_order: order.value,
            title: toBi(form.title), excerpt: toBi(form.excerpt), content: toBi(form.content),
            cover_image: text(form.coverImage), published_at: text(form.publishedAt),
            category: text(form.category), tags: list(form.tags, /,/),
            author_name: toBi(form.authorName), read_time_minutes: minutes,
        },
    };
}
