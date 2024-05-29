import { parseIsoDate } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TablePaymentDate = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white w-44'>
      {row.payment_date !== null
        ? parseIsoDate((row.payment_date.toString() as string) ?? '')
        : 'dd/mm/aaa'}
    </div>
  )
}

export { TablePaymentDate }
