import { createRol, getAllPermissions, getAllRoles } from '@/helpers/api/roles'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => await getAllRoles()
  })
}

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: async () => await getAllPermissions()
  })
}

export const useCreateRol = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createRol'],
    mutationFn: createRol,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['roles'] })
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
