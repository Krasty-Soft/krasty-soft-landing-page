import { getAllSlugs, getJobBySlug } from '@/lib/jobs'
import { generateSEO, truncateDescription, generateJobSchema, StructuredData } from '@/lib/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JobPageClient from './client'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const job = await getJobBySlug(slug)

    if (!job) {
        return {
            title: 'Career Opportunity',
            description: 'Join our team at Krasty Soft',
        }
    }

    const descriptionText = typeof job.description === 'string' 
        ? job.description.replace(/<[^>]*>/g, '') 
        : '';
    
    return generateSEO({
        title: `${job.title} - Join Krasty Soft`,
        description: truncateDescription(
            descriptionText ||
                `${job.title} position at Krasty Soft. ${job.location || 'Remote'} - ${job.type || 'Full-time'}`
        ),
        path: `/careers/${slug}`,
        type: 'article',
        tags: [
            'job opening',
            job.title?.toLowerCase(),
            job.type?.toLowerCase(),
            job.location?.toLowerCase(),
            'career opportunity',
            'software development job',
        ].filter(Boolean) as string[],
    })
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

    // Generate Job Posting structured data
    const cleanDescription = typeof job.description === 'string' 
        ? job.description.replace(/<[^>]*>/g, '') 
        : '';
    
    const jobSchema = generateJobSchema({
        title: job.title || 'Position',
        description: cleanDescription || '',
        location: job.location || 'Remote',
        employmentType: (job.type?.toUpperCase().replace('-', '_') as any) || 'FULL_TIME',
        datePosted: job.datePosted || new Date().toISOString(),
        validThrough: job.validThrough,
    })

    return (
        <>
            <StructuredData data={jobSchema} />
            <JobPageClient job={job} />
        </>
    )
}
