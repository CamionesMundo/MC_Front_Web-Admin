import { getBidsAuctionsById, getPublicationById } from '@/helpers/api/publications'
import { useQuery } from '@tanstack/react-query'

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
