import { formatFullDate } from '@/lib/utils/utils'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React from 'react'

type AgentWorkExperienceProps = {
  agent: CustomAgentsResponse | null
}

const sectionClass = 'text-blackText dark:text-white font-semibold text-md'

const AgentWorkExperience = ({ agent }: AgentWorkExperienceProps) => {
  return (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Empresa</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.company ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Cargo/Posición</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.position ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Descripción del labor</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.description ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Fecha inicio</span>
          <span className='text-md text-default-500 text-sm'>
            {formatFullDate(agent?.work_experiences?.start_date)}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Fecha fin</span>
          <span className='text-md text-default-500 text-sm'>
            {formatFullDate(agent?.work_experiences?.end_date)}
          </span>
        </div>
      </div>
      <Spacer />
      <Spacer />
      <Spacer />
      <Divider />
      <Spacer />
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Referencia trabajo</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.job_references ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Contacto referencia trabajo</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.contract_reference_contact ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Número contacto ref. trabajo</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.reference_contact_number ?? 'No registrado'}
          </span>
        </div>
      </div>
    </>
  )
}

export default AgentWorkExperience
