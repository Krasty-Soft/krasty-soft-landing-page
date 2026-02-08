import { WebVitalsReporter } from '@/components/analytics/web-vitals-reporter'
import { Footer, Header } from '@/components/blocks'
import { SmoothScroll } from '@/components/smooth-scroll'
import { ScrollTop } from '@/components/ui'
import { ttRuns } from '@/lib/fonts'
import { generateSEO, generateOrganizationSchema, StructuredData } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID

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

                {/* Web Vitals Tracking (console.log in dev, GA in production) */}
                <WebVitalsReporter />

                {/* Google Analytics - Production only */}
                {GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script
                            id="google-analytics"
                            strategy="afterInteractive"
                        >
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_ID}');
                            `}
                        </Script>
                    </>
                )}

                {/* Vercel Analytics - Dev/Preview only (won't work in production) */}
                <Analytics />
            </body>
        </html>
    )
}
