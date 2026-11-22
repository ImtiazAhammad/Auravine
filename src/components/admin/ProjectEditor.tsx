'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type ProjectForm, emptyProjectForm, fromProject, parseDetails, toProjectPayload } from '@/lib/admin/payload';
import { saveMessage } from '@/lib/admin/messages';
import { BilingualField } from './BilingualField';
import { ConfirmDelete } from './ConfirmDelete';
import { type SaveState, STATUS_OPTIONS, Section, SaveBar, SelectField, TextField } from './fields';
import { ImagePicker, LibraryPicker } from './ImagePicker';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

export function ProjectEditor({ item, initialForm }: { item: Item | null; initialForm?: ProjectForm }) {
    const api = useAdminApi();
    const router = useRouter();
    const [form, setForm] = useState<ProjectForm>(initialForm ?? (item ? fromProject(item) : emptyProjectForm()));
    const [state, setState] = useState<SaveState>({ kind: 'idle' });
    const set = <K extends keyof ProjectForm>(key: K, value: ProjectForm[K]) => setForm((f) => ({ ...f, [key]: value }));
    const details = parseDetails(form.detailsText);

    async function save() {
        const payload = toProjectPayload(form);
        if (!payload.ok) return setState({ kind: 'error', message: payload.error });
        setState({ kind: 'saving' });
        try {
            const result = (await api.send(item ? 'PUT' : 'POST', item ? `/projects/${item.id}` : '/projects', payload.value)) as { item: Item; revalidated: boolean };
            setState({ kind: 'ok', message: saveMessage(result.revalidated) });
            if (!item) router.replace(`/admin/projects/${result.item.id}`);
            else router.refresh();
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    async function remove() {
        try {
            await api.send('DELETE', `/projects/${item!.id}`);
            router.push('/admin/projects');
            router.refresh();
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black tracking-tight">{item ? 'Edit project' : 'New project'}</h1>
            <Section title="Basics">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Slug (web address)" value={form.slug} onChange={(v) => set('slug', v)} hint="Lowercase letters, numbers and dashes, for example my-project" />
                    <TextField label="Sort order" value={form.sortOrder} onChange={(v) => set('sortOrder', v)} hint="Smaller numbers show first" />
                    <SelectField label="Visibility" value={form.status} onChange={(v) => set('status', v)} options={STATUS_OPTIONS} />
                    <SelectField label="Delivery status" value={form.deliveryStatus} onChange={(v) => set('deliveryStatus', v)} options={[{ value: 'ongoing', label: 'Ongoing' }, { value: 'completed', label: 'Completed' }, { value: 'planned', label: 'Planned' }]} />
                </div>
                <BilingualField label="Title" value={form.title} onChange={(v) => set('title', v)} />
                <BilingualField label="Short description" value={form.description} onChange={(v) => set('description', v)} multiline rows={3} />
                <BilingualField label="Long description" value={form.longDescription} onChange={(v) => set('longDescription', v)} multiline rows={6} />
                <BilingualField label="Category" value={form.category} onChange={(v) => set('category', v)} />
            </Section>
            <Section title="Images">
                <ImagePicker label="Hero image" value={form.heroImage} onChange={(v) => set('heroImage', v)} />
                <TextField label="Gallery images (one per line)" value={form.galleryImages} onChange={(v) => set('galleryImages', v)} multiline rows={4} />
                <LibraryPicker onPick={(url) => set('galleryImages', form.galleryImages ? `${form.galleryImages}\n${url}` : url)} />
            </Section>
            <Section title="Links, dates and people">
                <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Demo link" value={form.demoUrl} onChange={(v) => set('demoUrl', v)} placeholder="https://…" />
                    <TextField label="Repository link" value={form.repoUrl} onChange={(v) => set('repoUrl', v)} placeholder="https://…" />
                    <TextField label="Start date" type="date" value={form.startDate} onChange={(v) => set('startDate', v)} />
                    <TextField label="End date" type="date" value={form.endDate} onChange={(v) => set('endDate', v)} />
                    <TextField label="Tech stack (comma separated)" value={form.techStack} onChange={(v) => set('techStack', v)} />
                    <TextField label="Tools (comma separated)" value={form.tools} onChange={(v) => set('tools', v)} />
                </div>
                <BilingualField label="Role" value={form.role} onChange={(v) => set('role', v)} />
                <BilingualField label="Team" value={form.team} onChange={(v) => set('team', v)} />
                <BilingualField label="Custom timeline" value={form.customTimeline} onChange={(v) => set('customTimeline', v)} />
            </Section>
            <Section title="Details (advanced)">
                <TextField
                    label="Highlights, metrics, features, challenges and install steps (JSON)"
                    value={form.detailsText} onChange={(v) => set('detailsText', v)} multiline rows={14}
                    hint='Shape: {"en": {"highlights": ["…"], "metrics": [{"value": "24/7", "label": "…"}], "features": [{"title": "…", "items": ["…"]}]}, "bn": {…}}. Leave empty for none.'
                />
                {!details.ok && <p role="alert" className="text-sm text-red-500">{details.error}</p>}
            </Section>
            <SaveBar state={state} onSave={save} disabled={!details.ok}>
                {item && <ConfirmDelete onConfirm={remove} />}
            </SaveBar>
        </div>
    );
}
