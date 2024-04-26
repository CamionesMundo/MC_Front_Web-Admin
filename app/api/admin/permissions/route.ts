import { BASE_MC_PERMISSIONS_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type PermissionResponse } from '@/types/api/response/roles'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PermissionResponse[]>> =
      await mcInstance.get<GenericResponse<PermissionResponse[]>>(
        BASE_MC_PERMISSIONS_URL
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
