import { CustomInput, GenericButton } from '@/components'
import { BackComponent } from '@/components/ui/BackComponent'
import { handleValidationErrors, type FormErrorMessages } from '@/helpers/error'
import {
  useCreateRol,
  useGetAllPermissions,
  useGetAllRoles,
  useGetPermissionsByIdRole
} from '@/hooks/api/useRoles'
import { usePermissionFormStore } from '@/store/usePermissionsForm'
import { Divider, Spacer } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import SwitchPermission from './SwitchPermission'
import { Loader } from '@/components/ui/Loader'
import { nameSchema } from '@/lib/validators/globalValidator'
import { type BodyRoleForm } from '@/types/api/request/roles-form'
import { type GenericResponse } from '@/types/api'
import { type RolePermissionResponse } from '@/types/api/response/roles'
import { showToast } from '@/hooks/useToast'
type RolesFormProps = {
  isEditing?: boolean
}
type TypeParams = {
  id?: string
}

const RolesForm = ({ isEditing = false }: RolesFormProps) => {
  const { data: rolesResponse } = useGetAllRoles()
  const { mutateAsync: createRol, isPending: isLoadingCreateRol } =
    useCreateRol()

  const { data: permissionsResponse, isLoading: isLoadingPermissions } =
    useGetAllPermissions()

  const router = useRouter()
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0
  const { data: permissionsByRole } = useGetPermissionsByIdRole(Number(id))
  const permissionsToMatch = useMemo(() => {
    const permissions = permissionsByRole?.data?.map(
      (permission) => permission.permission.name_permission
    )
    if (permissions !== undefined) {
      return permissions
    } else {
      return []
    }
  }, [permissionsByRole])

  const { setData, reset, ...permissions } = usePermissionFormStore()

  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (id !== 0 && rolesResponse !== undefined) {
      const data = rolesResponse.data
      const filtered = data.find(role => role.idrole_admin === Number(id))
      setName(filtered?.name_role ?? '')
    }
  }, [id, rolesResponse])
  useEffect(() => {
    if (permissionsToMatch.length > 0) {
      permissionsToMatch.forEach((permission) => {
        setData(permission, true)
      })
    }
  }, [permissionsToMatch, setData])
  const permissionsDB = useMemo(() => {
    if (permissionsResponse !== undefined) {
      return permissionsResponse.data
    } else {
      return []
    }
  }, [permissionsResponse])

  const onBack = () => {
    setTimeout(() => {
      reset()
    }, 300)
  }
  const onSubmit = async () => {
    try {
      nameSchema.parse(name)
      setErrors(null)
    } catch (error) {
      const err = handleValidationErrors(error)
      if (err !== undefined) {
        setErrors({ name: err })
        return
      }
    }
    if (isEditing) {
      const allPermissions = permissionsDB.map((permission) => ({
        idpermission_admin: permission.idpermission_admin,
        status: permissions[permission.name_permission]
      }))

      const dataToCreate: BodyRoleForm = {
        roleData: {
          name_role: name
        },
        permissionsData: allPermissions,
        isEditing: true,
        idRole: Number(id)
      }

      await onUpdate(dataToCreate)
    } else {
      const filteredPermissions = permissionsDB.filter(
        (permission) => permissions[permission.name_permission]
      )
      const mapIdsPermissions = filteredPermissions.map((permission) => ({
        idpermission_admin: permission.idpermission_admin,
        status: true
      }))

      const dataToCreate: BodyRoleForm = {
        roleData: {
          name_role: name
        },
        permissionsData: mapIdsPermissions,
        isEditing: false,
        idRole: null
      }
      await onCreate(dataToCreate)
    }
  }

  const onCreate = async (updateData: BodyRoleForm) => {
    await createRol(updateData, {
      onSuccess: (
        data: GenericResponse<RolePermissionResponse> | undefined
      ) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          router.refresh()
          router.push('/users-management/roles')
          setTimeout(() => {
            reset()
          }, 600)
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const onUpdate = async (updateData: BodyRoleForm) => {
    await createRol(updateData, {
      onSuccess: (
        data: GenericResponse<RolePermissionResponse> | undefined
      ) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          router.refresh()
          router.push('/users-management/roles')
          setTimeout(() => {
            reset()
          }, 300)
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title={'Roles'}
          subtitle={isEditing ? 'Editar' : 'Crear'}
          onAction={onBack}
        />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          {isEditing
            ? 'Modifica los campos que necesites para editar y actualizar los datos de un rol'
            : 'Llena todos los campos necesarios del formulario para añadir un nuevo rol'}
        </p>
      </div>
      <Spacer />
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1'>
        <CustomInput
          name='name'
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          color={errors?.name !== undefined ? 'danger' : 'primary'}
          label='Nombre de Rol'
          placeholder='Ej. Administrador'
          error={errors?.name?.toString() ?? ''}
        />
      </div>
      <Divider />
      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Permisos
        </h1>
      </div>
      {isLoadingPermissions && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLoadingPermissions && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-2'>
            {permissionsDB?.length > 0 &&
              permissionsDB.map((permission) => (
                <SwitchPermission
                  key={permission.idpermission_admin}
                  item={permission}
                />
              ))}
          </div>
          <div className='md:w-1/4 sm:w-1/2 w-full mt-4'>
            <GenericButton
              type='button'
              label={isEditing ? 'Actualizar datos' : 'Crear rol'}
              onClick={onSubmit}
              disabled={ isLoadingCreateRol}
              isLoading={ isLoadingCreateRol}
            />
          </div>
        </>
      )}
    </>
  )
}

export default RolesForm
