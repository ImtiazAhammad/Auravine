'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const NAV_ITEMS = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/projects', label: 'Projects' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/faqs', label: 'FAQs' },
    { href: '/admin/tech', label: 'Tech' },
    { href: '/admin/settings', label: 'Settings' },
    { href: '/admin/media', label: 'Media' },
    { href: '/admin/messages', label: 'Messages' },
];

export function AdminShell({ email, children }: { email: string | null; children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    const current = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

    async function logout() {
        setBusy(true);
        await fetch('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
        router.push('/admin/login');
        router.refresh();
    }

    return (
        <div className="min-h-screen bg-background text-foreground md:flex">
            <aside className="border-b border-border md:min-h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
                <div className="flex items-center justify-between px-5 py-4 md:block">
                    <p className="text-sm font-black uppercase tracking-widest">Auravine admin</p>
                    <p className="mt-1 hidden truncate text-xs text-muted-foreground md:block">{email}</p>
                </div>
                <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={current(item.href) ? 'page' : undefined}
                            className={cn(
                                'whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                current(item.href)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden px-3 py-4 md:block">
                    <p className="mb-2 truncate px-3 text-xs text-muted-foreground md:hidden">{email}</p>
                    <button
                        type="button"
                        onClick={logout}
                        disabled={busy}
                        className="w-full rounded-md border border-border px-3 py-2 text-left text-sm hover:bg-accent disabled:opacity-50"
                    >
                        Log out
                    </button>
                </div>
            </aside>
            <main className="min-w-0 flex-1 p-5 md:p-8">
                <div className="mb-4 flex items-center justify-between gap-3 md:hidden">
                    <span className="truncate text-xs text-muted-foreground">{email}</span>
                    <button type="button" onClick={logout} disabled={busy} className="rounded-md border border-border px-3 py-1.5 text-sm">
                        Log out
                    </button>
                </div>
                {children}
            </main>
        </div>
    );
}
