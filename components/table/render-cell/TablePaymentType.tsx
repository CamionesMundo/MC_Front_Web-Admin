import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TablePaymentType = ({ row }: Props) => {
  const type = row.typesPaymentOrder.name
  return <div className='text-sm'>{type}</div>
}

export { TablePaymentType }
