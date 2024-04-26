import { BASE_MC_PERMISSIONS_ROLE_URL, BASE_MC_ROLES_URL } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyRoleForm } from '@/types/api/request/roles-form'
import {
  type PermissionCreateResponse,
  type RoleResponse
} from '@/types/api/response/roles'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function GET () {
  try {
    const mcInstance = await mcApi()

    const res: AxiosResponse<GenericResponse<RoleResponse[]>> =
      await mcInstance.get<GenericResponse<RoleResponse[]>>(BASE_MC_ROLES_URL)

    return NextResponse.json(res.data)
  } catch (error) {
    console.log(error)
    return handleServerError(error)
  }
}

export async function POST (req: Request) {
  const body = (await req.json()) as BodyRoleForm
  const { roleData, permissionsData } = body
  console.log(roleData)
  console.log(permissionsData)
  try {
    if (roleData === undefined || permissionsData === undefined) {
      return NextResponse.json({
        statusCode: 400,
        message: 'Faltan datos necesarios',
        data: null,
        error: 'Datos no válidos'
      })
    }
    const mcInstance = await mcApi()
    const resRoles: AxiosResponse<GenericResponse<RoleResponse>> =
      await mcInstance.post<GenericResponse<RoleResponse>>(
        `${BASE_MC_ROLES_URL}/create`,
        roleData
      )
    const createResponse = resRoles.data
    if (createResponse.data !== null) {
      const idRole = createResponse.data.idrole_admin
      console.log(idRole)
      const resPermissions: AxiosResponse<
      GenericResponse<PermissionCreateResponse[]>
      > = await mcInstance.post<GenericResponse<PermissionCreateResponse[]>>(
        `${BASE_MC_PERMISSIONS_ROLE_URL}/create/block/${idRole}`,
        permissionsData
      )
      console.log(resPermissions)
      return NextResponse.json(resPermissions.data)
    }
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}
