import { BASE_PUBLICATIONS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BidAuctionResponse } from '@/types/api/response/lots'
import { type PublicationResponse } from '@/types/api/response/publication'

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
