import { BASE_MC_ADMIN_URL, BASE_MC_AGENTS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type UserDataResponse, type GenericResponse } from '@/types/api'
import {
  type CustomAgentRequest,
  type AgentBodyRequest
} from '@/types/api/request/custom-agents'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<CustomAgentsResponse[]>> =
      await mcInstance.get<GenericResponse<CustomAgentsResponse[]>>(
        BASE_MC_AGENTS_URL
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function POST (req: Request) {
  const body = (await req.json()) as AgentBodyRequest
  const { dataAgent, dataAdmin } = body
  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<UserDataResponse>> =
      await mcInstance.post<GenericResponse<UserDataResponse>>(
        `${BASE_MC_ADMIN_URL}/registration`,
        dataAdmin
      )
    const idAdmin = res.data.data.user.iduser_admin

    if (idAdmin !== undefined) {
      const dataBody: CustomAgentRequest = {
        ...dataAgent,
        iduser_admin: idAdmin
      }

      const response: AxiosResponse<GenericResponse<CustomAgentsResponse>> =
        await mcInstance.post<GenericResponse<CustomAgentsResponse>>(
          `${BASE_MC_AGENTS_URL}`,
          dataBody
        )

      return NextResponse.json(response.data)
    }
  } catch (error) {
    return handleServerError(error)
  }
}
