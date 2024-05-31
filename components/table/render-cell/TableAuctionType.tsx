import { type AuctionFilterDataType } from '@/types/api/response/publication'
import { AuctionType } from '@/types/enums'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableAuctionType = ({ row }: Props) => {
  const data = row as AuctionFilterDataType
  const getType = () => {
    const type = data.auction?.type_auction

    if (type === AuctionType.Determined) {
      return 'Determinada'
    }
    if (type === AuctionType.Auctioneer) {
      return 'Martillero'
    }
    return 'Tipo no registrado'
  }
  return <div className='text-center text-black dark:text-white'>{getType()}</div>
}

export { TableAuctionType }
