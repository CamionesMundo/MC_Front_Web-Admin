import AdminsAutocomplete from '@/components/autocomplete/AdminsAutocomplete'
import { useGetAllAdmins } from '@/hooks/api/useAdmins'
import { useUpdateParameter } from '@/hooks/api/useAppConfig'
import { showToast } from '@/hooks/useToast'
import { Save } from '@/icons'
import { type GenericResponse } from '@/types/api'
import { type BodyParameters } from '@/types/api/request/parameters'
import { type UserResponse } from '@/types/api/response/auth'
import { type AppParameterResponse } from '@/types/api/response/parameters'
import { Spinner, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

type AdminParameterProps = {
  item: AppParameterResponse
}

const AdminParameter = ({ item }: AdminParameterProps) => {
  const { data: responseAdmins } = useGetAllAdmins()
  const { mutateAsync: updateParameter, isPending } = useUpdateParameter()
  const router = useRouter()
  const [currentAdmin, setCurrentAdmin] = useState<UserResponse | undefined>(
    undefined
  )

  const handleChangeAdmin = useCallback((admin: UserResponse | undefined) => {
    setCurrentAdmin(admin)
  }, [])

  useEffect(() => {
    if (responseAdmins !== undefined && item.value !== undefined) {
      const adminId = Number(item.value)
      const findAdmin = responseAdmins.data.find(
        (admin) => admin.iduser_admin === adminId
      )
      handleChangeAdmin(findAdmin)
    }
  }, [item.value, responseAdmins, handleChangeAdmin])

  const onSubmit = async () => {
    const currentValue = currentAdmin?.iduser_admin ?? 0
    console.log(currentValue)
    const updateData: BodyParameters = {
      id: item.idparameter,
      data: {
        value: currentValue,
        value_str: null
      }
    }
    await onUpdated(updateData)
  }
  const onUpdated = async (updateData: BodyParameters) => {
    await updateParameter(updateData, {
      onSuccess: (data: GenericResponse<AppParameterResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          router.refresh()
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }
  return (
    <div className='flex flex-row gap-2 items-center w-full'>
      <AdminsAutocomplete
        currentAdmin={currentAdmin}
        changeAdmin={handleChangeAdmin}
        error=''
      />
      <Tooltip content='Guardar'>
        <div
          className='w-8 h-8 flex justify-center items-center relative dark:bg-primary/80 dark:hover:bg-primary bg-slate-300 hover:bg-slate-400 hover:cursor-pointer rounded-full dark:border dark:border-white/60'
          onClick={!isPending ? onSubmit : undefined}
        >
          {isPending
            ? (
            <div className='w-5 h-5'>
              <Spinner
                label=''
                color='primary'
                classNames={{
                  circle1:
                    'absolute w-5 h-5 rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary',
                  circle2:
                    'absolute w-5 h-5 rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary'
                }}
              />
            </div>
              )
            : (
            <Save className='w-4 h-4 dark:text-white' />
              )}
        </div>
      </Tooltip>
    </div>
  )
}

export default AdminParameter
