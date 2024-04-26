export type BodyRoleForm = {
  roleData: RoleData
  permissionsData: BodyPermissionForm[]
}

export type RoleData = {
  name_role: string
}

export type BodyPermissionForm = {
  idpermission_admin: number
  status: boolean
}
