import { BASE_MC_AGENTS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
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
