import {
  createAdmin,
  createProfileImage,
  getAdminById,
  getAllAdmins,
  updateAdmin
} from '@/helpers/api/admins'

import { type RequestUpdateAdminForm } from '@/types/api/request'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ['administrators'],
    queryFn: async () => await getAllAdmins()
  })
}

export const useGetAdminById = (id: number) => {
  return useQuery({
    queryKey: ['administrator', { id }],
    queryFn: async () => await getAdminById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: createAdmin,
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['administrators'] })
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      toast.error(data.message)
    }
  })
}

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateAdmin'],
    mutationFn: async (request: RequestUpdateAdminForm) => {
      return await updateAdmin(request.id, request.body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['administrators'] })
        await queryClient.invalidateQueries({
          queryKey: ['administrator', { id: response?.data.iduser_admin }]
        })
        router.refresh()
        await queryClient.setQueryData(
          ['administrator', { id: response?.data.iduser_admin }],
          response?.data
        )
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      toast.error(data.message)
    }
  })
}

export const useUpdateImageProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: createProfileImage,
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['administrators'] })
        await queryClient.invalidateQueries({
          queryKey: ['administrator', { id: response?.data.iduser_admin }]
        })
        await queryClient.setQueryData(
          ['administrator', { id: response?.data.iduser_admin }],
          response?.data
        )
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      toast.error(data.message)
    }
  })
}
