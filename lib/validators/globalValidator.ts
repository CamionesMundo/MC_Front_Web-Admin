import { MAX_LENGTH, MAX_LENGTH_MESSAGE } from '@/const/other'
import { z } from 'zod'
import { REGEX_NUMBER_PHONE } from './regex'

export const phoneSchema = z
  .string()
  .min(8, { message: 'Mínimo 8 caracteres' })
  .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE })
  .refine((value) => REGEX_NUMBER_PHONE.test(value.trim()), {
    message: 'Sólo espacios y números'
  })

export const floatNumberSchema = z
  .string()
  .refine((val) => !isNaN(parseFloat(val)), {
    message: 'El valor debe ser un número'
  })
  .refine((val) => parseFloat(val) > 0, {
    message: 'El valor debe ser mayor a cero'
  })

export const percentNumberSchema = z
  .string()
  .refine((val) => !isNaN(parseFloat(val)), {
    message: 'El valor debe ser un número'
  })
  .refine((val) => parseFloat(val) > 0, {
    message: 'El valor debe ser mayor a cero'
  })
  .refine((val) => parseFloat(val) < 101, {
    message: 'El valor debe ser menor a 100'
  })

export const booleanSchema = z.string().refine((val) => !isNaN(parseInt(val)), {
  message: 'El valor debe ser un número'
})

export const descriptionSchema = z
  .string()
  .min(8, { message: 'Mínimo 8 caracteres' })
  .max(1000, { message: 'Máximo 1000 caracteres' })
