import {
  activeOrInactivePublication,
  getAllAuctionsPublications,
  getAllGeneralPublications,
  getBidsAuctionsById,
  getPublicationById
} from '@/helpers/api/publications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import {
  type ParamsFilter,
  type BodyActivePublication,
  type ParamsPostFilter
} from '@/types/api/request/publication'

export const useGetPublicationById = (id: number) => {
  return useQuery({
    queryKey: ['publication', { id }],
    queryFn: async () => await getPublicationById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useGetBidAuctionsById = (id: number) => {
  return useQuery({
    queryKey: ['publicationBids', { id }],
    queryFn: async () => await getBidsAuctionsById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useGetAllAuctionsPublications = ({
  page,
  pageSize,
  query,
  typeStatus,
  typeAuction,
  startDate,
  endDate
}: ParamsFilter) => {
  return useQuery({
    queryKey: ['publications-auctions', page],
    queryFn: async () =>
      await getAllAuctionsPublications({
        page,
        pageSize,
        query,
        typeStatus,
        typeAuction,
        startDate,
        endDate
      })
  })
}

export const useGetAllGeneralPublications = ({
  page,
  pageSize,
  startDate,
  endDate,
  query
}: ParamsPostFilter) => {
  return useQuery({
    queryKey: ['publications-general', page],
    queryFn: async () =>
      await getAllGeneralPublications({
        page,
        pageSize,
        startDate,
        endDate,
        query
      })
  })
}

export const useActiveStatusPublication = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['update-status-publication'],
    mutationFn: async (body: BodyActivePublication) => {
      return await activeOrInactivePublication(body)
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({
          queryKey: ['publications-general']
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
