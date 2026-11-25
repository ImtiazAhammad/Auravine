import { ResourceList } from '@/components/admin/ResourceList';
import { adminGet } from '@/lib/admin/server';

export default async function ProjectsPage() {
    const { items } = await adminGet<{ items: Record<string, unknown>[] }>('/projects', '/admin/projects');
    return <ResourceList title="Projects" base="/admin/projects" noun="project" items={items} />;
}
