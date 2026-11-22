import { TechManager } from '@/components/admin/TechManager';
import { adminGet } from '@/lib/admin/server';

export default async function TechPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/tech-items');
    return <TechManager items={items} />;
}
