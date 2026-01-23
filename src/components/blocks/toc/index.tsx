'use client'

import { createSlug } from '@/lib/util'
import { useEffect, useState } from 'react'

export const TableOfContents = ({
    tableOfContents,
}: {
    tableOfContents: string[]
}) => {
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const visibleSections = new Set<string>()

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.add(entry.target.id)
                        setActiveId(entry.target.id)
                    } else {
                        visibleSections.delete(entry.target.id)
                        // If the section that just left was active, clear active state
                        if (visibleSections.size === 0) {
                            setActiveId('')
                        }
                    }
                })
            },
            {
                rootMargin: '-20% 0px -35% 0px',
                threshold: 0,
            }
        )

        // Observe all sections with IDs matching the TOC slugs
        const elements = tableOfContents.map((title) => {
            const slug = createSlug(title)
            return document.getElementById(slug)
        })

        elements.forEach((el) => {
            if (el) observer.observe(el)
        })

        return () => {
            elements.forEach((el) => {
                if (el) observer.unobserve(el)
            })
        }
    }, [tableOfContents])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault()
        setActiveId(slug)
        
        const element = document.getElementById(slug)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <div>
            <strong className="text-xl mb-3 font-medium block">Content</strong>
            <nav className="mb-c-50">
                <ul className="space-y-2">
                    {tableOfContents.map((title) => {
                        const slug = createSlug(title)
                        const isActive = activeId === slug
                        return (
                            <li key={slug}>
                                <a
                                    href={`#${slug}`}
                                    onClick={(e) => handleClick(e, slug)}
                                    className={`transition-colors underline ${
                                        isActive
                                            ? 'text-red'
                                            : 'text-dark-grey hover:text-black'
                                    }`}
                                >
                                    {title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}
