'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BLOG_CATEGORIES, type BlogForm, emptyBlogForm, fromBlog, toBlogPayload } from '@/lib/admin/payload';
import { saveMessage } from '@/lib/admin/messages';
import { BilingualField } from './BilingualField';
import { ConfirmDelete } from './ConfirmDelete';
import { type SaveState, STATUS_OPTIONS, Section, SaveBar, SelectField, TextField } from './fields';
import { ImagePicker } from './ImagePicker';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

export function BlogEditor({ item }: { item: Item | null }) {
    const api = useAdminApi();
    const router = useRouter();
    const [form, setForm] = useState<BlogForm>(item ? fromBlog(item) : emptyBlogForm());
    const [state, setState] = useState<SaveState>({ kind: 'idle' });
    const set = <K extends keyof BlogForm>(key: K, value: BlogForm[K]) => setForm((f) => ({ ...f, [key]: value }));

    async function save() {
        const payload = toBlogPayload(form);
        if (!payload.ok) return setState({ kind: 'error', message: payload.error });
        setState({ kind: 'saving' });
        try {
            const result = (await api.send(item ? 'PUT' : 'POST', item ? `/blog-posts/${item.id}` : '/blog-posts', payload.value)) as { item: Item; revalidated: boolean };
            setState({ kind: 'ok', message: saveMessage(result.revalidated) });
            if (!item) router.replace(`/admin/blog/${result.item.id}`);
            else router.refresh();
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    async function remove() {
        try {
            await api.send('DELETE', `/blog-posts/${item!.id}`);
            router.push('/admin/blog');
            router.refresh();
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black tracking-tight">{item ? 'Edit blog post' : 'New blog post'}</h1>
            <Section title="Basics">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Slug (web address)" value={form.slug} onChange={(v) => set('slug', v)} hint="Lowercase letters, numbers and dashes" />
                    <TextField label="Sort order" value={form.sortOrder} onChange={(v) => set('sortOrder', v)} hint="Smaller numbers show first" />
                    <SelectField label="Visibility" value={form.status} onChange={(v) => set('status', v)} options={STATUS_OPTIONS} />
                    <TextField label="Published on" type="date" value={form.publishedAt} onChange={(v) => set('publishedAt', v)} />
                    <SelectField label="Category" value={form.category as (typeof BLOG_CATEGORIES)[number]['value']} onChange={(v) => set('category', v)} options={[...BLOG_CATEGORIES]} />
                    <TextField label="Read time (minutes)" value={form.readTime} onChange={(v) => set('readTime', v)} />
                </div>
                <TextField label="Tags (comma separated)" value={form.tags} onChange={(v) => set('tags', v)} />
                <BilingualField label="Author" value={form.authorName} onChange={(v) => set('authorName', v)} />
                <ImagePicker label="Cover image" value={form.coverImage} onChange={(v) => set('coverImage', v)} />
                <p className="-mt-2 text-xs text-muted-foreground">Use Upload or the library. Links to other websites are not accepted for the cover.</p>
            </Section>
            <Section title="Content">
                <BilingualField label="Title" value={form.title} onChange={(v) => set('title', v)} />
                <BilingualField label="Excerpt" value={form.excerpt} onChange={(v) => set('excerpt', v)} multiline rows={3} />
                <BilingualField
                    label="Article (Markdown)" value={form.content} onChange={(v) => set('content', v)}
                    multiline rows={18} markdown hint="Blank line between paragraphs. ## Heading, - list items, [text](https://link), **bold**."
                />
            </Section>
            <SaveBar state={state} onSave={save}>
                {item && <ConfirmDelete onConfirm={remove} />}
            </SaveBar>
        </div>
    );
}
