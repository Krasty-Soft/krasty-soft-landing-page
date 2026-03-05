import { getAllCases } from '@/lib/cases'
import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import CustomSoftwareClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'Custom Software Development Services',
    description:
        'Expert custom software development company building tailored solutions for your business. From web applications to enterprise systems - scalable, secure, and maintainable software.',
    path: '/custom-software-development',
})

export default async function CustomSoftwarePage() {
    const cases = await getAllCases()
    return <CustomSoftwareClient cases={cases} />
}
