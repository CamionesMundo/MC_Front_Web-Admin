import { BASE_MC_AUCTIONS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AuctionPublicationResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const page = pathname.split('/').pop()
  const isOnlyActives = req.nextUrl.searchParams.get('isOnlyActives')
  const useOnlyActives = isOnlyActives === 'true'
  const url = useOnlyActives
    ? `${BASE_MC_AUCTIONS_URL}/admin/all?page=${page}&pageSize=5&typeStatus=20`
    : `${BASE_MC_AUCTIONS_URL}/admin/all?page=${page}&pageSize=5`
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AuctionPublicationResponse>> =
      await mcInstance.get<GenericResponse<AuctionPublicationResponse>>(url)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
