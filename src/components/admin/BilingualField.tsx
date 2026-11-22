'use client';

import { useState } from 'react';
import { Markdown } from '@/components/Markdown';
import type { Bi } from '@/lib/admin/payload';
import { cn } from '@/lib/utils';

const inputClass =
    'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';

export function BilingualField({
    label, value, onChange, multiline = false, rows = 4, markdown = false, hint,
}: {
    label: string; value: Bi; onChange: (value: Bi) => void;
    multiline?: boolean; rows?: number; markdown?: boolean; hint?: string;
}) {
    const [tab, setTab] = useState<'en' | 'bn'>('en');
    const set = (text: string) => onChange({ ...value, [tab]: text });
    const shown = tab === 'bn' && value.bn ? value.bn : value.en;
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <div role="tablist" aria-label={`${label} language`} className="flex gap-1">
                    {(['en', 'bn'] as const).map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            role="tab"
                            aria-selected={tab === lang}
                            data-state={lang === 'bn' && value.bn.trim() ? 'has-translation' : undefined}
                            onClick={() => setTab(lang)}
                            className={cn(
                                'rounded px-2 py-0.5 text-xs font-bold',
                                tab === lang ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent',
                            )}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            {multiline ? (
                <textarea className={inputClass} rows={rows} value={value[tab]} onChange={(e) => set(e.target.value)}
                    placeholder={tab === 'bn' ? 'Bangla (optional; English is shown where empty)' : undefined} />
            ) : (
                <input className={inputClass} type="text" value={value[tab]} onChange={(e) => set(e.target.value)}
                    placeholder={tab === 'bn' ? 'Bangla (optional)' : undefined} />
            )}
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
            {markdown && (
                <div className="rounded-md border border-dashed border-border p-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">Preview</p>
                    <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                        <Markdown source={shown} />
                    </div>
                </div>
            )}
        </div>
    );
}
