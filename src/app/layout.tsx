import { WebVitalsReporter } from "@/components/analytics/web-vitals-reporter";
import { Footer, Header } from "@/components/blocks";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollTop } from "@/components/ui";
import { sora } from "@/lib/fonts";
import {
  generateSEO,
  generateOrganizationSchema,
  generateWebSiteSchema,
  StructuredData,
} from "@/lib/seo";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
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
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Tag Manager — canonical snippet as a static inline script,
            placed as high as possible in <head> so Google Search Console can
            verify the container and tags fire from the very first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KH6T269G');`,
          }}
        />

        {/* Structured Data for SEO */}
        <StructuredData data={[organizationSchema, websiteSchema]} />

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
        {/* Google Tag Manager (noscript) — strictly the first element after
            <body>, before any other block, per GTM's install spec. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KH6T269G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <SmoothScroll />
        <Header />
        <div id="app-scroll" className="overflow-y-auto flex-auto">
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ScrollTop />

        {/* Web Vitals Tracking (console.log in dev) */}
        <WebVitalsReporter />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
