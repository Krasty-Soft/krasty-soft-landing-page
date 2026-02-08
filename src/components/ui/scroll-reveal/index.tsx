'use client'

import React, { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

type RevealVariant = 'fade' | 'fadeUp' | 'scale'

interface ScrollRevealProps {
    children: ReactNode
    variant?: RevealVariant
    delay?: number
    duration?: number
    once?: boolean
    className?: string
    margin?: string
}

// Animation variants
const revealOnScroll: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}

const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
}

const getVariants = (variant: RevealVariant): Variants => {
    switch (variant) {
        case 'fade':
            return revealOnScroll
        case 'fadeUp':
            return fadeInUp
        case 'scale':
            return fadeInScale
    }
}

export const ScrollReveal = ({
    children,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    once = true,
    className = '',
    margin = '-100px',
}: ScrollRevealProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: margin as any })

    const variants = getVariants(variant)

    // Override transition with custom delay and duration
    const customVariants: Variants = {
        hidden: variants.hidden,
        visible: {
            ...variants.visible,
            transition: {
                duration,
                delay,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={customVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger children wrapper
interface StaggerWrapperProps {
    children: ReactNode
    staggerDelay?: number
    childrenDelay?: number
    className?: string
    once?: boolean
}

export const StaggerWrapper = ({
    children,
    staggerDelay = 0.1,
    childrenDelay = 0.1,
    className = '',
    once = true,
}: StaggerWrapperProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-100px' })

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: childrenDelay,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {children}
        </motion.div>
    )
}
