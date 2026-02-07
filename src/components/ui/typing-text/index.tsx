'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

interface TypingTextProps {
    text: string
    className?: string
    speed?: number
    showCursor?: boolean
    delay?: number
    onComplete?: () => void
    highlightWords?: string[] // Words to highlight with terminal style
}

export const TypingText = ({
    text,
    className = '',
    speed = 50,
    showCursor = true,
    delay = 0,
    onComplete,
    highlightWords = [],
}: TypingTextProps) => {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        if (delay > 0) {
            const delayTimeout = setTimeout(() => {
                setCurrentIndex(1)
            }, delay)
            return () => clearTimeout(delayTimeout)
        } else {
            setCurrentIndex(1)
        }
    }, [delay])

    useEffect(() => {
        if (currentIndex === 0) return

        if (currentIndex <= text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, currentIndex))
                setCurrentIndex(currentIndex + 1)
            }, speed)

            return () => clearTimeout(timeout)
        } else if (!isComplete) {
            setIsComplete(true)
            onComplete?.()
        }
    }, [currentIndex, text, speed, isComplete, onComplete])

    // Parse text and apply highlighting
    const renderedText = useMemo(() => {
        if (!highlightWords.length || !displayedText) {
            return displayedText
        }

        // Create a regex pattern to match highlight words (case-insensitive)
        const pattern = new RegExp(
            `\\b(${highlightWords.join('|')})\\b`,
            'gi'
        )

        const parts: React.ReactNode[] = []
        let lastIndex = 0
        let match

        while ((match = pattern.exec(displayedText)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(displayedText.slice(lastIndex, match.index))
            }

            // Add highlighted word with terminal style
            parts.push(
                <span
                    key={`highlight-${match.index}`}
                    style={{
                        color: 'var(--brand-red)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.125rem 0.375rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        fontFamily: 'monospace',
                        fontSize: '0.95em',
                    }}
                >
                    {match[0]}
                </span>
            )

            lastIndex = pattern.lastIndex
        }

        // Add remaining text
        if (lastIndex < displayedText.length) {
            parts.push(displayedText.slice(lastIndex))
        }

        return parts
    }, [displayedText, highlightWords])

    return (
        <span className={className}>
            {renderedText}
            {showCursor && (
                <motion.span
                    className="inline-block ml-1"
                    animate={{
                        opacity: [1, 0, 1],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    style={{ color: 'var(--brand-red)' }}
                >
                    _
                </motion.span>
            )}
        </span>
    )
}
