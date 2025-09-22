'use client'

import ArrowTop from '@/assets/arrow-up.svg'
import { useEffect, useState } from 'react'

export const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const container = document.getElementById('app-scroll')
        if (!container) return

        const handleScroll = () => {
            setIsVisible(container.scrollTop > 150)
        }

        handleScroll()
        container.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            container.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <button
            className={`fixed bottom-10 right-10 cursor-pointer transition-opacity duration-200 h-10 w-10 flex justify-center items-center bg-white shadow-sm rounded-full hover:shadow-md ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => {
                const container = document.getElementById('app-scroll')
                if (container) {
                    container.scrollTo({ top: 0, behavior: 'smooth' })
                }
            }}
        >
            <ArrowTop />
        </button>
    )
}
