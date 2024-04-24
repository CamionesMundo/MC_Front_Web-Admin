import CustomTextarea from '@/components/textarea/CustomTextarea'
import { handleValidationErrors, type FormErrorMessages } from '@/helpers/error'
import { useUpdateParameter } from '@/hooks/api/useAppConfig'
import { showToast } from '@/hooks/useToast'
import { Save } from '@/icons'
import { capitalize } from '@/lib/utils/utils'
import { descriptionSchema } from '@/lib/validators/globalValidator'
import { type GenericResponse } from '@/types/api'
import { type BodyParameters } from '@/types/api/request/parameters'
import { type AppParameterResponse } from '@/types/api/response/parameters'
import { Spinner, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type TextAreaParameterProps = {
  item: AppParameterResponse
}

const TextAreaParameter = ({ item }: TextAreaParameterProps) => {
  const { mutateAsync: updateParameter, isPending } = useUpdateParameter()
  const router = useRouter()
  const name = `param${item.idparameter}`
  const initialState = item.value_str ?? ''
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [value, setValue] = useState<string>(initialState)

  const validateInput = () => {
    try {
      descriptionSchema.parse(value)
      setErrors(null)
    } catch (error) {
      const err = handleValidationErrors(error)
      if (err !== undefined) {
        setErrors({ name: err })
        return false
      }
    }

    setErrors(null)
    return true
  }

  const onSubmit = async () => {
    if (validateInput()) {
      const updateData: BodyParameters = {
        id: item.idparameter,
        data: {
          value: null,
          value_str: value
        }
      }
      await onUpdated(updateData)
    }
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
      <CustomTextarea
        name={name}
        value={value}
        onValueChange={setValue}
        color={errors?.name !== undefined ? 'danger' : 'primary'}
        label={capitalize(item.name)}
        placeholder='Ingrese una descripción'
        error={errors?.name?.toString() ?? ''}
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

export default TextAreaParameter
