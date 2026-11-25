'use client';

import { useState } from 'react';
import { useAdminApi } from './useAdminApi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Msg = Record<string, any>;

export function MessageInbox({ messages }: { messages: Msg[] }) {
    const api = useAdminApi();
    const [rows, setRows] = useState<Msg[]>(messages);
    const [showHandled, setShowHandled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const visible = rows.filter((m) => showHandled || !m.handled);

    async function toggle(m: Msg) {
        try {
            const result = (await api.send('PATCH', `/messages/${m.id}`, { handled: !m.handled })) as { item: Msg };
            setRows(rows.map((r) => (r.id === m.id ? { ...r, ...result.item } : r)));
        } catch (e) {
            setError((e as Error).message);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-black tracking-tight">Messages</h1>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={showHandled} onChange={(e) => setShowHandled(e.target.checked)} />
                    Show handled
                </label>
            </div>
            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            <ul className="space-y-3">
                {visible.map((m) => (
                    <li key={m.id} className="space-y-2 rounded-xl border border-border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium">{m.name} <a className="text-sm font-normal text-muted-foreground underline" href={`mailto:${m.email}`}>{m.email}</a></p>
                            <div className="flex items-center gap-2 text-xs">
                                {!m.emailed_at && m.email_error && (
                                    <span className="rounded bg-amber-500/15 px-2 py-0.5 text-amber-600" title={m.email_error}>Not emailed</span>
                                )}
                                {m.handled && <span className="rounded bg-green-500/15 px-2 py-0.5 text-green-600">Handled</span>}
                                <time className="text-muted-foreground" dateTime={m.created_at}>{m.created_at ? new Date(m.created_at).toLocaleString() : ''}</time>
                            </div>
                        </div>
                        {m.subject && <p className="text-sm font-medium">{m.subject}</p>}
                        <p className="whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
                        <button type="button" onClick={() => toggle(m)} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                            {m.handled ? 'Mark as new' : 'Mark as handled'}
                        </button>
                    </li>
                ))}
            </ul>
            {visible.length === 0 && <p className="text-sm text-muted-foreground">No messages here.</p>}
        </div>
    );
}
