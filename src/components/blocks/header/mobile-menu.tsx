'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import PAGES from '@/lib/navigation'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    onContactClick: () => void
}

const menuVariants = {
    closed: {
        x: '100%',
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1] as const,
        },
    },
    open: {
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0, 0, 0.2, 1] as const,
        },
    },
}

const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
}

const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.3,
        },
    }),
}

export const MobileMenu = ({ isOpen, onClose, onContactClick }: MobileMenuProps) => {
    const navigationItems = [
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Blog', href: '/blog' },
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
    ]

    return (
        <>
            {/* Backdrop - Always in DOM for SEO */}
            <motion.div
                variants={backdropVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                onClick={onClose}
                className="fixed inset-0 z-40"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
            />

            {/* Menu Panel - Always in DOM for SEO */}
            <motion.div
                variants={menuVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                className="fixed top-0 right-0 bottom-0 w-full sm:w-96 z-50 flex flex-col"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderLeft: '1px solid var(--border-default)',
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between p-6 border-b"
                    style={{ borderColor: 'var(--border-default)' }}
                >
                    <h2
                        className="text-xl font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Menu
                    </h2>
                    <motion.button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors duration-200"
                        style={{
                            color: 'var(--text-secondary)',
                        }}
                        whileHover={{
                            backgroundColor: 'var(--state-hover)',
                        }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close menu"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-2">
                        {navigationItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                custom={index}
                                variants={itemVariants}
                                initial="closed"
                                animate="open"
                            >
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between p-4 rounded-lg transition-all duration-200 group"
                                    style={{
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <span className="text-lg font-medium">
                                        {item.label}
                                    </span>
                                    <ChevronRight
                                        className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                                        style={{
                                            color: 'var(--brand-red)',
                                        }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Services Section */}
                    <motion.div
                        custom={navigationItems.length}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        className="mt-8"
                    >
                        <h3
                            className="text-xs uppercase tracking-wider font-semibold mb-4 px-4"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Services
                        </h3>
                        <div className="space-y-2">
                            {(Array.isArray(PAGES.services) ? PAGES.services : []).map((service: any) => (
                                <Link
                                    key={service.slug}
                                    href={`/${service.slug}`}
                                    onClick={onClose}
                                    className="block p-3 px-4 rounded-lg transition-colors duration-200"
                                    style={{
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Industries Section */}
                    <motion.div
                        custom={navigationItems.length + 1}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        className="mt-8"
                    >
                        <h3
                            className="text-xs uppercase tracking-wider font-semibold mb-4 px-4"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Industries
                        </h3>
                        <div className="space-y-2">
                            {(Array.isArray(PAGES.industries) ? PAGES.industries : []).map((industry: any) => (
                                <Link
                                    key={industry.slug}
                                    href={`/${industry.slug}`}
                                    onClick={onClose}
                                    className="block p-3 px-4 rounded-lg transition-colors duration-200"
                                    style={{
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {industry.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </nav>

                {/* Footer CTA */}
                <motion.div
                    custom={navigationItems.length + 2}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    className="p-6 border-t"
                    style={{ borderColor: 'var(--border-default)' }}
                >
                    <Button
                        variant="accent"
                        size="lg"
                        fullSize
                        onClick={onContactClick}
                    >
                        Let&apos;s talk
                    </Button>
                </motion.div>
            </motion.div>
        </>
    )
}
