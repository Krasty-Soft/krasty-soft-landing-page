'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
            return () => window.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 9998,
                        }}
                    />

                    {/* Modal Container - Centered */}
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem',
                            zIndex: 9999,
                            pointerEvents: 'none',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                            style={{
                                width: '100%',
                                maxWidth: '900px',
                                maxHeight: '85vh',
                                pointerEvents: 'auto',
                            }}
                        >
                        <div
                            style={{
                                backgroundColor: 'rgba(15, 15, 15, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: 'var(--radius-xl)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: '85vh',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Header */}
                            <div
                                style={{
                                    padding: '2rem',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                                        fontWeight: 700,
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                                    {title}
                                </h2>
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        width: '2.5rem',
                                        height: '2.5rem',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                    }}
                                    aria-label="Close modal"
                                >
                                    <X size={20} color="var(--text-secondary)" />
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div
                                style={{
                                    padding: '2rem',
                                    overflowY: 'auto',
                                    flex: 1,
                                }}
                            >
                                {children}
                            </div>
                        </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
