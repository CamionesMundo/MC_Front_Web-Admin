import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type UserResponse } from '@/types/api/response/auth'
export const getAllAdmins = async () => {
  try {
    const res = await api.get<GenericResponse<UserResponse[]>>(
      '/admin/collaborators'
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}
