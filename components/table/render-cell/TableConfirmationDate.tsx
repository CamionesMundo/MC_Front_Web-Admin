import { parseIsoDate } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableConfirmationDate = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white w-44'>
      {row.confirmation_date !== null
        ? parseIsoDate((row.confirmation_date.toString() as string) ?? '')
        : 'dd/mm/aaa'}
    </div>
  )
}

export { TableConfirmationDate }
