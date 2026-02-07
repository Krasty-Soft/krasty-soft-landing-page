/**
 * SEO Utilities
 * Helpers for managing metadata, structured data, and SEO optimization
 */

import { Metadata } from 'next'

// Base URL - update this for production
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://krastysoft.com'
const SITE_NAME = 'Krasty Soft'
const DEFAULT_LOCALE = 'en'

interface SEOProps {
    title: string
    description: string
    path?: string
    image?: string
    noIndex?: boolean
    type?: 'website' | 'article' | 'profile'
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    tags?: string[]
}

/**
 * Generate metadata for pages
 */
export function generateSEO({
    title,
    description,
    path = '',
    image,
    noIndex = false,
    type = 'website',
    publishedTime,
    modifiedTime,
    authors,
    tags,
}: SEOProps): Metadata {
    const url = `${BASE_URL}${path}`
    const ogImage = image || `${BASE_URL}/og-image.png`

    const metadata: Metadata = {
        title: `${title} | ${SITE_NAME}`,
        description,
        keywords: tags,
        authors: authors?.map((name) => ({ name })),
        creator: SITE_NAME,
        publisher: SITE_NAME,
        robots: noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: DEFAULT_LOCALE,
            type,
            publishedTime,
            modifiedTime,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
            creator: '@krastysoft', // Update with actual Twitter handle
        },
    }

    return metadata
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [
            'https://www.linkedin.com/company/krastysoft',
            // Add other social profiles
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contact@krastysoft.com', // Update with actual email
        },
    }
}

/**
 * Generate JSON-LD structured data for Article/BlogPosting
 */
export function generateArticleSchema({
    title,
    description,
    slug,
    image,
    publishedTime,
    modifiedTime,
    authors,
}: {
    title: string
    description: string
    slug: string
    image?: string
    publishedTime: string
    modifiedTime?: string
    authors?: string[]
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: image || `${BASE_URL}/og-image.png`,
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        author: authors?.map((name) => ({
            '@type': 'Person',
            name,
        })),
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}${slug}`,
        },
    }
}

/**
 * Generate JSON-LD structured data for JobPosting
 */
export function generateJobSchema({
    title,
    description,
    location,
    employmentType,
    datePosted,
    validThrough,
}: {
    title: string
    description: string
    location: string
    employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERN'
    datePosted: string
    validThrough?: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title,
        description,
        datePosted,
        validThrough,
        employmentType,
        hiringOrganization: {
            '@type': 'Organization',
            name: SITE_NAME,
            sameAs: BASE_URL,
            logo: `${BASE_URL}/logo.png`,
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: location,
            },
        },
    }
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(
    items: Array<{ name: string; path: string }>,
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${BASE_URL}${item.path}`,
        })),
    }
}

/**
 * Component to inject JSON-LD structured data
 */
export function StructuredData({ data }: { data: object | object[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(Array.isArray(data) ? data : [data]),
            }}
        />
    )
}

/**
 * Create slug from string (URL-friendly)
 */
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()
}

/**
 * Truncate text for meta descriptions
 */
export function truncateDescription(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength - 3).trim() + '...'
}

/**
 * Extract reading time from content
 */
export function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
}
