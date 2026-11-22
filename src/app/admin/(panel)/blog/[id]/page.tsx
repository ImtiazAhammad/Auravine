import { notFound } from 'next/navigation';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { adminGet } from '@/lib/admin/server';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (id === 'new') return <BlogEditor item={null} />;
    if (!UUID.test(id)) notFound();
    const data = await adminGet<{ item: Record<string, unknown> }>(`/blog-posts/${id}`).catch(() => null);
    if (!data) notFound();
    return <BlogEditor key={id} item={data.item} />;
}
