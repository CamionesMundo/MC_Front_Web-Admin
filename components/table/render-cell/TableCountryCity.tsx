import { type AuctionsResponse } from '@/types/api/response/lots'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}
const TableCountryCity = ({ row }: Props) => {
  const isAuction = row.idpublication
  if (isAuction !== undefined) {
    const data = row as AuctionsResponse
    const countryCode = data.vehicle?.city?.country.country_code
      .toLowerCase()
      .trim()
    return (
      <div className='text-start text-black dark:text-white flex flex-row gap-2 justify-start'>
        {data.vehicle?.city?.country.country_name !== undefined && (
          <Avatar
            alt={`Bandera de ${data.vehicle.city?.country.country_name}`}
            className='w-6 h-6'
            src={`https://flagcdn.com/${countryCode}.svg`}
          />
        )}
        <span>{`${
          data.vehicle?.city?.country.country_name ?? 'Sin registro'
        }`}</span>
      </div>
    )
  } else {
    const countryCode = row.country.country_code.toLowerCase().trim()
    return (
      <div className='text-center dark:text-white flex flex-row gap-2'>
        <Avatar
          alt={`Bandera de ${row.country.country_name}`}
          className='w-6 h-6'
          src={`https://flagcdn.com/${countryCode}.svg`}
        />
        <span>{`${row.country.country_name}`}</span>
      </div>
    )
  }
}

export { TableCountryCity }
