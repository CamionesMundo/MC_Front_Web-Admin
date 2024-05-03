import { type BodyAdminForm } from '.'

export type CustomAgentRequest = {
  required_documentation: RequiredDocumentationRequest
  company_information: CompanyInformationRequest
  work_experience: WorkExperienceRequest
  name: string | null
  surname: string | null
  email: string | null
  phone_number: string | null
  phone_number_2: string | null
  physical_address: string | null
  availability_hours: string | null
  company_name: string | null
  company_address: string | null
  company_contact: string | null
  legal_registration_number: string | null
  tax_identification_number: string | null
  description: string | null
  approved: boolean
  file_certificate: number | null
  nationality: string | null
  identification_document: string | null
  idcountry: number
  idreceiving_port: number
  type_of_service: string | null
  name_commercial_references: string | null
  contact_commercial_references: string | null
  profile_idgallery: number | null
  iduser_admin: number | null | undefined
}

export type CompanyInformationRequest = {
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
}

export type RequiredDocumentationRequest = {
  license_or_authorization: string | null
  date_of_issue: string | null
  license_expiration: string | null
  licensing_entity: string | null
  areas_of_expertise: string | null
  education_level: string | null
  language: string | null
  language_two: string | null
}

export type WorkExperienceRequest = {
  company: string | null
  position: string | null
  start_date: string | null
  end_date: string | null
  description: string | null
  job_references: string | null
  contract_reference_contact: string | null
  reference_contact_number: string | null
}

export type AgentBodyRequest = {
  dataAgent: Omit<CustomAgentRequest, 'iduser_admin'>
  dataAdmin: BodyAdminForm
}

export type AgentUpdateBodyRequest = {
  idAgent: number | undefined
  data: CustomAgentRequest
}
