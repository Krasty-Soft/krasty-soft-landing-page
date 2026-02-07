import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import MaritimeTransportationClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Maritime & Transportation Software Development',
    description:
        'Specialized maritime and transportation software development. Fleet management, logistics optimization, and shipping industry solutions.',
    path: '/maritime-transportation',
    tags: [
        'maritime software',
        'transportation software',
        'fleet management systems',
        'logistics software',
        'shipping solutions',
        'supply chain management',
        'maritime technology',
    ],
})

export default async function MaritimeTransportationPage() {
    const cases = await getAllCases()
    return <MaritimeTransportationClient cases={cases} />
}
