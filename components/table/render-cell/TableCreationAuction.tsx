import { StarFilled } from '@/icons'
import { calculateWeeksOfAntiquity, formatFullDate } from '@/lib/utils/utils'
import { type AuctionsResponse } from '@/types/api/response/lots'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableCreationAuction = ({ row }: Props) => {
  const data = row as AuctionsResponse
  const weeks = calculateWeeksOfAntiquity(data.createdAt.toString())
  const getClass = () => {
    if (weeks <= 2) {
      return 'text-success'
    }
    if (weeks > 2 && weeks <= 8) {
      return 'text-warning'
    }
    if (weeks > 8) {
      return 'text-red-600'
    }
  }
  const isActive = data.auction.payment_status ?? false
  const starClass = getClass()
  return (
    <div className='text-center text-black dark:text-white flex items-center gap-2 justify-center'>
      {formatFullDate(data.createdAt.toString())}
      {isActive && <StarFilled className={`w-4 h-4 ${starClass}`} />}
    </div>
  )
}

export { TableCreationAuction }
