'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        setBusy(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                router.push('/admin');
                router.refresh();
                return;
            }
            const data = await response.json().catch(() => ({}));
            setError(data?.error ?? 'Could not sign in');
        } catch {
            setError('Could not reach the server');
        }
        setBusy(false);
    }

    const field = 'mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';
    return (
        <form onSubmit={submit} className="mx-auto w-full max-w-sm space-y-4 rounded-xl border border-border p-6">
            <h1 className="text-xl font-black tracking-tight">Admin sign in</h1>
            <label className="block text-sm">
                Email
                <input className={field} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label className="block text-sm">
                Password
                <input className={field} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            <button type="submit" disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50">
                {busy ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    );
}
