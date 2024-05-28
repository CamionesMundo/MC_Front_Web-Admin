import { BASE_MC_CLIENT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateSeller,
  type BodyActiveSeller
} from '@/types/api/request/client-form'
import { type SellerData } from '@/types/api/response/user'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()
  const body = (await req.json()) as BodyActiveSeller
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<SellerData>> =
      await mcInstance.patch<GenericResponse<SellerData>>(
        `${BASE_MC_CLIENT_URL}/seller/${id}`,
        { approved: body.approved }
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
  const body = (await req.json()) as BodyUpdateSeller

  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<SellerData>> =
      await mcInstance.put<GenericResponse<SellerData>>(
        `${BASE_MC_CLIENT_URL}/seller/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
