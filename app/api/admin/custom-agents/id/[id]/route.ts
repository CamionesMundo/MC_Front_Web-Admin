import { BASE_MC_AGENTS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AgentUpdateBodyRequest } from '@/types/api/request/custom-agents'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<CustomAgentsResponse>> =
      await mcInstance.get<GenericResponse<CustomAgentsResponse>>(
        `${BASE_MC_AGENTS_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()
  const body = (await req.json()) as AgentUpdateBodyRequest
  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<CustomAgentsResponse>> =
      await mcInstance.patch<GenericResponse<CustomAgentsResponse>>(
        `${BASE_MC_AGENTS_URL}/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
