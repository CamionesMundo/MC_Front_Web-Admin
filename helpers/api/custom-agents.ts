import api from '@/lib/axios/axios-client'
import { BASE_AGENTS_URL } from '@/const/base-url'
import { type GenericResponse } from '@/types/api'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import {
  type AgentUpdateBodyRequest,
  type AgentBodyRequest
} from '@/types/api/request/custom-agents'

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

export const getCustomAgentById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<CustomAgentsResponse>>(
      `${BASE_AGENTS_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createCustomAgent = async (body: AgentBodyRequest) => {
  try {
    const res = await api.post<GenericResponse<CustomAgentsResponse>>(
      `${BASE_AGENTS_URL}`,
      body
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateCustomAgent = async (body: AgentUpdateBodyRequest) => {
  const { idAgent } = body
  try {
    const res = await api.patch<GenericResponse<CustomAgentsResponse>>(
      `${BASE_AGENTS_URL}/id/${idAgent}`,
      body
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
