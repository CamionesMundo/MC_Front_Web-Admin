import { create } from 'zustand'

export type UpdatePasswordData = {
  password: string
  confirmPassword: string
}

export type UpdatePasswordToggles = {
  showPassword: boolean
  showConfirmPassword: boolean
}

interface UpdatePasswordStoreState extends UpdatePasswordData {}
interface UpdatePasswordToggleStoreState extends UpdatePasswordToggles {}

interface UpdatePasswordStoreActions {
  setData: (data: UpdatePasswordData) => void
  togglePassword: () => void
  toggleConfirmPassword: () => void
  reset: () => void
}

const initialStateData: UpdatePasswordStoreState = {
  password: '',
  confirmPassword: ''
}

const initialStateToggleData: UpdatePasswordToggleStoreState = {
  showPassword: false,
  showConfirmPassword: false
}

export const useUpdatePasswordStore = create<
UpdatePasswordStoreState & UpdatePasswordToggles & UpdatePasswordStoreActions
>((set) => ({
  ...initialStateData,
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
  toggleConfirmPassword: () => {
    set((state) => ({
      ...state,
      showConfirmPassword: !state.showConfirmPassword
    }))
  },
  reset: () => {
    set({ ...initialStateData, ...initialStateToggleData })
  }
}))
