import { create } from 'zustand'

export type AdminProfileFormData = {
  name: string
}

export type AdminProfileFormSelectData = {
  role: string | undefined
}

interface AdminProfileFormStoreState extends AdminProfileFormData {}
interface AdminProfileFormSelectStoreState extends AdminProfileFormSelectData {}

interface AdminFormStoreActions {
  setData: (data: AdminProfileFormData) => void
  changeSelection: (value: string | undefined) => void
  reset: () => void
}

const initialStateData: AdminProfileFormStoreState = {
  name: ''
}

const initialSelectStateData: AdminProfileFormSelectStoreState = {
  role: undefined
}

export const useAdminProfileFormStore = create<
AdminProfileFormStoreState &
AdminProfileFormSelectStoreState &
AdminFormStoreActions
>((set) => ({
  ...initialStateData,
  ...initialSelectStateData,
  setData: (data) => {
    set((prevState) => ({
      ...prevState,
      ...data
    }))
  },
  changeSelection: (value) => {
    set((state) => ({
      ...state,
      role: value
    }))
  },
  reset: () => {
    set({
      ...initialStateData,
      ...initialSelectStateData
    })
  }
}))
