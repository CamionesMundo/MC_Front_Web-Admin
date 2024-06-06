import { BASE_ADDRESS_URL, BASE_CLIENT_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateUser,
  type BodyActiveUserApp,
  type BodyActiveSeller,
  type BodyUpdateSeller,
  type BodyAddress,
  type UserFilter
} from '@/types/api/request/client-form'
import {
  type AddressBaseData,
  type AddressResponse
} from '@/types/api/response/address'
import {
  type SellerData,
  type ClientResponse,
  type UserClientResponse,
  type UserListResponse
} from '@/types/api/response/user'

export const getAllAppUsers = async ({
  page,
  pageSize,
  query,
  userType
}: UserFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())

  if (query !== '') {
    searchParams.set('query', query)
  }

  if (userType !== undefined) {
    searchParams.set('userType', userType.toString())
  }
  const url = `${BASE_CLIENT_URL}?${searchParams.toString()}`
  try {
    const res = await api.get<GenericResponse<UserListResponse>>(url)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAppUserById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<ClientResponse>>(
      `${BASE_CLIENT_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const activeOrInactiveAppUser = async (body: BodyActiveUserApp) => {
  try {
    const res = await api.patch<GenericResponse<UserClientResponse>>(
      `${BASE_CLIENT_URL}/id/${body.id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateAppUser = async (body: BodyUpdateUser) => {
  try {
    const res = await api.put<GenericResponse<UserClientResponse>>(
      `${BASE_CLIENT_URL}/id/${body.id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const approvedStatusAppUser = async (body: BodyActiveSeller) => {
  try {
    const res = await api.patch<GenericResponse<SellerData>>(
      `${BASE_CLIENT_URL}/seller/id/${body.id}`,
      body
    )
    const { data } = res

    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateSeller = async (body: BodyUpdateSeller) => {
  try {
    const res = await api.put<GenericResponse<SellerData>>(
      `${BASE_CLIENT_URL}/seller/id/${body.id}`,
      body
    )

    const { data } = res

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllUserAddressesById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<AddressResponse>>(
      `${BASE_CLIENT_URL}/addresses/user/${id}/`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateAddress = async (body: BodyAddress) => {
  try {
    const res = await api.put<GenericResponse<AddressBaseData>>(
      `${BASE_ADDRESS_URL}/id/${body.id}`,
      body
    )

    const { data } = res

    return data
  } catch (error) {
    console.log(error)
  }
}

export const createAddressByIdUser = async (body: BodyAddress) => {
  const res = await api.post<GenericResponse<AddressBaseData>>(
    `${BASE_ADDRESS_URL}/id/${body.id}`,
    body
  )

  const { data } = res

  return data
}
