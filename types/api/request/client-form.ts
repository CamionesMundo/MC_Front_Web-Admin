import { type AddressType } from '@/types/enums'
import { type BaseUserData } from '../response/user'

export type BodyActiveUserApp = {
  id: number
  active: boolean
}

export type BodyActiveSeller = {
  id: number
  approved: boolean
}

export type DataUpdateUser = Pick<
BaseUserData,
'name' | 'surname' | 'phone_number' | 'sex' | 'document_number' | 'file_profile_picture' | 'file_profiles'
> & { birthdate?: string | null | undefined }

export type BodyUpdateUser = {
  id: number | undefined
  data: DataUpdateUser
}

export type DataUpdateSeller = {
  website?: string | null
  company_name?: string | null
  company_email?: string | null
  company_phone?: string | null
  number_rut?: string | null
  idcity: number | undefined
  whatsapp_number: boolean | undefined
  postal_code: string | undefined
  address: string | undefined
}

export type BodyUpdateSeller = {
  id: number | undefined
  data: DataUpdateSeller
}

export type DataAddress = {
  postal_code: string | undefined
  alias_address: string | undefined
  address: string | undefined
  idreceiving_port?: number | undefined
  main_address?: boolean | undefined
  idcity: number
  type_address: AddressType
  active: boolean
}
export type BodyAddress = {
  id: number | undefined // on Create is idUser, on Edit is id Address.
  data: DataAddress
}

export type UserFilter = {
  page: number
  pageSize: number
  query: string
  userType: number
}
