import {
  COUNTRY_MESSAGE,
  MAX_LENGTH,
  MAX_LENGTH_ADDRESS,
  MAX_LENGTH_ADDRESS_MESSAGE,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_DESCRIPTION_MESSAGE,
  MAX_LENGTH_IDENTITY_DOCUMENT,
  MAX_LENGTH_IDENTITY_DOCUMENT_MESSAGE,
  MAX_LENGTH_MESSAGE,
  MAX_LENGTH_NUMBER_PHONE,
  MAX_LENGTH_NUMBER_PHONE_MESSAGE,
  MIN_LENGTH_NUMBER,
  MIN_LENGTH_NUMBER_MESSAGE,
  ONLY_NUMBER_MESSAGE,
  PORT_MESSAGE,
  REQUIRED
} from '@/const/other'
import { z } from 'zod'
import { REGEX_NUMBER_PHONE } from './regex'

export const agentProfileFormSchema = z.object({
  // Profile
  name: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  surname: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  email: z.string().email('Ingrese un correo válido'),
  phoneNumber: z
    .string()
    .min(MIN_LENGTH_NUMBER, { message: MIN_LENGTH_NUMBER_MESSAGE })
    .max(MAX_LENGTH_NUMBER_PHONE, { message: MAX_LENGTH_NUMBER_PHONE_MESSAGE })
    .startsWith('+', { message: 'Código de país inicia con "+"' }),
  additionalPhoneNumber: z
    .string()
    .min(MIN_LENGTH_NUMBER, { message: MIN_LENGTH_NUMBER_MESSAGE })
    .max(MAX_LENGTH_NUMBER_PHONE, { message: MAX_LENGTH_NUMBER_PHONE_MESSAGE })
    .startsWith('+', { message: 'Código de país inicia con "+"' }),
  documentNumber: z
    .string()
    .min(MIN_LENGTH_NUMBER, { message: MIN_LENGTH_NUMBER_MESSAGE })
    .max(MAX_LENGTH_IDENTITY_DOCUMENT, { message: MAX_LENGTH_IDENTITY_DOCUMENT_MESSAGE })
    .refine((value) => REGEX_NUMBER_PHONE.test(value.trim()), {
      message: ONLY_NUMBER_MESSAGE
    }),
  nationality: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  education: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  expertise: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  availability: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  license: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  emissionDate: z.string(),
  dueDate: z.string(),
  grantingEntity: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  language1: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  language2: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  // Company
  companyName: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  personContact: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  companyPhoneNumber: z
    .string()
    .min(MIN_LENGTH_NUMBER, { message: MIN_LENGTH_NUMBER_MESSAGE })
    .max(MAX_LENGTH_NUMBER_PHONE, { message: MAX_LENGTH_NUMBER_PHONE_MESSAGE })
    .startsWith('+', { message: 'Código de país inicia con "+"' }),
  legalNumber: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH_IDENTITY_DOCUMENT, { message: MAX_LENGTH_IDENTITY_DOCUMENT_MESSAGE }),
  taxIdentification: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH_IDENTITY_DOCUMENT, { message: MAX_LENGTH_IDENTITY_DOCUMENT_MESSAGE }),
  addressCompany: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH_ADDRESS, { message: MAX_LENGTH_ADDRESS_MESSAGE }),
  serviceType: z
    .string()
    .min(1, { message: REQUIRED })
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  description: z
    .string()
    .max(MAX_LENGTH_DESCRIPTION, { message: MAX_LENGTH_DESCRIPTION_MESSAGE }),
  // References
  commercialReference: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  contactReference: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  contactNumberReference: z
    .string()
    .max(MAX_LENGTH_NUMBER_PHONE, { message: MAX_LENGTH_NUMBER_PHONE_MESSAGE }),
  // Bank
  bankName: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  bankAccount: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  typeAccount: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  swiftCode: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  // WorkExperience
  companyExperience: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  position: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  initDate: z.string(),
  endDate: z.string(),
  workReference: z.string().max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  workContactReference: z
    .string()
    .max(MAX_LENGTH, { message: MAX_LENGTH_MESSAGE }),
  jobDescription: z
    .string()
    .max(MAX_LENGTH_DESCRIPTION, { message: MAX_LENGTH_DESCRIPTION_MESSAGE }),
  // Additional
  idCountry: z
    .number()
    .int({
      message: COUNTRY_MESSAGE
    })
    .refine((id) => id > 0, { message: 'Debes seleccionar un país' }),
  idReceivingPort: z
    .number()
    .int({
      message: PORT_MESSAGE
    })
    .refine((id) => id > 0, { message: 'Debes seleccionar un puerto' })
})
