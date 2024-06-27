import { User } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableUser = ({ row }: Props) => {
  const isAgent = row.idcustoms_agent !== undefined

  if (isAgent) {
    const profileImg =
      row.file_profile !== null ? row.profile_gallery?.files[0].url : undefined
    return (
      <div className='max-w-[300px]'>
        <User
          avatarProps={{ radius: 'lg', src: profileImg }}
          description={
            <div className='flex flex-col'>
              <span className='uppercase text-black dark:text-white'>
                {row?.name}
              </span>
              <span>{row.email}</span>
            </div>
          }
          name={row.name_user}
          className='w-full max-w-[300px] flex justify-start dark:text-white'
        >
          {row.name_user}
        </User>
      </div>
    )
  }
  const profileImg =
    row.file_profile !== null ? row.file_profile?.url : undefined
  return (
    <div className='max-w-[300px]'>
      <User
        avatarProps={{ radius: 'lg', src: profileImg }}
        description={
          <div className='flex flex-col'>
            <span className='uppercase'>{row?.role?.name_role}</span>
            <span>{row.email}</span>
          </div>
        }
        name={''}
        className='w-full max-w-[300px] flex justify-start dark:text-white'
      >
        {row.name_user}
      </User>
    </div>
  )
}

export { TableUser }
