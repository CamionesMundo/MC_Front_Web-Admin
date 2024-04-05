import { useRouter } from 'next/navigation'

/**
 * Capitalizes the first letter of a string.
 * @param str The input string.
 * @returns The input string with the first letter capitalized.
 */
export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * A hook to navigate back to the previous page using the router.
 * @returns An object containing a function to handle going back to the previous page.
 */
export function useGoBackPage () {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }
  return {
    handleGoBack
  }
}
