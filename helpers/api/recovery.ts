import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdatePassword,
  type BodyRecoveryPassword
} from '@/types/api/request/recovery'
import { type UserResponse } from '@/types/api/response/auth'

export const recoveryPassword = async (body: BodyRecoveryPassword) => {
  const res = await api.post<GenericResponse<boolean>>(
    '/admin/recovery-password',
    body
  )

  const { data } = res

  return data
}

export const updatePassword = async (body: BodyUpdatePassword) => {
  const res = await api.post<GenericResponse<UserResponse>>(
    '/admin/update-password',
    body
  )
  const { data } = res

  return data
}
