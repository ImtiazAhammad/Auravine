import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isPublished } from '@/config/pages';

export const metadata: Metadata = {
    title: 'Our Process',
    description: 'How Auravine takes a project from discovery and design to launch and ongoing support.',
    robots: { index: false, follow: false },
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!isPublished('/experience')) notFound();
    return children;
}
