import { SettingsEditor } from '@/components/admin/SettingsEditor';
import { adminGet } from '@/lib/admin/server';

export default async function SettingsPage() {
    const { items } = await adminGet<{ items: Record<string, unknown> }>('/settings');
    return <SettingsEditor settings={items} />;
}
