import { getAllParameters, updateParameter } from '@/helpers/api/parameter'
import { type BodyParameters } from '@/types/api/request/parameters'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'

export const useGetAllParameters = () => {
  return useQuery({
    queryKey: ['parameters'],
    queryFn: async () => await getAllParameters()
  })
}

export const useUpdateParameter = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateParameter'],
    mutationFn: async (body: BodyParameters) => {
      return await updateParameter(body)
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['parameters'] })

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
