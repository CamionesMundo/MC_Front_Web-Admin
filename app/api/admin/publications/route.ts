import { BASE_MC_PUBLICATION_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type PublicationFiltersResponse } from '@/types/api/response/publication'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')

  const queryParams = new URLSearchParams()

  if (page !== null && page !== '') queryParams.set('page', page)
  queryParams.set('pageSize', '10')

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PublicationFiltersResponse>> =
      await mcInstance.get<GenericResponse<PublicationFiltersResponse>>(
        `${BASE_MC_PUBLICATION_URL}/admin/all?${queryParams.toString()}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
