import { CustomInput, GenericButton } from '@/components'
import GenderSelect from '@/components/selects/GenderSelect'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import { useUpdateAppUser } from '@/hooks/api/useClients'
import { showToast } from '@/hooks/useToast'
import { Edit } from '@/icons'
import { formatDateToYMD } from '@/lib/utils/utils'
import { legalFormSchema } from '@/lib/validators/clientFormValidator'
import { REGEX_FORMAT_DATE } from '@/lib/validators/regex'
import {
  type LegalProfileStoreState,
  useLegalProfileFormStore
} from '@/store/useClientLegalForm'
import { type GenericResponse } from '@/types/api'
import { type BodyUpdateUser } from '@/types/api/request/client-form'
import {
  type UserClientResponse,
  type ClientResponse
} from '@/types/api/response/user'
import { useRouter } from 'next/navigation'
import React, {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
  type FormEvent
} from 'react'

type LegalEditFormProps = {
  client: ClientResponse | null
}

const LegalEditForm = ({ client }: LegalEditFormProps) => {
  const {
    name,
    surname,
    email,
    phoneNumber,
    sex,
    documentNumber,
    birthdate,
    changeSelection,
    setLegalData
  } = useLegalProfileFormStore()
  const {
    mutateAsync: updateLegalRepresentative,
    isPending: isLoadingUpdateLegal
  } = useUpdateAppUser()
  const router = useRouter()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  useEffect(() => {
    if (client !== undefined) {
      setLegalData({
        name: client?.seller?.legal_representative?.name ?? '',
        surname: client?.seller?.legal_representative?.surname ?? '',
        email: client?.seller?.legal_representative?.email ?? '',
        documentNumber:
          client?.seller?.legal_representative?.document_number ?? '',
        phoneNumber: client?.seller?.legal_representative?.phone_number ?? '',
        idCountry: client?.seller?.legal_representative?.country?.idcountry,
        birthdate: formatDateToYMD(
          client?.seller?.legal_representative?.birthdate?.toString() ?? ''
        )
      })
      changeSelection(client?.sex)
    }
  }, [client, setLegalData, changeSelection])

  const representative = useMemo(() => {
    if (client?.seller?.legal_representative !== null) {
      return client?.seller?.legal_representative
    }
  }, [client?.seller?.legal_representative])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof LegalProfileStoreState
  ) => {
    const value = e.target.value
    const newData: Partial<LegalProfileStoreState> = {}
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
    setLegalData(newData as LegalProfileStoreState)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Validate the email and password using the login schema
      legalFormSchema.parse({
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
      id: client?.seller?.legal_representative?.iduser,
      data: {
        name,
        surname,
        phone_number: phoneNumber,
        sex,
        document_number: documentNumber,
        birthdate
      }
    }
    await updateLegalRepresentative(dataBody, {
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
  return (
    <div>
      <span className='font-semibold text-blackText dark:text-white flex justify-between items-center'>
        <div className='flex flex-row items-center gap-4'>
          <span>Usuario: {representative?.username}</span>
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
            type='text'
            value={surname}
            onChange={(e) => {
              handleInputChange(e, 'surname')
            }}
            color={errors?.surname !== undefined ? 'danger' : 'primary'}
            label='Apellido'
            placeholder='Ej. Mendez Guerra'
            error={errors?.surname?.toString() ?? ''}
          />
          <CustomInput
            name='email'
            type='text'
            value={email}
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
            isLoading={isLoadingUpdateLegal}
            disabled={isLoadingUpdateLegal}
          />
        </div>
      </form>
    </div>
  )
}

export default LegalEditForm
