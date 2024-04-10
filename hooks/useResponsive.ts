'use client'
import { useState, useEffect } from 'react'

/**
 * A custom hook to determine if the application is in mobile view.
 * @returns A boolean value indicating whether the application is in mobile view.
 */
const useResponsive = () => {
  /**
   * State to track whether the application is in mobile view.
   */
  const [isMobile, setIsMobile] = useState<boolean>(false)

  /**
   * Effect to handle window resize events and update the mobile view state accordingly.
   */
  useEffect(() => {
    /**
     * Event handler to update the mobile view state based on window width.
     */
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023)
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)
    handleResize()

    // Clean up: remove event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Only run this effect once, on component mount

  return isMobile
}

export { useResponsive }
