import { type Sex } from '../enums'

export type BuyerProfileFormData = {
  name: string
  surname: string
  email: string
  idCountry: number | undefined
  phoneNumber: string
  documentNumber: string
  birthdate: string | undefined | null
}

export type SellerProfileFormData = {
  website: string
  rut: string | undefined | (readonly string[] & string)
  companyName: string | undefined | (readonly string[] & string)
  companyEmail: string | undefined | (readonly string[] & string)
  companyPhoneNumber: string | undefined | (readonly string[] & string)
}

export type GenderSelect = {
  sex: Sex | undefined
}
