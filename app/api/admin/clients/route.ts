import { BASE_MC_CLIENT_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type UserListResponse } from '@/types/api/response/user'
import { type AxiosResponse } from 'axios'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const pageSize = searchParams.get('pageSize')
  const userType = searchParams.get('userType')
  const searchTerm = searchParams.get('query')
  const queryParams = new URLSearchParams()

  if (page !== null && page !== '') queryParams.set('page', page)
  if (pageSize !== null && pageSize !== '') {
    queryParams.set('pageSize', pageSize)
  }
  if (userType !== null && userType !== '' && userType !== '0') {
    queryParams.set('userType', userType)
  }

  if (searchTerm !== null && searchTerm !== '') {
    queryParams.set('searchTerm', searchTerm)
  }

  const url = `${BASE_MC_CLIENT_URL}?${queryParams.toString()}`

  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<UserListResponse>> =
      await mcInstance.get<GenericResponse<UserListResponse>>(url)
    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}
