import { Footer, Header } from '@/components/blocks'
import { ScrollTop } from '@/components/ui'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ttRuns } from '@/lib/fonts'
import { generateSEO, generateOrganizationSchema, StructuredData } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// SEO Metadata
export const metadata: Metadata = generateSEO({
    title: 'Krasty Soft - Software Development Company',
    description:
        'Progressive B2B software development company specializing in custom solutions, Retool development, and enterprise applications. Trusted partner for tech innovation.',
    path: '/',
    tags: [
        'software development',
        'custom software',
        'B2B software',
        'enterprise solutions',
        'Retool development',
        'tech consulting',
    ],
})

// Viewport configuration for responsive design
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#0a0a0a',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const organizationSchema = generateOrganizationSchema()

    return (
        <html lang="en" className="dark">
            <head>
                {/* Structured Data for SEO */}
                <StructuredData data={organizationSchema} />
                
                {/* DNS Prefetch & Preconnect for performance */}
                <link rel="dns-prefetch" href="https://images.ctfassets.net" />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://images.ctfassets.net"
                    crossOrigin="anonymous"
                />
            </head>
            <body
                className={`
                    font-sans antialiased 
                    flex flex-col min-h-screen
                    ${ttRuns.variable}
                `}
                style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                }}
            >
                <SmoothScroll />
                <Header />
                <div id="app-scroll" className="overflow-y-auto flex-auto">
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </div>
                <ScrollTop />
                
                {/* Vercel Analytics for Core Web Vitals */}
                <Analytics />
            </body>
        </html>
    )
}
