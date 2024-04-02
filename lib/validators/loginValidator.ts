import { z } from 'zod'

export const loginSchema = z.object({
  password: z.string().min(9, {
    message: 'La contraseña debe tener como mínimo 9 caracteres'
  }),
  email: z.string().email('Ingrese un correo válido')
})
