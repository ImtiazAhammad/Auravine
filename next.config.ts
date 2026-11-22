import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const supabaseHost = process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL.trim()).hostname : null;

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    experimental: {
        agentUpgrade: 'security',
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'assets.aceternity.com' },
            // Only this project's own Storage host (uploaded images), not every Supabase project.
            ...(supabaseHost ? [{ protocol: 'https' as const, hostname: supabaseHost }] : []),
        ],
        formats: ['image/avif', 'image/webp'],
    },
};

export default withNextIntl(nextConfig);
