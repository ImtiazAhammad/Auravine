import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { PortfolioData } from '@/types';
import { ContentProvider, useContent } from './ContentProvider';

const Name = () => <span>{useContent().personal.name}</span>;

describe('ContentProvider', () => {
    it('gives children the content it was given', () => {
        const value = { personal: { name: 'ACME' } } as PortfolioData;
        const html = renderToString(<ContentProvider value={value}><Name /></ContentProvider>);
        expect(html).toContain('ACME');
    });
    it('throws outside a provider', () => {
        expect(() => renderToString(<Name />)).toThrow('useContent must be used inside ContentProvider');
    });
});
