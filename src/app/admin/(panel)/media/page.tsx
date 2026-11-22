import { MediaLibrary } from '@/components/admin/MediaLibrary';
import { adminGet } from '@/lib/admin/server';

export default async function MediaPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/media');
    return <MediaLibrary items={items} />;
}
