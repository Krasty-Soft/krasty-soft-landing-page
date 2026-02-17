'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Image, Pill } from '@/components/ui'
import { Case } from '@/lib/cases'

const mockSrc = 'https://placehold.co/600x400.png'

export const CaseCard = ({ data }: { data: Case }) => {
    const [isHovered, setIsHovered] = useState(false)

    const mediaData = {
        banner: data.media.find((media) => media.title?.includes('banner')),
    }

    const mainImage = mediaData.banner?.url || mockSrc

    return (
        <motion.div
            initial={false}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
        >
            <Link href={`/case-studies/${data.slug}`} style={{ textDecoration: 'none' }}>
                <motion.div
                    animate={{
                        y: isHovered ? -8 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'var(--surface-primary)',
                        borderRadius: 'var(--radius-xl)',
                        overflow: 'hidden',
                        isolation: 'isolate',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                        WebkitBackfaceVisibility: 'hidden',
                        MozBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)',
                        MozTransform: 'translateZ(0)',
                    }}
                >
                    {/* Static border layer - doesn't scale */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-xl)',
                            pointerEvents: 'none',
                            zIndex: 10,
                        }}
                    />

                    {/* Background Image with Zoom Effect */}
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 0,
                            transform: 'translateZ(0)',
                            willChange: 'transform',
                        }}
                    >
                        <Image
                            src={mainImage}
                            alt={data.title}
                            wrapperClasses="w-full h-full"
                            style={{ 
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                display: 'block',
                            }}
                        />
                    </motion.div>

                    {/* Red Tint Overlay - shows on hover */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isHovered ? 0.6 : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.5), rgba(0, 0, 0, 0.7))',
                            mixBlendMode: 'multiply',
                            zIndex: 1,
                        }}
                    />

                    {/* Dark gradient overlay at bottom */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isHovered ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '60%',
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent)',
                            zIndex: 2,
                        }}
                    />

                    {/* Content Container */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            zIndex: 3,
                        }}
                    >
                        {/* Tags at top */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {data?.tags?.map((tag, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Pill title={tag} variant={'bordered'} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom content */}
                        <div>
                            {/* Title */}
                            <motion.h3
                                animate={{
                                    y: isHovered ? -4 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                                    fontWeight: 700,
                                    color: 'white',
                                    marginBottom: '0.75rem',
                                    lineHeight: '1.2',
                                }}
                            >
                                {data.title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                animate={{
                                    opacity: isHovered ? 1 : 0.8,
                                    y: isHovered ? -4 : 0,
                                }}
                                transition={{ duration: 0.3, delay: 0.05 }}
                                style={{
                                    fontSize: '1rem',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.6',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {data.cardDescription}
                            </motion.p>

                            {/* View Case Study Button */}
                            <motion.div
                                animate={{
                                    opacity: isHovered ? 1 : 0.7,
                                    x: isHovered ? 4 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--brand-red)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                <span>View Case Study</span>
                                <motion.div
                                    animate={{
                                        x: isHovered ? 4 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight size={20} />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Red Border Glow on Hover */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isHovered ? 0.4 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            inset: '-2px',
                            borderRadius: 'var(--radius-xl)',
                            background: 'linear-gradient(135deg, var(--brand-red), transparent)',
                            pointerEvents: 'none',
                            zIndex: 4,
                            opacity: 0,
                        }}
                    />
                </motion.div>
            </Link>
        </motion.div>
    )
}
