import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import InsuranceClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Insurance Software Development Services',
    description:
        'Custom insurance software development for policy management, claims processing, and underwriting. Scalable InsurTech solutions for modern insurance companies.',
    path: '/insurance',
    tags: [
        'insurance software',
        'insurtech development',
        'policy management systems',
        'claims processing',
        'underwriting software',
        'insurance technology',
        'insurance applications',
    ],
})

export default async function InsurancePage() {
    const cases = await getAllCases()
    return <InsuranceClient cases={cases} />
}
