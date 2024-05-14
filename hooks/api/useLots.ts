import {
  createLot,
  getAllAuctions,
  getAllLots,
  getLotById,
  updateLot
} from '@/helpers/api/lots'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import { type BodyUpdateLotForm } from '@/types/api/request/lots'

export const useGetAllLots = () => {
  return useQuery({
    queryKey: ['lots'],
    queryFn: async () => await getAllLots()
  })
}

export const useGetAllAuctions = (page: number, isOnlyActives: boolean) => {
  return useQuery({
    queryKey: ['auctions-page', { page }],
    queryFn: async () => await getAllAuctions(page, isOnlyActives),
    enabled: page !== 0 && !isNaN(page)
  })
}

export const useCreateLot = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createLot'],
    mutationFn: createLot,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })
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

export const useGetLotById = (id: number) => {
  return useQuery({
    queryKey: ['lot', { id }],
    queryFn: async () => await getLotById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useUpdateLot = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateLot'],
    mutationFn: async (body: BodyUpdateLotForm) => {
      return await updateLot(body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })

        await queryClient.invalidateQueries({
          queryKey: ['lot', { id: response?.data.lot.idlot }]
        })
        router.refresh()
        await queryClient.setQueryData(
          ['lot', { id: response?.data.lot.idlot }],
          response?.data
        )
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
