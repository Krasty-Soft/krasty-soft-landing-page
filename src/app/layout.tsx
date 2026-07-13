import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { Footer, Header } from "@/components/blocks";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollTop } from "@/components/ui";
import { sora } from "@/lib/fonts";
import {
  generateSEO,
  generateOrganizationSchema,
  StructuredData,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

// SEO Metadata
export const metadata: Metadata = generateSEO({
  title: "Krasty Soft - Software Development Company",
  description:
    "Progressive B2B software development company specializing in custom solutions, AI development, and enterprise applications. Trusted partner for tech innovation.",
  path: "/",
});

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        {/* Third-party widgets (Clutch, Calendly) — preconnect to shave the
            connection setup that Lighthouse flagged (~328ms on mobile). */}
        <link rel="preconnect" href="https://widget.clutch.co" />
        <link rel="dns-prefetch" href="https://widget.clutch.co" />
        <link rel="preconnect" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
      </head>
      <body
        className={`
                    font-sans antialiased
                    flex flex-col min-h-screen
                    ${sora.variable}
                `}
        style={{
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        {/* Google Tag Manager (noscript) — must be immediately after <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH6T269G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* Google Tag Manager — loads async (afterInteractive) so it never blocks LCP */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KH6T269G');`}
        </Script>

        <SmoothScroll />
        <Header />
        <div id="app-scroll" className="overflow-y-auto flex-auto">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ScrollTop />

        {/* Clutch widget — loaded once globally; ClutchBadges calls CLUTCHCO.init() on each mount */}
        <Script
          src="https://widget.clutch.co/static/js/widget.js"
          strategy="lazyOnload"
        />

        {/* Web Vitals Tracking (console.log in dev, GA in production) */}
        <WebVitalsReporter />

        {/* Google Analytics - Production only */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
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
  );
}
