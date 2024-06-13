import {
  getAllOrders,
  getOrderById,
  getOrderStatus
} from '@/helpers/api/orders'
import { type OrderFilter } from '@/types/api/request/order'
import { useQuery } from '@tanstack/react-query'

export const useGetAllOrders = ({
  page,
  pageSize,
  idOrderStatus,
  query,
  startDate,
  endDate
}: OrderFilter) => {
  return useQuery({
    queryKey: ['orders-admin', page, pageSize],
    queryFn: async () =>
      await getAllOrders({
        page,
        pageSize,
        idOrderStatus,
        query,
        startDate,
        endDate
      })
  })
}

export const useGetAllOrderStatus = () => {
  return useQuery({
    queryKey: ['order-status'],
    queryFn: async () => await getOrderStatus()
  })
}

export const useGetOrderById = (id: number) => {
  return useQuery({
    queryKey: ['order-admin', { id }],
    queryFn: async () => await getOrderById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}
