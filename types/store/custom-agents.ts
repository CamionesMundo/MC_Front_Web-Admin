import { type AdminFormData } from '@/store/useAdminForm'

export type CustomAgentFormData = {
  profileData: CustomAgentProfileData
  companyData: CustomAgentCompanyData
  referencesData: CustomAgentReferencesData
  bankData: CustomAgentBankData
  workExperienceData: CustomAgentWorkExperienceData
  adminFormData: AdminFormData
}

export type CustomAgentProfileData = {
  name: string
  surname: string
  email: string
  phoneNumber: string
  additionalPhoneNumber: string
  documentNumber: string
  nationality: string
  education: string
  expertise: string
  availability: string
  license: string
  emissionDate: string
  dueDate: string
  grantingEntity: string
  language1: string
  language2: string
}

export type CustomAgentCompanyData = {
  companyName: string
  personContact: string
  companyPhoneNumber: string
  legalNumber: string
  taxIdentification: string
  addressCompany: string
  serviceType: string
  description: string
}

export type CustomAgentReferencesData = {
  commercialReference: string
  contactReference: string
}

export type CustomAgentBankData = {
  bankName: string
  bankAccount: string
  typeAccount: string
  swiftCode: string
}

export type CustomAgentWorkExperienceData = {
  companyExperience: string
  position: string
  initDate: string
  endDate: string
  workReference: string
  workContactReference: string
  jobDescription: string
  contactNumberReference: string
}
