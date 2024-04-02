import { User } from '@nextui-org/react'
import React from 'react'

type Props = {
  row: any
}

const TableUser = ({ row }: Props) => {
  return (
    <div className='max-w-[300px]'>
      <User
        avatarProps={{ radius: 'lg', src: row.avatar }}
        description={
          <div className='flex flex-col'>
            <span className='uppercase'>{row.role}</span>
            <span>{row.email}</span>
          </div>
        }
        name={row.name}
        className='w-full max-w-[300px] flex justify-start'
      >
        {row.name}
      </User>
    </div>
  )
}

export { TableUser }
