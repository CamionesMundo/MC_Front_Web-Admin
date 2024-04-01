import { useRouter } from 'next/navigation'
export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function useGoBackPage () {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }
  return {
    handleGoBack
  }
}
