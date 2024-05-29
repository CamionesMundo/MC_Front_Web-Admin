import { BASE_MC_ADDRESS } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type AddressResponse } from '@/types/api/response/address'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const id = pathname.split('/').pop()

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<AddressResponse>> =
      await mcInstance.get<GenericResponse<AddressResponse>>(
        `${BASE_MC_ADDRESS}/all-address-user/${id}`
      )

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
