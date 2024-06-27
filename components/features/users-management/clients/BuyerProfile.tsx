import { Envelope, FacebookColor, GoogleColor } from '@/icons'
import { getBirthday, getLanguageString, parseIsoDate } from '@/lib/utils/utils'
import { type ClientResponse } from '@/types/api/response/user'
import { AccountType } from '@/types/enums'
import { Chip } from '@nextui-org/react'
import React, { type ReactNode } from 'react'
import ProfileCard from './ProfileCard'

type BuyerProfileProps = {
  client: ClientResponse | null
}

const sectionClass = 'text-blackText dark:text-white font-semibold text-md'

const getAccountType = (accountType: string): ReactNode => {
  switch (accountType) {
    case AccountType.Facebook:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <FacebookColor className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario de Facebook'}
          </span>
        </div>
      )
    case AccountType.Google:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <GoogleColor className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario de Google'}
          </span>
        </div>
      )
    case AccountType.Email:
      return (
        <div className='flex flex-row gap-2 items-center'>
          <Envelope className=' w-3 h-3' />
          <span className='text-sm text-default-500 text-wrap'>
            {'Usuario con Correo'}
          </span>
        </div>
      )
    default:
      return (
        <span className='text-sm text-default-500 text-wrap'>
          {'Tipo de cuenta desconocida'}
        </span>
      )
  }
}
const BuyerProfile = ({ client }: BuyerProfileProps) => {
  const birthday = getBirthday(client?.birthdate?.toString())
  const typeAccount = getAccountType(client?.firebase_uid?.uid_reference ?? '')
  const language = getLanguageString(client?.lang)
  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
      <ProfileCard client={client} typeAccount={typeAccount} />
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Nombre Completo</span>
        <span className='text-md text-default-500 text-sm'>
          {client?.name} {client?.surname}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Correo electrónico</span>
        <span className='text-md text-default-500 text-sm'>
          {client?.email}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Fecha de Cumpleaños</span>
        <span className='text-sm text-default-500'>{birthday}</span>
      </div>

      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>País</span>
        <span className='text-sm text-default-500'>
          {client?.country?.country_name ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Sexo</span>
        <span className='text-sm text-default-500'>
          {client?.sex ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Número telefónico</span>
        <span className='text-sm text-default-500'>
          {client?.phone_number ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Número de documento</span>
        <span className='text-sm text-default-500'>
          {client?.document_number ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Términos de Uso</span>
        <span className='text-sm text-default-500'>
          <Chip color={client?.accept_terms === true ? 'primary' : 'danger'}>
            {client?.accept_terms === true ? 'Aceptado' : 'Rechazado'}
          </Chip>
        </span>
      </div>

      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Configuración de Idioma</span>
        <span className='text-sm text-default-500'>{language}</span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Fecha de Creación</span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(client?.createdAt.toString())}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Ultima actualización</span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(client?.updatedAt.toString())}
        </span>
      </div>
      {client?.comment !== null && (
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>Comentarios</span>
          <span className='text-sm text-default-500'>{client?.comment}</span>
        </div>
      )}
    </div>
  )
}

export default BuyerProfile
