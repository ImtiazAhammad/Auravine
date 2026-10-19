import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Book a free consultation with Auravine to discuss your AI or software project.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
