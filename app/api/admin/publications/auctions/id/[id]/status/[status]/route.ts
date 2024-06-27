import { BASE_MC_AUCTIONS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type PublicationResponse } from '@/types/api/response/publication'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

type ParamsProps = {
  id: string
  status: string
}

export async function PATCH (
  req: NextRequest,
  context: { params: ParamsProps }
) {
  const id = context.params.id
  const status = context.params.status
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PublicationResponse>> =
      await mcInstance.patch<GenericResponse<PublicationResponse>>(
        `${BASE_MC_AUCTIONS_URL}/admin/${id}/${status}`,
        {}
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
