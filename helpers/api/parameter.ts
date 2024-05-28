import { BASE_PARAMETER_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BodyParameters } from '@/types/api/request/parameters'
import { type AppParameterResponse } from '@/types/api/response/parameters'

export const getAllParameters = async () => {
  try {
    const res = await api.get<GenericResponse<AppParameterResponse[]>>(
      BASE_PARAMETER_URL
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateParameter = async (body: BodyParameters) => {
  const { id } = body
  try {
    const res = await api.patch<GenericResponse<AppParameterResponse>>(
      `${BASE_PARAMETER_URL}/id/${id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
