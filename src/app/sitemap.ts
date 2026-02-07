import { MetadataRoute } from 'next'
import { getAllSlugs as getAllCaseSlugs } from '@/lib/cases'
import { getAllSlugs as getAllJobSlugs } from '@/lib/jobs'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://krastysoft.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/careers`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/case-studies`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Industry pages
        {
            url: `${BASE_URL}/fintech`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/healthcare`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/insurance`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/maritime-transportation`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Service pages
        {
            url: `${BASE_URL}/custom-software-development`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/retool-consulting`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/retool-development`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // Dynamic case study pages
    let caseStudyPages: MetadataRoute.Sitemap = []
    try {
        const caseSlugs = await getAllCaseSlugs()
        caseStudyPages = caseSlugs.map((item: { slug: string }) => ({
            url: `${BASE_URL}/case-studies/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('Error fetching case study slugs for sitemap:', error)
    }

    // Dynamic career pages
    let careerPages: MetadataRoute.Sitemap = []
    try {
        const jobSlugs = await getAllJobSlugs()
        careerPages = jobSlugs.map((item: { slug: string }) => ({
            url: `${BASE_URL}/careers/${item.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error('Error fetching job slugs for sitemap:', error)
    }

    return [...staticPages, ...caseStudyPages, ...careerPages]
}
