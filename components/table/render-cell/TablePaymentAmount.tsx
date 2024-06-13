import { formatPrice } from '@/lib/utils/utils'
import { type PaymentsData } from '@/types/api/response/payments'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TablePaymentAmount = ({ row }: Props) => {
  const data = row as PaymentsData
  return (
    <div className='text-center text-black dark:text-white w-36'>{`USD ${formatPrice(
      Number(data.payment_amount)
    )}`}</div>
  )
}

export { TablePaymentAmount }
