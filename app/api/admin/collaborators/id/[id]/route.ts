import { BASE_MC_ADMIN_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyUpdateAdminForm } from '@/types/api/request'
import { type UserResponse } from '@/types/api/response/auth'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserResponse>> =
      await mcInstance.get<GenericResponse<UserResponse>>(
        `${BASE_MC_ADMIN_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function PUT (req: NextRequest) {
  const body = (await req.json()) as BodyUpdateAdminForm

  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<UserResponse>> =
      await mcInstance.put<GenericResponse<UserResponse>>(
        `${BASE_MC_ADMIN_URL}/${id}`,
        body
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
