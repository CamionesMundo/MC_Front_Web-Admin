import { BASE_MC_CLIENT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type UserClientResponse } from '@/types/api/response/user'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserClientResponse[]>> =
      await mcInstance.get<GenericResponse<UserClientResponse[]>>(
        BASE_MC_CLIENT_URL
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
