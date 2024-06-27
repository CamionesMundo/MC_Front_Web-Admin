import {
  activeOrInactiveAppUser,
  approvedStatusAppUser,
  createAddressByIdUser,
  getAllAppUsers,
  getAllUserAddressesById,
  getAppUserById,
  updateAddress,
  updateAppUser,
  updateSeller
} from '@/helpers/api/users'
import {
  type BodyUpdateUser,
  type BodyActiveUserApp,
  type BodyActiveSeller,
  type BodyUpdateSeller,
  type BodyAddress,
  type UserFilter
} from '@/types/api/request/client-form'
import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'
import { type ClientResponse } from '@/types/api/response/user'
export const useGetAllAppUsers = ({
  page,
  pageSize,
  query,
  userType
}: UserFilter) => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () =>
      await getAllAppUsers({ page, pageSize, query, userType })
  })
}

export const useGetAppUserById = (id: number) => {
  return useQuery({
    queryKey: ['client', { id }],
    queryFn: async () => await getAppUserById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useActiveStatusAppUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateActiveStatusClient'],
    mutationFn: async (body: BodyActiveUserApp) => {
      return await activeOrInactiveAppUser(body)
    },
    onSuccess: async (response) => {
      const iduser = response?.data.iduser
      try {
        await queryClient.invalidateQueries({
          queryKey: ['client', { id: iduser }]
        })
        await queryClient.invalidateQueries({ queryKey: ['clients'] })

        await queryClient.setQueryData(
          ['client', { id: response?.data.iduser }],
          (oldData: ClientResponse) => ({
            ...oldData,
            active: response?.data.active
          })
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

export const useUpdateAppUser = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateClient'],
    mutationFn: async (body: BodyUpdateUser) => {
      return await updateAppUser(body)
    },
    onSuccess: async (response) => {
      const iduser = response?.data.iduser
      try {
        await queryClient.invalidateQueries({
          queryKey: ['client', { id: iduser }]
        })
        await queryClient.invalidateQueries({ queryKey: ['clients'] })

        await queryClient.setQueryData(
          ['client', { id: response?.data.iduser }],
          (oldData: ClientResponse) => {
            const data = response?.data
            return {
              ...oldData,
              active: response?.data.active,
              name: data?.name,
              surname: data?.surname,
              phone_number: data?.phone_number,
              document_number: data?.document_number,
              sex: data?.sex,
              birthdate: data?.birthdate
            }
          }
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

export const useApprovedStatusUserApp = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateStatusApprovedUserApp'],
    mutationFn: async (body: BodyActiveSeller) => {
      return await approvedStatusAppUser(body)
    },
    onSuccess: async (response) => {
      try {
        await queryClient.invalidateQueries({
          queryKey: ['client', { id: response?.data?.iduser }]
        })
        await queryClient.invalidateQueries({ queryKey: ['clients'] })

        await queryClient.setQueryData(
          ['client', { id: response?.data.iduser }],
          (oldData: ClientResponse) => ({
            ...oldData,
            seller: {
              ...oldData.seller,
              approved: response?.data.approved
            }
          })
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

export const useUpdateSeller = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateClientSeller'],
    mutationFn: async (body: BodyUpdateSeller) => {
      return await updateSeller(body)
    },
    onSuccess: async (response) => {
      const iduser = response?.data.iduser
      try {
        await queryClient.invalidateQueries({
          queryKey: ['client', { id: iduser }]
        })
        await queryClient.invalidateQueries({ queryKey: ['clients'] })

        await queryClient.setQueryData(
          ['client', { id: response?.data.iduser }],
          (oldData: ClientResponse) => {
            const data = response?.data
            return {
              ...oldData,
              seller: {
                ...oldData.seller,
                website: data?.website,
                company_name: data?.company_name,
                company_email: data?.company_email,
                company_phone: data?.company_phone,
                number_rut: data?.number_rut
              }
            }
          }
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

export const useGetAllAddressesByUserId = (id: number) => {
  return useQuery({
    queryKey: ['addresses', { id }],
    queryFn: async () => await getAllUserAddressesById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}

export const useUpdateAddress = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['updateAddress'],
    mutationFn: async (body: BodyAddress) => {
      return await updateAddress(body)
    },
    onSuccess: async (response) => {
      const iduser = response?.data.iduser
      try {
        await invalidateQueriesAddress(queryClient, iduser)

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

const invalidateQueriesAddress = async (
  queryClient: QueryClient,
  iduser: number | null | undefined
) => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['client', { id: iduser }] }),
    queryClient.invalidateQueries({ queryKey: ['addresses', { id: iduser }] }),
    queryClient.invalidateQueries({ queryKey: ['clients'] })
  ])
}

export const useCreateAddress = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationKey: ['createAddress'],
    mutationFn: async (body: BodyAddress) => {
      return await createAddressByIdUser(body)
    },
    onSuccess: async (response) => {
      const iduser = response?.data.iduser
      try {
        await queryClient.invalidateQueries({
          queryKey: ['client', { id: iduser }]
        })

        await queryClient.invalidateQueries({
          queryKey: ['addresses', { id: iduser }]
        })

        await queryClient.invalidateQueries({ queryKey: ['clients'] })

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
