import { describe, expect, it } from 'vitest';
import config from '../../next.config';

async function headersFor(source: string) {
    const rules = await config.headers!();
    const out: Record<string, string> = {};
    for (const rule of rules) if (rule.source === source) for (const h of rule.headers) out[h.key] = h.value;
    return out;
}

describe('security headers', () => {
    it('every page refuses framing and sniffing, and sends a strict referrer policy', async () => {
        const h = await headersFor('/:path*');
        expect(h['X-Content-Type-Options']).toBe('nosniff');
        expect(h['X-Frame-Options']).toBe('DENY');
        expect(h['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
        expect(h['Permissions-Policy']).toBe('camera=(), microphone=(), geolocation=()');
    });
    it('admin pages and the admin API are never cached', async () => {
        for (const source of ['/admin/:path*', '/api/admin/:path*']) {
            expect((await headersFor(source))['Cache-Control']).toBe('no-store');
        }
    });
    it('serves images directly: /_next/image is not available behind Vercel Services', () => {
        expect(config.images?.unoptimized).toBe(true);
    });
});
