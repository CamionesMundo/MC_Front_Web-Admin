import { BASE_MC_PUBLICATION_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyActivePublication } from '@/types/api/request/publication'
import {
  type GeneralPublicationResponse,
  type PublicationResponse
} from '@/types/api/response/publication'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<PublicationResponse>> =
      await mcInstance.get<GenericResponse<PublicationResponse>>(
        `${BASE_MC_PUBLICATION_URL}/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function PATCH (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  const body = (await req.json()) as BodyActivePublication

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<GeneralPublicationResponse>> =
      await mcInstance.patch<GenericResponse<GeneralPublicationResponse>>(
        `${BASE_MC_PUBLICATION_URL}/${id}?active=${body.active}`,
        {}
      )
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
