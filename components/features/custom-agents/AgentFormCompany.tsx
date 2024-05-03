import { CustomInput } from '@/components'
import CustomTextarea from '@/components/textarea/CustomTextarea'
import { type FormErrorMessages } from '@/helpers/error'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useEffect } from 'react'

type AgentFormCompanyProps = {
  isEditing: boolean
  agent: CustomAgentsResponse | undefined
  errors: FormErrorMessages | null
}
const AgentFormCompany = ({
  isEditing,
  agent,
  errors
}: AgentFormCompanyProps) => {
  const { updateCompanyData, companyData } = useCustomAgentFormStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateCompanyData({
      [name]: value
    })
  }

  useEffect(() => {
    if (isEditing && agent !== undefined) {
      updateCompanyData({
        companyName: agent.company_informations?.company_name ?? '',
        personContact: agent.company_informations?.information_contact ?? '',
        companyPhoneNumber:
          agent.company_informations?.company_phone_number ?? '',
        legalNumber: agent.company_informations?.legal_registration ?? '',
        taxIdentification: agent.company_informations?.company_tax_identification ?? '',
        addressCompany: agent.company_address ?? '',
        serviceType: agent.type_of_service ?? '',
        description: agent.company_informations?.description ?? ''
      })
    }
  }, [agent, isEditing, updateCompanyData])
  return (
    <>
      <Spacer />
      <Divider />
      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Información de la empresa
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1 mb-3'>
        <CustomInput
          name='companyName'
          type='text'
          onChange={(e) => {
            handleChange(e, 'companyName')
          }}
          value={companyData.companyName}
          color={errors?.companyName !== undefined ? 'danger' : 'primary'}
          label='Nombre de la Empresa'
          placeholder='Ej. Mundo camiones'
          error={errors?.companyName?.toString() ?? ''}
        />
        <CustomInput
          name='personContact'
          type='text'
          onChange={(e) => {
            handleChange(e, 'personContact')
          }}
          value={companyData.personContact}
          color={errors?.personContact !== undefined ? 'danger' : 'primary'}
          label='Persona contacto'
          placeholder='Ej. Juan David'
          error={errors?.personContact?.toString() ?? ''}
        />
        <CustomInput
          name='companyPhoneNumber'
          type='text'
          onChange={(e) => {
            handleChange(e, 'companyPhoneNumber')
          }}
          value={companyData.companyPhoneNumber}
          color={
            errors?.companyPhoneNumber !== undefined ? 'danger' : 'primary'
          }
          label='Número teléfono empresa'
          placeholder='Cod. País + Num. Ej: +51999999999'
          error={errors?.companyPhoneNumber?.toString() ?? ''}
        />
        <CustomInput
          name='legalNumber'
          type='text'
          onChange={(e) => {
            handleChange(e, 'legalNumber')
          }}
          value={companyData.legalNumber}
          color={errors?.legalNumber !== undefined ? 'danger' : 'primary'}
          label='Número de Registro Legal'
          placeholder='Ej. 99999999'
          error={errors?.legalNumber?.toString() ?? ''}
        />
        <CustomInput
          name='taxIdentification'
          type='text'
          onChange={(e) => {
            handleChange(e, 'taxIdentification')
          }}
          value={companyData.taxIdentification}
          color={errors?.taxIdentification !== undefined ? 'danger' : 'primary'}
          label='Número de Identificación Impuestos'
          placeholder='Ej. 99999999'
          error={errors?.taxIdentification?.toString() ?? ''}
        />
        <CustomInput
          name='addressCompany'
          type='text'
          onChange={(e) => {
            handleChange(e, 'addressCompany')
          }}
          value={companyData.addressCompany}
          color={errors?.addressCompany !== undefined ? 'danger' : 'primary'}
          label='Dirección de Empresa'
          placeholder='Ej. av. Principal 123'
          error={errors?.addressCompany?.toString() ?? ''}
        />
        <CustomInput
          name='serviceType'
          type='text'
          onChange={(e) => {
            handleChange(e, 'serviceType')
          }}
          value={companyData.serviceType}
          color={errors?.serviceType !== undefined ? 'danger' : 'primary'}
          label='Tipo de servicio'
          placeholder='Ej. Agente especializado en importaciones'
          error={errors?.serviceType?.toString() ?? ''}
        />
        <CustomTextarea
          name='description'
          value={companyData.description}
          onValueChange={(value) => {
            updateCompanyData({ description: value })
          }}
          color={errors?.description !== undefined ? 'danger' : 'primary'}
          label='Descripción'
          error={errors?.description?.toString() ?? ''}
          placeholder='Ingresa una descripción'
        />
      </div>
    </>
  )
}

export default AgentFormCompany
