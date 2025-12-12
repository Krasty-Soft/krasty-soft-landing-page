import { safeGetEntries } from '@/lib/cms'
import type { EntrySkeletonType } from 'contentful'

export type CaseTemplate = 'default' | 'srm'

export interface Media {
    url: string
    title?: string
    description?: string
}

export interface Case {
    slug: string
    title: string
    tags: string[]
    cardDescription: string
    preview: string
    media: Media[]
    template?: CaseTemplate
    seoTitle?: string
    seoDescription?: string
}

export interface ContentfulCaseFields {
    slug: string
    title: string
    tags: string // Contentful stores it as comma-separated string
    cardDescription: string
    preview: { fields: { file: { url: string } } } // Contentful asset
    media: Array<{ fields: { file: { url: string } } }> // Contentful assets array
    template?: string
    seoTitle?: string
    seoDescription?: string
}

interface CaseSkeleton extends EntrySkeletonType {
    contentTypeId: string
    fields: ContentfulCaseFields
}

const CONTENT_TYPE_CASE = process.env.CONTENTFUL_CASE_TYPE_ID || 'case'

export const cases: Case[] = [
    {
        slug: 'crm-system-with-unified-communications',
        title: 'CRM System with Unified Communications',
        tags: [''],
        cardDescription: 'CRM System with Unified Communications',
        preview: '',
        media: [],
        template: 'srm',
    },
]

export async function getAllCases() {
    const res = await safeGetEntries<CaseSkeleton>({
        content_type: CONTENT_TYPE_CASE,
        limit: 1000,
    })

    if (res && res.items.length > 0) {
return res.items.map((item: CaseSkeleton) => {
            const fields = item.fields
            const previewUrl = (fields as any).preview?.fields?.file?.url

            // Tags from Contentful are comma-separated strings
            let tags: string[] = []
            try {
                if (typeof fields.tags === 'string' && fields.tags.trim()) {
                    tags = fields.tags
                        .split(',')
                        .map((t: string) => t.trim())
                        .filter(Boolean)
                }
            } catch {
                tags = []
            }

            // Parse media assets from Contentful
            let media: Media[] = []
            try {
                const mediaAssets = (fields as any).media
                if (Array.isArray(mediaAssets)) {
                    media = mediaAssets
                        .filter((asset: any) => asset?.fields?.file?.url)
                        .map((asset: any) => {
                            const url = asset.fields.file.url
                            return {
                                url: url.startsWith('http')
                                    ? url
                                    : `https:${url}`,
                                title: asset.fields.title || '',
                                description: asset.fields.description || '',
                            }
                        })
                }
            } catch {
                media = []
            }

            return {
                slug: fields.slug,
                title: fields.title,
                tags,
                cardDescription: fields.cardDescription || '',
                preview: previewUrl
                    ? previewUrl.startsWith('http')
                        ? previewUrl
                        : `https:${previewUrl}`
                    : '',
                media,
                template: fields.template || 'default',
                seoTitle: fields.seoTitle || '',
                seoDescription: fields.seoDescription || '',
            } as Case
        })
    }
    return cases // Fallback to hardcoded data
}

export async function getCaseBySlug(slug: string) {
    const res = await safeGetEntries<CaseSkeleton>({
        content_type: CONTENT_TYPE_CASE,
        'fields.slug': slug,
        limit: 1,
        include: 1,
    })

    if (res && res.items.length > 0) {
        const item = res.items[0]
        const fields = item.fields

        // Tags from Contentful are comma-separated strings
        let tags: string[] = []
        try {
            if (typeof fields.tags === 'string' && fields.tags.trim()) {
                tags = fields.tags
                    .split(',')
                    .map((t: string) => t.trim())
                    .filter(Boolean)
            }
        } catch {
            tags = []
        }

        // Parse media assets from Contentful
        let media: Media[] = []
        try {
            const mediaAssets = (fields as any).media
            if (Array.isArray(mediaAssets)) {
                media = mediaAssets
                    .filter((asset: any) => asset?.fields?.file?.url)
                    .map((asset: any) => {
                        const url = asset.fields.file.url
                        return {
                            url: url.startsWith('http') ? url : `https:${url}`,
                            title: asset.fields.title || '',
                            description: asset.fields.description || '',
                        }
                    })
            }
        } catch {
            media = []
        }

        return {
            slug: fields.slug,
            title: fields.title,
            tags,
            cardDescription: fields.cardDescription || '',
            preview: fields.preview || '',
            media,
            template: fields.template || 'default',
            seoTitle: fields.seoTitle || '',
            seoDescription: fields.seoDescription || '',
        } as Case
    }

    return cases.find((item) => item.slug === slug) || null
}

export async function getAllSlugs() {
    const res = await safeGetEntries<CaseSkeleton>({
        content_type: CONTENT_TYPE_CASE,
        select: ['fields.slug'],
        limit: 1000,
    })
    if (res) {
        return res.items
            .map((i: any) => i.fields.slug)
            .filter(Boolean)
            .map((slug: string) => ({ slug }))
    }
    return cases.map((item) => ({ slug: item.slug }))
}
