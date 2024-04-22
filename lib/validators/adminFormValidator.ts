import { z } from 'zod'

export const adminFormSchema = z.object({
  name: z.string().min(6, 'Mínimo 6 caracteres'),
  email: z.string().email('Ingrese un correo válido').optional(),
  password: z
    .string()
    .regex(/.*[A-Z].*/, 'Almenos una mayúscula')
    .regex(/.*[a-z].*/, 'Almenos una minúscula')
    .regex(/.*\d.*/, 'Almenos un número')
    .min(8, 'Mínimo 8 caracteres').optional(),
  role: z.string().optional()
})
