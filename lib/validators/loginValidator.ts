import { z } from 'zod'

export const loginSchema = z.object({
  password: z
    .string()
    .regex(/.*[A-Z].*/, 'Almenos una mayúscula')
    .regex(/.*[a-z].*/, 'Almenos una minúscula')
    .regex(/.*\d.*/, 'Almenos un número').min(8, 'Mínimo 8 caracteres'),
  email: z.string().email('Ingrese un correo válido')
})
