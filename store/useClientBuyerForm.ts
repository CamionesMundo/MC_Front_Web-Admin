import { type Sex } from '@/types/enums'
import {
  type BuyerProfileFormData,
  type GenderSelect
} from '@/types/store/client'
import { create } from 'zustand'

export type BuyerActiveToggle = {
  isActive: boolean
}

interface BuyerProfileStoreState extends BuyerProfileFormData {}
interface GenderSelectStoreState extends GenderSelect {}
interface BuyerActiveToggleStoreState extends BuyerActiveToggle {}

interface BuyerActions {
  setBuyerData: (data: BuyerProfileFormData) => void
  toggleActive: () => void
  changeSelection: (value: Sex | undefined) => void
  resetBuyer: () => void
}

const initialStateData: BuyerProfileStoreState = {
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

const initialActiveStateData: BuyerActiveToggleStoreState = {
  isActive: false
}

export const useBuyerProfileFormStore = create<
BuyerProfileStoreState &
GenderSelectStoreState &
BuyerActiveToggleStoreState &
BuyerActions
>((set) => ({
  ...initialStateData,
  ...initialGenderStateData,
  ...initialActiveStateData,
  setBuyerData: (data) => {
    set((prevState) => ({
      ...prevState,
      ...data
    }))
  },
  toggleActive: () => {
    set((state) => ({
      ...state,
      isActive: !state.isActive
    }))
  },
  changeSelection: (value) => {
    set((state) => ({
      ...state,
      sex: value
    }))
  },
  resetBuyer: () => {
    set({
      ...initialStateData,
      ...initialGenderStateData,
      ...initialActiveStateData
    })
  }
}))
