'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type InputVariant = 'default' | 'outline' | 'ghost'
type InputSize = 'sm' | 'md' | 'lg'

// Fade in animation
const fadeIn = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
}

type InputProps = {
    className?: string
    placeholder?: string
    error?: string
    label?: string
    variant?: InputVariant
    size?: InputSize
    icon?: React.ReactNode
    success?: boolean
    helperText?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const getVariant = (variant: InputVariant, error?: string, success?: boolean) => {
    if (error) {
        return 'bg-bg-elevated border-red-500 focus:border-red-500 focus:ring-red-500/20'
    }
    if (success) {
        return 'bg-bg-elevated border-green-500 focus:border-green-500 focus:ring-green-500/20'
    }

    switch (variant) {
        case 'default':
            return 'bg-bg-elevated border-border-default hover:border-border-strong focus:border-brand-red focus:ring-brand-red/20'
        case 'outline':
            return 'bg-transparent border-border-default hover:border-border-strong focus:border-brand-red focus:ring-brand-red/20'
        case 'ghost':
            return 'bg-transparent border-transparent hover:bg-state-hover focus:bg-state-hover focus:border-brand-red focus:ring-brand-red/20'
    }
}

const getSize = (size: InputSize) => {
    switch (size) {
        case 'sm':
            return 'px-3 py-2 text-sm'
        case 'md':
            return 'px-4 py-3 text-base'
        case 'lg':
            return 'px-5 py-4 text-lg'
    }
}

export const Input = ({
    placeholder,
    error,
    label,
    className = '',
    variant = 'default',
    size = 'md',
    icon,
    success,
    helperText,
    ...props
}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="relative w-full">
            {label && (
                <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: error ? '#FF4444' : 'var(--text-secondary)' }}
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div
                        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {icon}
                    </div>
                )}
                <input
                    className={`
                        w-full rounded-xl border transition-all duration-200
                        text-text-primary placeholder:text-text-muted
                        outline-none focus:ring-2
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${getVariant(variant, error, success)}
                        ${getSize(size)}
                        ${icon ? 'pl-12' : ''}
                        ${className}
                    `}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {isFocused && !error && !success && (
                    <motion.div
                        layoutId="input-focus-indicator"
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                            boxShadow: '0 0 0 2px rgba(229, 6, 6, 0.2)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </div>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-2 text-sm"
                        style={{ color: '#FF4444' }}
                    >
                        {error}
                    </motion.p>
                )}
                {helperText && !error && (
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-2 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {helperText}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

// Textarea variant
type TextareaProps = {
    className?: string
    placeholder?: string
    error?: string
    label?: string
    rows?: number
    helperText?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({
    placeholder,
    error,
    label,
    className = '',
    rows = 4,
    helperText,
    ...props
}: TextareaProps) => {
    return (
        <div className="relative w-full">
            {label && (
                <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: error ? '#FF4444' : 'var(--text-secondary)' }}
                >
                    {label}
                </label>
            )}
            <textarea
                className={`
                    w-full rounded-xl border transition-all duration-200
                    bg-bg-elevated border-border-default
                    hover:border-border-strong
                    focus:border-brand-red focus:ring-2 focus:ring-brand-red/20
                    text-text-primary placeholder:text-text-muted
                    px-4 py-3 text-base
                    outline-none resize-y
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
                    ${className}
                `}
                placeholder={placeholder}
                rows={rows}
                {...props}
            />

            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-2 text-sm"
                        style={{ color: '#FF4444' }}
                    >
                        {error}
                    </motion.p>
                )}
                {helperText && !error && (
                    <motion.p
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mt-2 text-sm"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {helperText}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}
