// Routes that exist in the codebase but are not published for Auravine.
// Their pages return 404 and every navigation surface hides them.
// Remove a route from this list to publish it again.
export const UNPUBLISHED_ROUTES = ['/experience', '/achievements', '/gallery'] as const;

export function isPublished(href: string): boolean {
    const path = href.split(/[?#]/)[0];
    return !UNPUBLISHED_ROUTES.some((route) => path === route || path.startsWith(`${route}/`));
}
