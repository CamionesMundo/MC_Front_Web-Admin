import {
  BASE_MC_FILES,
  BASE_MC_ORDER_HISTORY_STATUS_URL
} from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyHistoryStatus } from '@/types/api/request/order'
import { type TrackingHistory } from '@/types/api/response/orders'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()
  const body = (await req.json()) as BodyHistoryStatus
  const { data } = body
  const { file } = data
  try {
    const mcInstance = await mcApi()
    if (file !== undefined) {
      const res: AxiosResponse<GenericResponse<number>> = await mcInstance.post<
      GenericResponse<number>
      >(`${BASE_MC_FILES}/create`, data)

      const idGallery = res.data.data

      const newData = {
        file_report: idGallery,
        status: data.status
      }
      const response: AxiosResponse<GenericResponse<TrackingHistory>> =
        await mcInstance.put<GenericResponse<TrackingHistory>>(
          `${BASE_MC_ORDER_HISTORY_STATUS_URL}/${id}`,
          newData
        )
      return NextResponse.json(response.data)
    }

    const res: AxiosResponse<GenericResponse<TrackingHistory>> =
      await mcInstance.put<GenericResponse<TrackingHistory>>(
        `${BASE_MC_ORDER_HISTORY_STATUS_URL}/${id}`,
        data
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
