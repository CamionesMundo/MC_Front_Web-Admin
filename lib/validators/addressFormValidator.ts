import {
  MAX_LENGTH,
  MAX_LENGTH_ADDRESS,
  MAX_LENGTH_ADDRESS_MESSAGE,
  MAX_LENGTH_MESSAGE
} from '@/const/other'
import { z } from 'zod'
import { REGEX_ALIAS_ADDRESS, REGEX_POSTAL_CODE } from './regex'

export const addressFormSchema = z.object({
  alias: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
    .refine((value) => REGEX_ALIAS_ADDRESS.test(value.trim()), {
      message: 'Sólo letras y números'
    })
    .optional(),
  address: z
    .string()
    .max(MAX_LENGTH_ADDRESS, { message: MAX_LENGTH_ADDRESS_MESSAGE })
    .optional(),
  postalCode: z
    .string()
    .refine((value) => REGEX_POSTAL_CODE.test(value.trim()), {
      message: 'Ingrese un código postal válido'
    })
    .optional(),
  idcity: z
    .number()
    .int({
      message: 'Ciudad no válida'
    })
    .refine((id) => id > 0, { message: 'Debes seleccionar una ciudad' }),
  idReceivingPort: z
    .number()
    .int({
      message: 'Puerto no válido'
    })
    .refine((id) => id > 0, { message: 'Debes seleccionar un puerto' })
    .optional()
})
