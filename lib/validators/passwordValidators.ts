import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .regex(/.*[A-Z].*/, 'Almenos una mayúscula')
      .regex(/.*[a-z].*/, 'Almenos una minúscula')
      .regex(/.*\d.*/, 'Almenos un número')
      .min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z
      .string()
      .regex(/.*[A-Z].*/, 'Almenos una mayúscula')
      .regex(/.*[a-z].*/, 'Almenos una minúscula')
      .regex(/.*\d.*/, 'Almenos un número')
      .min(8, 'Mínimo 8 caracteres')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })
