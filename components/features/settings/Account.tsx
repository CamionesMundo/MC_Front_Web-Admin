import { CustomInput, CustomSelect, GenericButton } from '@/components'
import { handleValidationFormErrors, type FormErrorMessages } from '@/helpers/error'
import { useUpdateAdmin } from '@/hooks/api/useAdmins'
import { showToast } from '@/hooks/useToast'
import { adminFormSchema } from '@/lib/validators/adminFormValidator'
import {
  type AdminProfileFormData,
  useAdminProfileFormStore
} from '@/store/useProfileAdmin'
import { type GenericResponse } from '@/types/api'
import {
  type BodyUpdateAdminForm,
  type RequestUpdateAdminForm
} from '@/types/api/request'
import { type UserResponse } from '@/types/api/response/auth'

import { Divider, SelectItem } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, {
  type ChangeEvent,
  useState,
  useEffect,
  type FormEvent
} from 'react'

const Account = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { name, setData, role, changeSelection } = useAdminProfileFormStore()
  const { mutateAsync: updateAdmin, isPending: isPendingUpdate } =
    useUpdateAdmin()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  useEffect(() => {
    if (session?.user !== undefined) {
      setData({
        name: session.user.name ?? ''
      })
      changeSelection('1')
    }
  }, [session?.user, setData, changeSelection])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof AdminProfileFormData
  ) => {
    const newData: Partial<AdminProfileFormData> = {}
    newData[field] = e.target.value
    setData(newData as AdminProfileFormData)
  }

  const onSaveData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Validate the email and password using the login schema
      adminFormSchema.parse({ name })

      // If validation succeeds, reset errors state to null
      setErrors(null)
    } catch (error) {
      // If validation fails, handle the error and set errors state accordingly
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors(err)
        return
      }
    }
    const body: BodyUpdateAdminForm = {
      name_user: name
    }

    const requestBody: RequestUpdateAdminForm = {
      id: Number(session?.user.id),
      body
    }
    await updateAdmin(requestBody, {
      onSuccess: async (data: GenericResponse<UserResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          await update({
            ...session,
            user: { ...session?.user, name: data?.data.name_user }
          })
          router.refresh()
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }
  return (
    <div className='mt-4'>
      <form onSubmit={onSaveData}>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-x-4 md:gap-y-1'>
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
            readOnly
            disabled
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors?.email?.toString() ?? ''}
          />
          <CustomSelect
            name='role'
            value={role}
            onChange={(e) => {
              changeSelection(e.target.value)
            }}
            color={errors?.role !== undefined ? 'danger' : 'primary'}
            error={errors?.role?.toString() ?? ''}
            label='Rol'
          >
            <SelectItem key={1} value={'1'}>
              {'Admin'}
            </SelectItem>
          </CustomSelect>
        </div>

        <div className='w-full flex justify-start mt-10'>
          <div className='w-1/4'>
            <GenericButton
              type='submit'
              label={'Guardar Datos'}
              disabled={isPendingUpdate}
              isLoading={isPendingUpdate}
            />
          </div>
        </div>
      </form>
      <div className='my-3'>
        <Divider />
      </div>
      <h1 className='font-semibold text-blackText dark:text-white'>
        Solicitar cambio de contraseña
      </h1>
      <div className='w-1/4 mt-3'>
        <GenericButton type='button' label={'Solicitar '} />
      </div>
    </div>
  )
}

export default Account
