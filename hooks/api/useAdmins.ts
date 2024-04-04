import { getAllAdmins } from '@/helpers/api/admins'
import { useQuery } from '@tanstack/react-query'

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: ['administrators'],
    queryFn: async () => await getAllAdmins()
  })
}
