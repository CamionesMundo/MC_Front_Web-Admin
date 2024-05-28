import { ModulesType } from '@/types/enums'
import { create } from 'zustand'

export type PermissionsFormData = {
  [key in ModulesType]: boolean
}

const generateInitialState = (): PermissionsFormData => {
  const initialState: Partial<PermissionsFormData> = {}
  Object.values(ModulesType).forEach((module) => {
    initialState[module as ModulesType] = false
  })
  return initialState as PermissionsFormData
}

interface PermissionStoreState extends PermissionsFormData {
  setData: (module: ModulesType | string, value: boolean) => void
  reset: () => void
}

export const usePermissionFormStore = create<PermissionStoreState>((set) => ({
  ...generateInitialState(),
  setData: (module, value) => {
    set((prevState) => ({
      ...prevState,
      [module]: value
    }))
  },
  reset: () => {
    set(generateInitialState())
  }
}))

export default usePermissionFormStore
