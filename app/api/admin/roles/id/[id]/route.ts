import { BASE_MC_PERMISSIONS_ROLE_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type PermissionCreateResponse } from '@/types/api/response/roles'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PermissionCreateResponse[]>> =
      await mcInstance.get<GenericResponse<PermissionCreateResponse[]>>(
        `${BASE_MC_PERMISSIONS_ROLE_URL}/${id}/permissions`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
