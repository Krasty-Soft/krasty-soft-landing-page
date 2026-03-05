import { generateSEO } from '@/lib/seo'
import { Metadata } from 'next'
import AboutClient from './client'

export const metadata: Metadata = generateSEO({
    title: 'About Us - Our Story & Team',
    description:
        'Learn about Krasty Soft - a software development company based in Ukraine. Meet our expert team, discover our values, and see why clients trust us for their software projects.',
    path: '/about',
})

export default function AboutPage() {
    return <AboutClient />
}
