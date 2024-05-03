import {
  createCustomAgent,
  getAllCustomAgents,
  getCustomAgentById,
  updateCustomAgent
} from '@/helpers/api/custom-agents'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import { type AgentUpdateBodyRequest } from '@/types/api/request/custom-agents'

export const useGetAllAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => await getAllCustomAgents()
  })
}

export const useGetCustomAgentById = (id: number) => {
  return useQuery({
    queryKey: ['agent', { id }],
    queryFn: async () => await getCustomAgentById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useCreateCustomAgent = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createCustomAgent'],
    mutationFn: createCustomAgent,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['administrators'] })
        await queryClient.invalidateQueries({ queryKey: ['agents'] })
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

export const useUpdateCustomAgent = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateAdmin'],
    mutationFn: async (body: AgentUpdateBodyRequest) => {
      return await updateCustomAgent(body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['administrators'] })
        await queryClient.invalidateQueries({ queryKey: ['agents'] })
        await queryClient.invalidateQueries({
          queryKey: ['agent', { id: response?.data.idcustoms_agent }]
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
