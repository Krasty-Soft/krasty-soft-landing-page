import { safeGetEntries } from '@/lib/cms'
import type { EntrySkeletonType } from 'contentful'

export const jobs = [
    {
        slug: 'senior-frontend-dev-552161726681',
        title: 'Senior Software Engineer',
        description: '3-4 years of experience',
        tags: 'Remote, full-time',
        link: '/careers',
    },
    {
        slug: 'fullstack-dev-887837762378',
        title: 'Full-Stack Developer',
        description: '1-4 years of experience',
        tags: 'Remote, full-time',
        link: '/careers',
    },
    {
        slug: 'frontend-dev-689831162555',
        title: 'Front-end Developer',
        description: '2-4 years of experience',
        tags: 'Remote, full-time',
        link: '/careers',
    },
]

type JobFields = {
    slug: string
    title: string
    description?: string
    tags?: string
    link?: string
}

interface JobSkeleton extends EntrySkeletonType {
    contentTypeId: string
    fields: JobFields
}

const CONTENT_TYPE_JOB = process.env.CONTENTFUL_JOB_TYPE_ID || 'job'

export async function getJobBySlug(slug: string) {
    const res = await safeGetEntries<JobSkeleton>({
        content_type: CONTENT_TYPE_JOB,
        'fields.slug': slug,
        limit: 1,
    })
    if (res && res.items.length > 0) {
        const f = res.items[0].fields
        return {
            slug: f.slug,
            title: f.title,
            description: f.description || '',
            tags: f.tags || '',
            link: f.link || '/careers',
        }
    }
    return jobs.find((job) => job.slug === slug) || null
}

export async function getAllSlugs() {
    const res = await safeGetEntries<JobSkeleton>({
        content_type: CONTENT_TYPE_JOB,
        select: ['fields.slug'],
        limit: 1000,
    })
    if (res) {
        return (res.items as Array<{ fields: JobFields }>)
            .map((i: { fields: JobFields }) => i.fields.slug)
            .filter((s: string | undefined): s is string => Boolean(s))
            .map((slug: string) => ({ slug }))
    }
    return jobs.map((job) => ({ slug: job.slug }))
}
