import { BASE_MC_LOT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyLotForm } from '@/types/api/request/lots'
import { type LotResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<LotResponse[]>> =
      await mcInstance.get<GenericResponse<LotResponse[]>>(BASE_MC_LOT_URL)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function POST (req: Request) {
  const body = (await req.json()) as BodyLotForm
  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<LotResponse>> =
      await mcInstance.post<GenericResponse<LotResponse>>(BASE_MC_LOT_URL, body)
    return NextResponse.json(res.data)
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}
