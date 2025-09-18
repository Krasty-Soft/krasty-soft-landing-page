import { safeGetEntries } from '@/lib/cms'
import type { EntrySkeletonType } from 'contentful'

export interface Post {
    slug: string
    title: string
    tags: string[]
    content: string
    preview: string
}

type PostFields = {
    slug: string
    title: string
    tags?: string[]
    content?: string
    preview?: any
}

interface PostSkeleton extends EntrySkeletonType {
    contentTypeId: string
    fields: PostFields
}

const CONTENT_TYPE_POST = process.env.CONTENTFUL_POST_TYPE_ID || 'post'

export const posts: Post[] = [
    {
        slug: 'transforming-healthcare-software-development-with-retool',
        title: 'Transforming Healthcare Software Development with Retool',
        tags: ['qa', 'case study'],
        content: 'This is a test blog post content.',
        preview: '',
    },
    {
        slug: 'cost-care-pro-revolutionizing-healthcare-training-on-a-budget',
        title: 'CostCare Pro: Revolutionizing Healthcare Training on a Budget',
        tags: ['case study'],
        content: 'Another test post for mock testing.',
        preview: '',
    },
    {
        slug: 'end-inventory-headache-with-krasty-soft',
        title: 'End Inventory Headache with Krasty Soft',
        tags: ['qa', 'podcast'],
        content: 'Another test post for mock testing.',
        preview: '',
    },
    {
        slug: 'med-learn-pro-transforming-healthcare',
        title: 'MedLearn Pro: Transforming Healthcare Training with AI',
        tags: ['development'],
        content: 'Another test post for mock testing.',
        preview: '',
    },
    {
        slug: 'dark-mode-vs-light-mode-which-one-improves-user-experience',
        title: 'Dark Mode vs. Light Mode: Which One Improves User Experience?',
        tags: ['ux/ui', 'ux research'],
        content: 'Another test post for mock testing.',
        preview: '',
    },
    {
        slug: 'the-importance-of-multi-factor-authentication-in-cybersecurity',
        title: 'The Importance of Multi-Factor Authentication in Cybersecurity',
        tags: ['case study'],
        content: 'Another test post for mock testing.',
        preview: '',
    },
]

export async function getPostBySlug(slug: string) {
    const res = await safeGetEntries<PostSkeleton>({
        content_type: CONTENT_TYPE_POST,
        'fields.slug': slug,
        limit: 1,
        include: 1,
    })

    if (res && res.items.length > 0) {
        const item = res.items[0]
        const fields = item.fields
        const previewUrl = (fields as any).preview?.fields?.file?.url
        return {
            slug: fields.slug,
            title: fields.title,
            tags: fields.tags || [],
            content: fields.content || '',
            preview: previewUrl
                ? previewUrl.startsWith('http')
                    ? previewUrl
                    : `https:${previewUrl}`
                : '',
        } as Post
    }

    return posts.find((post) => post.slug === slug) || null
}

export async function getAllSlugs() {
    const res = await safeGetEntries<PostSkeleton>({
        content_type: CONTENT_TYPE_POST,
        select: ['fields.slug'],
        limit: 1000,
    })
    if (res) {
        return res.items
            .map((i: any) => i.fields.slug)
            .filter(Boolean)
            .map((slug: string) => ({ slug }))
    }
    return posts.map((post) => ({ slug: post.slug }))
}
