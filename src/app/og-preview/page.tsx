'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import LogoSVG from '@/assets/Krasty small.svg'

/**
 * Open Graph Image Preview Page
 * 
 * Instructions:
 * 1. Visit this page at http://localhost:3000/og-preview
 * 2. Take a screenshot (exactly 1200x630px)
 * 3. Save as: public/og-image.png
 * 
 * Tip: Use browser dev tools to set window size to exactly 1200x630
 * Or use screenshot tool with exact dimensions
 */

export default function OGPreviewPage() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            padding: 0,
            margin: 0,
            overflow: 'hidden',
        }}>
            {/* OG Image Container - Exactly 1200x630px */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                    width: '1200px',
                    height: '630px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #000 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                    boxSizing: 'border-box',
                }}
            >
                {/* Red accent lines - top left */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle at top left, rgba(229, 6, 6, 0.3), transparent 60%)',
                    pointerEvents: 'none',
                }} />

                {/* Red accent lines - bottom right */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle at bottom right, rgba(229, 6, 6, 0.25), transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Subtle grid pattern */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    pointerEvents: 'none',
                }} />

                {/* Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '24px',
                }}>
                    {/* Logo */}
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
                            width: '180px',
                            height: 'auto',
                            filter: 'drop-shadow(0 0 40px rgba(229, 6, 6, 0.6))',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <LogoSVG style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </motion.div>

                    {/* Terminal-style command */}
                    <div style={{
                        fontSize: '56px',
                        fontWeight: 700,
                        color: '#E50606',
                        lineHeight: 1,
                        fontFamily: 'var(--font-tt-runs)',
                        textShadow: '0 0 40px rgba(229, 6, 6, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        gap: '8px',
                        letterSpacing: '0.05em',
                    }}>
                        <span style={{ opacity: 0.9 }}>Message us</span>
                        <span style={{ fontSize: '64px' }}>&gt;</span>
                    </div>

                    {/* Main Title */}
                    <h1 style={{
                        fontSize: '72px',
                        fontWeight: 900,
                        color: '#ffffff',
                        lineHeight: 1.1,
                        margin: 0,
                        fontFamily: 'var(--font-tt-runs)',
                        letterSpacing: '-0.02em',
                        textTransform: 'uppercase',
                    }}>
                        KRASTY SOFT
                    </h1>

                    {/* Tagline */}
                    <p style={{
                        fontSize: '36px',
                        fontWeight: 500,
                        color: '#cccccc',
                        margin: 0,
                        fontFamily: 'var(--font-tt-runs)',
                        letterSpacing: '0.02em',
                    }}>
                        Software Company You Can Trust
                    </p>

                    {/* Divider line */}
                    <div style={{
                        width: '400px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #E50606, transparent)',
                        marginTop: '8px',
                    }} />

                    {/* Subtitle */}
                    <p style={{
                        fontSize: '28px',
                        fontWeight: 400,
                        color: '#999999',
                        margin: 0,
                        fontFamily: 'var(--font-tt-runs)',
                    }}>
                        Custom Software · Retool Development · Enterprise Solutions
                    </p>
                </div>

                {/* Bottom URL */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    right: '60px',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#E50606',
                    fontFamily: 'var(--font-tt-runs)',
                    letterSpacing: '0.05em',
                }}>
                    krastysoft.com
                </div>
            </motion.div>

            {/* Instructions overlay (will be hidden in screenshot) */}
            <div style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                color: '#E50606',
                padding: '16px 32px',
                borderRadius: '8px',
                border: '1px solid #E50606',
                fontSize: '14px',
                fontWeight: 600,
                zIndex: 1000,
                fontFamily: 'monospace',
                textAlign: 'center',
            }}>
                📸 Screenshot this at 1200x630px → Save as public/og-image.png
                <br />
                <span style={{ fontSize: '12px', opacity: 0.7 }}>
                    (Press F11 for fullscreen, then use screenshot tool)
                </span>
            </div>
        </div>
    )
}
