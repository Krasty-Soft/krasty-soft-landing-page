'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Section, TypingText } from '@/components/ui'
import { PostCard } from '@/components'
import { posts } from '@/lib/posts'

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    // Get all unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesTag = selectedTag === null || post.tags.includes(selectedTag)
        
        return matchesSearch && matchesTag
    })

    return (
        <Section variant={'primary'} animate={false} sectionCls="pt-4 md:pt-8">
            {/* Header */}
            <div className="mb-12 md:mb-16">
                <h1
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
                    style={{ 
                        color: 'var(--text-primary)',
                        lineHeight: '1.4'
                    }}
                >
                    <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                    <TypingText
                        text="Insights, articles, and engineering stories."
                        speed={50}
                        delay={300}
                        highlightWords={['Insights', 'engineering']}
                    />
                </h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontSize: '1.125rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '48rem',
                    }}
                >
                    Deep dives into software development, design patterns, case studies, and tech innovation.
                </motion.p>
            </div>

            {/* Search and Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ marginBottom: '3rem' }}
            >
                {/* Search Bar */}
                <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <Search 
                        size={20} 
                        style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-tertiary)',
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem 0.875rem 3rem',
                            fontSize: '1rem',
                            backgroundColor: 'var(--surface-primary)',
                            border: '1px solid var(--border-default)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            transition: 'all 0.2s',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--brand-red)'
                            e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--border-default)'
                            e.target.style.boxShadow = 'none'
                        }}
                    />
                </div>

                {/* Tag Filters */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                        Filter by:
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTag(null)}
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            borderRadius: '9999px',
                            border: selectedTag === null ? '1px solid var(--brand-red)' : '1px solid var(--border-default)',
                            backgroundColor: selectedTag === null ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
                            color: selectedTag === null ? 'var(--brand-red)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        All
                    </motion.button>
                    {allTags.map((tag, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTag(tag)}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                borderRadius: '9999px',
                                border: selectedTag === tag ? '1px solid var(--brand-red)' : '1px solid var(--border-default)',
                                backgroundColor: selectedTag === tag ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
                                color: selectedTag === tag ? 'var(--brand-red)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textTransform: 'capitalize',
                            }}
                        >
                            {tag}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Results Count */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-tertiary)',
                    marginBottom: '2rem',
                }}
            >
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </motion.p>

            {/* Blog Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
            }}>
                {filteredPosts.map((post, i) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                    >
                        <PostCard data={post} />
                    </motion.div>
                ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                    }}
                >
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        No articles found
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                        Try adjusting your search or filters
                    </p>
                </motion.div>
            )}
        </Section>
    )
}
