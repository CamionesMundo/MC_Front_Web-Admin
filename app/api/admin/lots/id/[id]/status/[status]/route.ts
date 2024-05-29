import { BASE_MC_LOT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type LotFullDataResponse } from '@/types/api/response/lots'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

type ParamsRequest = {
  id: string
  status: string
}

export async function PATCH (
  req: NextRequest,
  context: { params: ParamsRequest }
) {
  const id = context.params.id
  const status = context.params.status

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<LotFullDataResponse>> =
      await mcInstance.patch<GenericResponse<LotFullDataResponse>>(
        `${BASE_MC_LOT_URL}/${id}/${status}`,
        {}
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
