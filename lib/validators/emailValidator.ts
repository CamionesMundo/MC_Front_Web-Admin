import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('Ingrese un correo válido')
})
