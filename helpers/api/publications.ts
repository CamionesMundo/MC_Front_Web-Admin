import { BASE_PUBLICATIONS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BodyActivePublication } from '@/types/api/request/publication'
import { type BidAuctionResponse } from '@/types/api/response/lots'
import {
  type PublicationFiltersResponse,
  type AuctionsFiltersResponse,
  type PublicationResponse,
  type GeneralPublicationResponse
} from '@/types/api/response/publication'

export const getPublicationById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<PublicationResponse>>(
      `${BASE_PUBLICATIONS_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getBidsAuctionsById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<BidAuctionResponse[]>>(
      `${BASE_PUBLICATIONS_URL}/auctions/id/${id}/bids`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllAuctionsPublications = async ({
  page
}: {
  page: number
}) => {
  try {
    const res = await api.get<GenericResponse<AuctionsFiltersResponse>>(
      `${BASE_PUBLICATIONS_URL}/auctions/filters?page=${page}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllGeneralPublications = async ({ page }: { page: number }) => {
  try {
    const res = await api.get<GenericResponse<PublicationFiltersResponse>>(
      `${BASE_PUBLICATIONS_URL}?page=${page}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const activeOrInactivePublication = async (
  body: BodyActivePublication
) => {
  try {
    const res = await api.patch<GenericResponse<GeneralPublicationResponse>>(
      `${BASE_PUBLICATIONS_URL}/id/${body.id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
