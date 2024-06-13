import { type OrderDataType } from '@/types/api/response/orders'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableOrderCountry = ({ row }: Props) => {
  const data = row as OrderDataType

  const countryCode = data.publication.vehicle?.city?.country?.country_code
    .toLowerCase()
    .trim()
  return (
    <div className='text-center dark:text-white flex flex-row gap-2'>
      {data.publication.vehicle?.city?.country?.country_code !== undefined && (
        <Avatar
          alt={`Bandera de ${data.publication.vehicle?.city?.country?.country_name}`}
          className='w-6 h-6'
          src={`https://flagcdn.com/${countryCode}.svg`}
        />
      )}
      <span>{`${
        data.publication.vehicle?.city?.country?.country_name ?? 'Sin registro'
      } `}</span>
    </div>
  )
}

export { TableOrderCountry }
