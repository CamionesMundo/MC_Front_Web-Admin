import { CustomInput } from '@/components'
import { handleValidationErrors, type FormErrorMessages } from '@/helpers/error'
import { useUpdateParameter } from '@/hooks/api/useAppConfig'
import { showToast } from '@/hooks/useToast'
import { Save } from '@/icons'
import { capitalize, formatNumber } from '@/lib/utils/utils'
import {
  floatNumberSchema,
  percentNumberSchema,
  phoneSchema
} from '@/lib/validators/globalValidator'
import { type GenericResponse } from '@/types/api'
import { type BodyParameters } from '@/types/api/request/parameters'
import { type AppParameterResponse } from '@/types/api/response/parameters'
import { AppParametersType } from '@/types/enums'
import { Spinner, Switch, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type InputParameterDataProps = {
  item: AppParameterResponse
  customLabel?: string
}

const InputParameter = ({ item, customLabel }: InputParameterDataProps) => {
  const { mutateAsync: updateParameter, isPending } = useUpdateParameter()
  const router = useRouter()
  const name = `param${item.idparameter}`
  const getType = (idparameter: AppParametersType) =>
    idparameter === AppParametersType.SupportContactNumber ? 'text' : 'number'

  const isText =
    item.idparameter === AppParametersType.SupportContactNumber ||
    item.idparameter === AppParametersType.CustomAgentDescription

  const isPhoneText =
    item.idparameter === AppParametersType.SupportContactNumber

  const isPercentNumber =
    item.idparameter === AppParametersType.Warranty ||
    item.idparameter === AppParametersType.CommissionForSale ||
    item.idparameter === AppParametersType.WarrantyDeposit

  const isMoney =
    item.idparameter === AppParametersType.PlanFree ||
    item.idparameter === AppParametersType.PlanMonthly ||
    item.idparameter === AppParametersType.PlanAnnual ||
    item.idparameter === AppParametersType.Mechanical

  const isBoolean =
    item.idparameter === AppParametersType.FreeMemberShipsForever
  const initialState = isText ? item.value_str ?? '' : item.value ?? ''

  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [value, setValue] = useState<string>(
    isText
      ? initialState
      : isPercentNumber
        ? (parseFloat(formatNumber(initialState)) * 100).toFixed(2).toString()
        : isMoney
          ? formatNumber(initialState)
          : parseInt(initialState).toString()
  )

  const isTrue = item.value === '1.00'

  const [isSelected, setIsSelected] = useState<boolean>(isTrue)

  const validateInput = () => {
    if (isPhoneText) {
      try {
        phoneSchema.parse(value)
        setErrors(null)
      } catch (error) {
        const err = handleValidationErrors(error)
        if (err !== undefined) {
          setErrors({ name: err })
          return false
        }
      }
    } else if (isPercentNumber) {
      try {
        percentNumberSchema.parse(value)
        setErrors(null)
      } catch (error) {
        const err = handleValidationErrors(error)
        if (err !== undefined) {
          setErrors({ name: err })
          return false
        }
      }
    } else {
      try {
        floatNumberSchema.parse(value)
        setErrors(null)
      } catch (error) {
        const err = handleValidationErrors(error)
        if (err !== undefined) {
          setErrors({ name: err })
          return false
        }
      }
    }
    setErrors(null)
    return true
  }

  const onSubmit = async () => {
    if (isBoolean) {
      const updateData: BodyParameters = {
        id: item.idparameter,
        data: {
          value: isSelected ? 1 : 0,
          value_str: null
        }
      }

      await onUpdated(updateData)
    } else {
      if (validateInput()) {
        if (isPhoneText) {
          const updateData: BodyParameters = {
            id: item.idparameter,
            data: {
              value: null,
              value_str: value
            }
          }
          await onUpdated(updateData)
          return
        }
        if (isPercentNumber) {
          const updateData: BodyParameters = {
            id: item.idparameter,
            data: {
              value: parseFloat(value) / 100,
              value_str: null
            }
          }
          await onUpdated(updateData)
          return
        }
        if (isMoney) {
          const updateData: BodyParameters = {
            id: item.idparameter,
            data: {
              value: parseFloat(value),
              value_str: null
            }
          }
          await onUpdated(updateData)
          return
        }
        const updateData: BodyParameters = {
          id: item.idparameter,
          data: {
            value: Number(value),
            value_str: null
          }
        }
        await onUpdated(updateData)
      }
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue(value)
  }

  const onBlur = () => {
    if (!isText) {
      if (isMoney || isPercentNumber) {
        setValue(formatNumber(value))
      } else {
        setValue(value)
      }
    }
  }
  const toggleIsSelected = useCallback((value: boolean | undefined) => {
    setIsSelected(value ?? false)
  }, [])
  return (
    <>
      {isBoolean
        ? (
        <div className='flex flex-row gap-2 justify-between items-center w-full'>
          <div className='flex flex-row items-center gap-3'>
            <div className='dark:text-white text-blackText text-xs font-semibold'>
              {item.name}
            </div>

            <div className='flex items-center'>
              <Switch
                size='sm'
                color='primary'
                isSelected={isSelected}
                onValueChange={() => {
                  toggleIsSelected(!isSelected)
                }}
              />
            </div>
          </div>
          <Tooltip content='Guardar'>
            <div
              className='w-8 h-8 flex justify-center items-center dark:bg-primary/80 dark:hover:bg-primary bg-slate-300 hover:bg-slate-400 hover:cursor-pointer rounded-full dark:border dark:border-white/60'
              onClick={!isPending ? onSubmit : undefined}
            >
              {isPending
                ? (
                <Spinner label='' color='default' size='sm' />
                  )
                : (
                <Save className='w-4 h-4 dark:text-white' />
                  )}
            </div>
          </Tooltip>
        </div>
          )
        : (
        <div className='flex flex-row gap-2 items-center w-full'>
          <CustomInput
            name={name}
            type={getType(item.idparameter)}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            color={errors?.name !== undefined ? 'danger' : 'primary'}
            label={customLabel !== undefined ? capitalize(customLabel) : capitalize(item.name)}
            placeholder={
              item.idparameter === AppParametersType.SupportContactNumber
                ? 'Ej. 888888888'
                : ' Ej. 0.30'
            }
            error={errors?.name?.toString() ?? ''}
            startContent={
              isPercentNumber
                ? (
                <div className='flex items-center font-semibold text-blackText dark:text-white text-sm'>
                  {'%'}
                </div>
                  )
                : isMoney
                  ? (
                <div className='flex items-center font-semibold text-blackText dark:text-white text-sm'>
                  {'$'}
                </div>
                    )
                  : undefined
            }
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
          )}
    </>
  )
}

export default InputParameter
