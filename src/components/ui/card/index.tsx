'use client'

import React, { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type CardVariant = 'default' | 'elevated' | 'outline' | 'ghost'
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'

// Card hover animation
const cardHover = {
    rest: { y: 0, scale: 1 },
    hover: { y: -4, scale: 1.02 },
}

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: ReactNode
    variant?: CardVariant
    padding?: CardPadding
    className?: string
    hover?: boolean
    clickable?: boolean
    onClick?: () => void
}

const getVariant = (variant: CardVariant) => {
    switch (variant) {
        case 'default':
            return 'bg-bg-secondary border-border-subtle'
        case 'elevated':
            return 'bg-bg-elevated border-border-default shadow-card'
        case 'outline':
            return 'bg-transparent border-border-default'
        case 'ghost':
            return 'bg-transparent border-transparent'
    }
}

const getPadding = (padding: CardPadding) => {
    switch (padding) {
        case 'none':
            return 'p-0'
        case 'sm':
            return 'p-4'
        case 'md':
            return 'p-6'
        case 'lg':
            return 'p-8'
        case 'xl':
            return 'p-10'
    }
}

export const Card = ({
    children,
    variant = 'default',
    padding = 'md',
    className = '',
    hover = true,
    clickable = false,
    onClick,
    ...props
}: CardProps) => {
    const hoverProps = hover
        ? {
              variants: cardHover,
              initial: 'rest',
              whileHover: 'hover',
          }
        : {}

    return (
        <motion.div
            className={`
                rounded-xl border transition-colors duration-200
                ${getVariant(variant)}
                ${getPadding(padding)}
                ${clickable ? 'cursor-pointer' : ''}
                ${className}
            `}
            onClick={onClick}
            {...hoverProps}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Glass card variant (glassmorphism effect)
export const GlassCard = ({
    children,
    padding = 'md',
    className = '',
    ...props
}: Omit<CardProps, 'variant'>) => {
    return (
        <motion.div
            className={`
                rounded-xl border border-border-subtle
                backdrop-blur-lg
                ${getPadding(padding)}
                ${className}
            `}
            style={{
                background: 'rgba(26, 26, 26, 0.6)',
            }}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Feature card with icon
interface FeatureCardProps extends Omit<CardProps, 'children'> {
    icon?: ReactNode
    title: string
    description: string
}

export const FeatureCard = ({
    icon,
    title,
    description,
    variant = 'default',
    padding = 'lg',
    className = '',
    ...props
}: FeatureCardProps) => {
    return (
        <Card variant={variant} padding={padding} className={className} {...props}>
            {icon && (
                <div
                    className="mb-4 inline-flex p-3 rounded-lg"
                    style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--brand-red)',
                    }}
                >
                    {icon}
                </div>
            )}
            <h3
                className="text-xl font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
            >
                {title}
            </h3>
            <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                {description}
            </p>
        </Card>
    )
}
