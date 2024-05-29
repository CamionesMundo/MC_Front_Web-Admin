import { BASE_MC_PAYMENT_ORDERS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyPayments } from '@/types/api/request/payments'
import {
  type PaymentStatusResponse
} from '@/types/api/response/payments'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop() // id Address
  const body = (await req.json()) as BodyPayments
  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PaymentStatusResponse>> =
      await mcInstance.patch<GenericResponse<PaymentStatusResponse>>(
        `${BASE_MC_PAYMENT_ORDERS_URL}/${id}`,
        data
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
