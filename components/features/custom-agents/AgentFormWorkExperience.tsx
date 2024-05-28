import { CustomInput } from '@/components'
import CustomTextarea from '@/components/textarea/CustomTextarea'
import { type FormErrorMessages } from '@/helpers/error'
import { useCustomAgentFormStore } from '@/store/useCustomAgentForm'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useEffect } from 'react'

type AgentFormWorkExperienceProps = {
  isEditing: boolean
  agent: CustomAgentsResponse | undefined
  errors: FormErrorMessages | null
}

const AgentFormWorkExperience = ({
  isEditing,
  agent,
  errors
}: AgentFormWorkExperienceProps) => {
  const { workExperienceData, updateWorkExperienceData } =
    useCustomAgentFormStore()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const { value } = e.target

    updateWorkExperienceData({
      [name]: value
    })
  }

  useEffect(() => {
    if (isEditing && agent !== undefined) {
      updateWorkExperienceData({
        companyExperience: agent.work_experiences?.company ?? '',
        position: agent.work_experiences?.position ?? '',
        initDate: agent.work_experiences?.start_date ?? '',
        endDate: agent.work_experiences?.end_date ?? '',
        workReference: agent.work_experiences?.job_references ?? '',
        workContactReference:
          agent.work_experiences?.contract_reference_contact ?? '',
        jobDescription: agent.work_experiences?.description ?? '',
        contactNumberReference: agent?.work_experiences?.reference_contact_number ?? ''
      })
    }
  }, [agent, isEditing, updateWorkExperienceData])
  return (
    <>
      <Spacer />
      <Divider />
      <div className='mt-3'>
        <h1 className='font-semibold text-blackText dark:text-white'>
          Experiencia Laboral
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-3 md:gap-x-4 md:gap-y-1 mb-3'>
        <CustomInput
          name='companyExperience'
          type='text'
          onChange={(e) => {
            handleChange(e, 'companyExperience')
          }}
          value={workExperienceData.companyExperience}
          color={errors?.companyEL !== undefined ? 'danger' : 'primary'}
          label='Empresa'
          placeholder='Ej. Company 2023 SA'
          error={errors?.companyEL?.toString() ?? ''}
        />
        <CustomInput
          name='position'
          type='text'
          onChange={(e) => {
            handleChange(e, 'position')
          }}
          value={workExperienceData.position}
          color={errors?.position !== undefined ? 'danger' : 'primary'}
          label='Cargo/posición'
          placeholder='Ej. Administrador'
          error={errors?.position?.toString() ?? ''}
        />
        <CustomInput
          name='initDate'
          type='date'
          onChange={(e) => {
            handleChange(e, 'initDate')
          }}
          value={workExperienceData.initDate}
          color={errors?.initDate !== undefined ? 'danger' : 'primary'}
          label='Fecha de Inicio'
          placeholder='Ej. '
          error={errors?.initDate?.toString() ?? ''}
        />
        <CustomInput
          name='endDate'
          type='date'
          onChange={(e) => {
            handleChange(e, 'endDate')
          }}
          value={workExperienceData.endDate}
          color={errors?.endDate !== undefined ? 'danger' : 'primary'}
          label='Fecha de Fin'
          placeholder='Ej. '
          error={errors?.endDate?.toString() ?? ''}
        />
        <CustomInput
          name='workReference'
          type='text'
          onChange={(e) => {
            handleChange(e, 'workReference')
          }}
          value={workExperienceData.workReference}
          color={errors?.workReference !== undefined ? 'danger' : 'primary'}
          label='Referencia Trabajo'
          placeholder='Ej. Company 2023 SA'
          error={errors?.workReference?.toString() ?? ''}
        />
        <CustomInput
          name='workContactReference'
          type='text'
          onChange={(e) => {
            handleChange(e, 'workContactReference')
          }}
          value={workExperienceData.workContactReference}
          color={
            errors?.workContactReference !== undefined ? 'danger' : 'primary'
          }
          label='Contacto referencia trabajo'
          placeholder='Ej. Juan David'
          error={errors?.workContactReference?.toString() ?? ''}
        />
        <CustomInput
          name='contactNumberReference'
          type='text'
          onChange={(e) => {
            handleChange(e, 'contactNumberReference')
          }}
          value={workExperienceData.contactNumberReference}
          color={
            errors?.contactNumberReference !== undefined ? 'danger' : 'primary'
          }
          label='Número contacto Referencia'
          placeholder='Cod. País + Num. Ej: +51999999999'
          error={errors?.contactNumberReference?.toString() ?? ''}
        />
        <CustomTextarea
          name='jobDescription'
          value={workExperienceData.jobDescription}
          onValueChange={(value) => {
            updateWorkExperienceData({ jobDescription: value })
          }}
          color={errors?.jobDescription !== undefined ? 'danger' : 'primary'}
          label='Descripción de Labor'
          error={errors?.jobDescription?.toString() ?? ''}
          placeholder='Ingresa una descripción'
        />
      </div>
    </>
  )
}

export default AgentFormWorkExperience
