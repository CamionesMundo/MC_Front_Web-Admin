import { handleServerError } from '@/helpers/error'
import { type GenericResponse } from '@/types/api'
import {
  type UserDataResponse,
  type UserResponse
} from '@/types/api/response/auth'
import { NextResponse } from 'next/server'
import mcApi from '@/lib/axios/mc-client'
import { type AxiosResponse } from 'axios'
import { type BodyAdminForm } from '@/types/api/request'
import { BASE_MC_ADMIN_URL } from '@/const/base-url'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserResponse[]>> =
      await mcInstance.get<GenericResponse<UserResponse[]>>(BASE_MC_ADMIN_URL)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function POST (req: Request) {
  const body = (await req.json()) as BodyAdminForm
  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<UserDataResponse>> =
      await mcInstance.post<GenericResponse<UserDataResponse>>(
        `${BASE_MC_ADMIN_URL}/registration`,
        body
      )

    return NextResponse.json(res.data)
  } catch (error) {
    return handleServerError(error)
  }
}
