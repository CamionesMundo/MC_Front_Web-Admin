import { BASE_ORDERS_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type OrderFilter } from '@/types/api/request/order'
import {
  type OrderStatusResponse,
  type OrderListResponse,
  type OrderDetailResponse
} from '@/types/api/response/orders'

export const getAllOrders = async ({
  page,
  pageSize,
  idOrderStatus,
  query,
  startDate,
  endDate
}: OrderFilter) => {
  const searchParams = new URLSearchParams()

  searchParams.set('page', page.toString())
  searchParams.set('pageSize', pageSize.toString())

  if (query !== '') {
    searchParams.set('query', query)
  }

  if (idOrderStatus !== 0) {
    searchParams.set('idOrderStatus', idOrderStatus.toString())
  }
  if (startDate !== undefined) {
    searchParams.set('startDate', startDate)
  }

  if (endDate !== undefined) {
    searchParams.set('endDate', endDate)
  }
  const url = `${BASE_ORDERS_URL}?${searchParams.toString()}`

  try {
    const res = await api.get<GenericResponse<OrderListResponse>>(url)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getOrderStatus = async () => {
  try {
    const res = await api.get<GenericResponse<OrderStatusResponse[]>>(
      `${BASE_ORDERS_URL}/status`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getOrderById = async (id: number) => {
  try {
    const res = await api.get<GenericResponse<OrderDetailResponse>>(
      `${BASE_ORDERS_URL}/id/${id}`
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
