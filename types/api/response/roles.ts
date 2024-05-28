import { type ModulesType } from '@/types/enums'
import { type WithId } from './auth'

export type RoleResponse = {
  idrole_admin: number
  name_role: string
  active: boolean
  iduser_creator: number | null
  createdAt: Date
  updatedAt: Date
  user_count: string
  creator: Creator | null
}
export type Creator = {
  iduser_admin: number
  name_user: string
  email: string
  idrole_admin: number
  photo_idgallery: number
  createdAt: Date
  updatedAt: Date
}
export type RoleDataType = RoleResponse & WithId

export type PermissionResponse = {
  idpermission_admin: number
  name_permission: ModulesType
  idmodule_admin: number
  createdAt: Date
  updatedAt: Date
  module: null
}

export type PermissionCreateResponse = {
  idrole_admin: number
  createdAt: Date
  permission: PermissionCreateData
}

export type PermissionCreateData = {
  idpermission_admin: number
  name_permission: string
}

export type RoleShortResponse = Omit<RoleResponse, 'user_count' | 'creator'>

export type RolePermissionResponse = {
  role: RoleShortResponse
  permissions: PermissionCreateResponse[]
}
