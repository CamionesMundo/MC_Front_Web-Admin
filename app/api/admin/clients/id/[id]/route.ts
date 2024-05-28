import { BASE_MC_CLIENT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateUser,
  type BodyActiveUserApp
} from '@/types/api/request/client-form'
import {
  type UserClientResponse,
  type ClientResponse
} from '@/types/api/response/user'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<ClientResponse>> =
      await mcInstance.get<GenericResponse<ClientResponse>>(
        `${BASE_MC_CLIENT_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()
  const body = (await req.json()) as BodyActiveUserApp
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserClientResponse>> =
      await mcInstance.patch<GenericResponse<UserClientResponse>>(
        `${BASE_MC_CLIENT_URL}/${id}`,
        { active: body.active }
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function PUT (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()
  const body = (await req.json()) as BodyUpdateUser

  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserClientResponse>> =
      await mcInstance.put<GenericResponse<UserClientResponse>>(
        `${BASE_MC_CLIENT_URL}/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
