import { Check, Close } from '@/icons'
import { getBirthday, parseIsoDate } from '@/lib/utils/utils'
import { type ClientResponse } from '@/types/api/response/user'
import { Avatar, Chip } from '@nextui-org/react'
import React from 'react'

type LegalRepresentativeProfileProps = {
  client: ClientResponse | null
}

const sectionClass = 'text-blackText dark:text-white font-semibold text-md'

const LegalRepresentativeProfile = ({
  client
}: LegalRepresentativeProfileProps) => {
  const birthday = getBirthday(
    client?.seller?.legal_representative?.birthdate?.toString()
  )

  return (
    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 mt-2 gap-3'>
      <div className='flex flew-row gap-3 items-center'>
        <Avatar
          className='w-20 h-20 text-large'
          src={client?.seller?.legal_representative?.file_profiles?.url ?? ''}
        />
        <div className='flex flex-col'>
          <span className='text-md font-semibold'>{'Nombre de Usuario'}</span>
          <span className='text-sm text-default-500'>
            {client?.seller?.legal_representative?.username}
          </span>
          <div className='mt-1'>
            <Chip
              size='sm'
              color={
                client?.seller?.legal_representative?.active === true
                  ? 'success'
                  : 'danger'
              }
            >
              {client?.seller?.legal_representative?.active === true
                ? 'Activo'
                : 'No activo'}
            </Chip>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Nombre Completo
        </span>
        <span className='text-md text-default-500 text-sm'>
          {client?.seller?.legal_representative?.name}{' '}
          {client?.seller?.legal_representative?.surname}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Correo electrónico
        </span>
        <span className='text-md text-default-500 text-sm'>
          {client?.seller?.legal_representative?.email}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Fecha de Cumpleaños
        </span>
        <span className='text-sm text-default-500'>{birthday}</span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>País</span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.country?.country_name ??
            'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Código Postal
        </span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.address?.postal_code ??
            'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Dirección</span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.address?.address ??
            'No registrado'}
        </span>
      </div>

      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>Sexo</span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.sex ?? 'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Número telefónico
        </span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.phone_number ??
            'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Número de documento
        </span>
        <span className='text-sm text-default-500'>
          {client?.seller?.legal_representative?.document_number ??
            'No registrado'}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Estado de aprobación
        </span>
        <span className='text-sm text-default-500'>
          <Chip
            color={
              client?.seller?.legal_representative?.approved === true
                ? 'success'
                : 'danger'
            }
          >
            <div className='flex gap-1 flex-row items-center'>
            {client?.seller?.legal_representative?.approved === true
              ? (
                    <Check className='w-3 h-3' />
                )
              : (
                    <Close className='w-3 h-3' />
                )}
            <span>

            {client?.seller?.legal_representative?.approved === true
              ? 'Aprobado'
              : 'No aprobado'}
            </span>
            </div>
          </Chip>
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Fecha de Creación
        </span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(
            client?.seller?.legal_representative?.createdAt.toString()
          )}
        </span>
      </div>
      <div className='flex flex-col justify-center'>
        <span className={sectionClass}>
          Ultima actualización
        </span>
        <span className='text-sm text-default-500'>
          {parseIsoDate(
            client?.seller?.legal_representative?.updatedAt.toString()
          )}
        </span>
      </div>
      {client?.seller?.legal_representative?.comment !== null && (
        <div className='flex flex-col justify-center'>
          <span className={sectionClass}>
            Comentarios
          </span>
          <span className='text-sm text-default-500'>
            {client?.seller?.legal_representative?.comment}
          </span>
        </div>
      )}
    </div>
  )
}

export default LegalRepresentativeProfile
