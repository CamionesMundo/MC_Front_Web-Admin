import { handleServerError } from '@/helpers/error'
import { type GenericResponse } from '@/types/api'
import { type BodyRecoveryPassword } from '@/types/api/request/recovery'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  const body = (await req.json()) as BodyRecoveryPassword

  try {
    const res = await axios.post<GenericResponse<boolean>>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/core/mails/email-recover-password`,
      { email: body.email }
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
