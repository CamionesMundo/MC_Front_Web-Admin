import { type AuctionFilterDataType } from '@/types/api/response/publication'
import { AuctionType } from '@/types/enums'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableLotCode = ({ row }: Props) => {
  const data = row as AuctionFilterDataType
  const isDetermined = data.auction.type_auction === AuctionType.Determined
  return (
    <div className='text-center text-black dark:text-white'>
      {data.lot !== null ? `#${data.lot?.lot_code}` : isDetermined ? data.publication_code : '#N/D'}
    </div>
  )
}

export { TableLotCode }
