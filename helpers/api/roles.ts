import { BASE_PERMISSIONS_URL, BASE_ROLES_URL } from '@/const/base-url'
import api from '@/lib/axios/axios-client'
import { type GenericResponse } from '@/types/api'
import { type BodyRoleForm } from '@/types/api/request/roles-form'
import {
  type PermissionCreateResponse,
  type PermissionResponse,
  type RoleResponse
} from '@/types/api/response/roles'
export const getAllRoles = async () => {
  try {
    const res = await api.get<GenericResponse<RoleResponse[]>>(BASE_ROLES_URL)

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAllPermissions = async () => {
  try {
    const res = await api.get<GenericResponse<PermissionResponse[]>>(
      BASE_PERMISSIONS_URL
    )

    const { data } = res
    return data
  } catch (error) {
    console.log(error)
  }
}

export const createRol = async (body: BodyRoleForm) => {
  console.log(body)
  const res = await api.post<GenericResponse<PermissionCreateResponse[]>>(
    BASE_ROLES_URL,
    body
  )

  const { data } = res

  return data
}
