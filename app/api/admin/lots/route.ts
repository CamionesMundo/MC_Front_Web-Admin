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
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const status = searchParams.get('status')
  const searchTerm = searchParams.get('query')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const queryParams = new URLSearchParams()

  if (page !== null && page !== '') queryParams.set('page', page)
  if (pageSize !== null && pageSize !== '') {
    queryParams.set('pageSize', pageSize)
  }
  if (status !== null && status !== '' && status !== 'default') {
    queryParams.set('status', status)
  }

  if (searchTerm !== null && searchTerm !== '') {
    queryParams.set('searchTerm', searchTerm)
  }

  if (startDate !== null && startDate !== '') {
    queryParams.set('startDate', startDate)
  }

  if (endDate !== null && endDate !== '') {
    queryParams.set('endDate', endDate)
  }
  const url =
  `${BASE_MC_LOT_URL}?${queryParams.toString()}`

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
