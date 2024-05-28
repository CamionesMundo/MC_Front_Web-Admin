import { BASE_MC_PARAMETERS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyParameters } from '@/types/api/request/parameters'
import { type AppParameterResponse } from '@/types/api/response/parameters'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop() // id Address
  const body = (await req.json()) as BodyParameters
  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AppParameterResponse>> =
      await mcInstance.patch<GenericResponse<AppParameterResponse>>(
        `${BASE_MC_PARAMETERS_URL}/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
