import { type ReceivingPortData } from './address'
import { type WithId } from './auth'
import { type CountryListItem } from './country'
import { type FileProfiles } from './user'

export type CustomAgentsResponse = {
  approved: boolean
  availability_hours: string
  company_address: string
  company_contact: string
  company_informations: CompanyInformations | null
  company_name: string
  contact_commercial_references: string
  country: CountryListItem
  createdAt: Date
  description: string
  email: string
  expiration_date: string | null
  file_certificate: number
  file_certificate_data: FilesAgent | null
  granting_entity: string | null
  idcompany_information: number
  idcountry: number
  idcustoms_agent: number
  identification_document: string
  idreceiving_port: number
  idrequired_documentation: number
  iduser: null
  iduser_admin: number | null
  idwork_experience: number
  legal_registration_number: string
  name: string
  name_commercial_references: string
  nationality: string
  phone_number_2: string
  phone_number: string
  physical_address: string
  profile_gallery: FilesAgent | null
  profile_idgallery: number
  receiving_port: ReceivingPortData
  rejection_reason: null
  required_documentations: RequiredDocumentations | null
  surname: string
  tax_identification_number: string
  type_of_service: string
  updatedAt: Date
  work_experiences: WorkExperiences | null
}

export type FilesAgent = {
  idgallery: number
  files: FileProfiles[]
}

export type WorkExperiences = {
  idwork_experience: number
  company: string | null
  position: string | null
  start_date: string
  end_date: string
  description: string | null
  job_references: string | null
  contract_reference_contact: string | null
  reference_contact_number: string | null
  createdAt: Date
  updatedAt: Date
}

export type CompanyInformations = {
  idbusiness_information: number
  company_name: string | null
  legal_registration: string | null
  information_contact: string | null
  company_tax_identification: string | null
  bank_account: string | null
  bank_name: string | null
  account_type: string | null
  swift_code: string | null
  company_phone_number: string | null
  description: string | null
  company_description: string | null
  service_type: string | null
  createdAt: Date
  updatedAt: Date
}

export type RequiredDocumentations = {
  idrequired_documentation: number
  license_or_authorization: string | null
  date_of_issue: string
  license_expiration: string
  licensing_entity: string | null
  areas_of_expertise: string | null
  education_level: string | null
  idadditional_certifications: null
  language: string | null
  language_two: string | null
  createdAt: Date
  updatedAt: Date
}

export type AgentDataType = CustomAgentsResponse & WithId
