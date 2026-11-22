import { describe, expect, it } from 'vitest';
import { saveMessage, slugify, techKey } from './messages';

describe('saveMessage', () => {
    it('says the site is updated when revalidate worked', () => {
        expect(saveMessage(true)).toBe('Saved. The site is updated.');
    });
    it('is honest when the site could not be refreshed (Review Focus 5)', () => {
        expect(saveMessage(false)).toBe('Saved. The site may take up to 5 minutes to update.');
        expect(saveMessage(undefined)).toBe('Saved. The site may take up to 5 minutes to update.');
    });
});

describe('slugify and keys', () => {
    it('makes url-safe slugs', () => {
        expect(slugify('Why Every Business Needs an AI Voice Agent?')).toBe('why-every-business-needs-an-ai-voice-agent');
        expect(slugify('  C++ & .NET  ')).toBe('c-net');
        expect(slugify('শুধু বাংলা')).toBe('');
    });
    it('builds tech keys the way the seed did', () => {
        expect(techKey('tech', 'Next.js')).toBe('tech-next-js');
        expect(techKey('hard_skill', 'Computer Vision')).toBe('hard_skill-computer-vision');
    });
});
