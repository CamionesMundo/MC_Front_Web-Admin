import {
  type UserType,
  type Sex,
  type AccountType,
  type LanguagePreference
} from '@/types/enums'
import { type WithId } from './auth'
import { type FilesGallery } from './files'
import { type CityListItem, type CountryListItem } from './country'

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
  sex: Sex | undefined
  active: boolean
  comment: string | null
  idcountry: number | null
  idaddress: number | null
  createdAt: Date
  updatedAt: Date
  file_profiles: FileProfiles | null
  country: CountryListItem
  address: Address | null
  firebase_uid: FirebaseUID | null
  lang: LanguagePreference | null
}
export interface FirebaseUID {
  uid_reference: AccountType
}

export interface FileProfiles {
  url: string
  idfile?: number | undefined
  name?: string | undefined
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
  city: CityListItem | undefined
}

export type City = {
  idcity: number
  city_name: string
  idcountry: number
  createdAt: Date
  updatedAt: Date
}

export type Country = {
  country_name: string
  idcountry: number
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
  type_seller: UserType
  idlegal_representative: number
  createdAt: Date
  updatedAt: Date
  legal_representative: LegalRepresentativeResponse
  company_constitution_galleries: FilesGallery
  identity_verification_galleries: FilesGallery
  address: Address
}

export type ClientResponse = UserClientResponse & {
  seller: SellerData | null
}
