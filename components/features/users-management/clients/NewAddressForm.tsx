import { CustomInput, GenericButton } from '@/components'
import CityAutocomplete from '@/components/autocomplete/CityAutocomplete'
import CountryAutocomplete from '@/components/autocomplete/CountryAutocomplete'
import PortAutocomplete from '@/components/autocomplete/PortAutocomplete'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import { useCreateAddress } from '@/hooks/api/useClients'
import { showToast } from '@/hooks/useToast'
import { addressFormSchema } from '@/lib/validators/addressFormValidator'
import { type GenericResponse } from '@/types/api'
import {
  type BodyAddress,
  type DataAddress
} from '@/types/api/request/client-form'
import {
  type AddressBaseData,
  type ReceivingPortData
} from '@/types/api/response/address'
import {
  type CityListItem,
  type CountryListItem
} from '@/types/api/response/country'
import { AddressType } from '@/types/enums'
import { type AddressEditFormData } from '@/types/store/address'
import { Chip, Switch, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { type FormEvent, useCallback, useState } from 'react'

type NewAddressFormProps = {
  addressType: AddressType
  onCancel: () => void
  idUser: number
}

const NewAddressForm = ({
  addressType,
  onCancel,
  idUser
}: NewAddressFormProps) => {
  const { mutateAsync: createAddress, isPending } = useCreateAddress()
  const router = useRouter()
  const initialState: AddressEditFormData = {
    address: '',
    alias: '',
    postalCode: ''
  }
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [isMain, setIsMain] = useState<boolean>(false)
  const [dataForm, setDataForm] = useState<AddressEditFormData | undefined>(
    initialState
  )

  const toggleIsMain = useCallback((value: boolean | undefined) => {
    setIsMain(value ?? false)
  }, [])

  const [currentCountry, setCurrentCountry] = useState<
  CountryListItem | null | undefined
  >(undefined)

  const [currentCity, setCurrentCity] = useState<CityListItem | undefined>(
    undefined
  )

  const [currentPort, setCurrentPort] = useState<ReceivingPortData | undefined>(
    undefined
  )

  const [currentCountryId, setCurrentCountryId] = useState<number | undefined>(
    undefined
  )
  const handleChangeCountry = useCallback(
    (country: CountryListItem | undefined) => {
      setCurrentCountry(country)
      setCurrentCountryId(country?.idcountry)
    },
    []
  )

  const handleChangeCity = useCallback((country: CityListItem | undefined) => {
    setCurrentCity(country)
  }, [])

  const handleChangePort = useCallback(
    (port: ReceivingPortData | undefined) => {
      setCurrentPort(port)
    },
    []
  )
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [name]: value
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let data = {}
    const commonData = {
      alias: dataForm?.alias,
      address: dataForm?.address,
      postalCode: dataForm?.postalCode,
      idcity: currentCity?.idcity ?? 0
    }

    const additionalData = {
      idReceivingPort: currentPort?.idreceiving_port ?? 0
    }
    if (addressType === AddressType.Delivery) {
      data = { ...commonData, ...additionalData }
    } else {
      data = commonData
    }

    try {
      // Validate the email and password using the login schema
      addressFormSchema.parse(data)

      // If validation succeeds, reset errors state to null
      setErrors(null)
    } catch (error) {
      // If validation fails, handle the error and set errors state accordingly
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors(err)
        showToast('Campos incompletos', 'error')
        return
      }
    }

    const dataBody: DataAddress = {
      active: true,
      address: dataForm?.address,
      alias_address: dataForm?.alias,
      postal_code: dataForm?.postalCode,
      idcity: currentCity?.idcity ?? 0,
      main_address: isMain,
      type_address: addressType,
      ...(addressType === AddressType.Delivery && {
        idreceiving_port: currentPort?.idreceiving_port
      })
    }

    const body: BodyAddress = {
      id: idUser,
      data: dataBody
    }

    await createAddress(body, {
      onSuccess: (data: GenericResponse<AddressBaseData> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          onCancel()
          router.refresh()
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }
  return (
    <div>
      <div className='w-full flex fle-row justify-between px-2 items-center'>
        <span className='text-blackText dark:text-white font-semibold'>
          Creando Nueva dirección
        </span>

        <div className='flex flex-row gap-2 items-center mt-2'>
          <span className='text-sm text-default-500'>
            <Chip color={isMain ? 'primary' : 'default'}>
              <div className='flex gap-1 flex-row items-center'>
                <span>{isMain ? 'Principal' : 'No principal'}</span>
              </div>
            </Chip>
          </span>
          <Tooltip content='Marcar como principal' color='foreground'>
            <div className='flex items-center'>
              <Switch
                size='sm'
                color='primary'
                isSelected={isMain}
                onValueChange={() => {
                  toggleIsMain(!isMain)
                }}
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='alias'
            type='text'
            value={dataForm?.alias}
            onChange={(e) => {
              handleChange(e, 'alias')
            }}
            color={errors?.alias !== undefined ? 'danger' : 'primary'}
            label='Nombre (alias)'
            placeholder='Ej. Sede principal'
            error={errors?.alias?.toString() ?? ''}
          />
          <CountryAutocomplete
            currentCountry={currentCountry}
            changeCountry={handleChangeCountry}
            error={''}
          />
          <CityAutocomplete
            countryId={currentCountryId}
            currentCity={currentCity}
            changeCity={handleChangeCity}
            error={errors?.idcity?.toString() ?? ''}
          />
          <CustomInput
            name='address'
            value={dataForm?.address}
            onChange={(e) => {
              handleChange(e, 'address')
            }}
            type='text'
            color={errors?.address !== undefined ? 'danger' : 'primary'}
            label='Dirección'
            placeholder='Ej. 99999999'
            error={errors?.address?.toString() ?? ''}
          />
          <CustomInput
            name='postalCode'
            value={dataForm?.postalCode}
            onChange={(e) => {
              handleChange(e, 'postalCode')
            }}
            type='text'
            color={errors?.postalCode !== undefined ? 'danger' : 'primary'}
            label='Código postal'
            placeholder='Ej. 99999999'
            error={errors?.postalCode?.toString() ?? ''}
          />
          {addressType === AddressType.Delivery && (
            <PortAutocomplete
              currentPort={currentPort}
              changePort={handleChangePort}
              error={errors?.idReceivingPort?.toString() ?? ''}
            />
          )}
        </div>
        <div className='w-full justify-end flex mb-4 mt-3'>
          <div className='md:w-1/2 w-full flex justify-center gap-4'>
            <div className='md:w-1/2 w-full'>
              <GenericButton
                type='submit'
                label={'Crear'}
                onClick={() => {}}
                isLoading={isPending}
                disabled={isPending}
              />
            </div>
            <div className='md:w-1/2 w-full'>
              <GenericButton
                type='button'
                className='bg-red-700 text-white uppercase font-bold w-full dark:border dark:border-red-500'
                label={'Cancelar'}
                onClick={() => {
                  onCancel()
                }}
                disabled={isPending}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewAddressForm
