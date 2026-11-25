import Link from 'next/link';
import { unstable_rethrow } from 'next/navigation';
import { adminGet } from '@/lib/admin/server';

type Row = { status?: string; handled?: boolean };

async function items(path: string): Promise<Row[]> {
    try {
        return (await adminGet<{ items: Row[] }>(path, '/admin')).items;
    } catch (error) {
        unstable_rethrow(error); // let a session redirect through
        return [];
    }
}

export default async function Dashboard() {
    const [projects, posts, messages] = await Promise.all([items('/projects'), items('/blog-posts'), items('/messages')]);
    const drafts = (rows: Row[]) => rows.filter((r) => r.status === 'draft').length;
    const unhandled = messages.filter((m) => !m.handled).length;
    const cards = [
        { href: '/admin/projects', label: 'Projects', value: projects.length, note: `${drafts(projects)} draft` },
        { href: '/admin/blog', label: 'Blog posts', value: posts.length, note: `${drafts(posts)} draft` },
        { href: '/admin/messages', label: 'New messages', value: unhandled, note: `${messages.length} total` },
    ];
    return (
        <div>
            <h1 className="text-2xl font-black tracking-tight">Dashboard</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {cards.map((card) => (
                    <Link key={card.href} href={card.href} className="rounded-xl border border-border p-5 hover:bg-accent">
                        <p className="text-sm text-muted-foreground">{card.label}</p>
                        <p className="mt-1 text-3xl font-black">{card.value}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{card.note}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
