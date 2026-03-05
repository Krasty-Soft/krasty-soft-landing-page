import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import FintechClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'FinTech Software Development Services',
    description:
        'Expert FinTech software development company delivering secure, scalable financial technology solutions. Custom banking apps, payment systems, and trading platforms.',
    path: '/fintech',
})

export default async function FintechPage() {
    const cases = await getAllCases()
    return <FintechClient cases={cases} />
}
