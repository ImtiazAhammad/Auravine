'use client';

import { cn } from '@/lib/utils';

export const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

export function TextField({
    label, value, onChange, type = 'text', hint, placeholder, multiline, rows = 3,
}: {
    label: string; value: string; onChange: (value: string) => void; type?: string; hint?: string;
    placeholder?: string; multiline?: boolean; rows?: number;
}) {
    return (
        <label className="block space-y-1.5">
            <span className="text-sm font-medium">{label}</span>
            {multiline ? (
                <textarea className={inputClass} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            ) : (
                <input className={inputClass} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            )}
            {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
        </label>
    );
}

export function SelectField<T extends string>({
    label, value, onChange, options,
}: { label: string; value: T; onChange: (value: T) => void; options: { value: T; label: string }[] }) {
    return (
        <label className="block space-y-1.5">
            <span className="text-sm font-medium">{label}</span>
            <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value as T)}>
                {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
        </label>
    );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="space-y-4 rounded-xl border border-border p-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">{title}</h2>
            {children}
        </section>
    );
}

export type SaveState = { kind: 'idle' } | { kind: 'saving' } | { kind: 'ok'; message: string } | { kind: 'error'; message: string };

export function SaveBar({
    state, onSave, disabled, children,
}: { state: SaveState; onSave: () => void; disabled?: boolean; children?: React.ReactNode }) {
    return (
        <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center gap-3 border-t border-border bg-background/95 px-5 py-3 backdrop-blur md:-mx-8 md:px-8">
            <button
                type="button" onClick={onSave} disabled={disabled || state.kind === 'saving'}
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
                {state.kind === 'saving' ? 'Saving…' : 'Save'}
            </button>
            {children}
            <p
                role={state.kind === 'error' ? 'alert' : 'status'}
                className={cn('text-sm', state.kind === 'error' ? 'text-red-500' : 'text-muted-foreground')}
            >
                {state.kind === 'ok' || state.kind === 'error' ? state.message : ''}
            </p>
        </div>
    );
}

export const STATUS_OPTIONS = [
    { value: 'draft' as const, label: 'Draft (hidden)' },
    { value: 'published' as const, label: 'Published' },
];
