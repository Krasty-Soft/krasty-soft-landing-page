import { getAllSlugs, getCaseBySlug } from '@/lib/cases'
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

    return <CaseTemplateRenderer caseData={caseData} template={template} />
}
