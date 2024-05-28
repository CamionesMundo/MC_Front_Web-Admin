import { BASE_MC_ADDRESS } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyAddress } from '@/types/api/request/client-form'
import { type AddressBaseData } from '@/types/api/response/address'
import { type AxiosResponse } from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

export async function PUT (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop() // id Address
  const body = (await req.json()) as BodyAddress
  const { data } = body
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AddressBaseData>> =
      await mcInstance.put<GenericResponse<AddressBaseData>>(
        `${BASE_MC_ADDRESS}/${id}`,
        data
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function POST (req: Request) {
  const body = (await req.json()) as BodyAddress
  const { id, data } = body // id is iduser
  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<AddressBaseData>> =
      await mcInstance.post<GenericResponse<AddressBaseData>>(
        `${BASE_MC_ADDRESS}/${id}`,
        data
      )

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
