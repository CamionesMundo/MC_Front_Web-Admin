import { type CountryData, type ReceivingPortData } from './address'
import { type WithId } from './auth'
import { type FileProfiles } from './user'

export type CustomAgentsResponse = {
  idcustoms_agent: number
  nationality: string
  identification_document: string
  idcountry: number
  name: string
  surname: string
  email: string
  description: string
  phone_number: string
  phone_number_2: string
  physical_address: string
  availability_hours: string
  company_name: string
  company_address: string
  company_contact: string
  legal_registration_number: string
  tax_identification_number: string
  approved: boolean
  rejection_reason: null
  idrequired_documentation: number
  file_certificate: number
  iduser: null
  idcompany_information: number
  idreceiving_port: number
  idwork_experience: number
  type_of_service: string
  name_commercial_references: string
  contact_commercial_references: string
  profile_idgallery: number
  createdAt: Date
  updatedAt: Date
  receiving_port: ReceivingPortData
  country: CountryData
  profile_gallery: FilesAgent | null
}

export type FilesAgent = {
  idgallery: number
  files: FileProfiles[]
}

export type AgentDataType = CustomAgentsResponse & WithId
