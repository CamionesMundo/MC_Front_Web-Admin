import { Check, Close, Envelope, FacebookColor, GoogleColor } from '@/icons'
import { getBirthday, getLanguageString, parseIsoDate } from '@/lib/utils/utils'
import { type ClientResponse } from '@/types/api/response/user'
import { AccountType } from '@/types/enums'
import { Avatar, Chip } from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type BuyerProfileProps = {
  client: ClientResponse | null
}

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
            {'Usuario con Credenciales'}
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
      <div className='flex flew-row gap-3 items-center'>
        <div className='w-20 h-20'>
          <Avatar
            className='w-20 h-20 text-large'
            src={client?.file_profiles?.url ?? ''}
          />
        </div>

        <div className='flex flex-col'>
          <div className='mt-1'>
            <div className='flex flex-row gap-2'>
              <Chip
                color={client?.active === true ? 'success' : 'danger'}
                size='sm'
              >
                {client?.active === true ? 'Activo' : 'No activo'}
              </Chip>
              <Chip
                color={client?.approved === true ? 'success' : 'danger'}
                size='sm'
              >
                <div className='flex gap-1 flex-row items-center'>
                  {client?.approved === true
                    ? (
                    <Check className='w-3 h-3' />
                      )
                    : (
                    <Close className='w-3 h-3' />
                      )}
                  <span>
                    {client?.approved === true ? 'Aprobado' : 'No aprobado'}
                  </span>
                </div>
              </Chip>
            </div>
          </div>
          <span className='text-large'>{client?.username}</span>
          {typeAccount}
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Nombre Completo
        </span>
        <span className='text-md text-default-500 text-sm'>
          {client?.name} {client?.surname}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Correo electrónico
        </span>
        <span className='text-md text-default-500 text-sm'>
          {client?.email}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Fecha de Cumpleaños
        </span>
        <span className='text-sm text-default-500'>{birthday}</span>
      </div>

      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>País</span>
        <span className='text-sm text-default-500'>
          {client?.country?.country_name ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>Sexo</span>
        <span className='text-sm text-default-500'>
          {client?.sex ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Número telefónico
        </span>
        <span className='text-sm text-default-500'>
          {client?.phone_number ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Número de documento
        </span>
        <span className='text-sm text-default-500'>
          {client?.document_number ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Términos de Uso
        </span>
        <span className='text-sm text-default-500'>
          <Chip color={client?.accept_terms === true ? 'primary' : 'danger'}>
            {client?.accept_terms === true ? 'Aceptado' : 'Rechazado'}
          </Chip>
        </span>
      </div>

      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Configuración de Idioma
        </span>
        <span className='text-sm text-default-500'>{language}</span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Fecha de Creación
        </span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(client?.createdAt.toString())}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-blackText font-semibold text-md'>
          Ultima actualización
        </span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(client?.updatedAt.toString())}
        </span>
      </div>
      {client?.comment !== null && (
        <div className='flex flex-col justify-center'>
          <span className='text-blackText font-semibold text-md'>
            Comentarios
          </span>
          <span className='text-sm text-default-500'>{client?.comment}</span>
        </div>
      )}
    </div>
  )
}

export default BuyerProfile
