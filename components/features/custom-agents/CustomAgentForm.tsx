'use client'
import { GenericButton } from '@/components'
import { BackComponent } from '@/components/ui/BackComponent'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import {
  useGetCustomAgentById,
  useUpdateCustomAgent
} from '@/hooks/api/useCustomAgents'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import AgentFormProfile from './AgentFormProfile'
import AgentFormCompany from './AgentFormCompany'
import AgentFormReferences from './AgentFormReferences'
import AgentFormBank from './AgentFormBank'
import AgentFormWorkExperience from './AgentFormWorkExperience'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { Loader } from '@/components/ui/Loader'
import { agentProfileFormSchema } from '@/lib/validators/customAgentsFormValidator'
import { showToast } from '@/hooks/useToast'
import AgentAdminForm from './AgentAdminForm'
import { transformEmptyStringToNull } from '@/lib/utils/utils'
import {
  type AgentUpdateBodyRequest,
  type CompanyInformationRequest,
  type RequiredDocumentationRequest,
  type WorkExperienceRequest
} from '@/types/api/request/custom-agents'

type CustomAgentFormProps = {
  isEditing?: boolean
}

type TypeParams = {
  id?: string
}

const CustomAgentForm = ({ isEditing = false }: CustomAgentFormProps) => {
  const { mutateAsync: updateAgent, isPending } = useUpdateCustomAgent()
  const {
    reset,
    profileData,
    companyData,
    referencesData,
    bankData,
    workExperienceData,
    currentCountry,
    currentPort,
    currentStep,
    idGallery,
    goToNextStep,
    goToPreviousStep
  } = useCustomAgentFormStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0
  const { data: agentData, isLoading } = useGetCustomAgentById(Number(id))

  const agent = useMemo(() => {
    if (agentData !== undefined) {
      return agentData.data
    }
    return undefined
  }, [agentData])

  const onBack = () => {
    if (currentStep === 1) {
      setTimeout(() => {
        reset()
      }, 300)
    } else {
      goToPreviousStep()
    }
  }
  const handleSubmit = async () => {
    const dataForm = {
      ...profileData,
      ...companyData,
      ...referencesData,
      ...bankData,
      ...workExperienceData,
      idCountry: Number(currentCountry?.idcountry ?? 0),
      idReceivingPort: Number(currentPort?.idreceiving_port ?? 0)
    }

    try {
      // Validate the email and password using the login schema
      agentProfileFormSchema.parse(dataForm)

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

    if (isEditing) {
      // Update form
      const dataBody = createData()
      await onUpdate(dataBody)
    } else {
      goToNextStep()
    }
  }

  const onUpdate = async (body: AgentUpdateBodyRequest) => {
    await updateAgent(body, {
      onSuccess: (data) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }
  console.log(errors)
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

    const dataBody: AgentUpdateBodyRequest = {
      idAgent: agent?.idcustoms_agent,
      data: {
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
        profile_idgallery: null,
        iduser_admin: agent?.iduser_admin
      }
    }
    return dataBody
  }
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {!isLoading && (
              <>
                <AgentFormProfile
                  isEditing={isEditing}
                  agent={agent}
                  errors={errors}
                />
                <AgentFormCompany
                  isEditing={isEditing}
                  agent={agent}
                  errors={errors}
                />
                <AgentFormReferences
                  isEditing={isEditing}
                  agent={agent}
                  errors={errors}
                />
                <AgentFormBank
                  isEditing={isEditing}
                  agent={agent}
                  errors={errors}
                />
                <AgentFormWorkExperience
                  isEditing={isEditing}
                  agent={agent}
                  errors={errors}
                />
                <div className='md:w-1/4 sm:w-1/2 w-full mt-4'>
                  <GenericButton
                    type='button'
                    onClick={handleSubmit}
                    label={isEditing ? 'Actualizar datos' : 'Siguiente'}
                    disabled={isPending}
                    isLoading={isPending}
                  />
                </div>
              </>
            )}
          </>
        )
      case 2:
        return <AgentAdminForm isEditing={isEditing} />
    }
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title={'Agentes aduaneros'}
          subtitle={isEditing ? 'Editar' : 'Crear'}
          onAction={onBack}
          useGoBack={currentStep === 1}
        />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          {isEditing
            ? 'Modifica los campos que necesites para editar y actualizar los datos de un agente aduanero'
            : 'Llena todos los campos necesarios del formulario para añadir un nuevo agente aduanero'}
        </p>
      </div>
      {isLoading && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {renderContent()}
    </>
  )
}

export default CustomAgentForm
