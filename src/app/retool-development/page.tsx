import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import RetoolDevelopmentClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Retool Development Services - Build Internal Tools Fast',
    description:
        'Expert Retool development services. Build custom internal tools 10x faster with professional Retool developers. Connect to any data source, create custom UIs, and automate workflows.',
    path: '/retool-development',
    tags: [
        'retool development',
        'retool developer',
        'internal tools',
        'admin panels',
        'retool apps',
        'low code development',
        'rapid development',
    ],
})

export default async function RetoolDevelopmentPage() {
    const cases = await getAllCases()
    return <RetoolDevelopmentClient cases={cases} />
}
