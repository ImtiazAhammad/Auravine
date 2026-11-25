'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveMessage, slugify } from '@/lib/admin/messages';
import type { Bi } from '@/lib/admin/payload';
import { BilingualField } from './BilingualField';
import { ConfirmDelete } from './ConfirmDelete';
import { type SaveState, STATUS_OPTIONS, SelectField, TextField } from './fields';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;
const bi = (v?: { en?: string; bn?: string } | null): Bi => ({ en: v?.en ?? '', bn: v?.bn ?? '' });
const body = (b: Bi) => ({ en: b.en.trim(), ...(b.bn.trim() ? { bn: b.bn.trim() } : {}) });

function FaqRow({ item, onDone }: { item: Item | null; onDone: () => void }) {
    const api = useAdminApi();
    const [id, setId] = useState<string | null>(item?.id ?? null);
    const [key, setKey] = useState<string>(item?.key ?? '');
    const [status, setStatus] = useState<'draft' | 'published'>(item?.status ?? 'published');
    const [order, setOrder] = useState(String(item?.sort_order ?? 0));
    const [question, setQuestion] = useState<Bi>(bi(item?.question));
    const [answer, setAnswer] = useState<Bi>(bi(item?.answer));
    const [state, setState] = useState<SaveState>({ kind: 'idle' });

    async function save() {
        const finalKey = key || slugify(question.en);
        if (!finalKey) return setState({ kind: 'error', message: 'Write the English question first' });
        setState({ kind: 'saving' });
        try {
            const payload = { key: finalKey, status, sort_order: Number(order) || 0, question: body(question), answer: body(answer) };
            const result = (await api.send(id ? 'PUT' : 'POST', id ? `/faqs/${id}` : '/faqs', payload)) as { item: Item; revalidated: boolean };
            setId(result.item.id);
            setKey(finalKey);
            setState({ kind: 'ok', message: saveMessage(result.revalidated) });
        } catch (e) {
            setState({ kind: 'error', message: (e as Error).message });
        }
    }

    async function remove() {
        if (id) {
            try {
                await api.send('DELETE', `/faqs/${id}`);
            } catch (e) {
                return setState({ kind: 'error', message: (e as Error).message });
            }
        }
        onDone();
    }

    return (
        <li className="space-y-3 rounded-xl border border-border p-4">
            <BilingualField label="Question" value={question} onChange={setQuestion} />
            <BilingualField label="Answer" value={answer} onChange={setAnswer} multiline rows={4} />
            <div className="grid gap-3 sm:grid-cols-2">
                <SelectField label="Visibility" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
                <TextField label="Sort order" value={order} onChange={setOrder} />
            </div>
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

export function FaqManager({ items }: { items: Item[] }) {
    const router = useRouter();
    const [adding, setAdding] = useState<number[]>([]);
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black tracking-tight">FAQs</h1>
                <button type="button" onClick={() => setAdding([...adding, Date.now()])} className="rounded-md border border-border px-3 py-2 text-sm hover:bg-accent">Add FAQ</button>
            </div>
            <ul className="space-y-4">
                {adding.map((n) => <FaqRow key={n} item={null} onDone={() => setAdding(adding.filter((x) => x !== n))} />)}
                {items.map((item) => <FaqRow key={item.id} item={item} onDone={() => router.refresh()} />)}
            </ul>
            {items.length === 0 && adding.length === 0 && <p className="text-sm text-muted-foreground">No FAQs yet.</p>}
        </div>
    );
}
