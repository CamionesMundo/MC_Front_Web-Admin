'use client'

import { CustomInput, GenericButton, CustomSelect } from '@/components'
import { BackComponent } from '@/components/ui/BackComponent'
import { Loader } from '@/components/ui/Loader'
import { ADMIN_LIST_ROUTE } from '@/const/routes'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import {
  useCreateAdmin,
  useGetAdminById,
  useUpdateAdmin
} from '@/hooks/api/useAdmins'
import { useGetAllRoles } from '@/hooks/api/useRoles'
import { showToast } from '@/hooks/useToast'
import { Visible } from '@/icons'
import { capitalize } from '@/lib/utils/utils'
import { adminFormSchema } from '@/lib/validators/adminFormValidator'
import { type AdminFormData, useAdminFormStore } from '@/store/useAdminForm'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateAdminForm,
  type BodyAdminForm,
  type RequestUpdateAdminForm
} from '@/types/api/request'
import {
  type UserResponse,
  type UserDataResponse
} from '@/types/api/response/auth'
import { Divider, SelectItem, Spacer } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import {
  type FormEvent,
  useState,
  type ChangeEvent,
  useEffect,
  useMemo
} from 'react'

type AdminFormProps = {
  isEditing?: boolean
}
type TypeParams = {
  id?: string
}

/**
 * Component for the admin form.
 * @param isEditing Indicates whether editing an existing admin.
 */
const AdminForm = ({ isEditing = false }: AdminFormProps) => {
  const { data: rolesResponse, isLoading: isLoadingRoles } = useGetAllRoles()
  // Hooks and states
  const router = useRouter()
  const { mutateAsync: createAdmin, isPending: isPendingCreate } =
    useCreateAdmin()
  const { mutateAsync: updateAdmin, isPending: isPendingUpdate } =
    useUpdateAdmin()
  // Get Id by params
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0

  const {
    name,
    email,
    password,
    role,
    setData,
    reset,
    showPassword,
    togglePassword,
    changeSelection
  } = useAdminFormStore()
  const {
    data: adminData,
    isLoading,
    isRefetching,
    refetch
  } = useGetAdminById(Number(id))
  const [adminId, setAdminId] = useState<number | null>(null)
  const loading: boolean = isLoading ?? isRefetching
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  const roles = useMemo(() => {
    if (rolesResponse !== undefined) {
      const mapped = rolesResponse.data?.map((roleData) => {
        const data = {
          idrole_admin: roleData.idrole_admin,
          name_role: roleData.name_role
        }
        return data
      })
      if (isEditing) {
        return mapped
      } else {
        const filtered = mapped.filter(
          (roleData) => roleData.idrole_admin !== 2
        )
        return filtered
      }
    } else {
      return []
    }
  }, [rolesResponse, isEditing])

  /**
   * Side effect for loading admin data when editing.
   */
  useEffect(() => {
    if (isEditing && adminData !== undefined) {
      refetch()
        .then((response) => {
          const dataR: GenericResponse<UserResponse> | undefined = response.data
          setData({
            name: dataR?.data.name_user ?? '',
            email: dataR?.data.email ?? '',
            password: ''
          })

          changeSelection((dataR?.data.role.idrole_admin ?? '').toString())
          setAdminId(dataR?.data.iduser_admin ?? null)
        })
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos del administrador:',
            error
          )
        })
    } else {
      reset()
    }
  }, [isEditing, adminData, refetch, reset, changeSelection, setData])

  /**
   * Handles form submission.
   * @param e Form event.
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Validate the email and password using the login schema
      adminFormSchema.parse({ name, email, password, role })

      // If validation succeeds, reset errors state to null
      setErrors(null)
    } catch (error) {
      // If validation fails, handle the error and set errors state accordingly
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors(err)
      }
    }

    const body: BodyAdminForm = {
      name_user: name,
      email,
      password,
      idrole_admin: Number(role),
      photo_idgallery: null
    }
    try {
      if (isEditing) {
        const body: BodyUpdateAdminForm = {
          name_user: name,
          idrole_admin: Number(role),
          photo_idgallery: null
        }

        const requestBody: RequestUpdateAdminForm = {
          id: Number(adminId),
          body
        }
        await updateAdmin(requestBody, {
          onSuccess: (data: GenericResponse<UserResponse> | undefined) => {
            if (data?.error !== undefined) {
              showToast(data.message, 'error')
            } else {
              showToast(data?.message ?? '', 'success')
              router.push(ADMIN_LIST_ROUTE)
              router.refresh()
            }
          },
          onError: (data: Error) => {
            showToast(data.message, 'error')
          }
        })
      } else {
        await createAdmin(body, {
          onSuccess: (data: GenericResponse<UserDataResponse>) => {
            if (data.error !== undefined) {
              showToast(data.error, 'error')
              return
            }
            showToast(data.message, 'success')
            router.push(ADMIN_LIST_ROUTE)
          },
          onError: (data: Error) => {
            showToast(data.message, 'error')
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Handles input change in the form.
   * @param e Input change event.
   * @param field Form field.
   */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof AdminFormData
  ) => {
    const newData: Partial<AdminFormData> = {}
    newData[field] = e.target.value
    setData(newData as AdminFormData)
  }

  /**
   * Handles navigation back.
   */
  const onBack = () => {
    setTimeout(() => {
      reset()
    }, 300)
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title={'Administradores'}
          subtitle={isEditing ? 'Editar' : 'Crear'}
          onAction={onBack}
        />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          {isEditing
            ? 'Modifica los campos que necesites para editar y actualizar los datos de un administrador'
            : 'Llena todos los campos del formulario para añadir un nuevo Administrador'}
        </p>
      </div>
      <Spacer />
      <Divider />
      {isEditing && loading
        ? (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
          )
        : (
        <form className='w-full' onSubmit={onSubmit} autoComplete='nope'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-4 md:gap-y-1'>
            <CustomInput
              name='name'
              type='text'
              value={name}
              onChange={(e) => {
                handleInputChange(e, 'name')
              }}
              color={errors?.name !== undefined ? 'danger' : 'primary'}
              label='Nombre de Usuario'
              placeholder='Ej. John Doe'
              error={errors?.name?.toString() ?? ''}
            />
            <CustomInput
              name='email'
              type='text'
              className={isEditing ? 'cursor-not-allowed' : ''}
              value={email}
              readOnly={isEditing}
              disabled={isEditing}
              onChange={(e) => {
                handleInputChange(e, 'email')
              }}
              color={errors?.email !== undefined ? 'danger' : 'primary'}
              label='Correo electrónico'
              placeholder='Ej. admin@mundocamiones.com'
              error={errors?.email?.toString() ?? ''}
            />
            {!isEditing && (
              <CustomInput
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  handleInputChange(e, 'password')
                }}
                color={errors?.password !== undefined ? 'danger' : 'primary'}
                label='Contraseña'
                placeholder='Ingresa aquí tu contraseña'
                endContent={
                  <Visible
                    className='icon-input dark:text-white'
                    onClick={togglePassword}
                  />
                }
                error={errors?.password?.toString() ?? ''}
              />
            )}
            <CustomSelect
              name='role'
              selectedKeys={role}
              onChange={(e) => {
                changeSelection(e.target.value)
              }}
              color={errors?.role !== undefined ? 'danger' : 'primary'}
              error={errors?.role?.toString() ?? ''}
                label='Rol'
                isLoading={isLoadingRoles}
            >
              {roles.map((r) => (
                <SelectItem key={r.idrole_admin} value={r.idrole_admin}>
                  {capitalize(r.name_role)}
                </SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className='w-full flex justify-start mt-10'>
            <div className='w-1/4'>
              <GenericButton
                type='submit'
                label={isEditing ? 'Actualizar Datos' : 'Crear Administrador'}
                isLoading={isEditing ? isPendingUpdate : isPendingCreate}
                disabled={isEditing ? isPendingUpdate : isPendingCreate}
              />
            </div>
          </div>
        </form>
          )}
    </>
  )
}

export default AdminForm
