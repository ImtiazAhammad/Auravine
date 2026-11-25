'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { createAdminApi } from '@/lib/admin/api';

/** Admin API client for components; a 401 sends the user to the login page. */
export function useAdminApi() {
    const router = useRouter();
    return useMemo(() => createAdminApi(fetch, () => router.push('/admin/login')), [router]);
}
