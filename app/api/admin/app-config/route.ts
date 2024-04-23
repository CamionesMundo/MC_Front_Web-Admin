import { BASE_MC_PARAMETERS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AppParameterResponse } from '@/types/api/response/parameters'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AppParameterResponse[]>> =
      await mcInstance.get<GenericResponse<AppParameterResponse[]>>(
        BASE_MC_PARAMETERS_URL
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
