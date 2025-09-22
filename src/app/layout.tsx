import { Footer, Header } from '@/components/blocks'
import { ScrollTop } from '@/components/ui'
import { ttRuns } from '@/lib/fonts'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Krasty Soft',
    description: 'Software company you can trust',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`font-sans antialiased xs:text-sm md:text-lg flex flex-col ${ttRuns.variable}`}
            >
                <Header />
                <div id="app-scroll" className="overflow-y-auto flex-auto">
                    <main>{children}</main>
                    <Footer />
                </div>
                <ScrollTop />
            </body>
        </html>
    )
}
