import type { Bilingual } from './localize';

/** Database rows exactly as PostgREST returns them (see supabase/migrations). */
export interface ProjectRow {
    id?: string;
    slug: string;
    status: 'draft' | 'published';
    sort_order: number;
    delivery_status: 'ongoing' | 'completed' | 'planned';
    category: Bilingual | null;
    title: Bilingual;
    description: Bilingual;
    long_description: Bilingual | null;
    details: { en?: Record<string, unknown>; bn?: Record<string, unknown> };
    tech_stack: string[];
    tools: string[];
    hero_image: string | null;
    gallery_images: string[];
    demo_url: string | null;
    repo_url: string | null;
    start_date: string | null;
    end_date: string | null;
    role: Bilingual | null;
    team: Bilingual | null;
    custom_timeline: Bilingual | null;
}

export interface BlogPostRow {
    id?: string;
    slug: string;
    status: 'draft' | 'published';
    sort_order: number;
    title: Bilingual;
    excerpt: Bilingual;
    content: Bilingual;
    cover_image: string | null;
    published_at: string | null;
    category: string | null;
    tags: string[];
    author_name: Bilingual | null;
    read_time_minutes: number | null;
}

export interface FaqRow {
    key: string;
    status: 'draft' | 'published';
    sort_order: number;
    question: Bilingual;
    answer: Bilingual;
}

export interface TechItemRow {
    key: string;
    status: 'draft' | 'published';
    sort_order: number;
    kind: 'tech' | 'tool' | 'hard_skill' | 'soft_skill';
    name: string;
    icon: string | null;
    category: string | null;
    url: string | null;
    extra: Record<string, unknown>;
}

export interface SiteSettingRow {
    key: string;
    value: unknown;
}
