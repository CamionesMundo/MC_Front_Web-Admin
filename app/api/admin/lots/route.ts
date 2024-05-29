import { BASE_MC_LOT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyLotForm } from '@/types/api/request/lots'
import { type LotsResponse, type LotResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = searchParams.get('page')
  const url =
    status !== 'default'
      ? `${BASE_MC_LOT_URL}?page=${page}&pageSize=10&status=${status}`
      : `${BASE_MC_LOT_URL}?page=${page}&pageSize=10`
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<LotsResponse>> =
      await mcInstance.get<GenericResponse<LotsResponse>>(url)

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
    return handleServerError(error)
  }
}
