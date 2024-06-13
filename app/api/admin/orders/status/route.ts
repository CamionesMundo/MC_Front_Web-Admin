import { BASE_MC_ORDER_STATUS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type OrderStatusResponse } from '@/types/api/response/orders'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<OrderStatusResponse[]>> =
      await mcInstance.get<GenericResponse<OrderStatusResponse[]>>(
        BASE_MC_ORDER_STATUS_URL
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
