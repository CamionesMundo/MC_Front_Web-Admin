import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecoveryPasswordStoreState {
  currentEmail: string
}

interface RecoveryPasswordStoreActions {
  changeCurrentEmail: (email: string) => void
  reset: () => void
}

const initialState: RecoveryPasswordStoreState = {
  currentEmail: ''
}

export const useRecoveryPasswordStore = create(
  persist<RecoveryPasswordStoreState & RecoveryPasswordStoreActions>(
    (set) => ({
      ...initialState,
      changeCurrentEmail: (email: string) => {
        set(() => ({
          currentEmail: email
        }))
      },
      reset: () => {
        set(initialState)
      }
    }),
    { name: 'currentEmail' }
  )
)
