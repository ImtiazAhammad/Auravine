import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Solutions',
    description: 'Explore the AI solutions Auravine builds for businesses: voice agents, chatbots, computer vision, and analytics.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
