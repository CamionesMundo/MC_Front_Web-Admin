import { Check, Close } from '@/icons'
import { type ClientResponse } from '@/types/api/response/user'
import { Avatar, Chip } from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type ProfileCardProps = {
  typeAccount: ReactNode
  client: ClientResponse | null | undefined
}

const ProfileCard = ({ typeAccount, client }: ProfileCardProps) => {
  return (
    <div className='w-full md:w-auto flex flew-row gap-2 items-center'>
      <div className='md:w-[70px] w-16 h-16 md:h-[70px] '>
        <Avatar
          className='md:w-[70px] w-16 h-16 md:h-[70px] text-large'
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
        <span className='text-large dark:text-white'>
          {client?.username ?? 'Sin Registro'}
        </span>
        {typeAccount}
      </div>
    </div>
  )
}

export default ProfileCard
