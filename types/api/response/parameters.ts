import { type AppParametersType } from '@/types/enums'

export interface AppParameterResponse {
  idparameter: AppParametersType
  name: string
  value: string | null
  value_str: string | null
  createdAt: Date | null
  updatedAt: Date | null
}
