import { BASE_CLIENT_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type ClientResponse,
  type UserClientResponse
} from '@/types/api/response/user'

export const getAllAppUsers = async () => {
  try {
    const res = await api.get<GenericResponse<UserClientResponse[]>>(
      BASE_CLIENT_URL
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAppUserById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<ClientResponse>>(
      `${BASE_CLIENT_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
