import { handleServerError } from '@/helpers/error'
import { type GenericResponse } from '@/types/api'
import { type UserResponse } from '@/types/api/response/auth'
import { NextResponse } from 'next/server'
import mcApi from '@/lib/axios/mc-client'
import { type AxiosResponse } from 'axios'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserResponse[]>> =
      await mcInstance.get<GenericResponse<UserResponse[]>>('/auth/admin/users')

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
