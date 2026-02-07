import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import CaseStudiesClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Case Studies - Our Work & Success Stories',
    description:
        'Explore our portfolio of successful software development projects. Real-world case studies showcasing custom software, Retool applications, and enterprise solutions.',
    path: '/case-studies',
    tags: [
        'software development portfolio',
        'case studies',
        'project examples',
        'success stories',
        'client projects',
        'software solutions',
    ],
})

export default async function CaseStudiesPage() {
    const cases = await getAllCases()

    return <CaseStudiesClient cases={cases} />
}
