'use client';

import { createContext, useContext } from 'react';
import type { PortfolioData } from '@/types';

const ContentContext = createContext<PortfolioData | null>(null);

/** Site content for the current visitor's language, loaded once per request in the root layout. */
export function ContentProvider({ value, children }: { value: PortfolioData; children: React.ReactNode }) {
    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): PortfolioData {
    const value = useContext(ContentContext);
    if (!value) throw new Error('useContent must be used inside ContentProvider');
    return value;
}
