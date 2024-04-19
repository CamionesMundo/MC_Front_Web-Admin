import {
  type Sex,
  type AddressType,
  type LanguagePreference
} from '@/types/enums'
import { type CountryListItem, type CityListItem } from './country'

export interface AddressBaseData {
  idaddress: number
  alias_address: string | null
  postal_code: string | null
  address: string | null
  main_address: boolean | undefined
  idcity: number | null
  iduser: number | null
  idreceiving_port: number | null
  type_address: AddressType
  active: boolean
  city: CityData
  receiving_port: ReceivingPortData | undefined
  user: UserAddress
}

export interface ReceivingPortData {
  idreceiving_port: number
  name: string
  idcountry: number
  country: CountryListItem
}

export interface CountryData {
  idcountry: number | null
  country_name: string | null
  country_name_en: string | null
  country_name_es: string | null
  country_code: string | null
  code: string | null
}

export interface UserAddress {
  iduser: number
  username: string | null
  email: string | null
  name: string | null
  surname: string | null
  phone_number: string | null
  document_number: string | null
  approved: boolean
  sex: Sex
  active: boolean
  rate_star: number | null
  idaddress: number | null
  lang: LanguagePreference | null
}

export interface CityData extends CityListItem {
  country: CountryListItem
}

export interface DeliveryAddress extends AddressBaseData {}
export interface CompanyAddress extends AddressBaseData {}
export interface BillingAddress extends AddressBaseData {}
export interface LegalRepresentativeAddress extends AddressBaseData {}

export interface AddressResponse {
  deliveryAddress: DeliveryAddress[]
  companyAddresses: CompanyAddress[]
  billingAddress: BillingAddress[]
  legalRepresentativeAddress: LegalRepresentativeAddress[]
}
