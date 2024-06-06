import { BASE_PUBLICATIONS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type ParamsFilter,
  type BodyActivePublication,
  type ParamsPostFilter
} from '@/types/api/request/publication'
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
  page,
  pageSize,
  query,
  typeStatus,
  typeAuction,
  startDate,
  endDate
}: ParamsFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())
  searchParams.set('query', query)
  searchParams.set('typeStatus', typeStatus.toString())
  searchParams.set('typeAuction', typeAuction.toString())

  if (startDate !== undefined) {
    searchParams.set('startDate', startDate)
  }

  if (endDate !== undefined) {
    searchParams.set('endDate', endDate)
  }

  const url = `${BASE_PUBLICATIONS_URL}/auctions/filters?${searchParams.toString()}`
  try {
    const res = await api.get<GenericResponse<AuctionsFiltersResponse>>(url)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllGeneralPublications = async ({ page, pageSize, startDate, endDate, query }: ParamsPostFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())
  searchParams.set('query', query)
  if (startDate !== undefined) {
    searchParams.set('startDate', startDate)
  }

  if (endDate !== undefined) {
    searchParams.set('endDate', endDate)
  }
  const url = `${BASE_PUBLICATIONS_URL}?${searchParams.toString()}`
  try {
    const res = await api.get<GenericResponse<PublicationFiltersResponse>>(
      url
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
