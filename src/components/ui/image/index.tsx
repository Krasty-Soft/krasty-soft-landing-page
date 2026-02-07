'use client'

import NextImage from 'next/image'
import { motion } from 'framer-motion'
import type { ComponentProps } from 'react'
import { useState } from 'react'

type objectFit =
    | 'object-cover'
    | 'object-contain'
    | 'object-fill'
    | 'object-none'
    | 'object-scale-down'

interface CustomProps {
    wrapperClasses?: string
    imgClasses?: string
    fillMode?: objectFit
    animate?: boolean
    skeleton?: boolean
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

type ImageProps = CustomProps &
    Omit<ComponentProps<typeof NextImage>, 'fill' | 'className'>

const getRounded = (rounded: CustomProps['rounded']) => {
    switch (rounded) {
        case 'none':
            return 'rounded-none'
        case 'sm':
            return 'rounded-sm'
        case 'md':
            return 'rounded-md'
        case 'lg':
            return 'rounded-lg'
        case 'xl':
            return 'rounded-xl'
        case 'full':
            return 'rounded-full'
        default:
            return ''
    }
}

export const Image = ({
    src,
    alt = '',
    wrapperClasses = '',
    imgClasses = '',
    fillMode = 'object-cover',
    animate = true,
    skeleton = true,
    rounded = 'none',
    ...props
}: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    // Don't render if src is empty, null, or undefined
    if (!src || (typeof src === 'string' && src.trim() === '') || hasError) {
        return skeleton ? (
            <div
                className={`relative ${wrapperClasses} ${getRounded(rounded)}`}
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                }}
            />
        ) : null
    }

    const Wrapper = animate ? motion.div : 'div'
    const animationProps = animate
        ? {
              initial: { opacity: 0 },
              animate: { opacity: isLoading ? 0 : 1 },
              transition: { duration: 0.4 },
          }
        : {}

    return (
        <div className={`relative overflow-hidden ${wrapperClasses} ${getRounded(rounded)}`}>
            {skeleton && isLoading && (
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                    }}
                />
            )}
            <Wrapper {...animationProps}>
                <NextImage
                    src={src}
                    fill
                    alt={alt}
                    className={`${imgClasses} ${fillMode} ${getRounded(rounded)}`}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true)
                        setIsLoading(false)
                    }}
                    {...props}
                />
            </Wrapper>
        </div>
    )
}

// Optimized version for fixed-size images
interface OptimizedImageProps
    extends Omit<CustomProps, 'wrapperClasses' | 'fillMode'>,
        Omit<ComponentProps<typeof NextImage>, 'fill' | 'className'> {
    width: number
    height: number
}

export const OptimizedImage = ({
    src,
    alt = '',
    width,
    height,
    imgClasses = '',
    animate = true,
    skeleton = true,
    rounded = 'none',
    ...props
}: OptimizedImageProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    if (!src || (typeof src === 'string' && src.trim() === '') || hasError) {
        return skeleton ? (
            <div
                className={`${getRounded(rounded)}`}
                style={{
                    width,
                    height,
                    backgroundColor: 'var(--bg-secondary)',
                }}
            />
        ) : null
    }

    const commonProps = {
        width,
        height,
        alt,
        className: `${imgClasses} ${getRounded(rounded)}`,
        onLoad: () => setIsLoading(false),
        onError: () => {
            setHasError(true)
            setIsLoading(false)
        },
    }

    return (
        <div className="relative">
            {skeleton && isLoading && (
                <div
                    className={`absolute inset-0 animate-pulse ${getRounded(rounded)}`}
                    style={{
                        backgroundColor: 'var(--bg-secondary)',
                    }}
                />
            )}
            {animate ? (
                <motion.img
                    {...commonProps}
                    src={typeof src === 'string' ? src : (src as any).src || String(src)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoading ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                />
            ) : (
                <NextImage
                    {...commonProps}
                    src={src}
                    {...props}
                />
            )}
        </div>
    )
}
