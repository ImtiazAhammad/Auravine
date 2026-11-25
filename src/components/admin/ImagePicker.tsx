'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/admin/upload';
import { useAdminApi } from './useAdminApi';

interface MediaItem { id: string; path: string; public_url: string; alt?: { en?: string } | null }

const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

/** Upload a new image or pick one from the library; calls onPick with its URL or path. */
export function LibraryPicker({ onPick }: { onPick: (url: string) => void }) {
    const api = useAdminApi();
    const [items, setItems] = useState<MediaItem[] | null>(null);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function toggle() {
        setOpen(!open);
        if (!open && items === null) {
            try {
                setItems(((await api.get('/media')) as { items: MediaItem[] }).items);
            } catch (e) {
                setError((e as Error).message);
            }
        }
    }

    async function upload(file: File | undefined) {
        if (!file) return;
        setBusy(true);
        setError(null);
        try {
            const uploaded = await uploadImage(file);
            setItems((current) => [uploaded as MediaItem, ...(current ?? [])]);
            onPick(uploaded.public_url);
        } catch (e) {
            setError((e as Error).message);
        }
        setBusy(false);
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                    {busy ? 'Uploading…' : 'Upload image'}
                    <input type="file" accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml,image/avif" className="sr-only" disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
                </label>
                <button type="button" onClick={toggle} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                    {open ? 'Hide library' : 'Choose from library'}
                </button>
            </div>
            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            {open && (
                <ul className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded-md border border-border p-2 sm:grid-cols-5">
                    {(items ?? []).map((item) => (
                        <li key={item.id ?? item.path}>
                            <button type="button" onClick={() => onPick(item.public_url)} className="block w-full overflow-hidden rounded border border-border hover:ring-2 hover:ring-ring" title={item.path}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.public_url} alt={item.alt?.en ?? ''} className="aspect-square w-full object-cover" loading="lazy" />
                            </button>
                        </li>
                    ))}
                    {items?.length === 0 && <li className="col-span-full text-sm text-muted-foreground">No images yet.</li>}
                </ul>
            )}
        </div>
    );
}

export function ImagePicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
    return (
        <div className="space-y-1.5">
            <span className="text-sm font-medium">{label}</span>
            <input className={inputClass} type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /path/in/public.webp" />
            {value && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt="" className="h-24 rounded border border-border object-cover" />
            )}
            <LibraryPicker onPick={onChange} />
        </div>
    );
}
