'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, Rocket, Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { Section, TypingText, ImageLightbox } from '@/components/ui'
import { Technologies } from '@/components/blocks'
import Image from 'next/image'
import { Case } from '@/lib/cases'
import { renderRichTextAsHtml } from '@/lib/render'

interface TemplateProps {
    caseData: Case
}

const ImageCard = ({ 
    src, 
    alt, 
    index,
    onClick 
}: { 
    src: string
    alt: string
    index: number
    onClick: () => void
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onClick}
            style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-default)',
                backgroundColor: 'var(--surface-primary)',
                cursor: 'pointer',
            }}
        >
            {/* Red tint overlay - fades on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0 : 0.3,
                }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--brand-red)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />

            {/* Image with zoom effect */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    aspectRatio: '16/9',
                }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </motion.div>

            {/* Maximize icon - shows on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    zIndex: 3,
                }}
            >
                <Maximize2 size={18} />
            </motion.div>

            {/* Border glow on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.6 : 0,
                }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: 'var(--radius-xl)',
                    background: 'linear-gradient(135deg, var(--brand-red), transparent)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />
        </motion.div>
    )
}

export function TemplateDefault({ caseData }: TemplateProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // Prepare all images (including banner) for the lightbox
    const allImages = caseData.media.map((media) => ({
        src: media.url,
        alt: media.description || media.title || 'Case study image',
    }))

    const bannerImage = caseData.media.find((media) => media.title?.includes('banner'))
    const galleryImages = caseData.media.filter((media) => !media.title?.includes('banner'))

    const openLightbox = (imageIndex: number) => {
        setCurrentImageIndex(imageIndex)
        setLightboxOpen(true)
    }

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
        } else if (direction === 'next' && currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
        }
    }

    return (
        <>
            {/* Image Lightbox */}
            <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={allImages[currentImageIndex]?.src || ''}
                imageAlt={allImages[currentImageIndex]?.alt || ''}
                images={allImages}
                currentIndex={currentImageIndex}
                onNavigate={handleNavigate}
            />

            {/* Hero Section */}
            <Section variant="primary" animate={false}>
                <div style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/case-studies"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9375rem',
                                marginBottom: '2rem',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                            <ArrowLeft size={20} />
                            Back to Case Studies
                        </Link>

                        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto 3rem' }}>
                            <h1
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
                                style={{
                                    color: 'var(--text-primary)',
                                    lineHeight: '1.2',
                                }}
                            >
                                <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                                <TypingText
                                    text={caseData.title}
                                    speed={50}
                                    delay={300}
                                />
                            </h1>

                            {caseData.cardDescription && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                    style={{
                                        fontSize: '1.25rem',
                                        lineHeight: '1.8',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    {caseData.cardDescription}
                                </motion.p>
                            )}

                            {caseData.tags && caseData.tags.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                    style={{ 
                                        display: 'flex', 
                                        flexWrap: 'wrap', 
                                        gap: '0.75rem',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {caseData.tags.map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                                border: '1px solid rgba(220, 38, 38, 0.3)',
                                                borderRadius: 'var(--radius-full)',
                                                fontSize: '0.875rem',
                                                color: 'var(--brand-red)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Hero Image */}
                        {bannerImage && (
                            <ImageCard
                                src={bannerImage.url}
                                alt={caseData.title || 'Case study banner'}
                                index={0}
                                onClick={() => openLightbox(0)}
                            />
                        )}
                    </motion.div>
                </div>
            </Section>

            {/* Overview Section */}
            {caseData.overview?.content && (
                <Section variant="secondary" animate={false}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ maxWidth: '900px', margin: '0 auto' }}
                    >
                        <div className="prose prose-invert max-w-none">
                            {renderRichTextAsHtml(caseData.overview.content || [])}
                        </div>
                    </motion.div>
                </Section>
            )}

            {/* Main Content with Images */}
            {caseData.content?.content && (
                <Section variant="primary" animate={false}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ maxWidth: '900px', margin: '0 auto' }}
                    >
                        <div className="prose prose-invert max-w-none">
                            {renderRichTextAsHtml(caseData.content.content || [])}
                        </div>
                    </motion.div>
                </Section>
            )}

            {/* Visual Gallery - Screenshots with red tint */}
            {galleryImages.length > 0 && (
                <Section variant="secondary" animate={false}>
                    <div className="mb-12 md:mb-16">
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold"
                            style={{
                                color: 'var(--text-primary)',
                                lineHeight: '1.4',
                            }}
                        >
                            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                            <TypingText
                                text="Project showcase."
                                speed={50}
                                delay={300}
                                highlightWords={['showcase']}
                            />
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '2rem',
                    }}>
                        {galleryImages
                            .slice(0, 4) // Limit to 4 images max
                            .map((media, index) => {
                                // Find the actual index in allImages array
                                const actualIndex = caseData.media.findIndex(m => m.url === media.url)
                                return (
                                    <ImageCard
                                        key={index}
                                        src={media.url}
                                        alt={media.description || `Project screenshot ${index + 1}`}
                                        index={index}
                                        onClick={() => openLightbox(actualIndex)}
                                    />
                                )
                            })
                        }
                    </div>
                </Section>
            )}

            {/* Technologies Section */}
            <Technologies />

            {/* CTA Section */}
            <Section variant="primary" animate={false}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        backgroundColor: 'var(--brand-red)',
                        borderRadius: 'var(--radius-xl)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)',
                            pointerEvents: 'none',
                        }}
                    />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Rocket size={48} color="white" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                            style={{ color: 'white' }}
                        >
                            Want similar results for your project?
                        </h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
                            Let&apos;s discuss how we can help you achieve your goals.
                        </p>
                    </div>
                </motion.div>
            </Section>
        </>
    )
}
