import { generateSEO } from '@/lib/seo'
import { getAllJobs } from '@/lib/jobs'
import { Metadata } from 'next'
import CareersClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Careers - Join Our Team',
    description:
        'Join Krasty Soft - a remote-first software development company. Explore exciting career opportunities, work on cutting-edge projects, and grow with a talented team.',
    path: '/careers',
    tags: [
        'software developer jobs',
        'remote software jobs',
        'tech careers',
        'developer opportunities',
        'software engineering jobs',
        'work remotely',
    ],
})

export default async function CareersPage() {
    const jobs = await getAllJobs()
    const isEmpty = jobs.length === 0

    return <CareersClient jobs={jobs} isEmpty={isEmpty} />
}
