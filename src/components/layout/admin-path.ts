/** True for /admin and anything under it (not /administrator). */
export function isAdminPath(pathname: string | null | undefined): boolean {
    return pathname === '/admin' || Boolean(pathname?.startsWith('/admin/'));
}
