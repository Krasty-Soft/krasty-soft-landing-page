'use client'

import { motion } from 'framer-motion'

interface StatusBadgeProps {
    status: string
    subtitle?: string
    variant?: 'default' | 'success' | 'warning' | 'info'
    animated?: boolean
    className?: string
}

const getVariantColors = (variant: StatusBadgeProps['variant']) => {
    switch (variant) {
        case 'success':
            return {
                dot: '#00D97E',
                text: '#00D97E',
                border: 'rgba(0, 217, 126, 0.3)',
                glow: 'rgba(0, 217, 126, 0.15)',
            }
        case 'warning':
            return {
                dot: '#FFB020',
                text: '#FFB020',
                border: 'rgba(255, 176, 32, 0.3)',
                glow: 'rgba(255, 176, 32, 0.15)',
            }
        case 'info':
            return {
                dot: '#0066FF',
                text: '#0066FF',
                border: 'rgba(0, 102, 255, 0.3)',
                glow: 'rgba(0, 102, 255, 0.15)',
            }
        default:
            return {
                dot: 'var(--brand-red)',
                text: 'var(--brand-red)',
                border: 'var(--border-red)',
                glow: 'rgba(229, 6, 6, 0.15)',
            }
    }
}

export const StatusBadge = ({
    status,
    subtitle,
    variant = 'default',
    animated = true,
    className = '',
}: StatusBadgeProps) => {
    const colors = getVariantColors(variant)

    return (
        <motion.div
            className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full border overflow-hidden group ${className}`}
            style={{
                borderColor: colors.border,
                backgroundColor: 'var(--bg-secondary)',
            }}
            whileHover={animated ? { scale: 1.05 } : undefined}
            transition={{ duration: 0.3 }}
        >
            {/* Animated background glow */}
            {animated && (
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle, ${colors.glow}, transparent)`,
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}

            {/* Pulse dot */}
            <div className="relative flex items-center">
                {animated ? (
                    <>
                        <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.dot }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.8, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute w-2 h-2 rounded-full"
                            style={{ backgroundColor: colors.dot }}
                            animate={{
                                scale: [1, 2.5, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </>
                ) : (
                    <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.dot }}
                    />
                )}
            </div>

            {/* Text content */}
            <div className="flex flex-col">
                <span
                    className="text-xs uppercase tracking-wider font-bold"
                    style={{ color: colors.text }}
                >
                    {status}
                </span>
                {subtitle && (
                    <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {subtitle}
                    </span>
                )}
            </div>

            {/* Animated border effect */}
            {animated && (
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: `1px solid ${colors.dot}`,
                        opacity: 0,
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}
        </motion.div>
    )
}
