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
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PaymentsResponse>> =
      await mcInstance.get<GenericResponse<PaymentsResponse>>(
        `${BASE_MC_PAYMENT_ORDERS_URL}/all?page=${page}&pageSize=10`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
