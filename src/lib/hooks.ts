import { useState, useEffect } from 'react'

export const useDesktop = (breakpoint: number): boolean => {
  const isClient = typeof window !== 'undefined'

  const [isLarger, setIsLarger] = useState(() =>
    isClient ? window.innerWidth >= breakpoint : false
  )

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setIsLarger(window.innerWidth >= breakpoint)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint, isClient])

  return isLarger
}
