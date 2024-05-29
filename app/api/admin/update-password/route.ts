import { handleServerError } from '@/helpers/error'
import { type GenericResponse } from '@/types/api'
import { type BodyUpdatePassword } from '@/types/api/request/recovery'
import { type UserResponse } from '@/types/api/response/auth'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  const body = (await req.json()) as BodyUpdatePassword

  const { password, token } = body
  try {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    }

    const res = await axios.patch<GenericResponse<UserResponse>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admin/users/password`,
      { password },
      { headers }
    )

    return NextResponse.json(res.data)
  } catch (error) {
    return handleServerError(error)
  }
}
