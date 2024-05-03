import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Divider, Spacer } from '@nextui-org/react'
import React from 'react'

type AgentCompanyInfoProps = {
  agent: CustomAgentsResponse | null
}

const sectionClass = 'text-blackText dark:text-white font-semibold text-md'
const AgentCompanyInfo = ({ agent }: AgentCompanyInfoProps) => {
  return (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Nombre de Empresa</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.company_name ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Persona contacto</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.information_contact ??
              'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Número de teléfono</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.company_phone_number ??
              'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Número de Registro Legal</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.legal_registration ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>
            Número de identificación impuestos
          </span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.company_tax_identification ??
              'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Descripción</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.description ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Dirección de la empresa</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_address ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Tipo de Servicio</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.service_type ?? 'No registrado'}
          </span>
        </div>
      </div>
      <Spacer />
      <Spacer />
      <Spacer />
      <Divider />
      <Spacer />
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Nombre del banco</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.bank_name ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Cuenta Bancaria</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.bank_account ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Tipo de cuenta</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.account_type ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Código Swift</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.company_informations?.swift_code ?? 'No registrado'}
          </span>
        </div>
      </div>
      <Spacer />
      <Spacer />
      <Spacer />
      <Divider />
      <Spacer />
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Referencia comercial</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.name_commercial_references ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>Contacto referencia comercial</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.contact_commercial_references ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-start'>
          <span className={sectionClass}>
            Número de contacto Ref. comercial
          </span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.work_experiences?.reference_contact_number ?? 'No registrado'}
          </span>
        </div>
      </div>
    </>
  )
}

export default AgentCompanyInfo
