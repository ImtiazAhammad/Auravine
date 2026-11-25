import { describe, expect, it } from 'vitest';
import robots from './robots';

describe('robots', () => {
    it('keeps crawlers out of the admin and its API', () => {
        const rule = (robots().rules as { disallow: string[] }[])[0];
        expect(rule.disallow).toEqual(expect.arrayContaining(['/admin', '/api/admin']));
    });
});
