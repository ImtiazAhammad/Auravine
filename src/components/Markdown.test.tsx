import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from './Markdown';

const html = (source: string) => renderToStaticMarkup(<Markdown source={source} />);

describe('Markdown', () => {
    it('renders headings, paragraphs and lists', () => {
        const out = html('## Heading\n\nFirst paragraph.\n\n- one\n- two');
        expect(out).toContain('<h2');
        expect(out).toContain('Heading</h2>');
        expect(out).toContain('<p');
        expect(out).toContain('<li>one</li>');
    });
    it('renders old plain-text posts the way the previous renderer did: one h2 per ## block, one p per paragraph', () => {
        const out = html('Intro line one\nstill the intro.\n\n## What a good agent does\n\nSecond paragraph.');
        expect((out.match(/<h2/g) ?? []).length).toBe(1);
        expect((out.match(/<p/g) ?? []).length).toBe(2);
        expect(out).toContain('What a good agent does</h2>');
    });
    it('does not render raw HTML (Review Focus 4)', () => {
        const out = html('Hello <script>alert(1)</script> <img src=x onerror=alert(1)> world\n\n<div onclick="x()">block</div>');
        expect(out).not.toContain('<script');
        expect(out).not.toContain('<img');
        expect(out).not.toContain('onclick');
        expect(out).not.toContain('onerror');
    });
    it('drops javascript: links but keeps safe ones, opening external links safely', () => {
        const bad = html('[x](javascript:alert(1))');
        expect(bad).not.toContain('javascript:');
        const good = html('[site](https://example.com/a)');
        expect(good).toContain('href="https://example.com/a"');
        expect(good).toContain('rel="noopener noreferrer"');
    });
    it('renders GitHub-style tables and strikethrough', () => {
        expect(html('| a | b |\n|---|---|\n| 1 | 2 |')).toContain('<table');
        expect(html('~~gone~~')).toContain('<del>');
    });
    it('renders an empty source as nothing', () => {
        expect(html('')).toBe('');
    });
});
