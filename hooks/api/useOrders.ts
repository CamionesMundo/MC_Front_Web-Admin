import {
  cancelOrder,
  getAllOrders,
  getOrderById,
  getOrderStatus,
  updateHistoryStatus,
  updateOrder
} from '@/helpers/api/orders'
import {
  type RequestUpdateOrder,
  type BodyHistoryStatus,
  type OrderFilter,
  type RequestDeleteOrder
} from '@/types/api/request/order'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'

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

export const useUpdateHistoryStatus = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateHistory'],
    mutationFn: async (body: BodyHistoryStatus) => {
      return await updateHistoryStatus(body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['orders-admin'] })
        await queryClient.invalidateQueries({
          queryKey: ['order-admin', { id: response?.data.idorder }]
        })

        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      showToast(data.message, 'error')
    }
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: async (request: RequestUpdateOrder) => {
      return await updateOrder(request.id, request.body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['orders-admin'] })
        await queryClient.invalidateQueries({
          queryKey: ['order-admin', { id: response?.data.idorder }]
        })
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      showToast(data.message, 'error')
    }
  })
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['cancelOrder'],
    mutationFn: async (request: RequestDeleteOrder) => {
      return await cancelOrder(request.id, request.body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['orders-admin'] })
        await queryClient.invalidateQueries({
          queryKey: ['order-admin', { id: response?.data.idorder }]
        })
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      showToast(data.message, 'error')
    }
  })
}
