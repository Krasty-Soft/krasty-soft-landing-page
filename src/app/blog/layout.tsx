import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog - Insights & Engineering Stories | Krasty Soft',
    description: 'Deep dives into software development, design patterns, case studies, and tech innovation. Expert insights on React, Python, Node.js, and Retool development.',
    openGraph: {
        title: 'Blog - Insights & Engineering Stories | Krasty Soft',
        description: 'Expert insights on software development, design patterns, and tech innovation.',
    },
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
