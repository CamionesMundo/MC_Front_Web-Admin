import {
  createLot,
  deleteLotQueueById,
  finishedLot,
  getAllAuctions,
  getAllLots,
  getLotById,
  getLotQueueById,
  getTransmissionStatusLot,
  inProgressLot,
  nextAuctionLotQueue,
  sendAuctionToEndQueue,
  startAuctionLotQueue,
  updateLot
} from '@/helpers/api/lots'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import {
  type LotsFilter,
  type BodyUpdateLotForm
} from '@/types/api/request/lots'

export const useGetAllLots = ({
  page,
  pageSize,
  status,
  query,
  startDate,
  endDate
}: LotsFilter) => {
  return useQuery({
    queryKey: ['lots', status, page],
    queryFn: async () =>
      await getAllLots({
        page,
        pageSize,
        status,
        query,
        startDate,
        endDate
      })
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
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      showToast(data.message, 'error')
    }
  })
}

export const useGetLotQueueById = (id: number) => {
  return useQuery({
    queryKey: ['lot-queue', { id }],
    queryFn: async () => await getLotQueueById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useDeleteQueueById = (idLot: number, idLotQueue: number) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['deleteLot - queue'],
    mutationFn: async (id: number) => {
      return await deleteLotQueueById(id)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })

        await queryClient.invalidateQueries({
          queryKey: ['lot', { id: idLot }]
        })
        await queryClient.invalidateQueries({
          queryKey: ['lot-queue', { id: idLotQueue }]
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

export const useStartAuction = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['startAuction'],
    mutationFn: async (id: number) => {
      return await startAuctionLotQueue(id)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })
        await queryClient.invalidateQueries({
          queryKey: ['lot-queue', { id: response?.data.idlot_queue }]
        })
        await queryClient.invalidateQueries({
          queryKey: ['lot', { id: response?.data.idlot }]
        })
        await queryClient.invalidateQueries({
          queryKey: ['publication', { id: response?.data.idpublication }]
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

export const useNextAuction = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['nextAuction'],
    mutationFn: async (id: number) => {
      return await nextAuctionLotQueue(id)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })
        await queryClient.invalidateQueries({
          queryKey: ['lot-queue', { id: response?.data.idlot_queue }]
        })
        await queryClient.invalidateQueries({
          queryKey: ['lot', { id: response?.data.idlot }]
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

export const useSendToEndAuction = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['sendToEndAuction'],
    mutationFn: async (id: number) => {
      return await sendAuctionToEndQueue(id)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['lots'] })
        await queryClient.invalidateQueries({
          queryKey: ['lot-queue', { id: response?.data.idlot_queue }]
        })
        await queryClient.invalidateQueries({
          queryKey: ['lot', { id: response?.data.idlot }]
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

export const useFinishedLot = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['finishedLot'],
    mutationFn: async (id: number) => {
      return await finishedLot(id)
    },
    onSuccess: async (response) => {
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

export const useInProgressLot = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['finishedLot'],
    mutationFn: async (id: number) => {
      return await inProgressLot(id)
    },
    onSuccess: async (response) => {
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

export const useGetTransmissionStatus = () => {
  return useQuery({
    queryKey: ['lot-transmission-status'],
    queryFn: async () => await getTransmissionStatusLot()
  })
}
