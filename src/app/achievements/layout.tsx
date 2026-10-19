import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Commitments',
    description: 'How Auravine builds AI responsibly, securely, and in the languages your customers speak.',
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
