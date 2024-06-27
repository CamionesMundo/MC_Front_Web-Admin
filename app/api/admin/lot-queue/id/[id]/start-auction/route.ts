import { BASE_MC_LOT_QUEUE_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import {
  type LotQueueResponse
} from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH (
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<LotQueueResponse>> =
      await mcInstance.patch<GenericResponse<LotQueueResponse>>(
        `${BASE_MC_LOT_QUEUE_URL}/${id}/start-auction`,
        {}
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
