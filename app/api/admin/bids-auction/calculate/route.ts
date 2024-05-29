import { BASE_MC_BIDS_CALCULATE } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BidIncrementResponse } from '@/types/api/response/bids'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const amount = req.nextUrl.searchParams.get('amount')

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<BidIncrementResponse>> =
      await mcInstance.get<GenericResponse<BidIncrementResponse>>(`${BASE_MC_BIDS_CALCULATE}?amount=${amount}`)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
