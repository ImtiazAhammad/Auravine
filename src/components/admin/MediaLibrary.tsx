'use client';

import { useState } from 'react';
import { uploadImage } from '@/lib/admin/upload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Media = Record<string, any>;

export function MediaLibrary({ items }: { items: Media[] }) {
    const [rows, setRows] = useState<Media[]>(items);
    const [alt, setAlt] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    async function upload(file: File | undefined) {
        if (!file) return;
        setBusy(true);
        setError(null);
        try {
            const uploaded = await uploadImage(file, { alt });
            setRows([uploaded as Media, ...rows]);
            setAlt('');
        } catch (e) {
            setError((e as Error).message);
        }
        setBusy(false);
    }

    async function copy(url: string) {
        await navigator.clipboard?.writeText(url).catch(() => undefined);
        setCopied(url);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-black tracking-tight">Media</h1>
            <div className="space-y-3 rounded-xl border border-border p-5">
                <label className="block space-y-1.5 text-sm">
                    <span className="font-medium">Description of the next image (for screen readers)</span>
                    <input className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={alt} onChange={(e) => setAlt(e.target.value)} />
                </label>
                <label className="inline-block cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    {busy ? 'Uploading…' : 'Upload image'}
                    <input type="file" className="sr-only" disabled={busy} accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml,image/avif" onChange={(e) => upload(e.target.files?.[0])} />
                </label>
                <p className="text-xs text-muted-foreground">WebP, PNG, JPEG, GIF, SVG or AVIF, up to 5 MB. Uploaded images cannot be deleted from here.</p>
                {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            </div>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {rows.map((m) => (
                    <li key={m.id ?? m.path} className="space-y-2 rounded-xl border border-border p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.public_url} alt={m.alt?.en ?? ''} className="aspect-square w-full rounded object-cover" loading="lazy" />
                        <p className="truncate text-xs text-muted-foreground" title={m.path}>{m.path}</p>
                        <button type="button" onClick={() => copy(m.public_url)} className="w-full rounded-md border border-border px-2 py-1 text-xs hover:bg-accent">
                            {copied === m.public_url ? 'Copied' : 'Copy link'}
                        </button>
                    </li>
                ))}
            </ul>
            {rows.length === 0 && <p className="text-sm text-muted-foreground">No images yet.</p>}
        </div>
    );
}
