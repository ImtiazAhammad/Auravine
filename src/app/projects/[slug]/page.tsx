
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { getProject } from '@/lib/content';
import type { Locale } from '@/lib/content/localize';
import { ProjectPageContent } from '@/components/projects/ProjectPageContent';

import { getProjectImages } from '@/app/actions/getProjectImages'; // Import server action

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProject(slug, (await getLocale()) as Locale);

    if (!project) {
        notFound();
    }

    // Fetch dynamic images from public/project folder
    const galleryImages = await getProjectImages(slug, project.title);

    // If dynamic images found, override the project data
    const updatedProject = {
        ...project,
        image: galleryImages.length > 0 ? galleryImages[0] : project.image, // First image as Hero
        galleryImages: galleryImages.length > 0 ? galleryImages : project.galleryImages // All images for gallery
    };

    return <ProjectPageContent project={updatedProject} />;
}
