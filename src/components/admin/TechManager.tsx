'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveMessage, techKey } from '@/lib/admin/messages';
import { ConfirmDelete } from './ConfirmDelete';
import { type SaveState, STATUS_OPTIONS, SelectField, TextField } from './fields';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;
type Kind = 'tech' | 'tool' | 'hard_skill' | 'soft_skill';
const KINDS: { value: Kind; label: string }[] = [
    { value: 'tech', label: 'Technology' }, { value: 'tool', label: 'Tool' },
    { value: 'hard_skill', label: 'Hard skill' }, { value: 'soft_skill', label: 'Soft skill' },
];

function TechRow({ item, kind: defaultKind, onDone }: { item: Item | null; kind: Kind; onDone: () => void }) {
    const api = useAdminApi();
    const [id, setId] = useState<string | null>(item?.id ?? null);
    const [key, setKey] = useState<string>(item?.key ?? '');
    const [kind, setKind] = useState<Kind>(item?.kind ?? defaultKind);
    const [name, setName] = useState<string>(item?.name ?? '');
    const [icon, setIcon] = useState<string>(item?.icon ?? '');
    const [category, setCategory] = useState<string>(item?.category ?? '');
    const [url, setUrl] = useState<string>(item?.url ?? '');
    const [status, setStatus] = useState<'draft' | 'published'>(item?.status ?? 'published');
    const [order, setOrder] = useState(String(item?.sort_order ?? 0));
    const [description, setDescription] = useState<string>(item?.extra?.description ?? '');
    const [level, setLevel] = useState<string>(item?.extra?.level ?? '');
    const [state, setState] = useState<SaveState>({ kind: 'idle' });
    const skill = kind === 'hard_skill' || kind === 'soft_skill';

    async function save() {
        if (!name.trim()) return setState({ kind: 'error', message: 'Name is required' });
        const extra = { ...(item?.extra ?? {}) };
        for (const [k, v] of [['description', description], ['level', level]] as const) {
            if (v.trim()) extra[k] = v.trim(); else delete extra[k];
        }
        setState({ kind: 'saving' });
        try {
            const payload = {
                key: key || techKey(kind, name), status, sort_order: Number(order) || 0, kind, name: name.trim(),
                icon: icon.trim() || null, category: category.trim() || null, url: url.trim() || null, extra,
            };
            const result = (await api.send(id ? 'PUT' : 'POST', id ? `/tech-items/${id}` : '/tech-items', payload)) as { item: Item; revalidated: boolean };
            setId(result.item.id);
            setKey(payload.key);
            setState({ kind: 'ok', message: saveMessage(result.revalidated) });
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    async function remove() {
        if (id) {
            try {
                await api.send('DELETE', `/tech-items/${id}`);
            } catch (e) {
                return setState({ kind: 'error', message: (e as Error).message });
            }
        }
        onDone();
    }

    return (
        <li className="space-y-3 rounded-xl border border-border p-4">
            <div className="grid gap-3 sm:grid-cols-3">
                <TextField label="Name" value={name} onChange={setName} />
                <SelectField label="Kind" value={kind} onChange={setKind} options={KINDS} />
                <TextField label="Category" value={category} onChange={setCategory} />
                {!skill && <TextField label="Icon (https link)" value={icon} onChange={setIcon} />}
                {!skill && <TextField label="Website" value={url} onChange={setUrl} />}
                {skill && <TextField label="Level" value={level} onChange={setLevel} hint="For example expert" />}
                <SelectField label="Visibility" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
                <TextField label="Sort order" value={order} onChange={setOrder} />
            </div>
            {skill && <TextField label="Description" value={description} onChange={setDescription} multiline />}
            <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={save} disabled={state.kind === 'saving'} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
                    {state.kind === 'saving' ? 'Saving…' : 'Save'}
                </button>
                <ConfirmDelete onConfirm={remove} />
                <p role={state.kind === 'error' ? 'alert' : 'status'} className={state.kind === 'error' ? 'text-sm text-red-500' : 'text-sm text-muted-foreground'}>
                    {state.kind === 'ok' || state.kind === 'error' ? state.message : ''}
                </p>
            </div>
        </li>
    );
}

export function TechManager({ items }: { items: Item[] }) {
    const router = useRouter();
    const [filter, setFilter] = useState<Kind>('tech');
    const [adding, setAdding] = useState<number[]>([]);
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-black tracking-tight">Tech, tools and skills</h1>
                <button type="button" onClick={() => setAdding([...adding, Date.now()])} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">Add item</button>
            </div>
            <div role="tablist" className="flex flex-wrap gap-2">
                {KINDS.map((k) => (
                    <button key={k.value} type="button" role="tab" aria-selected={filter === k.value} onClick={() => setFilter(k.value)}
                        className={filter === k.value ? 'rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground' : 'rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent'}>
                        {k.label} ({items.filter((i) => i.kind === k.value).length})
                    </button>
                ))}
            </div>
            <ul className="space-y-4">
                {adding.map((n) => <TechRow key={n} item={null} kind={filter} onDone={() => setAdding(adding.filter((x) => x !== n))} />)}
                {items.filter((i) => i.kind === filter).map((item) => <TechRow key={item.id} item={item} kind={filter} onDone={() => router.refresh()} />)}
            </ul>
        </div>
    );
}
