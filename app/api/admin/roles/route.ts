import {
  BASE_MC_PERMISSIONS_ROLE_URL,
  BASE_MC_ROLES_URL
} from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import { type GenericResponse } from '@/types/api'
import { type BodyRoleForm } from '@/types/api/request/roles-form'
import {
  type RolePermissionResponse,
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
  const { roleData, permissionsData, isEditing, idRole } = body

  try {
    if (permissionsData === undefined) {
      return NextResponse.json({
        statusCode: 400,
        message: 'Faltan datos necesarios',
        data: null,
        error: 'Datos no válidos'
      })
    }

    if (isEditing) {
      const mcInstance = await mcApi()

      const resPermissions: AxiosResponse<
      GenericResponse<RolePermissionResponse>
      > = await mcInstance.post<GenericResponse<RolePermissionResponse>>(
        `${BASE_MC_PERMISSIONS_ROLE_URL}/create/block/${idRole}`,
        permissionsData
      )

      await mcInstance.put<GenericResponse<RoleResponse>>(
        `${BASE_MC_ROLES_URL}/update/${idRole}`,
        roleData
      )

      return NextResponse.json(resPermissions.data)
    } else {
      const mcInstance = await mcApi()
      const resRoles: AxiosResponse<GenericResponse<RoleResponse>> =
        await mcInstance.post<GenericResponse<RoleResponse>>(
          `${BASE_MC_ROLES_URL}/create`,
          roleData
        )
      const createResponse = resRoles.data
      if (createResponse.data !== null) {
        const idRoleCreated = createResponse.data.idrole_admin

        const resPermissions: AxiosResponse<
        GenericResponse<RolePermissionResponse>
        > = await mcInstance.post<GenericResponse<RolePermissionResponse>>(
          `${BASE_MC_PERMISSIONS_ROLE_URL}/create/block/${idRoleCreated}`,
          permissionsData
        )

        return NextResponse.json(resPermissions.data)
      }
    }
  } catch (error) {
    return handleServerError(error)
  }
}
