import { Check, Close } from '@/icons'
import { type ClientResponse } from '@/types/api/response/user'
import { Avatar, Chip } from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type ProfileCardProps = {
  typeAccount: ReactNode
  client: ClientResponse | null
}

const ProfileCard = ({ typeAccount, client }: ProfileCardProps) => {
  return (
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
  )
}

export default ProfileCard
