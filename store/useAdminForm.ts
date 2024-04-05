import { create } from 'zustand'

export type AdminFormData = {
  name: string
  email: string
  password: string
}

export type AdminFormSelectData = {
  role: string | undefined
}

export type AdminFormToggles = {
  showPassword: boolean
}

interface AdminFormStoreState extends AdminFormData {}
interface AdminFormSelectStoreState extends AdminFormSelectData {}
interface AdminFormToggleStoreState extends AdminFormToggles {}

interface AdminFormStoreActions {
  setData: (data: AdminFormData) => void
  togglePassword: () => void
  changeSelection: (value: string | undefined) => void
  reset: () => void
}

const initialStateData: AdminFormStoreState = {
  name: '',
  email: '',
  password: ''
}

const initialSelectStateData: AdminFormSelectStoreState = {
  role: undefined
}

const initialStateToggleData: AdminFormToggleStoreState = {
  showPassword: false
}

export const useAdminFormStore = create<
AdminFormStoreState &
AdminFormSelectStoreState &
AdminFormToggles &
AdminFormStoreActions
>((set) => ({
  ...initialStateData,
  ...initialSelectStateData,
  ...initialStateToggleData,
  setData: (data) => {
    set((prevState) => ({
      ...prevState,
      ...data
    }))
  },
  togglePassword: () => {
    set((state) => ({
      ...state,
      showPassword: !state.showPassword
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
      ...initialSelectStateData,
      ...initialStateToggleData
    })
  }
}))
