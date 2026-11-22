export function saveMessage(revalidated: boolean | undefined): string {
    return revalidated
        ? 'Saved. The site is updated.'
        : 'Saved. The site may take up to 5 minutes to update.';
}

export function slugify(text: string): string {
    return text
        .normalize('NFKD')
        .replace(/[^\x00-\x7F]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Tech item keys follow the seed's `<kind>-<slug>`; hard/soft skills use underscores in the kind. */
export function techKey(kind: string, name: string): string {
    return `${kind}-${slugify(name)}`;
}
