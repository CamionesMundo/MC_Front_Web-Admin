import { formatFullDate } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableCreationDate = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white w-44'>
      {formatFullDate((row.createdAt?.toString() as string) ?? '')}
    </div>
  )
}

export { TableCreationDate }
