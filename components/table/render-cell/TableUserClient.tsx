import { User } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableUserClient = ({ row }: Props) => {
  const profileImg =
    row.file_profile !== null ? row.file_profile?.url : undefined
  return (
    <div className='max-w-[300px]'>
      <User
        avatarProps={{ radius: 'lg', src: profileImg }}
        description={
          <div className='flex flex-col'>
            <span>{row.email}</span>
          </div>
        }
        name={row.username}
        className='w-full max-w-[300px] flex justify-start'
      >
        {row.username}
      </User>
    </div>
  )
}

export { TableUserClient }
