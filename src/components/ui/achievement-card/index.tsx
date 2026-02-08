'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { ReactNode, useState } from 'react'

type AchievementCardVariant = 'rating' | 'award' | 'stat' | 'custom'

interface AchievementCardProps {
    variant?: AchievementCardVariant
    href?: string
    onClick?: () => void
    className?: string
    
    // For rating variant
    rating?: number
    maxRating?: number
    
    // For award variant
    emoji?: string
    title?: string
    subtitle?: string
    
    // For stat variant
    number?: string | number
    label?: string
    
    // For custom variant
    children?: ReactNode
    
    // Animation
    animateStars?: boolean
    hoverEffect?: boolean
}

export const AchievementCard = ({
    variant = 'custom',
    href,
    onClick,
    className = '',
    rating = 5,
    maxRating = 5,
    emoji,
    title,
    subtitle,
    number,
    label,
    children,
    animateStars = true,
    hoverEffect = true,
}: AchievementCardProps) => {
    const [isCardHovered, setIsCardHovered] = useState(false)
    
    const Component = href ? motion.a : motion.div
    const linkProps = href
        ? {
              href,
              target: '_blank',
              rel: 'noopener noreferrer',
          }
        : {}
    
    const interactionProps = onClick
        ? {
              onClick,
              style: { cursor: 'pointer' },
          }
        : {}

    const content = () => {
        switch (variant) {
            case 'rating':
                return (
                    <>
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(maxRating)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={animateStars ? { opacity: 0, scale: 0 } : {}}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: animateStars ? 0.5 + i * 0.1 : 0,
                                        duration: 0.3,
                                    }}
                                >
                                    <Star
                                        className="w-5 h-5 fill-current"
                                        style={{
                                            color:
                                                i < rating
                                                    ? 'var(--brand-red)'
                                                    : 'var(--border-default)',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div
                            className="text-3xl font-bold mb-1"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {rating}.0
                        </div>
                        <div
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {label || 'Rating'}
                        </div>
                    </>
                )

            case 'award':
                return (
                    <>
                        <div
                            className="text-4xl mb-3"
                            style={{ color: 'var(--brand-red)' }}
                        >
                            {emoji}
                        </div>
                        <div
                            className="text-sm font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {title}
                        </div>
                        <div
                            className="text-xs"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {subtitle}
                        </div>
                    </>
                )

            case 'stat':
                return (
                    <>
                        <div
                            className="text-3xl font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {number}
                        </div>
                        <div
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {label}
                        </div>
                    </>
                )

            case 'custom':
                return children
        }
    }

    const isInteractive = Boolean(onClick || href)

    return (
        <Component
            className={`relative group p-6 rounded-2xl border backdrop-blur-sm overflow-hidden ${className}`}
            style={{
                background:
                    'linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(31, 31, 31, 0.6))',
                borderColor: 'var(--border-default)',
                cursor: isInteractive ? 'pointer' : 'default',
            }}
            onHoverStart={() => setIsCardHovered(true)}
            onHoverEnd={() => setIsCardHovered(false)}
            whileHover={hoverEffect ? { y: -8, borderColor: 'rgba(220, 38, 38, 0.5)' } : undefined}
            transition={{ duration: 0.3 }}
            {...linkProps}
            {...interactionProps}
        >
            {/* Glow on hover */}
            {hoverEffect && (
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                        background:
                            'radial-gradient(circle at top, rgba(229, 6, 6, 0.2), transparent)',
                    }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Click indicator - bottom right, only on hover */}
            {isInteractive && (
                <motion.div
                    animate={{
                        opacity: isCardHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'absolute',
                        bottom: '0.75rem',
                        right: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'var(--brand-red)',
                        fontWeight: 600,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        zIndex: 20,
                    }}
                >
                    <span>Click</span>
                    <motion.span
                        animate={isCardHovered ? {
                            x: [0, 3, 0],
                            y: [0, -3, 0],
                        } : {}}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        ↗
                    </motion.span>
                </motion.div>
            )}

            {/* Content */}
            <div className="relative z-10">{content()}</div>
        </Component>
    )
}
