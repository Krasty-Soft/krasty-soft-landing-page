'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

type BtnProps = {
    title?: string
    children?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: ButtonVariant
    size?: ButtonSize
    fullSize?: boolean
    classes?: string
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    animate?: boolean
} & Omit<HTMLMotionProps<'button'>, 'onClick'>

const getVariant = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            // Dark background with red glow on hover
            return 'bg-bg-elevated text-text-primary border-border-default hover:border-brand-red hover:shadow-red-sm transition-all'
        case 'secondary':
            // Subtle background
            return 'bg-bg-secondary text-text-primary border-border-subtle hover:bg-bg-tertiary hover:border-border-default transition-all'
        case 'accent':
            // Brand red with glow
            return 'bg-brand-red text-text-primary border-brand-red hover:bg-brand-red-light hover:shadow-red-md transition-all'
        case 'ghost':
            // Transparent with hover
            return 'bg-transparent text-text-secondary border-transparent hover:bg-state-hover hover:text-text-primary transition-all'
        case 'outline':
            // Outlined with red accent
            return 'bg-transparent text-text-primary border-border-default hover:border-brand-red hover:bg-state-hover transition-all'
    }
}

const getSize = (size: ButtonSize) => {
    switch (size) {
        case 'sm':
            return 'px-4 py-2 text-sm gap-2'
        case 'md':
            return 'px-6 py-3 text-base gap-2'
        case 'lg':
            return 'px-8 py-4 text-lg gap-3'
        case 'xl':
            return 'px-10 py-5 text-xl gap-3'
    }
}

export const Button = ({
    title,
    children,
    onClick,
    disabled = false,
    variant = 'accent',
    size = 'md',
    fullSize = false,
    classes = '',
    loading = false,
    leftIcon,
    rightIcon,
    animate = true,
    ...props
}: BtnProps) => {
    const commonClasses = `
        rounded-full border-1 cursor-pointer whitespace-nowrap 
        inline-flex items-center justify-center font-medium
        disabled:opacity-50 disabled:cursor-not-allowed
        focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary
        ${getVariant(variant)} 
        ${getSize(size)}
        ${fullSize ? 'w-full' : ''} 
        ${classes}
    `

    const commonProps = {
        className: commonClasses,
        onClick,
        disabled: disabled || loading,
    }

    return animate ? (
        <motion.button
            {...commonProps}
            {...props}
            whileHover={disabled || loading ? {} : { scale: 1.02 }}
            whileTap={disabled || loading ? {} : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            {loading && (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children || title}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </motion.button>
    ) : (
        <button {...commonProps}>
            {loading && (
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children || title}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </button>
    )
}
