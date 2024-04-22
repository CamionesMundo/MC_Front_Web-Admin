import { BASE_MC_ADMIN_URL, BASE_MC_FILES } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateImageProfile,
  type BodyUpdateProfileAdmin
} from '@/types/api/request'
import { type UserResponse } from '@/types/api/response/auth'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  const body = (await req.json()) as BodyUpdateImageProfile
  const { data, id } = body
  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<number>> = await mcInstance.post<
    GenericResponse<number>
    >(`${BASE_MC_FILES}/create`, data)

    const idGallery = res.data.data
    if (idGallery !== null && idGallery !== undefined) {
      const bodyGallery: BodyUpdateProfileAdmin = {
        photo_idgallery: idGallery
      }
      const response: AxiosResponse<GenericResponse<UserResponse>> =
        await mcInstance.put<GenericResponse<UserResponse>>(
          `${BASE_MC_ADMIN_URL}/${id}`,
          bodyGallery
        )

      return NextResponse.json(response.data)
    }

    return NextResponse.json(res.data)
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}
