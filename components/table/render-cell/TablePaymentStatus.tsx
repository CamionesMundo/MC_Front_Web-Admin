import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TablePaymentStatus = ({ row }: Props) => {
  const status = row.payment_status
  const labelStatus =
    (status === undefined || status === null)
      ? 'Pendiente'
      : status === true
        ? 'Pagado'
        : 'Rechazado'
  return <div className='dark:text-white'>{labelStatus}</div>
}

export { TablePaymentStatus }
