'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileCode, Folder, ChevronRight, ChevronDown, X } from 'lucide-react'
import { ServiceType } from '@/types'

interface CodeEditorProps {
    services: ServiceType[]
}

export const CodeEditor = ({ services }: CodeEditorProps) => {
    const [activeService, setActiveService] = useState<ServiceType>(services[0])
    const [isExplorerOpen, setIsExplorerOpen] = useState(true)

    return (
        <div
            style={{
                backgroundColor: 'var(--surface-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
            }}
        >
            {/* Top Bar - VS Code style */}
            <div
                style={{
                    backgroundColor: 'var(--surface-elevated)',
                    borderBottom: '1px solid var(--border-default)',
                    padding: '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }} />
                </div>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', marginLeft: '1rem' }}>
                    services.tsx - KrastySoft
                </span>
            </div>

            {/* Mobile Pills - Show only on mobile */}
            <div 
                className="block lg:hidden"
                style={{
                    borderBottom: '1px solid var(--border-default)',
                    backgroundColor: 'var(--surface-elevated)',
                    padding: '1rem',
                }}
            >
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--brand-red) transparent',
                }}>
                    {services.map((service, index) => {
                        const isActive = service.title === activeService.title
                        return (
                            <motion.button
                                key={index}
                                onClick={() => setActiveService(service)}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    border: '1px solid',
                                    borderColor: isActive ? 'var(--brand-red)' : 'var(--border-default)',
                                    borderRadius: 'var(--radius-full)',
                                    backgroundColor: isActive ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
                                    color: isActive ? 'var(--brand-red)' : 'var(--text-secondary)',
                                    fontSize: '0.875rem',
                                    fontWeight: isActive ? 600 : 400,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s',
                                    flexShrink: 0,
                                }}
                            >
                                {service.title}
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div 
                style={{ display: 'flex', minHeight: '400px' }}
                className="lg:min-h-[500px]"
            >
                {/* Left Sidebar - Explorer (Desktop Only) */}
                <motion.div
                    className="hidden lg:block"
                    initial={false}
                    animate={{ width: isExplorerOpen ? '280px' : '0px' }}
                    transition={{ duration: 0.3 }}
                    style={{
                        backgroundColor: 'var(--surface-primary)',
                        borderRight: '1px solid var(--border-default)',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{ padding: '1rem', width: '280px' }}>
                        {/* Explorer Header */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}
                        >
                            <button
                                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            >
                                {isExplorerOpen ? (
                                    <ChevronDown size={16} style={{ color: 'var(--text-secondary)' }} />
                                ) : (
                                    <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
                                )}
                            </button>
                            <span>Services</span>
                        </div>

                        {/* Folder */}
                        <div style={{ marginBottom: '0.5rem' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.875rem',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <ChevronDown size={14} />
                                <Folder size={16} style={{ color: 'var(--brand-red)' }} />
                                <span>src/services</span>
                            </div>

                            {/* Files List */}
                            <div style={{ paddingLeft: '1.5rem' }}>
                                {services.map((service, index) => {
                                    const isActive = service.title === activeService.title
                                    return (
                                        <motion.button
                                            key={index}
                                            onClick={() => setActiveService(service)}
                                            whileHover={{ x: 4 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                padding: '0.375rem 0.5rem',
                                                width: '100%',
                                                textAlign: 'left',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.875rem',
                                                backgroundColor: isActive ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                                color: isActive ? 'var(--brand-red)' : 'var(--text-secondary)',
                                                transition: 'all 0.2s',
                                                marginBottom: '0.25rem',
                                            }}
                                        >
                                            <FileCode size={16} />
                                            <span>{service.title}.tsx</span>
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Tabs - Desktop Only */}
                    <div
                        className="hidden lg:flex"
                        style={{
                            alignItems: 'center',
                            borderBottom: '1px solid var(--border-default)',
                            backgroundColor: 'var(--surface-elevated)',
                            overflowX: 'auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                borderRight: '1px solid var(--border-default)',
                                backgroundColor: 'var(--surface-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '0.875rem',
                            }}
                        >
                            <FileCode size={14} style={{ color: 'var(--brand-red)' }} />
                            <span>{activeService.title}.tsx</span>
                            <X size={14} style={{ color: 'var(--text-tertiary)', cursor: 'pointer' }} />
                        </div>
                    </div>

                    {/* Code Content */}
                    <div
                        style={{
                            flex: 1,
                            padding: '1rem',
                            overflowY: 'auto',
                            fontFamily: 'monospace',
                        }}
                        className="lg:p-6"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Imports */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <CodeLine number={1} color="var(--text-tertiary)">
                                        <span style={{ color: '#C792EA' }}>import</span>{' '}
                                        <span style={{ color: '#82AAFF' }}>{'{'} Service {'}'}</span>{' '}
                                        <span style={{ color: '#C792EA' }}>from</span>{' '}
                                        <span style={{ color: '#C3E88D' }}>'@/types'</span>
                                    </CodeLine>
                                    <CodeLine number={2} />
                                </div>

                                {/* Interface */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <CodeLine number={3} color="var(--text-tertiary)">
                                        <span style={{ color: '#89DDFF' }}>/**</span>
                                    </CodeLine>
                                    <CodeLine number={4} color="var(--text-tertiary)">
                                        <span style={{ color: '#89DDFF' }}> * {activeService.description}</span>
                                    </CodeLine>
                                    <CodeLine number={5} color="var(--text-tertiary)">
                                        <span style={{ color: '#89DDFF' }}> */</span>
                                    </CodeLine>
                                </div>

                                {/* Service Object */}
                                <div>
                                    <CodeLine number={6}>
                                        <span style={{ color: '#C792EA' }}>export</span>{' '}
                                        <span style={{ color: '#C792EA' }}>const</span>{' '}
                                        <span style={{ color: '#82AAFF' }}>{activeService.title.replace(/\s+/g, '')}</span>
                                        <span style={{ color: '#89DDFF' }}>:</span>{' '}
                                        <span style={{ color: '#FFCB6B' }}>Service</span>{' '}
                                        <span style={{ color: '#89DDFF' }}>=</span>{' '}
                                        <span style={{ color: '#89DDFF' }}>{'{'}</span>
                                    </CodeLine>

                                    <CodeLine number={7} indent={1}>
                                        <span style={{ color: '#C3E88D' }}>name</span>
                                        <span style={{ color: '#89DDFF' }}>:</span>{' '}
                                        <span style={{ color: '#C3E88D' }}>'{activeService.title}'</span>
                                        <span style={{ color: '#89DDFF' }}>,</span>
                                    </CodeLine>

                                    <CodeLine number={8} indent={1}>
                                        <span style={{ color: '#C3E88D' }}>features</span>
                                        <span style={{ color: '#89DDFF' }}>:</span>{' '}
                                        <span style={{ color: '#89DDFF' }}>[</span>
                                    </CodeLine>

                                    {activeService.content.map((feature, idx) => (
                                        <CodeLine key={idx} number={9 + idx} indent={2}>
                                            <span style={{ color: '#C3E88D' }}>'{feature}'</span>
                                            <span style={{ color: '#89DDFF' }}>,</span>
                                        </CodeLine>
                                    ))}

                                    <CodeLine number={9 + activeService.content.length} indent={1}>
                                        <span style={{ color: '#89DDFF' }}>]</span>
                                        <span style={{ color: '#89DDFF' }}>,</span>
                                    </CodeLine>

                                    <CodeLine number={10 + activeService.content.length} indent={1}>
                                        <span style={{ color: '#C3E88D' }}>link</span>
                                        <span style={{ color: '#89DDFF' }}>:</span>{' '}
                                        <span style={{ color: '#C3E88D' }}>'{activeService.link}'</span>
                                        <span style={{ color: '#89DDFF' }}>,</span>
                                    </CodeLine>

                                    <CodeLine number={11 + activeService.content.length}>
                                        <span style={{ color: '#89DDFF' }}>{'}'}</span>
                                    </CodeLine>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Bottom Status Bar - Desktop Only */}
                    <div
                        className="hidden lg:flex"
                        style={{
                            borderTop: '1px solid var(--border-default)',
                            backgroundColor: 'var(--surface-elevated)',
                            padding: '0.375rem 1rem',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: 'var(--text-tertiary)',
                        }}
                    >
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span>TypeScript React</span>
                            <span>UTF-8</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span>Ln {11 + activeService.content.length}, Col 1</span>
                            <span style={{ color: 'var(--brand-red)' }}>● Modified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper component for code lines
const CodeLine = ({
    number,
    children,
    indent = 0,
    color,
}: {
    number?: number
    children?: React.ReactNode
    indent?: number
    color?: string
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                lineHeight: '1.6',
                fontSize: '0.8125rem',
            }}
            className="lg:gap-4 lg:text-sm"
        >
            <span
                style={{
                    color: 'var(--text-tertiary)',
                    userSelect: 'none',
                    minWidth: '1.5rem',
                    textAlign: 'right',
                    opacity: 0.5,
                }}
                className="lg:min-w-[2rem]"
            >
                {number}
            </span>
            <span
                style={{
                    paddingLeft: `${indent * 1}rem`,
                    color: color || 'var(--text-primary)',
                    flex: 1,
                }}
                className="lg:pl-[calc(var(--indent)*1.5rem)]"
            >
                {children}
            </span>
        </div>
    )
}
