import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';
import { getAdmin } from '@/lib/admin/session';

export const metadata: Metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };

export default async function LoginPage() {
    if ((await getAdmin()).status === 'ok') redirect('/admin');
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
            <LoginForm />
        </main>
    );
}
