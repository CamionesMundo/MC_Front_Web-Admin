import { type UserType, type Sex } from '@/types/enums'
import { type WithId } from './auth'

export interface BaseUserData {
  iduser: number
  username: string
  email: string
  name: string
  surname: string | null
  phone_number: string | null
  document_type: DocumentType | null
  document_number: string | null
  user_type: UserType
  approved: boolean
  file_profile_picture: number | null
  accept_terms: boolean
  birthdate: Date | null
  sex: Sex | null
  active: boolean
  comment: string | null
  idcountry: number | null
  idaddress: number | null
  createdAt: Date
  updatedAt: Date
  file_profiles: FileProfiles | null
  country: Country | null
  address: Address | null
}

export interface FileProfiles {
  url: string
}
export interface UserClientResponse extends BaseUserData {}

export type ClientDataType = UserClientResponse & WithId

export interface LegalRepresentativeResponse extends BaseUserData {}

export type Address = {
  idaddress: number
  postal_code: string
  address: string
  main_address: boolean
  idcity: number
  iduser: number
  createdAt: Date
  updatedAt: Date
  city: City | null
}

export type City = {
  city_name: string
  country: Country
}

export type Country = {
  country_name: string
}

export type UserAppType = {
  key: UserType
  display: string
}

export type SellerData = {
  idseller: number
  number_rut: string | null
  website: string
  approved: boolean
  whatsapp_number: boolean
  company_name: string | null
  company_email: string | null
  company_phone: string | null
  iduser: number
  idaddress: number
  file_company_constitution: number | null
  file_identity_verification: number
  type_seller: number
  idlegal_representative: number
  createdAt: Date
  updatedAt: Date
  legal_representative: LegalRepresentativeResponse
}

export type ClientResponse = UserClientResponse & {
  seller: SellerData | null
}
