import { create } from 'zustand'

export type LoginData = {
  email: string
  password: string
}

interface LoginStoreState extends LoginData {}

interface LoginStoreActions {
  setData: (data: LoginData) => void
  reset: () => void
}

const initialState: LoginStoreState = {
  email: '',
  password: ''
}

export const useLoginStore = create<LoginStoreState & LoginStoreActions>(
  (set) => ({
    ...initialState,
    setData: (data) => {
      set((prevState) => ({
        ...prevState,
        ...data
      }))
    },
    reset: () => {
      set(initialState)
    }
  })
)
