'use client'

import { useState } from 'react'
import { Mail, Phone, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { SocialNetworks } from '@/components/blocks'
import { ChatForm } from './chat-form'
import { TypingText } from '@/components/ui'

interface ContactCardProps {
    icon: React.ReactNode
    label: string
    value: string
    href: string
    gradient: string
}

const ContactCard = ({ icon, label, value, href, gradient }: ContactCardProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault()
        navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <motion.a
            href={href}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                y: isHovered ? -4 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.5rem 1.25rem',
                textDecoration: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
            }}
        >
            {/* Background gradient glow */}
            <motion.div
                animate={{
                    opacity: isHovered ? 1 : 0.3,
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: gradient,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Icon */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 md:w-14 md:h-14"
                style={{
                    position: 'relative',
                    minWidth: '3rem',
                    minHeight: '3rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(220, 38, 38, 0.15)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                }}
            >
                {icon}
            </motion.div>

            {/* Content */}
            <div style={{ 
                position: 'relative', 
                flex: 1, 
                minWidth: 0,
                zIndex: 1,
            }}>
                <div style={{
                    fontSize: '0.8125rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '0.25rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 600,
                }}>
                    {label}
                </div>
                <motion.div
                    animate={{
                        color: isHovered ? 'var(--brand-red)' : 'white',
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-base md:text-lg"
                    style={{
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                    }}
                >
                    {value}
                </motion.div>
            </div>

            {/* Copy Button */}
            <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'relative',
                    width: '2.5rem',
                    minWidth: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    backgroundColor: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: copied ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    zIndex: 2,
                    transition: 'all 0.2s',
                }}
            >
                {copied ? (
                    <Check size={16} color="#10b981" />
                ) : (
                    <Copy size={16} color="rgba(255, 255, 255, 0.6)" />
                )}
            </motion.button>

            {/* Border glow on hover */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.4 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--brand-red), transparent)',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />
        </motion.a>
    )
}

export const Footer = () => {
    return (
        <footer 
            id="contacts"
            style={{ 
                backgroundColor: '#000000',
                color: 'white',
                scrollMarginTop: '80px', // Account for fixed header
                width: '100%',
                overflowX: 'hidden',
            }}
        >
            <div 
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%',
                    padding: '3rem 1rem',
                    boxSizing: 'border-box',
                }}
                className="md:px-8 md:py-16 lg:px-12 lg:py-20 xl:px-24 xl:py-24"
            >
                {/* Title Section */}
                <div className="mb-12 md:mb-16">
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                        style={{ 
                            color: 'var(--text-primary)',
                            lineHeight: '1.4',
                            marginBottom: '1rem',
                        }}
                    >
                        <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                        <TypingText
                            text="Get in touch for expert support."
                            speed={50}
                            delay={300}
                            highlightWords={['Get in touch', 'expert']}
                        />
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '3rem',
                    width: '100%',
                    maxWidth: '100%',
                }}
                className="lg:grid-cols-2">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '2rem',
                            color: 'var(--text-primary)',
                        }}>
                            For job seekers & clients
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '100%' }}>
                            {/* Email Card */}
                            <ContactCard
                                icon={<Mail size={22} />}
                                label="Email us"
                                value="sales@krasty.me"
                                href="mailto:sales@krasty.me"
                                gradient="linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.05))"
                            />

                            {/* Phone Card */}
                            <ContactCard
                                icon={<Phone size={22} />}
                                label="Call us"
                                value="+38 (099) 200 01 87"
                                href="tel:+380992000187"
                                gradient="linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))"
                            />
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                    >
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '2rem',
                            color: 'var(--text-primary)',
                        }}>
                            Chat with us
                        </h3>
                        
                        <ChatForm />
                    </motion.div>
                </div>
            </div>

            <SocialNetworks />
        </footer>
    )
}
