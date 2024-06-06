import { User } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableUserClient = ({ row }: Props) => {
  const profileImg =
    row.file_profiles !== null ? row.file_profiles?.url : undefined
  return (
    <div className='max-w-[300px]'>
      <User
        avatarProps={{ radius: 'lg', src: profileImg }}
        description={
          <div className='flex flex-col'>
            <span>{row.email}</span>
          </div>
        }
        name={''}
        className='w-full max-w-[300px] flex justify-start dark:text-white'
      >
        {row.username}
      </User>
    </div>
  )
}

export { TableUserClient }
