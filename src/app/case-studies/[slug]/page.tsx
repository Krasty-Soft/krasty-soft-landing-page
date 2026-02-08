import { getAllSlugs, getCaseBySlug } from '@/lib/cases'
import { generateArticleSchema, StructuredData } from '@/lib/seo'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseTemplateRenderer } from '../templates'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map((item: { slug: string }) => ({ slug: item.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const caseData = await getCaseBySlug(slug)

    if (!caseData) {
        return {
            title: 'Case Study',
            description: 'Case study page',
        }
    }

    return {
        title: caseData.seoTitle || '',
        description: caseData.seoDescription || '',
    }
}

export default async function CasePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const caseData = await getCaseBySlug(slug)

    if (!caseData) return notFound()

    const template = caseData.template || 'default'

    // Generate Article structured data for case study
    const articleSchema = generateArticleSchema({
        title: caseData.title || 'Case Study',
        description: caseData.seoDescription || caseData.cardDescription || '',
        slug: `/case-studies/${slug}`,
        image: caseData.media?.[0]?.url,
        publishedTime: new Date().toISOString(),
        authors: ['Krasty Soft Team'],
    })

    return (
        <>
            <StructuredData data={articleSchema} />
            <CaseTemplateRenderer caseData={caseData} template={template} />
        </>
    )
}
