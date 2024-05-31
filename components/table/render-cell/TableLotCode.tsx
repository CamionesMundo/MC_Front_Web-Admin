import { type AuctionFilterDataType } from '@/types/api/response/publication'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableLotCode = ({ row }: Props) => {
  const data = row as AuctionFilterDataType
  return (
    <div className='text-center text-black dark:text-white'>
      {data.lot !== null ? `#${data.lot?.lot_code}` : '#N/D'}
    </div>
  )
}

export { TableLotCode }
