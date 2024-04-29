import {
  createRol,
  getAllPermissions,
  getAllRoles,
  getPermissionsByIdRole
} from '@/helpers/api/roles'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import { type GenericResponse } from '@/types/api'
import {
  type RolePermissionResponse
} from '@/types/api/response/roles'

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
    onSuccess: async (data: GenericResponse<RolePermissionResponse>) => {
      const id = data.data.role.idrole_admin
      try {
        await queryClient.invalidateQueries({ queryKey: ['roles'] })
        await queryClient.invalidateQueries({
          queryKey: ['role-permissions', { id }]
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

export const useGetPermissionsByIdRole = (id: number) => {
  return useQuery({
    queryKey: ['role-permissions', { id }],
    queryFn: async () => await getPermissionsByIdRole(id),
    enabled: id !== 0 && !isNaN(id)
  })
}
