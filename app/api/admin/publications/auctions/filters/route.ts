import { BASE_MC_AUCTIONS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AuctionsFiltersResponse } from '@/types/api/response/publication'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const searchTerm = searchParams.get('query')
  const typeStatus = searchParams.get('typeStatus')
  const typeAuction = searchParams.get('typeAuction')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')

  const queryParams = new URLSearchParams()

  if (page !== null && page !== '') queryParams.set('page', page)
  if (pageSize !== null && pageSize !== '') {
    queryParams.set('pageSize', pageSize)
  }
  if (searchTerm !== null && searchTerm !== '') {
    queryParams.set('searchTerm', searchTerm)
  }
  if (typeStatus !== null && typeStatus !== '' && typeStatus !== '0') {
    queryParams.set('typeStatus', typeStatus)
  }

  if (typeAuction !== null && typeAuction !== '' && typeAuction !== '0') {
    queryParams.set('typeAuction', typeAuction)
  }

  if (startDate !== null && startDate !== '') {
    queryParams.set('startDate', startDate)
  }

  if (endDate !== null && endDate !== '') {
    queryParams.set('endDate', endDate)
  }

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AuctionsFiltersResponse>> =
      await mcInstance.get<GenericResponse<AuctionsFiltersResponse>>(
        `${BASE_MC_AUCTIONS_URL}/admin/filters?${queryParams.toString()}`
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
