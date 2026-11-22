export function saveMessage(revalidated: boolean | undefined): string {
    return revalidated
        ? 'Saved. The site is updated.'
        : 'Saved. The site may take up to 5 minutes to update.';
}

/** URL-safe slug, at most `max` characters (the API's key limit) and never ending in a dash. */
export function slugify(text: string, max = 100): string {
    return text
        .normalize('NFKD')
        .replace(/[^\x00-\x7F]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, max)
        .replace(/-+$/g, '');
}

/** Tech item keys follow the seed's `<kind>-<slug>`; hard/soft skills use underscores in the kind. */
export function techKey(kind: string, name: string): string {
    return `${kind}-${slugify(name, 100 - kind.length - 1)}`;
}
