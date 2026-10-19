import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Process',
    description: 'How Auravine takes a project from discovery and design to launch and ongoing support.',
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
