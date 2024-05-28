import { Check, Close, Document, Visible } from '@/icons'
import { formatFullDate, parseIsoDate } from '@/lib/utils/utils'
import { type CustomAgentsResponse } from '@/types/api/response/custom-agents'
import { Avatar, Chip, Switch, Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import React, { useState } from 'react'

type AgentProfileProps = {
  agent: CustomAgentsResponse | null
}
const sectionClass = 'text-blackText dark:text-white font-semibold text-md'

const AgentProfile = ({ agent }: AgentProfileProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(
    agent?.approved ?? false
  )
  const handleChangeSwitch = () => {
    setIsSelected(!isSelected)
  }
  const countryCode = agent?.country?.country_code?.toLowerCase().trim()

  return (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
        <div className='flex flew-row gap-3 items-center'>
          <div className='w-20 h-20'>
            <Avatar
              className='w-20 h-20 text-large'
              src={agent?.profile_gallery?.files[0]?.url ?? ''}
            />
          </div>
          <div className='flex flex-col'>
            <div className='mt-1'></div>
            <span className='text-large'>
              {agent?.company_informations?.company_name ?? agent?.name}
            </span>
            <span className='text-sm'>{agent?.email}</span>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Nombres</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.name ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Apellidos</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.surname ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Estado</span>
          <div className='flex flex-row gap-2 items-center'>
            <Tooltip content='Aprobar / Desaprobar' color='foreground'>
              <div className='flex items-center'>
                <Switch
                  size='sm'
                  isSelected={isSelected}
                  onValueChange={handleChangeSwitch}
                  color='primary'
                />
              </div>
            </Tooltip>
            <span className='text-sm text-default-500'>
              <Chip color={isSelected ? 'success' : 'danger'}>
                <div className='flex gap-1 flex-row items-center'>
                  {isSelected
                    ? (
                    <Check className='w-3 h-3' />
                      )
                    : (
                    <Close className='w-3 h-3' />
                      )}
                  <span>{isSelected ? 'Activo' : 'No activo'}</span>
                </div>
              </Chip>
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Número de teléfono</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.phone_number ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Número de teléfono adicional</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.phone_number_2 ?? ' No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Documento de identidad</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.identification_document ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>País</span>
          <div className='flex flex-row gap-2 items-center'>
            <Avatar
              alt={`Bandera de ${agent?.country.country_name}`}
              className='w-6 h-6'
              src={`https://flagcdn.com/${countryCode}.svg`}
            />
            <span className='text-md text-default-500 text-sm'>
              {agent?.country.country_name ?? 'País no registrado'}
            </span>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Puerto de recepción</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.receiving_port.name ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Dirección física</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.physical_address ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Nivel de educación</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.education_level ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Área de Expertise</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.areas_of_expertise ??
              'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Licencia o autorización</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.license_or_authorization}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Fecha de Emisión</span>
          <span className='text-md text-default-500 text-sm'>
            {formatFullDate(agent?.required_documentations?.date_of_issue)}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Fecha de Expiración</span>
          <span className='text-md text-default-500 text-sm'>
            {formatFullDate(agent?.required_documentations?.license_expiration)}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Entidad otorgante</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.licensing_entity ??
              'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Disponibilidad</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.availability_hours ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Idioma 1</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.language ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Idioma 2</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.required_documentations?.language_two ?? 'No registrado'}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Fecha de Creación</span>
          <span className='text-sm text-default-500'>
            {parseIsoDate(agent?.createdAt.toString())}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Ultima actualización</span>
          <span className='text-sm text-default-500'>
            {parseIsoDate(agent?.updatedAt.toString())}
          </span>
        </div>
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Nacionalidad</span>
          <span className='text-md text-default-500 text-sm'>
            {agent?.nationality ?? 'No registrado'}
          </span>
        </div>
      </div>
      <div className='mt-3'>
        <span className={sectionClass}>{'Archivo adjunto (Certificado)'}</span>
      </div>
      {(agent?.file_certificate_data === undefined ||
        agent?.file_certificate_data?.files.length === 0) && (
        <span>No Registrado</span>
      )}
      {agent?.file_certificate_data?.files !== undefined &&
        agent?.file_certificate_data?.files.length > 0 &&
        agent?.file_certificate_data?.files.map((file) => (
          <div className='mt-3' key={file.idfile}>
            <div className='inline-flex gap-3 items-center'>
              <div className='z-0 flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none border-medium px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium transition-transform-colors-opacity border-default bg-default-100 text-default-foreground'>
                <Document className='w-5 h-5' />
                {file?.name ?? 'Documento'}
              </div>
              <Link
                className='hover:cursor-pointer text-primary flex items-center gap-2'
                href={file.url}
                download
                target='_blank'
              >
                <Visible className='w-4 h-4' />
                <span>Ver</span>
              </Link>
            </div>
          </div>
        ))}
    </>
  )
}

export default AgentProfile
