import { BASE_MC_LOT_QUEUE_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function DELETE (
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<undefined>> =
      await mcInstance.delete<GenericResponse<undefined>>(
        `${BASE_MC_LOT_QUEUE_URL}/${id}/unlink-lot`
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
