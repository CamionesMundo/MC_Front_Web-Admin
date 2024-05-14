import { BASE_MC_LOT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateLotForm
} from '@/types/api/request/lots'
import { type LotFullDataResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<LotFullDataResponse>> =
      await mcInstance.get<GenericResponse<LotFullDataResponse>>(
        `${BASE_MC_LOT_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}

export async function PUT (req: NextRequest) {
  const body = (await req.json()) as BodyUpdateLotForm
  const { data } = body
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<LotFullDataResponse>> =
      await mcInstance.put<GenericResponse<LotFullDataResponse>>(
        `${BASE_MC_LOT_URL}/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}
