import { type ReceivingPortData } from '@/types/api/response/address'
import { type CountryListItem } from '@/types/api/response/country'
import {
  type CustomAgentProfileData,
  type CustomAgentFormData,
  type CustomAgentCompanyData,
  type CustomAgentBankData,
  type CustomAgentWorkExperienceData,
  type CustomAgentReferencesData,
  type FilesSelected
} from '@/types/store/custom-agents'
import { create } from 'zustand'
import { type AdminFormData } from './useAdminForm'

interface CustomAgentStoreState extends CustomAgentFormData {}
interface CountryStoreState {
  currentCountry: CountryListItem | null | undefined
}

interface PortStoreState {
  currentPort: ReceivingPortData | null | undefined
}

interface FilesCertificateState {
  documents: FilesSelected[]
}

interface IdGalleryState {
  idGallery: number | undefined
}
interface StepState {
  currentStep: number
}

interface AgentAdminFormToggles {
  showPassword: boolean
}

interface CustomAgentActions {
  updateProfileData: (data: Partial<CustomAgentProfileData>) => void
  updateCompanyData: (data: Partial<CustomAgentCompanyData>) => void
  updateReferencesData: (data: Partial<CustomAgentReferencesData>) => void
  updateBankData: (data: Partial<CustomAgentBankData>) => void
  updateWorkExperienceData: (
    data: Partial<CustomAgentWorkExperienceData>
  ) => void
  updateAdminData: (data: Partial<AdminFormData>) => void
  reset: () => void
  updateCountry: (country: CountryListItem | undefined) => void
  updatePort: (country: ReceivingPortData | undefined) => void
  updateIdGallery: (id: number | undefined) => void
  updateFilesCertificates: (filesSelected: FilesSelected[]) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  togglePassword: () => void
}

const initialCountryState: CountryStoreState = {
  currentCountry: null
}
const initialPortState: PortStoreState = {
  currentPort: null
}
const initialIdGalleryState: IdGalleryState = {
  idGallery: undefined
}
const initialStepState: StepState = {
  currentStep: 1
}
const initialStatePassword: AgentAdminFormToggles = {
  showPassword: false
}
const initialStateFiles: FilesCertificateState = {
  documents: []
}
const initialStateData: CustomAgentStoreState = {
  profileData: {
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    documentNumber: '',
    nationality: '',
    education: '',
    expertise: '',
    availability: '',
    license: '',
    emissionDate: '',
    dueDate: '',
    grantingEntity: '',
    language1: '',
    language2: ''
  },
  companyData: {
    companyName: '',
    personContact: '',
    companyPhoneNumber: '',
    legalNumber: '',
    taxIdentification: '',
    addressCompany: '',
    serviceType: '',
    description: ''
  },
  referencesData: {
    commercialReference: '',
    contactReference: ''
  },
  bankData: {
    bankName: '',
    bankAccount: '',
    typeAccount: '',
    swiftCode: ''
  },
  workExperienceData: {
    companyExperience: '',
    position: '',
    initDate: '',
    endDate: '',
    workReference: '',
    workContactReference: '',
    jobDescription: '',
    contactNumberReference: ''
  },
  adminFormData: {
    name: '',
    email: '',
    password: ''
  }
}

export const useCustomAgentFormStore = create<
CustomAgentStoreState &
CustomAgentActions &
CountryStoreState &
PortStoreState &
IdGalleryState &
StepState &
FilesCertificateState &
AgentAdminFormToggles
>((set) => ({
  ...initialStateData,
  ...initialCountryState,
  ...initialPortState,
  ...initialIdGalleryState,
  ...initialStepState,
  ...initialStatePassword,
  ...initialStateFiles,
  updateProfileData: (data) => {
    set((state) => ({
      ...state,
      profileData: { ...state.profileData, ...data }
    }))
  },
  updateCompanyData: (data) => {
    set((state) => ({
      ...state,
      companyData: { ...state.companyData, ...data }
    }))
  },
  updateReferencesData: (data) => {
    set((state) => ({
      ...state,
      referencesData: { ...state.referencesData, ...data }
    }))
  },
  updateBankData: (data) => {
    set((state) => ({ ...state, bankData: { ...state.bankData, ...data } }))
  },
  updateWorkExperienceData: (data) => {
    set((state) => ({
      ...state,
      workExperienceData: { ...state.workExperienceData, ...data }
    }))
  },
  updateAdminData: (data) => {
    set((state) => ({
      ...state,
      adminFormData: { ...state.adminFormData, ...data }
    }))
  },
  updateCountry: (country) => {
    set((state) => ({
      ...state,
      currentCountry: country
    }))
  },
  updatePort: (port) => {
    set((state) => ({
      ...state,
      currentPort: port
    }))
  },
  updateIdGallery: (id) => {
    set((state) => ({
      ...state,
      idGallery: id
    }))
  },
  updateFilesCertificates: (filesSelected) => {
    set((state) => ({
      ...state,
      documents: filesSelected
    }))
  },
  goToNextStep: () => {
    set((state) => ({
      ...state,
      currentStep: state.currentStep + 1
    }))
  },
  goToPreviousStep: () => {
    set((state) => ({
      ...state,
      currentStep: state.currentStep - 1
    }))
  },
  reset: () => {
    set({
      ...initialStateData,
      ...initialCountryState,
      ...initialPortState,
      ...initialIdGalleryState,
      ...initialStepState,
      ...initialStatePassword,
      ...initialStateFiles
    })
  },
  togglePassword: () => {
    set((state) => ({
      ...state,
      showPassword: !state.showPassword
    }))
  }
}))
