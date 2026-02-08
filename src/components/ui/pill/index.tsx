'use client'

import { motion } from 'framer-motion'
import { formatTagLabel } from '@/lib/util'

type variants = 'bordered' | 'active' | 'filled'

export const Pill = ({
    title,
    variant,
    onSelect,
    hoverable = false,
}: {
    title: string
    variant: variants
    onSelect?: (opt?: unknown) => void
    hoverable?: boolean
}) => {
    const isClickable = Boolean(onSelect)
    
    // For case study tags - modern dark style
    if (variant === 'bordered' && !hoverable) {
        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    borderRadius: '9999px',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    color: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    cursor: isClickable ? 'pointer' : 'default',
                }}
                onClick={onSelect ?? undefined}
            >
                {formatTagLabel(title)}
            </motion.div>
        )
    }

    // Original styles for other variants
    const getStyles = (hoverable: boolean, variant: variants) => {
        if (hoverable) {
            switch (variant) {
                case 'active':
                    return 'cursor-pointer bg-red text-white hover:bg-white hover:text-red'
                case 'bordered':
                    return 'cursor-pointer border border-light-grey'
                case 'filled':
                    return 'cursor-pointer bg-white hover:bg-red hover:text-white'
                default:
                    return ''
            }
        } else {
            switch (variant) {
                case 'active':
                    return 'bg-red text-white'
                case 'bordered':
                    return 'border border-light-grey'
                case 'filled':
                    return 'bg-white'
                default:
                    return ''
            }
        }
    }

    return (
        <button
            className={`text-xs rounded-full px-4 py-2 ${getStyles(
                hoverable,
                variant
            )}`}
            onClick={onSelect ?? undefined}
            disabled={!isClickable}
        >
            {formatTagLabel(title)}
        </button>
    )
}
