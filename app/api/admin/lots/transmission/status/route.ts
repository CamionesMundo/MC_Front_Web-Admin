import { BASE_MC_LOT_TRANSMISSION_STATUS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type TransmissionStatusLot } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<TransmissionStatusLot>> =
      await mcInstance.get<GenericResponse<TransmissionStatusLot>>(
        BASE_MC_LOT_TRANSMISSION_STATUS_URL
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
