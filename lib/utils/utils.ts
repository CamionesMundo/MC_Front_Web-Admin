import { UserType } from '@/types/enums'
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

export function parseIsoDate (isoStringDate: string | null | undefined): string {
  if (isoStringDate === null || isoStringDate === undefined) return ''
  const date = new Date(isoStringDate)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }

  return date.toLocaleString('es-ES', options).replace('.', '')
}

export function getUserType (userType: number): string {
  switch (userType) {
    case UserType.Buyer:
      return 'Comprador'
    case UserType.Seller:
      return 'Vendedor'
    case UserType.Business:
      return 'Empresa'
    case UserType.NaturalPerson:
      return 'Persona Natural'
    case UserType.LegalRepresentative:
      return 'Representante legal'
    default:
      return 'Usuario'
  }
}

export function getBirthday (dateString: string | null | undefined): string {
  if (dateString === null || dateString === undefined) return 'No registrado'
  const date = new Date(dateString)
  const options = { day: '2-digit', month: 'long' } as const
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}
