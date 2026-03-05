import { generateSEO } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEO({
    title: 'Blog - Insights & Engineering Stories',
    description:
        'Deep dives into software development, design patterns, case studies, and tech innovation. Expert insights on React, Python, Node.js, and Retool development.',
    path: '/blog',
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
