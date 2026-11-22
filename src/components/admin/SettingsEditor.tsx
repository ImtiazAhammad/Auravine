'use client';

import { useState } from 'react';
import { saveMessage } from '@/lib/admin/messages';
import { cleanRows } from '@/lib/admin/payload';
import { type SaveState, Section, TextField } from './fields';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

const PERSONAL_FIELDS: { key: string; label: string; multiline?: boolean }[] = [
    { key: 'name', label: 'Company name' }, { key: 'title', label: 'Title' },
    { key: 'subtitle', label: 'Subtitle', multiline: true }, { key: 'bio', label: 'About (bio)', multiline: true },
    { key: 'location', label: 'Location' }, { key: 'email', label: 'Public email' },
    { key: 'phone', label: 'Phone' }, { key: 'website', label: 'Website' }, { key: 'avatar', label: 'Avatar image path or link' },
];

function useSetting(initial: unknown, key: string) {
    const api = useAdminApi();
    const [state, setState] = useState<SaveState>({ kind: 'idle' });
    async function save(value: unknown) {
        setState({ kind: 'saving' });
        try {
            const result = (await api.send('PUT', `/settings/${key}`, { value })) as { revalidated: boolean };
            setState({ kind: 'ok', message: saveMessage(result.revalidated) });
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }
    return { state, save, initial };
}

function Status({ state }: { state: SaveState }) {
    return (
        <p role={state.kind === 'error' ? 'alert' : 'status'} className={state.kind === 'error' ? 'text-sm text-red-500' : 'text-sm text-muted-foreground'}>
            {state.kind === 'ok' || state.kind === 'error' ? state.message : ''}
        </p>
    );
}

function SaveButton({ state, onClick }: { state: SaveState; onClick: () => void }) {
    return (
        <button type="button" onClick={onClick} disabled={state.kind === 'saving'} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
            {state.kind === 'saving' ? 'Saving…' : 'Save'}
        </button>
    );
}

function PersonalCard({ initial }: { initial: Obj }) {
    const { state, save } = useSetting(initial, 'personal');
    const [value, setValue] = useState<Obj>({ ...initial });
    // The API wants every main field present (even empty) but not blank optional ones.
    const OPTIONAL = ['phone', 'website'];
    const clean = () => Object.fromEntries(Object.entries(value).filter(([k, v]) => !(OPTIONAL.includes(k) && typeof v === 'string' && v.trim() === '')));
    return (
        <Section title="Company details">
            <div className="grid gap-4 sm:grid-cols-2">
                {PERSONAL_FIELDS.map((f) => (
                    <div key={f.key} className={f.multiline ? 'sm:col-span-2' : undefined}>
                        <TextField label={f.label} value={value[f.key] ?? ''} multiline={f.multiline} onChange={(v) => setValue({ ...value, [f.key]: v })} />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3"><SaveButton state={state} onClick={() => save(clean())} /><Status state={state} /></div>
        </Section>
    );
}

function RowsCard<T extends Obj>({
    title, settingKey, initial, fields, blank, optional = [],
}: { title: string; settingKey: string; initial: T[]; fields: { key: keyof T & string; label: string }[]; blank: T; optional?: string[] }) {
    const { state, save } = useSetting(initial, settingKey);
    const [rows, setRows] = useState<T[]>(initial);
    const edit = (i: number, key: string, v: string) => setRows(rows.map((r, n) => (n === i ? { ...r, [key]: v } : r)));
    const clean = () => cleanRows(rows, optional);
    return (
        <Section title={title}>
            <ul className="space-y-3">
                {rows.map((row, i) => (
                    <li key={i} className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[repeat(4,1fr)_auto]">
                        {fields.map((f) => <TextField key={f.key} label={f.label} value={row[f.key] ?? ''} onChange={(v) => edit(i, f.key, v)} />)}
                        <button type="button" onClick={() => setRows(rows.filter((_, n) => n !== i))} className="self-end rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">Remove</button>
                    </li>
                ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => setRows([...rows, { ...blank }])} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">Add row</button>
                <SaveButton state={state} onClick={() => save(clean())} /><Status state={state} />
            </div>
        </Section>
    );
}

export function SettingsEditor({ settings }: { settings: Obj }) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black tracking-tight">Site settings</h1>
            <PersonalCard initial={settings.personal ?? {}} />
            <RowsCard
                title="Social links" settingKey="social_links" initial={settings.social_links ?? []} blank={{ platform: '', url: '', icon: '', username: '' }} optional={['username']}
                fields={[{ key: 'platform', label: 'Platform' }, { key: 'url', label: 'Link (https)' }, { key: 'icon', label: 'Icon name' }, { key: 'username', label: 'Username' }]}
            />
            <RowsCard
                title="Languages" settingKey="languages" initial={settings.languages ?? []} blank={{ name: '', level: '' }}
                fields={[{ key: 'name', label: 'Language' }, { key: 'level', label: 'Level' }]}
            />
        </div>
    );
}
