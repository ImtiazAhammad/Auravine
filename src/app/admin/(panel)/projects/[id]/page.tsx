import { notFound } from 'next/navigation';
import { ProjectEditor } from '@/components/admin/ProjectEditor';
import { adminGetOrNull } from '@/lib/admin/server';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (id === 'new') return <ProjectEditor item={null} />;
    if (!UUID.test(id)) notFound();
    const data = await adminGetOrNull<{ item: Record<string, unknown> }>(`/projects/${id}`, `/admin/projects/${id}`);
    if (!data) notFound();
    return <ProjectEditor key={id} item={data.item} />;
}
