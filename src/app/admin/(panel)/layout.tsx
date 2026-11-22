import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdmin } from '@/lib/admin/session';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };

function Notice({ title, text }: { title: string; text: string }) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
            <div className="max-w-sm rounded-xl border border-border p-6">
                <h1 className="text-lg font-black">{title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
                <a href="/admin/login" className="mt-4 inline-block text-sm underline">Back to sign in</a>
            </div>
        </main>
    );
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
    const state = await getAdmin();
    if (state.status === 'anonymous') redirect('/admin/login');
    if (state.status === 'expired') redirect('/api/admin/refresh?next=/admin');
    if (state.status === 'forbidden') return <Notice title="Not allowed" text="This account is not an admin." />;
    if (state.status === 'unavailable') {
        return <Notice title="Admin unavailable" text="The admin service did not answer. Try again in a minute." />;
    }
    return <AdminShell email={state.admin.email}>{children}</AdminShell>;
}
