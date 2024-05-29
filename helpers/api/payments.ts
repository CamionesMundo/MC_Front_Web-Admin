import { BASE_PAYMENT_ORDERS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BodyPayments } from '@/types/api/request/payments'
import {
  type PaymentStatusResponse,
  type PaymentsResponse
} from '@/types/api/response/payments'

export const getAllPayments = async ({ page }: { page: number }) => {
  try {
    const res = await api.get<GenericResponse<PaymentsResponse>>(
      `${BASE_PAYMENT_ORDERS_URL}?page=${page}`
    )

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
