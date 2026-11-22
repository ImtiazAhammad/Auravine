'use client';

import { useState } from 'react';

export function ConfirmDelete({ onConfirm, label = 'Delete' }: { onConfirm: () => void; label?: string }) {
    const [asking, setAsking] = useState(false);
    if (!asking) {
        return (
            <button type="button" onClick={() => setAsking(true)} className="rounded-md border border-red-500/40 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10">
                {label}
            </button>
        );
    }
    return (
        <span className="inline-flex items-center gap-2 text-sm" role="alert">
            Delete permanently?
            <button type="button" onClick={onConfirm} className="rounded-md bg-red-600 px-3 py-2 text-white">Yes, delete</button>
            <button type="button" onClick={() => setAsking(false)} className="rounded-md border border-border px-3 py-2">Cancel</button>
        </span>
    );
}
