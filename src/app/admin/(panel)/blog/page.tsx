import { ResourceList } from '@/components/admin/ResourceList';
import { adminGet } from '@/lib/admin/server';

export default async function BlogPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/blog-posts');
    return <ResourceList title="Blog posts" base="/admin/blog" noun="post" items={items} />;
}
