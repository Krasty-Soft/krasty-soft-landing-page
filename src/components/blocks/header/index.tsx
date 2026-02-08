'use client'

import { useState } from 'react'
import Logo from '@/assets/Krasty small.svg'
import { Button } from '@/components/ui'
import { Menu, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileMenu } from './mobile-menu'

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const scrollToContact = () => {
        const container = document.getElementById('app-scroll')
        const section = document.getElementById('contacts')
        if (!container || !section) return

        const containerRect = container.getBoundingClientRect()
        const sectionRect = section.getBoundingClientRect()
        const offsetTop = sectionRect.top - containerRect.top + container.scrollTop

        container.scrollTo({ top: offsetTop, behavior: 'smooth' })
        setMobileMenuOpen(false)
    }

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(10, 10, 10, 0.8)',
                    borderBottom: '1px solid rgba(42, 42, 42, 0.5)',
                }}
            >
                <div className="mx-auto px-4 md:px-8 lg:px-12 xl:px-24" style={{ maxWidth: '1600px', width: '100%', boxSizing: 'border-box' }}>
                    <div className="flex items-center justify-between" style={{ gap: '1rem', minHeight: '80px', padding: '1rem 0', width: '100%' }}>
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            style={{ 
                                flexShrink: 0,
                                width: '135px',
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                overflow: 'visible',
                            }}
                        >
                            <Link
                                href="/"
                                className="z-50"
                                style={{ width: '100%', display: 'block' }}
                            >
                                <Logo style={{ 
                                    height: 'auto',
                                    width: '100%',
                                    display: 'block',
                                    maxWidth: 'none',
                                }} />
                            </Link>
                        </motion.div>

                        {/* Right side - Desktop */}
                        <div className="flex items-center gap-3">
                            {/* Blog button - desktop only */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden lg:block"
                            >
                                <Link
                                    href="/blog"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:border-red-600 hover:bg-red-600/10"
                                    style={{
                                        borderColor: 'var(--border-default)',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span className="font-medium">Blog</span>
                                </Link>
                            </motion.div>

                            {/* Let's talk button - enhanced */}
                            <motion.button
                                onClick={scrollToContact}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-200"
                                style={{
                                    background: 'linear-gradient(135deg, var(--brand-red), #c92a2a)',
                                    color: 'white',
                                    boxShadow: '0 0 20px rgba(220, 38, 38, 0.3)',
                                }}
                            >
                                <motion.span
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    style={{
                                        display: 'inline-block',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                    }}
                                />
                                Let&apos;s talk
                            </motion.button>

                            {/* Hamburger menu button - animated */}
                            <motion.button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-3 rounded-lg border transition-colors duration-200 relative overflow-hidden"
                                style={{
                                    borderColor: mobileMenuOpen
                                        ? 'var(--brand-red)'
                                        : 'var(--border-default)',
                                    backgroundColor: mobileMenuOpen
                                        ? 'var(--state-hover)'
                                        : 'transparent',
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Toggle menu"
                            >
                                {/* Background glow on hover */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 0.1 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'radial-gradient(circle, var(--brand-red), transparent)',
                                        pointerEvents: 'none',
                                    }}
                                />
                                
                                {/* Animated hamburger icon */}
                                <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                    <motion.div
                                        animate={{
                                            rotate: mobileMenuOpen ? 45 : 0,
                                            y: mobileMenuOpen ? 8 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '4px',
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: mobileMenuOpen ? 'var(--brand-red)' : 'var(--text-primary)',
                                            borderRadius: '2px',
                                        }}
                                    />
                                    <motion.div
                                        animate={{
                                            opacity: mobileMenuOpen ? 0 : 1,
                                            scaleX: mobileMenuOpen ? 0 : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '11px',
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: 'var(--text-primary)',
                                            borderRadius: '2px',
                                        }}
                                    />
                                    <motion.div
                                        animate={{
                                            rotate: mobileMenuOpen ? -45 : 0,
                                            y: mobileMenuOpen ? -8 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: '18px',
                                            left: 0,
                                            width: '100%',
                                            height: '2px',
                                            backgroundColor: mobileMenuOpen ? 'var(--brand-red)' : 'var(--text-primary)',
                                            borderRadius: '2px',
                                        }}
                                    />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Spacer to prevent content from hiding under fixed header */}
            <div style={{ height: '80px' }} />

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <MobileMenu
                        onClose={() => setMobileMenuOpen(false)}
                        onContactClick={scrollToContact}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
