import { getAllAppUsers, getAppUserById } from '@/helpers/api/users'
import { useQuery } from '@tanstack/react-query'

export const useGetAllAppUsers = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => await getAllAppUsers()
  })
}

export const useGetAppUserById = (id: number) => {
  return useQuery({
    queryKey: ['client', { id }],
    queryFn: async () => await getAppUserById(id),
    enabled: id !== 0 && !isNaN(id)
  })
}
