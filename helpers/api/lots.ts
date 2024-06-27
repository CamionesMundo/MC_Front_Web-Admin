import {
  BASE_AUCTIONS_URL,
  BASE_LOTS_QUEUE_URL,
  BASE_LOTS_URL
} from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateLotForm,
  type BodyLotForm,
  type LotsFilter
} from '@/types/api/request/lots'
import {
  type LotFullDataResponse,
  type AuctionPublicationResponse,
  type LotResponse,
  type LotQueueResponse,
  type LotsResponse,
  type TransmissionStatusLot
} from '@/types/api/response/lots'

export const getAllLots = async ({
  page,
  pageSize,
  status,
  query,
  startDate,
  endDate
}: LotsFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())

  if (query !== '') {
    searchParams.set('query', query)
  }

  if (status !== '') {
    searchParams.set('status', status)
  }
  if (startDate !== undefined) {
    searchParams.set('startDate', startDate)
  }

  if (endDate !== undefined) {
    searchParams.set('endDate', endDate)
  }
  const url = `${BASE_LOTS_URL}?${searchParams.toString()}`
  try {
    const res = await api.get<GenericResponse<LotsResponse>>(url)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllAuctions = async (page: number, isOnlyActives: boolean) => {
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

export const getLotQueueById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<LotFullDataResponse>>(
      `${BASE_LOTS_URL}/id/${id}/queue`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteLotQueueById = async (id: number) => {
  try {
    const res = await api.delete<GenericResponse<undefined>>(
      `${BASE_LOTS_QUEUE_URL}/id/${id}/unlink`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const startAuctionLotQueue = async (id: number) => {
  try {
    const res = await api.patch<GenericResponse<LotQueueResponse>>(
      `${BASE_LOTS_QUEUE_URL}/id/${id}/start-auction`,
      {}
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const nextAuctionLotQueue = async (id: number) => {
  try {
    const res = await api.patch<GenericResponse<LotQueueResponse>>(
      `${BASE_LOTS_QUEUE_URL}/id/${id}/current`,
      {}
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const sendAuctionToEndQueue = async (id: number) => {
  try {
    const res = await api.patch<GenericResponse<LotQueueResponse>>(
      `${BASE_LOTS_QUEUE_URL}/id/${id}/send-to-end`,
      {}
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const finishedLot = async (id: number) => {
  try {
    const res = await api.patch<GenericResponse<LotFullDataResponse>>(
      `${BASE_LOTS_URL}/id/${id}/status/finished`,
      {}
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const inProgressLot = async (id: number) => {
  try {
    const res = await api.patch<GenericResponse<LotFullDataResponse>>(
      `${BASE_LOTS_URL}/id/${id}/status/progress`,
      {}
    )
    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getTransmissionStatusLot = async () => {
  try {
    const res = await api.get<GenericResponse<TransmissionStatusLot>>(
      `${BASE_LOTS_URL}/transmission/status`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
