import { formatFullDate } from '@/lib/utils/utils'
import { type AuctionFilterDataType } from '@/types/api/response/publication'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableAuctionEndDate = ({ row }: Props) => {
  const data = row as AuctionFilterDataType
  const endDate = data.auction.end_date
  return (
    <div>{endDate !== null ? formatFullDate(endDate.toString()) : '-'}</div>
  )
}

export { TableAuctionEndDate }
