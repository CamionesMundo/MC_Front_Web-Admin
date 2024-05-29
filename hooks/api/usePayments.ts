import { getAllPayments, updatePaymentStatus } from '@/helpers/api/payments'
import { type BodyPayments } from '@/types/api/request/payments'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'

export const useGetAllPayments = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: ['payment-orders', page],
    queryFn: async () => await getAllPayments({ page })
  })
}

export const useUpdatePaymentStatus = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['update-payment-status'],
    mutationFn: async (body: BodyPayments) => {
      return await updatePaymentStatus(body)
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['payment-orders'] })

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
