import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = Record<string, any>;

/** A list screen for projects and blog posts (server-rendered). */
export function ResourceList({ title, base, items, noun }: { title: string; base: string; items: Item[]; noun: string }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black tracking-tight">{title}</h1>
                <Link href={`${base}/new`} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">New {noun}</Link>
            </div>
            <ul className="divide-y divide-border rounded-xl border border-border">
                {items.map((item) => (
                    <li key={item.id}>
                        <Link href={`${base}/${item.id}`} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-accent">
                            <span className="min-w-0">
                                <span className="block truncate font-medium">{item.title?.en}</span>
                                <span className="block truncate text-xs text-muted-foreground">/{item.slug}</span>
                            </span>
                            <span className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span>order {item.sort_order}</span>
                                <span className={item.status === 'published' ? 'rounded bg-green-500/15 px-2 py-0.5 text-green-600' : 'rounded bg-amber-500/15 px-2 py-0.5 text-amber-600'}>
                                    {item.status}
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            {items.length === 0 && <p className="text-sm text-muted-foreground">Nothing here yet.</p>}
        </div>
    );
}
