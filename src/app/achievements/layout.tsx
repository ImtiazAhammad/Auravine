import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isPublished } from '@/config/pages';

export const metadata: Metadata = {
    title: 'Commitments',
    description: 'How Auravine builds AI responsibly, securely, and in the languages your customers speak.',
    robots: { index: false, follow: false },
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!isPublished('/achievements')) notFound();
    return children;
}
