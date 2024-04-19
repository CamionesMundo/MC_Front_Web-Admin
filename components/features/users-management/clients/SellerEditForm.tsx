'use client'
import { CustomInput, GenericButton } from '@/components'
import ModalStatus from '@/components/modal/ModalStatus'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import {
  useApprovedStatusUserApp,
  useUpdateSeller
} from '@/hooks/api/useClients'
import { showToast } from '@/hooks/useToast'

import { Check, Close, Edit } from '@/icons'
import { sellerFormSchema } from '@/lib/validators/clientFormValidator'
import { useSellerProfileFormStore } from '@/store/useClientSellerForm'
import { type GenericResponse } from '@/types/api'
import {
  type DataUpdateSeller,
  type BodyUpdateSeller
} from '@/types/api/request/client-form'

import { type SellerData, type ClientResponse } from '@/types/api/response/user'
import { UserType } from '@/types/enums'
import { type SellerProfileFormData } from '@/types/store/client'
import { Chip, Switch, Tooltip, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  type ChangeEvent,
  useEffect,
  useState,
  type FormEvent
} from 'react'

type SellerEditFormProps = {
  client: ClientResponse | null
}

const SellerEditForm = ({ client }: SellerEditFormProps) => {
  const {
    mutateAsync: changeApprovedStatus,
    isPending: isLoadingApprovedStatus
  } = useApprovedStatusUserApp()

  const { mutateAsync: updateSeller, isPending: isLoadingUpdateSeller } =
    useUpdateSeller()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const {
    website,
    rut,
    companyName,
    companyEmail,
    companyPhoneNumber,
    setSellerData
  } = useSellerProfileFormStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [isApproved, setIsApproved] = useState<boolean>(
    client?.seller?.approved ?? false
  )
  const handleChangeSwitch = async () => {
    await handleChangeStatusApproved()
    setIsApproved(!isApproved)
    onClose()
  }
  useEffect(() => {
    if (client !== undefined) {
      const seller = client?.seller
      setSellerData({
        website: seller?.website ?? '',
        rut: seller?.number_rut ?? '',
        companyName: seller?.company_name ?? '',
        companyEmail: seller?.company_email ?? '',
        companyPhoneNumber: seller?.company_phone ?? ''
      })
    }
  }, [client, setSellerData])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof SellerProfileFormData
  ) => {
    const newData: Partial<SellerProfileFormData> = {}
    newData[field] = e.target.value
    setSellerData(newData as SellerProfileFormData)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isBusiness = client?.seller?.type_seller === UserType.Business
    let formData = {}

    if (!isBusiness && website !== '') {
      formData = { website }
    } else if (isBusiness) {
      formData = {
        ...(website !== '' && { website }),
        ...(rut !== '' && { rut }),
        ...(companyName !== '' && { companyName }),
        ...(companyEmail !== '' && { companyEmail }),
        ...(companyPhoneNumber !== '' && { companyPhoneNumber })
      }
    }

    try {
      // Validate the form data using the appropriate schema
      sellerFormSchema.parse(formData)

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

    const commonData = {
      idcity: client?.seller?.address?.idcity,
      whatsapp_number: client?.seller?.whatsapp_number,
      postal_code: client?.seller?.address?.postal_code,
      address: client?.seller?.address?.address
    }
    let dynamicData = {}

    if (!isBusiness && website !== '') {
      dynamicData = { website }
    } else if (isBusiness) {
      dynamicData = {
        number_rut: rut,
        company_name: companyName,
        company_email: companyEmail,
        company_phone: companyPhoneNumber
      }
    }

    const dataBody: DataUpdateSeller = { ...commonData, ...dynamicData }

    const body: BodyUpdateSeller = {
      id: client?.seller?.iduser,
      data: dataBody
    }

    await updateSeller(body, {
      onSuccess: (data: GenericResponse<SellerData> | undefined) => {
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
  const handleOpenModal = () => {
    onOpen()
  }

  const handleChangeStatusApproved = async () => {
    if (client !== undefined) {
      await changeApprovedStatus(
        { id: client?.seller?.iduser ?? 0, approved: !isApproved },
        {
          onSuccess: (data: GenericResponse<SellerData> | undefined) => {
            if (data?.error !== undefined) {
              showToast(data.message, 'error')
            } else {
              showToast(data?.message ?? '', 'success')
              router.refresh()
            }
          }
        }
      )
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='website'
            value={website}
            onChange={(e) => {
              handleInputChange(e, 'website')
            }}
            type='text'
            color={errors?.name !== undefined ? 'danger' : 'primary'}
            label='Sitio web'
            placeholder='Ej. www.ejemplo.com'
            error={errors?.website?.toString() ?? ''}
          />
          {client?.seller?.type_seller === UserType.Business && (
            <>
              <CustomInput
                name='rut'
                value={rut}
                onChange={(e) => {
                  handleInputChange(e, 'rut')
                }}
                type='text'
                color={errors?.rut !== undefined ? 'danger' : 'primary'}
                label='Número de Rut'
                placeholder='Ej. 1222222'
                error={errors?.rut?.toString() ?? ''}
              />
              <CustomInput
                name='companyName'
                value={companyName}
                onChange={(e) => {
                  handleInputChange(e, 'companyName')
                }}
                type='text'
                color={errors?.companyName !== undefined ? 'danger' : 'primary'}
                label='Nombre de la compañía'
                placeholder='Ej. Camiones Chile'
                error={errors?.companyName?.toString() ?? ''}
              />
              <CustomInput
                name='companyEmail'
                value={companyEmail}
                onChange={(e) => {
                  handleInputChange(e, 'companyEmail')
                }}
                type='text'
                color={
                  errors?.companyEmail !== undefined ? 'danger' : 'primary'
                }
                label='Correo electrónico de la compañía'
                placeholder='Ej. company@company.com'
                error={errors?.companyEmail?.toString() ?? ''}
              />
              <CustomInput
                name='companyPhoneNumber'
                value={companyPhoneNumber}
                onChange={(e) => {
                  handleInputChange(e, 'companyPhoneNumber')
                }}
                type='text'
                color={
                  errors?.companyPhoneNumber !== undefined
                    ? 'danger'
                    : 'primary'
                }
                label='Teléfono de la compañía'
                placeholder='Ej. 924999999'
                error={errors?.companyPhoneNumber?.toString() ?? ''}
              />
            </>
          )}
          <div className='flex flex-col justify-center'>
            <span className='text-blackText font-semibold text-xs'>
              Estado de aprobación
            </span>
            <div className='flex flex-row gap-2 items-center mt-2'>
              <Tooltip content='Aprobar / Desaprobar' color='foreground'>
                <div className='flex items-center'>
                  <Switch
                    size='sm'
                    isSelected={isApproved}
                    onValueChange={handleOpenModal}
                    color='primary'
                  />
                </div>
              </Tooltip>
              <span className='text-sm text-default-500'>
                <Chip color={isApproved ? 'success' : 'danger'}>
                  <div className='flex gap-1 flex-row items-center'>
                    {isApproved
                      ? (
                      <Check className='w-3 h-3' />
                        )
                      : (
                      <Close className='w-3 h-3' />
                        )}
                    <span>{isApproved ? 'Aprobado' : 'No aprobado'}</span>
                  </div>
                </Chip>
              </span>
            </div>
          </div>
        </div>
        <div className='md:w-1/4 sm:w-1/2 w-full mt-4'>
          <GenericButton
            type='submit'
            label={'Actualizar datos'}
            startContent={<Edit className='w-3.5 h-3.5' />}
            onClick={() => {}}
            disabled={isLoadingUpdateSeller}
            isLoading={isLoadingUpdateSeller}
          />
        </div>
      </form>
      <ModalStatus
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoadingApprovedStatus}
        action={async () => {
          await handleChangeSwitch()
        }}
        actionLabel={isApproved ? 'Desaprobar' : 'Aprobar'}
        title={isApproved ? 'Desaprobar Vendedor' : 'Aprobar Vendedor'}
        description={
          <p className='text-black/80 text-sm'>
            {`Estas a un paso de ${
              isApproved ? 'desaprobar' : 'aprobar'
            } al vendedor con id`}
            <span className='font-bold text-blackText'>{` ${client?.seller?.iduser}`}</span>
            {'. Si estas seguro que deseas hacerlo, presiona en el botón'}
            <span
              className={`font-bold ${
                isApproved ? 'text-red-700' : 'text-green-700'
              }`}
            >{` ${isApproved ? 'DESAPROBAR' : 'APROBAR'}`}</span>
            {' para continuar'}
          </p>
        }
      />
    </>
  )
}

export default SellerEditForm
