import { BASE_PAYMENT_ORDERS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import {
  type PaymentsFilter,
  type BodyPayments
} from '@/types/api/request/payments'
import {
  type PaymentStatusResponse,
  type PaymentsResponse
} from '@/types/api/response/payments'

export const getAllPayments = async ({
  page,
  pageSize,
  query,
  startDate,
  endDate,
  typeStatus
}: PaymentsFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())

  if (query !== '') {
    searchParams.set('query', query)
  }

  if (startDate !== undefined) {
    searchParams.set('startDate', startDate)
  }

  if (endDate !== undefined) {
    searchParams.set('endDate', endDate)
  }

  if (typeStatus !== undefined) {
    searchParams.set('typeStatus', typeStatus.toString())
  }

  const url = `${BASE_PAYMENT_ORDERS_URL}?${searchParams.toString()}`

  try {
    const res = await api.get<GenericResponse<PaymentsResponse>>(url)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const updatePaymentStatus = async (body: BodyPayments) => {
  const { id } = body
  try {
    const res = await api.patch<GenericResponse<PaymentStatusResponse>>(
      `${BASE_PAYMENT_ORDERS_URL}/id/${id}`,
      body
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
