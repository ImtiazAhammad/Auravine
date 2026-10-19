import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Capabilities',
    description: 'The AI, data, and software services Auravine delivers, and the technology stack behind them.',
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
