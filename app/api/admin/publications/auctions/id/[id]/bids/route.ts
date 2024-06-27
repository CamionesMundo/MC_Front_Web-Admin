import { BASE_MC_AUCTIONS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BidAuctionResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<BidAuctionResponse[]>> =
      await mcInstance.get<GenericResponse<BidAuctionResponse[]>>(
        `${BASE_MC_AUCTIONS_URL}/${id}/bids`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
