import { formatPrice } from '@/lib/utils/utils'
import { type AuctionsResponse } from '@/types/api/response/lots'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableBasePrice = ({ row }: Props) => {
  const data = row as AuctionsResponse
  return (
    <div className='text-center text-black dark:text-white w-36'>{`USD ${formatPrice(
      Number(data.vehicle?.sale_price)
    )}`}</div>
  )
}

export { TableBasePrice }
