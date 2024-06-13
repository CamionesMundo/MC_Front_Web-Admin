import { BASE_MC_ORDER_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type OrderListResponse } from '@/types/api/response/orders'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const searchTerm = searchParams.get('query')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const idOrderStatus = searchParams.get('idOrderStatus')

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

  if (idOrderStatus !== null && idOrderStatus !== '0') {
    queryParams.set('idOrderStatus', idOrderStatus)
  }
  const url = `${BASE_MC_ORDER_URL}/admin/all?${queryParams.toString()}`

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<OrderListResponse>> =
      await mcInstance.get<GenericResponse<OrderListResponse>>(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
