import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BilingualField } from './BilingualField';

describe('BilingualField', () => {
    const render = (props: Partial<React.ComponentProps<typeof BilingualField>> = {}) =>
        renderToStaticMarkup(
            <BilingualField label="Title" value={{ en: 'Hello', bn: '' }} onChange={() => undefined} {...props} />,
        );

    it('shows the label, EN and BN tabs and the English text first', () => {
        const html = render();
        expect(html).toContain('Title');
        expect(html).toContain('>EN<');
        expect(html).toContain('>BN<');
        expect(html).toContain('value="Hello"');
    });
    it('marks the BN tab when Bangla text exists', () => {
        expect(render({ value: { en: 'Hello', bn: 'হ্যালো' } })).toContain('has-translation');
        expect(render()).not.toContain('has-translation');
    });
    it('uses a textarea for multiline fields', () => {
        expect(render({ multiline: true })).toContain('<textarea');
        expect(render()).not.toContain('<textarea');
    });
    it('shows a rendered Markdown preview for markdown fields', () => {
        const html = render({ multiline: true, markdown: true, value: { en: '## Big\n\ntext', bn: '' } });
        expect(html).toContain('Preview');
        expect(html).toContain('Big</h2>');
    });
});
