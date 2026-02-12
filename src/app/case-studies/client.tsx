'use client'

import { motion } from 'framer-motion'
import { FolderOpen, Search } from 'lucide-react'
import { Section, TypingText, CTABanner } from '@/components/ui'
import { CaseCard } from '@/components'
import { Technologies } from '@/components/blocks'
import { Case } from '@/lib/cases'
import { useEffect, useState } from 'react'

interface CaseStudiesClientProps {
    cases: Case[]
}

export default function CaseStudiesClient({ cases }: CaseStudiesClientProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCases, setFilteredCases] = useState<Case[]>(cases)

    useEffect(() => {
        if (searchTerm) {
            const filtered = cases.filter((caseItem) =>
                caseItem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.cardDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                caseItem.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            setFilteredCases(filtered)
        } else {
            setFilteredCases(cases)
        }
    }, [searchTerm, cases])

    return (
        <>
            {/* Hero Section */}
            <Section variant="primary" animate={false}>
                <div style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{ marginBottom: '1.5rem' }}>
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    display: 'inline-block',
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                    border: '1px solid rgba(220, 38, 38, 0.3)',
                                    borderRadius: 'var(--radius-full)',
                                }}
                            >
                                <FolderOpen size={32} color="var(--brand-red)" style={{ display: 'inline' }} />
                            </motion.div>
                        </div>

                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
                            style={{
                                color: 'var(--text-primary)',
                                lineHeight: '1.2',
                            }}
                        >
                            <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                            <TypingText
                                text="Our Case Studies"
                                speed={50}
                                delay={300}
                                highlightWords={['Case', 'Studies']}
                            />
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            style={{
                                fontSize: '1.25rem',
                                lineHeight: '1.8',
                                color: 'var(--text-secondary)',
                                maxWidth: '900px',
                                margin: '0 auto',
                            }}
                        >
                            Helping businesses{' '}
                            <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>achieve goals</span>.
                            Solving people&apos;s{' '}
                            <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>problems</span>.
                        </motion.p>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            style={{
                                marginTop: '3rem',
                                maxWidth: '600px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <div style={{
                                position: 'relative',
                                width: '100%',
                            }}>
                                <Search
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1.25rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'var(--text-tertiary)',
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Search case studies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3.5rem',
                                        backgroundColor: 'var(--surface-primary)',
                                        border: '1px solid var(--border-default)',
                                        borderRadius: 'var(--radius-full)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = 'var(--brand-red)')}
                                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-default)')}
                                />
                            </div>
                        </motion.div>

                        {/* Results count */}
                        {searchTerm && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    marginTop: '1.5rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9375rem',
                                }}
                            >
                                Found <span style={{ color: 'var(--brand-red)', fontWeight: 600 }}>{filteredCases.length}</span> case{filteredCases.length !== 1 ? 's' : ''}
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </Section>

            {/* Cases Grid */}
            <Section variant="secondary" animate={false}>
                {filteredCases.length > 0 ? (
                    <ul className="grid grid-cols-1 gap-7 md:gap-6 lg:gap-8 xl:gap-10">
                        {filteredCases.map((item: Case, i: number) => {
                            return (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <CaseCard data={item} />
                                </motion.li>
                            )
                        })}
                    </ul>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        <p style={{ fontSize: '1.125rem' }}>No case studies found matching &quot;{searchTerm}&quot;</p>
                    </motion.div>
                )}
            </Section>

            {/* Technologies Section */}
            <Technologies />

            {/* CTA Section */}
            <Section variant="primary" animate={false}>
                <CTABanner>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'white' }}
                    >
                        Ready to create your success story?
                    </h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto' }}>
                        Let&apos;s build something amazing together.
                    </p>
                </CTABanner>
            </Section>
        </>
    )
}
