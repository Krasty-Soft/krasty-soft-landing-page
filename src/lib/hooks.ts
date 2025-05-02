import { useState, useEffect } from 'react'

export const useBreakpoint = (breakpoint: number): boolean | undefined => {
  const [isLarger, setIsLarger] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => {
      setIsLarger(window.innerWidth >= breakpoint)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isLarger
}
