import type { Locale } from '@/i18n/settings';

export type { Locale };

/** Translatable text as stored in the database: English always, Bangla optional. */
export type Bilingual = { en: string; bn?: string };

/** One language for display. A missing or blank Bangla value falls back to English. */
export function pick(value: Bilingual | null | undefined, locale: Locale): string | undefined {
    if (!value) return undefined;
    const translated = locale === 'bn' ? value.bn : undefined;
    return translated && translated.trim() !== '' ? translated : value.en;
}

/** Structured details (`{en: {...}, bn: {...}}`): Bangla keys overlay the English ones. */
export function pickDetails<T extends object>(
    value: { en: T; bn?: Partial<T> } | null | undefined,
    locale: Locale,
): T {
    if (!value) return {} as T;
    return locale === 'bn' ? { ...value.en, ...value.bn } : value.en;
}
