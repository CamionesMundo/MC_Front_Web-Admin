import { BASE_AUCTIONS_URL, BASE_LOTS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateLotForm,
  type BodyLotForm
} from '@/types/api/request/lots'
import {
  type LotFullDataResponse,
  type AuctionPublicationResponse,
  type LotResponse
} from '@/types/api/response/lots'

export const getAllLots = async () => {
  try {
    const res = await api.get<GenericResponse<LotResponse[]>>(BASE_LOTS_URL)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllAuctions = async (page: number, isOnlyActives: boolean) => {
  console.log(page)
  try {
    const res = await api.get<GenericResponse<AuctionPublicationResponse>>(
      `${BASE_AUCTIONS_URL}/page/${page}?isOnlyActives=${isOnlyActives}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createLot = async (body: BodyLotForm) => {
  const res = await api.post<GenericResponse<LotResponse>>(BASE_LOTS_URL, body)

  const { data } = res

  return data
}

export const getLotById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<LotFullDataResponse>>(
      `${BASE_LOTS_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateLot = async (body: BodyUpdateLotForm) => {
  const { id } = body
  try {
    const res = await api.put<GenericResponse<LotFullDataResponse>>(
      `${BASE_LOTS_URL}/id/${id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
