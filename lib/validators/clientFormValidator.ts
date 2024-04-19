import {
  MAX_LENGTH,
  MAX_LENGTH_MESSAGE
} from '@/const/other'
import { z } from 'zod'
import { formatDateForInputDate } from '../utils/utils'

export const buyerFormSchema = z.object({
  name: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }).optional(),
  surname: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
    .optional(),
  documentNumber: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
    .optional(),
  phoneNumber: z.string().optional(),
  birthdate: z
    .string()
    .refine(
      (value) => {
        const date = formatDateForInputDate(value)
        return !isNaN(date.getTime())
      },
      { message: 'Fecha inválida' }
    )
    .optional()
})

export const sellerFormSchema = z.object({
  website: z
    .string()
    .url({ message: 'Url no válido' })
    .optional()
    .refine(
      (url) => {
        return (
          url !== undefined && (url.includes('https://') || url.includes('www'))
        )
      },
      { message: 'Por favor, introduce un sitio web válido' }
    ),
  rut: z.string().optional(),
  companyName: z.string().optional(),
  companyEmail: z.string().optional(),
  companyPhoneNumber: z.string().optional()
})

export const legalFormSchema = z.object({
  name: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }).optional(),
  surname: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
    .optional(),
  documentNumber: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
    .optional(),
  phoneNumber: z.string().optional(),
  birthdate: z
    .string()
    .refine(
      (value) => {
        const date = formatDateForInputDate(value)
        return !isNaN(date.getTime())
      },
      { message: 'Fecha inválida' }
    )
    .optional()
})
