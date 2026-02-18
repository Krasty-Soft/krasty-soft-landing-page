import { getAllSlugs, getPostBySlug } from '@/lib/posts'
import { generateSEO, StructuredData, generateBlogSchema } from '@/lib/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Section } from '@/components/ui'
import { renderRichTextAsHtml } from '@/lib/render'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag as TagIcon } from 'lucide-react'
import Image from 'next/image'

export async function generateStaticParams() {
    const slugs = await getAllSlugs()
    return slugs.map(({ slug }: { slug: string }) => ({ slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found',
        }
    }

    return generateSEO({
        title: `${post.title} - Krasty Soft Blog`,
        description: post.content.substring(0, 160),
        path: `/blog/${slug}`,
        type: 'article',
        tags: post.tags,
    })
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = await getPostBySlug(slug)

    if (!post) {
        return notFound()
    }

    // Generate Article structured data
    const articleSchema = generateBlogSchema({
        title: post.title,
        description: post.content.substring(0, 200),
        datePublished: new Date().toISOString(),
        author: 'Krasty Soft Team',
    })

    return (
        <>
            <StructuredData data={articleSchema} />
            
            <Section variant="primary" animate={false}>
                {/* Back button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors hover:text-red-600"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <ArrowLeft size={16} />
                    Back to Blog
                </Link>

                {/* Article Header */}
                <article className="max-w-4xl">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {post.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full"
                                    style={{
                                        backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                        color: 'var(--brand-red)',
                                        border: '1px solid rgba(220, 38, 38, 0.2)',
                                    }}
                                >
                                    <TagIcon size={12} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
                    >
                        {post.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <time>{new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</time>
                        </div>
                    </div>

                    {/* Featured Image */}
                    {post.preview && (
                        <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
                            <Image
                                src={post.preview}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div 
                        className="prose prose-invert prose-lg max-w-none"
                        style={{
                            color: 'var(--text-primary)',
                        }}
                    >
                        {renderRichTextAsHtml(post.richContent?.content || [])}
                    </div>
                </article>
            </Section>
        </>
    )
}
