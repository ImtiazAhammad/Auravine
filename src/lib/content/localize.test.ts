import { describe, expect, it } from 'vitest';
import { pick, pickDetails } from './localize';

describe('pick', () => {
    it('returns the Bangla text for bn when present', () => {
        expect(pick({ en: 'Hi', bn: 'হ্যালো' }, 'bn')).toBe('হ্যালো');
    });
    it('falls back to English when Bangla is missing', () => {
        expect(pick({ en: 'Hi' }, 'bn')).toBe('Hi');
    });
    it('falls back to English when Bangla is blank', () => {
        expect(pick({ en: 'Hi', bn: '' }, 'bn')).toBe('Hi');
        expect(pick({ en: 'Hi', bn: '   ' }, 'bn')).toBe('Hi');
    });
    it('returns undefined for null or undefined', () => {
        expect(pick(null, 'en')).toBeUndefined();
        expect(pick(undefined, 'bn')).toBeUndefined();
    });
});

describe('pickDetails', () => {
    it('overlays Bangla keys on English per key', () => {
        const value = { en: { features: [1], metrics: [2] }, bn: { features: [9] } };
        expect(pickDetails(value, 'bn')).toEqual({ features: [9], metrics: [2] });
    });
    it('returns English for en and an empty object for null', () => {
        expect(pickDetails({ en: { a: 1 }, bn: { a: 2 } }, 'en')).toEqual({ a: 1 });
        expect(pickDetails(null, 'en')).toEqual({});
    });
});
