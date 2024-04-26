import api from '@/lib/axios/axios-client'
import { BASE_AGENTS_URL } from '@/const/base-url'
import { type GenericResponse } from '@/types/api'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'

export const getAllCustomAgents = async () => {
  try {
    const res = await api.get<GenericResponse<CustomAgentsResponse[]>>(
      BASE_AGENTS_URL
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
