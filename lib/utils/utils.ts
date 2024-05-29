import { NO_REGISTER } from '@/const/other'
import { type PublicationAuction } from '@/types/api/response/publication'
import {
  CheckListStatus,
  LanguagePreference,
  ModulesType,
  TypeAuctionStatus,
  UserType
} from '@/types/enums'
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

/**
 * Parses an ISO format date string to a localized date string.
 * @param isoStringDate - The ISO format date string to parse.
 * @returns The parsed date string formatted according to the locale.
 */
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

/**
 * Retrieves the user type as a string based on the provided user type code.
 * @param userType - The user type code.
 * @returns The user type as a string.
 */
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

/**
 * Retrieves the language preference as a string based on the provided language preference code.
 * @param language - The language preference code.
 * @returns The language preference as a string.
 */
export function getLanguageString (
  language: LanguagePreference | null | undefined
): string {
  switch (language) {
    case LanguagePreference.English:
      return 'Inglés'
    case LanguagePreference.Spanish:
      return 'Español'
    default:
      return 'Idioma no configurado'
  }
}

/**
 * Formats a date string to display only the day and month in a localized format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export function getBirthday (dateString: string | null | undefined): string {
  if (dateString === null || dateString === undefined) return 'No registrado'
  const date = new Date(dateString)
  const options = { day: '2-digit', month: 'long' } as const
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}

/**
 * Converts a date string to an ISO format date string "yyyy-MM-dd".
 * Returns undefined if the date is null or undefined.
 *
 * @param dateString - The date in string format.
 * @returns The date in "yyyy-MM-dd" format or undefined if the input is invalid.
 */
export function formatDateToYMD (dateString: string) {
  if (dateString === undefined) {
    return undefined
  }

  const date = new Date(dateString)
  return isNaN(date.getTime()) ? undefined : date.toISOString().split('T')[0]
}

/**
 * Transforms a date string from "yyyy-MM-dd" format into a Date object.
 * This can be useful for creating Date objects from inputs of type 'date' in forms.
 *
 * @param value - The date string in "yyyy-MM-dd" format.
 * @returns A Date object representing the date specified in the input string.
 */
export function formatDateForInputDate (value: string) {
  const dateParts = value.split('-')
  const year = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1
  const day = parseInt(dateParts[2])
  return new Date(year, month, day)
}

/**
 * Formats a numeric string into a number format with two decimal places.
 * @param numStr - The numeric string to format.
 * @returns The formatted numeric string with two decimal places, or an empty string if the input is not a valid number.
 */
export function formatNumber (numStr: string) {
  const num = parseFloat(numStr)
  return isNaN(num) ? '' : num.toFixed(2)
}

/**
 * Gets the name of a permission based on the module code.
 * @param permission - The module code for the permission.
 * @returns The name of the permission as a string.
 */
export function getPermissionName (permission: ModulesType): string {
  switch (permission) {
    case ModulesType.UsersManagement:
      return 'Gestión de Usuarios'
    case ModulesType.UsersManagementAdmins:
      return 'Administradores'
    case ModulesType.UsersManagementRoles:
      return 'Roles'
    case ModulesType.UsersManagementClients:
      return 'Usuarios'
    case ModulesType.PublicationsManagement:
      return 'Gestión de Publicaciones'
    case ModulesType.PublicationsManagementProducts:
      return 'Gestión de Productos'
    case ModulesType.PublicationsManagementAuctions:
      return 'Gestión de Subastas'
    case ModulesType.PublicationsManagementLots:
      return 'Gestión de Lotes'
    case ModulesType.CustomsAgents:
      return 'Agentes aduaneros'
    case ModulesType.AppConfig:
      return 'Configuraciones App'
    case ModulesType.CategoriesManagement:
      return 'Gestión de Categorías'
    case ModulesType.CategoriesManagementCountries:
      return 'Países'
    case ModulesType.CategoriesManagementCities:
      return 'Ciudades'
    case ModulesType.CategoriesManagementVehicleTypes:
      return 'Tipo de vehículos'
    case ModulesType.CategoriesManagementBrands:
      return 'Marcas'
    case ModulesType.CategoriesManagementModels:
      return 'Modelos'
    case ModulesType.CategoriesManagementSubModels:
      return 'Sub modelos'
    case ModulesType.ShippingManagement:
      return 'Gestión de Envíos'
    case ModulesType.ShippingManagementOrders:
      return 'Pedidos'
    case ModulesType.ShippingManagementHistory:
      return 'Historial'
    case ModulesType.ShippingManagementNotifications:
      return 'Notificaciones'
    case ModulesType.AccountConfiguration:
      return 'Configuración de cuenta'
    default:
      return 'Sin nombre'
  }
}

/**
 * Transforms an empty string into null.
 * @param value - The value to transform.
 * @returns The original string if not empty, otherwise, returns null.
 */
export function transformEmptyStringToNull (value: string): string | null {
  if (value === '') {
    return null
  } else {
    return value
  }
}

/**
 * Formats a full date string into a localized date format.
 * @param dateString - The date string to format.
 * @returns The formatted date string in a localized format "day of Month of Year".
 */
export function formatFullDate (dateString: string | null | undefined): string {
  if (dateString === null || dateString === undefined) {
    return 'No registrado'
  }
  const date = new Date(dateString)
  const options = { day: '2-digit', month: 'long', year: 'numeric' } as const
  const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date)
  return `${formattedDate.slice(0, -4)} ${formattedDate.slice(-4)}`
}

export function isSameDate (dateString: string) {
  const currentDate = new Date()

  const dbDate = new Date(dateString)

  const isSame =
    currentDate.getFullYear() === dbDate.getFullYear() &&
    currentDate.getMonth() === dbDate.getMonth() &&
    currentDate.getDate() === dbDate.getDate()
  return isSame
}

export function formatPrice (number: number): string {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(number)

  return formattedPrice
}

export function calculateWeeksOfAntiquity (date: string): number {
  const currentDate = new Date()
  const givenDate = new Date(date)

  // Calculate the difference in milliseconds between the two dates
  const differenceInMilliseconds = currentDate.getTime() - givenDate.getTime()

  // Convert the difference in milliseconds to weeks
  const weeksOfAntiquity = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  )

  return weeksOfAntiquity
}

export function convertISOToLocalAndFormat (isoString: string) {
  // Create a Date object from the ISO 8601 string

  const utcDate = new Date(isoString)

  // Get the time zone offset in minutes
  const offsetMinutes = utcDate.getTimezoneOffset()

  // Adjust the UTC date by adding the offset in minutes
  const localDate = new Date(utcDate.getTime() + offsetMinutes * 60000)
  // Get the local time in hours and minutes
  const localHours = localDate.getHours()
  const localMinutes = localDate.getMinutes()

  // Format the local time as a string in the desired format ('HH:mm')
  const formattedTime = `${localHours < 10 ? '0' : ''}${localHours}:${
    localMinutes < 10 ? '0' : ''
  }${localMinutes}`
  return formattedTime
}

export function getCheckListStatus (status: CheckListStatus | undefined) {
  if (status === undefined || status === null) {
    return NO_REGISTER
  }
  if (status === CheckListStatus.NoApplicable) {
    return 'No aplicable'
  }
  if (status === CheckListStatus.Good) {
    return 'Bueno'
  }
  if (status === CheckListStatus.Regular) {
    return 'Regular'
  }
  if (status === CheckListStatus.Bad) {
    return 'Malo'
  }
  return status
}

export function getStatusAuctionLot (data: PublicationAuction | undefined) {
  if (data === undefined) return 'Sin estado'
  const status = data.type_status.type_name
  if (status === TypeAuctionStatus.Active) {
    return 'Activo'
  }
  if (status === TypeAuctionStatus.InProgress) {
    return 'En progreso'
  }

  if (status === TypeAuctionStatus.Pending) {
    return 'Pendiente'
  }

  if (status === TypeAuctionStatus.Awarded) {
    return 'Adjudicado'
  }

  if (status === TypeAuctionStatus.NoBidder) {
    return 'Sin postor'
  }
  return 'Sin estado'
}
