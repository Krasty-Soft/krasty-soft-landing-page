'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

// Floating "back to top" button. It hides while an element marked
// data-fab-avoid (the full-width CTA buttons) passes under it, so it never
// covers a call to action on a phone.
const FAB_ZONE = 120 // px from the bottom of the screen the button occupies

export const ScrollTop = () => {
    const [scrolled, setScrolled] = useState(false)
    const [blocked, setBlocked] = useState(false)

    useEffect(() => {
        const container = document.getElementById('app-scroll')
        if (!container) return

        const handleScroll = () => setScrolled(container.scrollTop > 150)
        handleScroll()
        container.addEventListener('scroll', handleScroll, { passive: true })

        // Watch only the bottom strip of the scroll area for CTAs.
        let observer: IntersectionObserver | null = null
        const visible = new Set<Element>()
        const observe = () => {
            observer?.disconnect()
            visible.clear()
            setBlocked(false)
            const top = Math.max(0, container.clientHeight - FAB_ZONE)
            observer = new IntersectionObserver(
                (entries) => {
                    for (const e of entries) {
                        if (e.isIntersecting) visible.add(e.target)
                        else visible.delete(e.target)
                    }
                    setBlocked(visible.size > 0)
                },
                { root: container, rootMargin: `-${top}px 0px 0px 0px` },
            )
            document.querySelectorAll('[data-fab-avoid]').forEach((el) => observer!.observe(el))
        }
        observe()
        window.addEventListener('resize', observe)

        return () => {
            container.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', observe)
            observer?.disconnect()
        }
    }, [])

    const isVisible = scrolled && !blocked

    return (
        <button
            type="button"
            aria-label="Back to top"
            className={`fixed bottom-6 right-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-[opacity,border-color,color] duration-200 hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-red)] md:bottom-10 md:right-10 ${
                isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            style={{
                backgroundColor: 'rgba(18, 18, 20, 0.85)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
            }}
            onClick={() => {
                const container = document.getElementById('app-scroll')
                if (container) {
                    container.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }}
        >
            <ArrowUp size={20} strokeWidth={2} />
        </button>
    )
}
