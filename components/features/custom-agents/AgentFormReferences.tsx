import { CustomInput } from '@/components'
import { type FormErrorMessages } from '@/helpers/error'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useEffect } from 'react'

type AgentFormReferencesProps = {
  isEditing: boolean
  agent: CustomAgentsResponse | undefined
  errors: FormErrorMessages | null
}

const AgentFormReferences = ({
  isEditing,
  agent,
  errors
}: AgentFormReferencesProps) => {
  const { updateReferencesData, referencesData } = useCustomAgentFormStore()
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateReferencesData({
      [name]: value
    })
  }

  useEffect(() => {
    if (isEditing && agent !== undefined) {
      updateReferencesData({
        commercialReference: agent.name_commercial_references ?? '',
        contactReference: agent.contact_commercial_references ?? ''
      })
    }
  }, [agent, isEditing, updateReferencesData])
  return (
    <>
      <Spacer />
      <Divider />
      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Referencias
        </h1>
      </div>
      <Spacer />
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1 mb-3'>
        <CustomInput
          name='commercialReference'
          type='text'
          onChange={(e) => {
            handleChange(e, 'commercialReference')
          }}
          value={referencesData.commercialReference}
          color={
            errors?.commercialReference !== undefined ? 'danger' : 'primary'
          }
          label='Referencia comercial'
          placeholder='Ej. Company 2023 SA'
          error={errors?.commercialReference?.toString() ?? ''}
        />
        <CustomInput
          name='contactReference'
          type='text'
          onChange={(e) => {
            handleChange(e, 'contactReference')
          }}
          value={referencesData.contactReference}
          color={errors?.contactReference !== undefined ? 'danger' : 'primary'}
          label='Contacto referencia comercial'
          placeholder='Ej. Juan David'
          error={errors?.contactReference?.toString() ?? ''}
        />
      </div>
    </>
  )
}

export default AgentFormReferences
