import { parseIsoDate } from '@/lib/utils/utils'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableIsoDate = ({ row }: Props) => {
  const isLot = Boolean(row.transmission_date)

  if (isLot) {
    return (
      <div className='text-center dark:text-white w-44'>
        {parseIsoDate((row.transmission_date.toString() as string) ?? '')}
      </div>
    )
  } else {
    return (
      <div className='text-center dark:text-white w-44'>
        {parseIsoDate((row.updatedAt?.toString() as string) ?? '')}
      </div>
    )
  }
}

export { TableIsoDate }
