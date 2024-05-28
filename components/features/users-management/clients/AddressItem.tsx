import { CustomInput, GenericButton } from '@/components'
import CityAutocomplete from '@/components/autocomplete/CityAutocomplete'
import CountryAutocomplete from '@/components/autocomplete/CountryAutocomplete'
import PortAutocomplete from '@/components/autocomplete/PortAutocomplete'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import { useUpdateAddress } from '@/hooks/api/useClients'
import { showToast } from '@/hooks/useToast'
import { Delete, Edit, Location, PostalCode, Ship } from '@/icons'
import { addressFormSchema } from '@/lib/validators/addressFormValidator'
import { type GenericResponse } from '@/types/api'
import {
  type BodyAddress,
  type DataAddress
} from '@/types/api/request/client-form'
import {
  type ReceivingPortData,
  type DeliveryAddress,
  type AddressBaseData
} from '@/types/api/response/address'
import {
  type CityListItem,
  type CountryListItem
} from '@/types/api/response/country'
import { AddressType } from '@/types/enums'
import { type AddressEditFormData } from '@/types/store/address'
import { Avatar, Chip, Divider, Switch, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect, type FormEvent } from 'react'

type AddressItemProps = {
  item: DeliveryAddress
  isPreviewMode?: boolean
  city: CityListItem
}
const AddressItem = ({
  item,
  isPreviewMode = false,
  city
}: AddressItemProps) => {
  const { mutateAsync: updateAddress, isPending } = useUpdateAddress()
  const router = useRouter()

  const initialState: AddressEditFormData = {
    address: '',
    alias: '',
    postalCode: ''
  }

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isMain, setIsMain] = useState<boolean>(false)
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [dataForm, setDataForm] = useState<AddressEditFormData | undefined>(
    initialState
  )
  const toggleIsMain = useCallback((value: boolean | undefined) => {
    setIsMain(value ?? false)
  }, [])

  const [currentCountry, setCurrentCountry] = useState<
  CountryListItem | null | undefined
  >(null)

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

  useEffect(() => {
    if (isEditing) {
      setDataForm({
        address: item.address ?? '',
        alias: item.alias_address ?? '',
        postalCode: item.postal_code ?? ''
      })
      toggleIsMain(item.main_address)
      handleChangeCountry(item.city.country)
      handleChangeCity(city)
      handleChangePort(item.receiving_port)
    }
  }, [
    item,
    toggleIsMain,
    handleChangeCountry,
    city,
    handleChangeCity,
    isEditing,
    handleChangePort
  ])

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
    if (item.type_address === AddressType.Delivery) {
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
      ...(item.main_address === false && { main_address: isMain }),
      type_address: item.type_address,
      ...(item.type_address === AddressType.Delivery && {
        idreceiving_port: currentPort?.idreceiving_port
      })
    }
    const body: BodyAddress = {
      id: item.idaddress,
      data: dataBody
    }

    await updateAddress(body, {
      onSuccess: (data: GenericResponse<AddressBaseData> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
          setIsEditing(false)
          router.refresh()
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  return (
    <>
      {isEditing
        ? (
        <>
          <div className='w-full flex fle-row justify-between px-2 items-center'>
            <span className='text-blackText dark:text-white font-semibold'>
              Editando
            </span>
            {item.main_address === false && (
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
            )}
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
                error={errors?.idcountry?.toString() ?? ''}
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
              {item.type_address === AddressType.Delivery && (
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
                    label={'Actualizar'}
                    onClick={() => {}}
                    startContent={<Edit className='w-3.5 h-3.5' />}
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
                      setIsEditing(false)
                    }}
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className='mb-2'>
            <Divider />
          </div>
        </>
          )
        : (
        <div className='w-full flex flex-col border border-gray rounded-xl p-2 md:p-3'>
          <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center gap-4'>
              <span className='font-semibold text-sm dark:text-white'>
                {item.alias_address ?? 'Sin nombre (alias)'}
              </span>
              {(item.main_address ?? false) && (
                <div className='py-1 px-3 bg-primary rounded-2xl font-semibold text-white text-xs'>
                  Principal
                </div>
              )}
            </div>
            {!isPreviewMode && (
              <div className='flex gap-2 flex-row'>
                <Tooltip content='Editar' color='foreground'>
                  <span
                    className='text-lg text-default-400 cursor-pointer active:opacity-50 dark:text-white'
                    onClick={() => {
                      setIsEditing(true)
                    }}
                  >
                    <Edit className='w-4 h-4' />
                  </span>
                </Tooltip>
                <Tooltip color='danger' content='Eliminar'>
                  <span
                    className='text-lg text-danger cursor-pointer active:opacity-50'
                    onClick={() => {}}
                  >
                    <Delete className='w-4 h-4' />
                  </span>
                </Tooltip>
              </div>
            )}
          </div>
          <div className='flex flex-col w-full gap-1 mt-2'>
            <div className='flex flex-row gap-2 items-center'>
              <Location className='w-3.5 h-3.5 dark:text-white' />
              <span className='text-xs md:text-sm dark:text-white'>
                {item.address ?? 'No registrado'}
              </span>
            </div>
            {item.type_address === AddressType.Delivery
              ? (
              <div className='flex flex-row gap-2 items-center'>
                <Ship className='w-3.5 h-3.5 dark:text-white' />
                <span className='text-xs md:text-sm dark:text-white'>
                  {item.receiving_port?.name ?? 'No registrado'}
                </span>
              </div>
                )
              : (
              <div className='flex flex-row gap-2 items-center'>
                <PostalCode className='w-3.5 h-3.5 dark:text-white' />
                <span className='text-xs md:text-sm dark:text-white'>{`Código postal: ${
                  item.postal_code ?? 'No registrado'
                }`}</span>
              </div>
                )}
            <div className='flex flex-row gap-2 items-center'>
              {item.city.country.country_code !== undefined && (
                <Avatar
                  alt={`Bandera de ${item.city.country.country_name ?? ''}`}
                  className='w-4 h-4'
                  src={`https://flagcdn.com/${(
                    item.city.country.country_code ?? ''
                  ).toLowerCase()}.svg`}
                />
              )}
              <p className='text-xs md:text-sm dark:text-white'>
                {item.city.city_name ?? 'No registrado'},{' '}
                <span className='dark:text-white'>
                  {item.city.country.country_name ?? 'No registrado'}
                </span>
              </p>
            </div>
          </div>
        </div>
          )}
    </>
  )
}

export default AddressItem
