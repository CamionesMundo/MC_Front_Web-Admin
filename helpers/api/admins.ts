import { BASE_ADMIN_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateAdminForm,
  type BodyAdminForm
} from '@/types/api/request'
import {
  type UserDataResponse,
  type UserResponse
} from '@/types/api/response/auth'

export const getAllAdmins = async () => {
  try {
    const res = await api.get<GenericResponse<UserResponse[]>>(BASE_ADMIN_URL)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAdminById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<UserResponse>>(
      `${BASE_ADMIN_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createAdmin = async (body: BodyAdminForm) => {
  const res = await api.post<GenericResponse<UserDataResponse>>(
    BASE_ADMIN_URL,
    body
  )

  const { data } = res

  return data
}

export const updateAdmin = async (id: number, body: BodyUpdateAdminForm) => {
  try {
    const res = await api.put<GenericResponse<UserResponse>>(
      `${BASE_ADMIN_URL}/id/${id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
