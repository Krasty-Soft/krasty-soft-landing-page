import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import RetoolConsultingClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Retool Consulting Services - Expert Guidance',
    description:
        'Professional Retool consulting services. Strategy development, architecture review, team training, and implementation support from certified Retool experts.',
    path: '/retool-consulting',
    tags: [
        'retool consulting',
        'retool strategy',
        'retool architecture',
        'retool training',
        'retool expert',
        'retool implementation',
        'retool services',
    ],
})

export default async function RetoolConsultingPage() {
    const cases = await getAllCases()
    return <RetoolConsultingClient cases={cases} />
}
