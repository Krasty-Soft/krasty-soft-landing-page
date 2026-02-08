'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface GeometricPatternProps {
    seed: string
    isHovered?: boolean
}

// Simple hash function to generate consistent random numbers from string
const hashCode = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash
    }
    return Math.abs(hash)
}

// Seeded random number generator
class SeededRandom {
    private seed: number

    constructor(seed: number) {
        this.seed = seed
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280
        return this.seed / 233280
    }
}

export const GeometricPattern = ({ seed, isHovered = false }: GeometricPatternProps) => {
    const shapes = useMemo(() => {
        const hash = hashCode(seed)
        const rng = new SeededRandom(hash)
        const shapeCount = 12 + Math.floor(rng.next() * 8) // 12-20 shapes

        const colorPalette = [
            'rgba(220, 38, 38, 0.6)',   // Red
            'rgba(220, 38, 38, 0.4)',   // Light red
            'rgba(139, 92, 246, 0.5)',  // Purple
            'rgba(59, 130, 246, 0.5)',  // Blue
            'rgba(236, 72, 153, 0.5)',  // Pink
        ]

        return Array.from({ length: shapeCount }, (_, i) => {
            const type = ['circle', 'rect', 'triangle'][Math.floor(rng.next() * 3)]
            const size = 40 + rng.next() * 120
            const x = rng.next() * 100
            const y = rng.next() * 100
            const rotation = rng.next() * 360
            const color = colorPalette[Math.floor(rng.next() * colorPalette.length)]
            const animationDelay = rng.next() * 2

            return {
                id: i,
                type,
                size,
                x,
                y,
                rotation,
                color,
                animationDelay,
            }
        })
    }, [seed])

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0a0a0a 100%)',
            }}
        >
            <svg
                width="100%"
                height="100%"
                style={{ position: 'absolute', inset: 0 }}
            >
                <defs>
                    {/* Blur filter for depth */}
                    <filter id="blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                </defs>

                {shapes.map((shape) => {
                    // Calculate floating motion offsets
                    const floatX = (Math.sin(shape.id) * 15) // -15 to 15
                    const floatY = (Math.cos(shape.id) * 15)

                    if (shape.type === 'circle') {
                        return (
                            <motion.circle
                                key={shape.id}
                                cx={`${shape.x}%`}
                                cy={`${shape.y}%`}
                                r={shape.size / 2}
                                fill={shape.color}
                                filter="url(#blur)"
                                initial={{ scale: 0.8, opacity: 0.3, x: 0, y: 0 }}
                                animate={isHovered ? {
                                    scale: [0.8, 1.3, 0.9, 1.2, 0.8],
                                    opacity: [0.3, 0.8, 0.4, 0.7, 0.3],
                                    rotate: [0, 180, 360],
                                    x: [0, floatX, -floatX, floatX, 0],
                                    y: [0, floatY, -floatY, floatY, 0],
                                } : {
                                    scale: 0.8,
                                    opacity: 0.3,
                                    rotate: 0,
                                    x: 0,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 4,
                                    delay: shape.animationDelay,
                                    repeat: isHovered ? Infinity : 0,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    transformOrigin: 'center',
                                }}
                            />
                        )
                    }

                    if (shape.type === 'rect') {
                        return (
                            <motion.rect
                                key={shape.id}
                                x={`${shape.x}%`}
                                y={`${shape.y}%`}
                                width={shape.size}
                                height={shape.size}
                                fill={shape.color}
                                filter="url(#blur)"
                                initial={{ scale: 0.7, opacity: 0.3, rotate: shape.rotation, x: 0, y: 0 }}
                                animate={isHovered ? {
                                    scale: [0.7, 1.4, 0.8, 1.3, 0.7],
                                    opacity: [0.3, 0.7, 0.4, 0.6, 0.3],
                                    rotate: [shape.rotation, shape.rotation + 180, shape.rotation + 360],
                                    x: [0, -floatX, floatX, -floatX, 0],
                                    y: [0, -floatY, floatY, -floatY, 0],
                                } : {
                                    scale: 0.7,
                                    opacity: 0.3,
                                    rotate: shape.rotation,
                                    x: 0,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 5,
                                    delay: shape.animationDelay,
                                    repeat: isHovered ? Infinity : 0,
                                    ease: 'easeInOut',
                                }}
                                style={{
                                    transformOrigin: 'center',
                                }}
                            />
                        )
                    }

                    // Triangle
                    const trianglePoints = `
                        ${shape.x},${shape.y}
                        ${shape.x + shape.size / 2},${shape.y + shape.size}
                        ${shape.x - shape.size / 2},${shape.y + shape.size}
                    `

                    return (
                        <motion.polygon
                            key={shape.id}
                            points={trianglePoints}
                            fill={shape.color}
                            filter="url(#blur)"
                            initial={{ scale: 0.7, opacity: 0.3, rotate: shape.rotation, x: 0, y: 0 }}
                            animate={isHovered ? {
                                scale: [0.7, 1.3, 0.8, 1.2, 0.7],
                                opacity: [0.3, 0.8, 0.4, 0.7, 0.3],
                                rotate: [shape.rotation, shape.rotation - 180, shape.rotation - 360],
                                x: [0, floatY, -floatY, floatY, 0],
                                y: [0, -floatX, floatX, -floatX, 0],
                            } : {
                                scale: 0.7,
                                opacity: 0.3,
                                rotate: shape.rotation,
                                x: 0,
                                y: 0,
                            }}
                            transition={{
                                duration: 4.5,
                                delay: shape.animationDelay,
                                repeat: isHovered ? Infinity : 0,
                                ease: 'easeInOut',
                            }}
                            style={{
                                transformOrigin: `${shape.x}% ${shape.y}%`,
                            }}
                        />
                    )
                })}
            </svg>

            {/* Noise overlay for texture */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    opacity: 0.03,
                    pointerEvents: 'none',
                }}
            />

            {/* Vignette overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
