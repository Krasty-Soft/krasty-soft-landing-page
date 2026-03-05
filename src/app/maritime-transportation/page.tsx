import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import MaritimeTransportationClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Maritime & Transportation Software Development',
    description:
        'Specialized maritime and transportation software development. Fleet management, logistics optimization, and shipping industry solutions.',
    path: '/maritime-transportation',
})

export default async function MaritimeTransportationPage() {
    const cases = await getAllCases()
    return <MaritimeTransportationClient cases={cases} />
}
