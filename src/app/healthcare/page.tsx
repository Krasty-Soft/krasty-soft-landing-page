import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import HealthcareClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Healthcare Software Development Services',
    description:
        'HIPAA-compliant healthcare software development. Custom EHR/EMR systems, telemedicine platforms, and medical practice management solutions.',
    path: '/healthcare',
    tags: [
        'healthcare software',
        'medical software development',
        'EHR systems',
        'EMR development',
        'telemedicine',
        'HIPAA compliant software',
        'healthcare IT solutions',
    ],
})

export default async function HealthcarePage() {
    const cases = await getAllCases()
    return <HealthcareClient cases={cases} />
}
