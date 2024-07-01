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

    if (res.data.statusCode === 200) {
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
        if (response.data.statusCode === 200) {
          return NextResponse.json(response.data)
        } else {
          return NextResponse.json({
            statusCode: response.data.statusCode,
            message: response.data.message,
            data: null,
            error: response.data.message
          })
        }
      }
    } else {
      return NextResponse.json({
        statusCode: res.data.statusCode,
        message: res.data.message,
        data: null,
        error: res.data.message
      })
    }
  } catch (error) {
    return handleServerError(error)
  }
}
