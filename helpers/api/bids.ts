import { BASE_BID_CALCULATE } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BidIncrementResponse } from '@/types/api/response/bids'

export const getAmountBid = async (amount: number) => {
  try {
    const res = await api.get<GenericResponse<BidIncrementResponse>>(
      `${BASE_BID_CALCULATE}?amount=${amount}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
