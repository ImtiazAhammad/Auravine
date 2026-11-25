'use client';

import { usePathname } from 'next/navigation';
import { SmoothScrollProvider } from '@/providers';
import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';
import { ChatBot } from '@/components/layout/ChatBot';
import { isAdminPath } from './admin-path';

/** The public site's chrome (navbar, footer, preloader, chat widget, smooth scroll). The admin
 *  area is a plain tool, so it gets none of it. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
    if (isAdminPath(usePathname())) return <>{children}</>;
    return (
        <SmoothScrollProvider>
            <ThemeAwareClickSpark>
                <ArcPreloaderWrapper>
                    <ConditionalNavigation>{children}</ConditionalNavigation>
                </ArcPreloaderWrapper>
                <ChatBot headless />
            </ThemeAwareClickSpark>
        </SmoothScrollProvider>
    );
}
