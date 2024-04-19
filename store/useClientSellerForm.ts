import { type SellerProfileFormData } from '@/types/store/client'
import { create } from 'zustand'

export type ApprovedToggle = {
  statusApproved: boolean
}

interface SellerProfileStoreState extends SellerProfileFormData {}

interface SellerActions {
  setSellerData: (data: SellerProfileFormData) => void
  resetSeller: () => void
}

const initialStateData: SellerProfileStoreState = {
  website: '',
  rut: '',
  companyName: '',
  companyEmail: '',
  companyPhoneNumber: ''
}

export const useSellerProfileFormStore = create<
SellerProfileStoreState & SellerActions
>((set) => ({
  ...initialStateData,
  setSellerData: (data) => {
    set((prevState) => ({
      ...prevState,
      ...data
    }))
  },
  resetSeller: () => {
    set({
      ...initialStateData
    })
  }
}))
