import { CustomInput, GenericButton } from '@/components'
import ModalStatus from '@/components/modal/ModalStatus'
import GenderSelect from '@/components/selects/GenderSelect'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import {
  useActiveStatusAppUser,
  useUpdateAppUser
} from '@/hooks/api/useClients'
import { showToast } from '@/hooks/useToast'
import { Edit } from '@/icons'
import { formatDateToYMD } from '@/lib/utils/utils'
import { buyerFormSchema } from '@/lib/validators/clientFormValidator'
import { REGEX_FORMAT_DATE } from '@/lib/validators/regex'
import { useBuyerProfileFormStore } from '@/store/useClientBuyerForm'
import { type GenericResponse } from '@/types/api'
import { type BodyUpdateUser } from '@/types/api/request/client-form'
import {
  type UserClientResponse,
  type ClientResponse
} from '@/types/api/response/user'
import { type BuyerProfileFormData } from '@/types/store/client'
import { Chip, Switch, Tooltip, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  type ChangeEvent,
  useEffect,
  useState,
  type FormEvent
} from 'react'

type BuyerEditFormProps = {
  client: ClientResponse | null
}

const BuyerEditForm = ({ client }: BuyerEditFormProps) => {
  const {
    mutateAsync: activeOrInactive,
    isPending: isLoadingActiveOrInactive
  } = useActiveStatusAppUser()

  const { mutateAsync: updateBuyer, isPending: isLoadingUpdateBuyer } =
    useUpdateAppUser()
  const router = useRouter()

  const {
    name,
    surname,
    email,
    phoneNumber,
    sex,
    documentNumber,
    birthdate,
    changeSelection,
    setBuyerData
  } = useBuyerProfileFormStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const [isActive, setIsActive] = useState<boolean>(client?.active ?? false)

  const handleChangeSwitch = async () => {
    await handleActiveOrInactiveUser()
    setIsActive(!isActive)
    onClose()
  }

  useEffect(() => {
    if (client !== undefined) {
      setBuyerData({
        name: client?.name ?? '',
        surname: client?.surname ?? '',
        email: client?.email ?? '',
        documentNumber: client?.document_number ?? '',
        phoneNumber: client?.phone_number ?? '',
        idCountry: client?.country?.idcountry,
        birthdate: formatDateToYMD(client?.birthdate?.toString() ?? '')
      })
      changeSelection(client?.sex)
    }
  }, [client, setBuyerData, changeSelection])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof BuyerProfileFormData
  ) => {
    const value = e.target.value
    const newData: Partial<BuyerProfileFormData> = {}
    switch (field) {
      case 'idCountry':
        newData[field] = value !== undefined ? parseInt(value) : undefined
        break
      case 'birthdate':
        if (REGEX_FORMAT_DATE.test(value)) {
          newData[field] = value
        } else {
          newData[field] = undefined
        }
        break
      default:
        newData[field] = value
        break
    }
    setBuyerData(newData as BuyerProfileFormData)
  }

  const handleOnMoreDetails = () => {
    onOpen()
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Validate the email and password using the login schema
      buyerFormSchema.parse({
        name,
        surname,
        documentNumber,
        phoneNumber,
        birthdate
      })

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

    const dataBody: BodyUpdateUser = {
      id: client?.iduser,
      data: {
        name,
        surname,
        phone_number: phoneNumber,
        sex,
        document_number: documentNumber,
        birthdate
      }
    }

    await updateBuyer(dataBody, {
      onSuccess: (data: GenericResponse<UserClientResponse> | undefined) => {
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

  const handleActiveOrInactiveUser = async () => {
    if (client !== undefined) {
      await activeOrInactive(
        { id: client?.iduser ?? 0, active: !isActive },
        {
          onSuccess: (
            data: GenericResponse<UserClientResponse> | undefined
          ) => {
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
    <div>
      <span className='font-semibold text-blackText flex justify-between items-center'>
        <span>Usuario: {client?.username}</span>

        <div className='flex flex-row gap-2 items-center'>
          <span className='text-sm text-default-500'>
            <Chip color={isActive ? 'success' : 'danger'}>
              {isActive ? 'Activo' : 'No activo'}
            </Chip>
          </span>
          <Tooltip content='Activar / Desactivar' color='foreground'>
            <div className='flex items-center'>
              <Switch
                size='sm'
                isSelected={isActive}
                onValueChange={handleOnMoreDetails}
                color='primary'
              />
            </div>
          </Tooltip>
        </div>
      </span>
      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='name'
            value={name}
            onChange={(e) => {
              handleInputChange(e, 'name')
            }}
            type='text'
            color={errors?.name !== undefined ? 'danger' : 'primary'}
            label='Nombre'
            placeholder='Ej. John Doe'
            error={errors?.name?.toString() ?? ''}
          />
          <CustomInput
            name='surname'
            value={surname}
            onChange={(e) => {
              handleInputChange(e, 'surname')
            }}
            type='text'
            color={errors?.surname !== undefined ? 'danger' : 'primary'}
            label='Apellido'
            placeholder='Ej. Mendez Guerra'
            error={errors?.surname?.toString() ?? ''}
          />
          <CustomInput
            name='email'
            value={email}
            type='text'
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. ejemplo@ejemplo.com'
            error={errors?.email?.toString() ?? ''}
            disabled
            readOnly
          />

          <GenderSelect selected={sex} onChange={changeSelection} />

          <CustomInput
            name='phoneNumber'
            type='text'
            value={phoneNumber}
            onChange={(e) => {
              handleInputChange(e, 'phoneNumber')
            }}
            color={errors?.phoneNumber !== undefined ? 'danger' : 'primary'}
            label='Número telefónico'
            placeholder='Ej. 99999999'
            error={errors?.phoneNumber?.toString() ?? ''}
          />
          <CustomInput
            name='documentNumber'
            type='text'
            value={documentNumber}
            onChange={(e) => {
              handleInputChange(e, 'documentNumber')
            }}
            color={errors?.documentNumber !== undefined ? 'danger' : 'primary'}
            label='Número de documento'
            placeholder='Ej. 99999999'
            error={errors?.documentNumber?.toString() ?? ''}
          />

          <CustomInput
            name='birthDate'
            type='date'
            value={birthdate?.toString()}
            onChange={(e) => {
              handleInputChange(e, 'birthdate')
            }}
            color={errors?.birthDate !== undefined ? 'danger' : 'primary'}
            label='Fecha de Nacimiento'
            placeholder='Ej. 99999999'
            error={errors?.birthDate?.toString() ?? ''}
          />
        </div>
        <div className='md:w-1/4 sm:w-1/2 w-full mt-4'>
          <GenericButton
            type='submit'
            label={'Actualizar datos'}
            startContent={<Edit className='w-3.5 h-3.5' />}
            onClick={() => {}}
            isLoading={isLoadingUpdateBuyer}
            disabled={isLoadingUpdateBuyer}
          />
        </div>
      </form>
      <ModalStatus
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoadingActiveOrInactive}
        action={async () => {
          await handleChangeSwitch()
        }}
        actionLabel={isActive ? 'Desactivar' : 'Activar'}
        title={isActive ? 'Desactivar Usuario' : 'Activar Usuario'}
        description={
          <p className='text-black/80 text-sm'>
            {`Estas a un paso de ${
              isActive ? 'desactivar' : 'activar'
            } al usuario`}
            <span className='font-bold text-blackText'>{` ${client?.username}`}</span>
            {'. Si estas seguro que deseas hacerlo, presiona en el botón'}
            <span
              className={`font-bold ${
                isActive ? 'text-red-700' : 'text-green-700'
              }`}
            >{` ${isActive ? 'DESACTIVAR' : 'ACTIVAR'}`}</span>
            {' para continuar'}
          </p>
        }
      />
    </div>
  )
}

export default BuyerEditForm
