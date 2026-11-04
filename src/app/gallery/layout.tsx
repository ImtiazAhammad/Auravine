import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isPublished } from '@/config/pages';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Auravine studio gallery.',
    robots: { index: false, follow: false },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!isPublished('/gallery')) notFound();
    return children;
}
