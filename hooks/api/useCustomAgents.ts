import { getAllCustomAgents } from '@/helpers/api/custom-agents'
import { useQuery } from '@tanstack/react-query'

export const useGetAllAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => await getAllCustomAgents()
  })
}
