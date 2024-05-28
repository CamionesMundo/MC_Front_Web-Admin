import { type Sex } from '@/types/enums'
import {
  type GenderSelect,
  type BuyerProfileFormData
} from '@/types/store/client'
import { create } from 'zustand'

export interface LegalProfileStoreState
  extends BuyerProfileFormData {}
interface GenderSelectStoreState extends GenderSelect {}

interface LegalProfileActions {
  setLegalData: (data: LegalProfileStoreState) => void
  changeSelection: (value: Sex | undefined) => void
  resetLegal: () => void
}

const initialStateData: LegalProfileStoreState = {
  name: '',
  surname: '',
  email: '',
  idCountry: undefined,
  phoneNumber: '',
  documentNumber: '',
  birthdate: ''
}

const initialGenderStateData: GenderSelectStoreState = {
  sex: undefined
}

export const useLegalProfileFormStore = create<
LegalProfileStoreState & GenderSelectStoreState & LegalProfileActions
>((set) => ({
  ...initialStateData,
  ...initialGenderStateData,
  setLegalData: (data) => {
    set((prevState) => ({
      ...prevState,
      ...data
    }))
  },
  changeSelection: (value) => {
    set((state) => ({
      ...state,
      sex: value
    }))
  },
  resetLegal: () => {
    set({
      ...initialStateData,
      ...initialGenderStateData
    })
  }
}))
