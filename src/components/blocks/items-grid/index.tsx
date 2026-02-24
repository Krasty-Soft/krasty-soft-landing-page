'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ItemsGridProps {
    items: string[]
    brandColor?: string
}

export function ItemsGrid({ items, brandColor = 'var(--brand-red)' }: ItemsGridProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem',
            }}
        >
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                        padding: '1.5rem',
                        backgroundColor: 'var(--surface-primary)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                    }}
                >
                    <CheckCircle2
                        size={24}
                        color={brandColor}
                        style={{ margin: '0 auto 0.75rem', display: 'block' }}
                    />
                    {item}
                </motion.div>
            ))}
        </div>
    )
}
