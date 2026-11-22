import { FaqManager } from '@/components/admin/FaqManager';
import { adminGet } from '@/lib/admin/server';

export default async function FaqsPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/faqs', '/admin/faqs');
    return <FaqManager items={items} />;
}
