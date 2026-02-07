'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Clock, Briefcase } from 'lucide-react'
import { Section, TypingText } from '@/components/ui'
import { Opportunities } from '@/components/blocks'
import Link from 'next/link'

interface JobPageClientProps {
    job: any
}

export default function JobPageClient({ job }: JobPageClientProps) {
    return (
        <>
            {/* Hero Section */}
            <Section variant="primary" animate={false}>
                <div style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/careers"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9375rem',
                                marginBottom: '2rem',
                                transition: 'color 0.2s',
                                width: 'fit-content',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-red)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                            ← Back to Careers
                        </Link>

                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'rgba(220, 38, 38, 0.1)',
                            border: '1px solid rgba(220, 38, 38, 0.3)',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.875rem',
                            color: 'var(--brand-red)',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            marginTop: '0.5rem',
                        }}>
                            {job.type || 'Full-time'}
                        </div>

                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                            style={{
                                color: 'var(--text-primary)',
                                lineHeight: '1.2',
                            }}
                        >
                            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                            <TypingText
                                text={job.title || 'Position Title'}
                                speed={50}
                                delay={300}
                            />
                        </h1>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '2rem',
                            marginTop: '2rem',
                            color: 'var(--text-secondary)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={20} color="var(--brand-red)" />
                                <span>{job.location || 'Remote'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Clock size={20} color="var(--brand-red)" />
                                <span>{job.type || 'Full-time'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Briefcase size={20} color="var(--brand-red)" />
                                <span>{job.level || 'Mid-Senior level'}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Job Description */}
            <Section variant="secondary" animate={false}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        backgroundColor: 'var(--surface-primary)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-xl)',
                        padding: '3rem',
                    }}
                >
                    <div
                        style={{
                            fontSize: '1.0625rem',
                            lineHeight: '1.8',
                            color: 'var(--text-secondary)',
                        }}
                        dangerouslySetInnerHTML={{ __html: job.description || '<p>Job description coming soon...</p>' }}
                    />
                </motion.div>
            </Section>

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
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            style={{ color: 'white' }}
                        >
                            Interested in this position?
                        </h2>
                        <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', marginBottom: '2rem' }}>
                            Apply now and join our innovative team!
                        </p>

                        {job.applyLink ? (
                            <motion.a
                                href={job.applyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem 2.5rem',
                                    backgroundColor: 'white',
                                    color: 'var(--brand-red)',
                                    borderRadius: 'var(--radius-full)',
                                    fontSize: '1.125rem',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                }}
                            >
                                Apply Now
                                <ArrowUpRight size={20} />
                            </motion.a>
                        ) : (
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                                Contact us at careers@krastysoft.com
                            </p>
                        )}
                    </div>
                </motion.div>
            </Section>

            {/* Other Opportunities */}
            <Opportunities />
        </>
    )
}
