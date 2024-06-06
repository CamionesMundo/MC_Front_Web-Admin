import { BASE_MC_PAYMENT_ORDERS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type PaymentsResponse } from '@/types/api/response/payments'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const searchTerm = searchParams.get('query')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const queryParams = new URLSearchParams()

  if (page !== null && page !== '') queryParams.set('page', page)
  if (pageSize !== null && pageSize !== '') {
    queryParams.set('pageSize', pageSize)
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
  `${BASE_MC_PAYMENT_ORDERS_URL}/all?${queryParams.toString()}`
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PaymentsResponse>> =
      await mcInstance.get<GenericResponse<PaymentsResponse>>(
        url
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
