import { BASE_MC_ORDER_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type OrderDetailResponse } from '@/types/api/response/orders'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<OrderDetailResponse>> =
      await mcInstance.get<GenericResponse<OrderDetailResponse>>(
        `${BASE_MC_ORDER_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
