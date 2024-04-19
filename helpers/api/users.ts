import { BASE_ADDRESS_URL, BASE_CLIENT_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateUser,
  type BodyActiveUserApp,
  type BodyActiveSeller,
  type BodyUpdateSeller,
  type BodyAddress
} from '@/types/api/request/client-form'
import {
  type AddressBaseData,
  type AddressResponse
} from '@/types/api/response/address'
import {
  type SellerData,
  type ClientResponse,
  type UserClientResponse
} from '@/types/api/response/user'

export const getAllAppUsers = async () => {
  try {
    const res = await api.get<GenericResponse<UserClientResponse[]>>(
      BASE_CLIENT_URL
    )

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
