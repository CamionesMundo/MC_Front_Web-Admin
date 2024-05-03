import { CustomInput, GenericButton } from '@/components'
import { CUSTOM_AGENT_LIST_ROUTE } from '@/const/routes'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import { useCreateCustomAgent } from '@/hooks/api/useCustomAgents'
import { showToast } from '@/hooks/useToast'
import { Visible } from '@/icons'
import { transformEmptyStringToNull } from '@/lib/utils/utils'
import { adminFormSchema } from '@/lib/validators/adminFormValidator'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type CustomAgentsResponse, type GenericResponse } from '@/types/api'
import { type BodyAdminForm } from '@/types/api/request'
import {
  type CompanyInformationRequest,
  type AgentBodyRequest,
  type RequiredDocumentationRequest,
  type WorkExperienceRequest
} from '@/types/api/request/custom-agents'
import { useRouter } from 'next/navigation'
import React, { type FormEvent, useEffect, useState } from 'react'
import RulesPassword from './RulesPassword'

type AgentAdminFormProps = {
  isEditing: boolean
}

const AgentAdminForm = ({ isEditing }: AgentAdminFormProps) => {
  const router = useRouter()
  const { mutateAsync: createAgent, isPending } = useCreateCustomAgent()
  const {
    profileData,
    companyData,
    referencesData,
    bankData,
    workExperienceData,
    currentCountry,
    currentPort,
    idGallery,
    adminFormData,
    updateAdminData,
    showPassword,
    togglePassword,
    reset
  } = useCustomAgentFormStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  useEffect(() => {
    updateAdminData({
      name: profileData.name,
      email: profileData.email,
      password: ''
    })
  }, [profileData, updateAdminData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateAdminData({
      [name]: value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onCreate()
  }

  const onCreate = async () => {
    try {
      // Validate the email and password using the login schema
      adminFormSchema.parse(adminFormData)

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
    const dataBody = createData()

    await createAgent(dataBody, {
      onSuccess: (data: GenericResponse<CustomAgentsResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        showToast(data?.message ?? '', 'success')
        router.push(CUSTOM_AGENT_LIST_ROUTE)
        setTimeout(() => {
          reset()
        }, 400)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const createData = () => {
    const requiredDocumentation: RequiredDocumentationRequest = {
      license_or_authorization: transformEmptyStringToNull(profileData.license),
      date_of_issue: transformEmptyStringToNull(profileData.emissionDate),
      license_expiration: transformEmptyStringToNull(profileData.dueDate),
      licensing_entity: transformEmptyStringToNull(profileData.grantingEntity),
      areas_of_expertise: transformEmptyStringToNull(profileData.expertise),
      education_level: transformEmptyStringToNull(profileData.education),
      language: transformEmptyStringToNull(profileData.language1),
      language_two: transformEmptyStringToNull(profileData.language2)
    }

    const companyInformation: CompanyInformationRequest = {
      company_name: transformEmptyStringToNull(companyData.companyName),
      legal_registration: transformEmptyStringToNull(companyData.legalNumber),
      information_contact: transformEmptyStringToNull(
        companyData.personContact
      ),
      company_tax_identification: transformEmptyStringToNull(
        companyData.taxIdentification
      ),
      bank_account: transformEmptyStringToNull(bankData.bankAccount),
      bank_name: transformEmptyStringToNull(bankData.bankName),
      account_type: transformEmptyStringToNull(bankData.typeAccount),
      swift_code: transformEmptyStringToNull(bankData.swiftCode),
      company_phone_number: transformEmptyStringToNull(
        companyData.companyPhoneNumber
      ),
      description: transformEmptyStringToNull(companyData.description),
      company_description: transformEmptyStringToNull(companyData.description),
      service_type: transformEmptyStringToNull(companyData.serviceType)
    }

    const workExperience: WorkExperienceRequest = {
      company: transformEmptyStringToNull(workExperienceData.companyExperience),
      position: transformEmptyStringToNull(workExperienceData.position),
      start_date: transformEmptyStringToNull(workExperienceData.initDate),
      end_date: transformEmptyStringToNull(workExperienceData.endDate),
      description: transformEmptyStringToNull(
        workExperienceData.jobDescription
      ),
      job_references: transformEmptyStringToNull(
        workExperienceData.workReference
      ),
      contract_reference_contact: transformEmptyStringToNull(
        workExperienceData.workContactReference
      ),
      reference_contact_number: transformEmptyStringToNull('')
    }

    const dataAdmin: BodyAdminForm = {
      email: adminFormData.email,
      name_user: adminFormData.name,
      password: adminFormData.password,
      idrole_admin: 2,
      photo_idgallery: null
    }
    const dataBody: AgentBodyRequest = {
      dataAdmin,
      dataAgent: {
        required_documentation: requiredDocumentation,
        company_information: companyInformation,
        work_experience: workExperience,
        name: transformEmptyStringToNull(profileData.name),
        surname: transformEmptyStringToNull(profileData.surname),
        email: transformEmptyStringToNull(profileData.email),
        phone_number: transformEmptyStringToNull(profileData.phoneNumber),
        phone_number_2: transformEmptyStringToNull(
          profileData.additionalPhoneNumber
        ),
        physical_address: null,
        availability_hours: transformEmptyStringToNull(
          profileData.availability
        ),
        company_name: transformEmptyStringToNull(companyData.companyName),
        company_address: transformEmptyStringToNull(companyData.addressCompany),
        company_contact: transformEmptyStringToNull(companyData.personContact),
        legal_registration_number: transformEmptyStringToNull(
          companyData.legalNumber
        ),
        tax_identification_number: transformEmptyStringToNull(
          companyData.taxIdentification
        ),
        description: transformEmptyStringToNull(companyData.description),
        approved: true,
        file_certificate: idGallery ?? null,
        nationality: transformEmptyStringToNull(profileData.nationality),
        identification_document: profileData.documentNumber,
        idcountry: currentCountry?.idcountry ?? 0,
        idreceiving_port: currentPort?.idreceiving_port ?? 0,
        type_of_service: transformEmptyStringToNull(companyData.serviceType),
        name_commercial_references: transformEmptyStringToNull(
          referencesData.commercialReference
        ),
        contact_commercial_references: transformEmptyStringToNull(
          workExperienceData.contactNumberReference
        ),
        profile_idgallery: null
      }
    }
    return dataBody
  }
  return (
    <div>
      <form className='w-full' autoComplete='nope' onSubmit={onSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='name'
            type='text'
            value={adminFormData.name}
            onChange={(e) => {
              handleChange(e, 'name')
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
            value={adminFormData.email}
            readOnly={isEditing}
            disabled={isEditing}
            onChange={(e) => {
              handleChange(e, 'email')
            }}
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors?.email?.toString() ?? ''}
          />
          {!isEditing && (
            <div className='flex flex-col'>
              <CustomInput
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={adminFormData.password}
                onChange={(e) => {
                  handleChange(e, 'password')
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
              <span className='text-sm mb-1 text-blackText dark:text-white mt-2'>
                Recuerda que la contraseña debe:
              </span>
              <RulesPassword content='Tener una longitud mínima de 8 caracteres.' />
              <RulesPassword content='Tener una longitud máxima de 25 caracteres.' />
              <RulesPassword content='Contener al menos una letra mayúscula (A-Z).' />
              <RulesPassword content='Contener al menos una letra minúscula (a-z).' />
              <RulesPassword content='Contener al menos un número (0-9).' />
            </div>
          )}
        </div>
        <div className='w-full flex justify-start mt-10'>
          <div className='w-1/4'>
            <GenericButton
              type='submit'
              label={'Crear Agente Aduanero'}
              isLoading={isPending}
              disabled={isPending}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default AgentAdminForm
