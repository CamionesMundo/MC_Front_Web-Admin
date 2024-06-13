import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TablePaymentMethod = ({ row }: Props) => {
  return (
    <div className='text-center dark:text-white w-24'>
      {row.payment_method !== 'deposit'
        ? 'Depósito Bancario'
        : row.payment_method !== 'paypal'
          ? 'PayPal'
          : 'No registrado'}
    </div>
  )
}

export { TablePaymentMethod }
