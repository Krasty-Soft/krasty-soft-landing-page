import { getAllSlugs, getJobBySlug } from '@/lib/jobs'
import { notFound } from 'next/navigation'
import JobPageClient from './client'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export default async function VacancyPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const job = await getJobBySlug(slug)

    if (!job) {
        return notFound()
    }

    return <JobPageClient job={job} />
}
