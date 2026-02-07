'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import Arrow from '@/assets/arrow-right-up.svg'

type LinkVariant = 'primary' | 'secondary' | 'underline' | 'ghost'

interface ArrowLinkProps {
    to: string
    title?: string
    variant?: LinkVariant
    className?: string
    external?: boolean
    showArrow?: boolean
}

const getVariant = (variant: LinkVariant) => {
    switch (variant) {
        case 'primary':
            return 'text-brand-red hover:text-brand-red-light font-medium'
        case 'secondary':
            return 'text-text-secondary hover:text-text-primary font-medium'
        case 'underline':
            return 'text-text-primary hover:text-brand-red underline underline-offset-4 decoration-border-default hover:decoration-brand-red'
        case 'ghost':
            return 'text-text-muted hover:text-text-primary'
    }
}

export const ArrowLink = ({
    to,
    title = 'Learn More',
    variant = 'underline',
    className = '',
    external = false,
    showArrow = true,
}: ArrowLinkProps) => {
    const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}

    return (
        <Link
            href={to}
            className={`
                group inline-flex items-center gap-2 
                transition-colors duration-200
                ${getVariant(variant)}
                ${className}
            `}
            {...linkProps}
        >
            <span>{title}</span>
            {showArrow && (
                <motion.span
                    className="flex-shrink-0"
                    initial={{ x: 0, y: 0 }}
                    whileHover={{ x: 2, y: -2 }}
                    transition={{ duration: 0.2 }}
                >
                    <Arrow
                        className="transition-colors duration-200"
                        style={{
                            stroke: 'currentColor',
                        }}
                    />
                </motion.span>
            )}
        </Link>
    )
}

// Simple text link without arrow
interface TextLinkProps {
    to: string
    children: React.ReactNode
    variant?: LinkVariant
    className?: string
    external?: boolean
}

export const TextLink = ({
    to,
    children,
    variant = 'primary',
    className = '',
    external = false,
}: TextLinkProps) => {
    const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}

    return (
        <Link
            href={to}
            className={`
                transition-colors duration-200
                ${getVariant(variant)}
                ${className}
            `}
            {...linkProps}
        >
            {children}
        </Link>
    )
}

// Animated link with underline effect
export const AnimatedLink = ({
    to,
    children,
    className = '',
    external = false,
}: Omit<TextLinkProps, 'variant'>) => {
    const linkProps = external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}

    return (
        <Link
            href={to}
            className={`
                relative inline-block
                text-text-primary hover:text-brand-red
                transition-colors duration-200
                ${className}
            `}
            {...linkProps}
        >
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-brand-red"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
            />
        </Link>
    )
}
