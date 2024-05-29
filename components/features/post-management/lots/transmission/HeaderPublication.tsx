import { formatPrice } from '@/lib/utils/utils'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { Avatar } from '@nextui-org/react'
import React, { useMemo } from 'react'

const HeaderPublication = () => {
  const { publication } = useLiveTransmissionStore()

  const countryCode = useMemo(() => {
    return (
      publication?.vehicle?.city?.country.country_code.toLowerCase().trim() ??
      ''
    )
  }, [publication])

  const countryName = publication?.vehicle?.city?.country.country_name ?? ''
  const cityName = publication?.vehicle?.city?.city_name ?? ''
  const publicationCode = publication?.publication_code ?? ''
  const title = publication?.vehicle.name_vehicle
  const price = publication?.auction.starting_price
  return (
    <>
      <div className='flex flex-row gap-4'>
        <div className='text-start text-default-500 dark:text-white flex flex-row gap-2 justify-start items-center'>
          {countryName !== undefined && (
            <Avatar
              alt={`Bandera de ${countryName}`}
              className='w-5 h-5'
              src={`https://flagcdn.com/${countryCode}.svg`}
            />
          )}
          <span className='text-xs'>{`${cityName ?? 'Ciudad no Registrada'}, ${
            countryName ?? 'País no Registrado'
          }`}</span>
        </div>
        <div className='font-semibold'>{`Lote #${
          publicationCode ?? 'No registrado'
        }`}</div>
      </div>
      <h1 className='font-bold text-black/80 text-lg dark:text-white'>
        {title}
      </h1>
      <span className='text-lg'>
        {price !== undefined
          ? formatPrice(Number(price))
          : 'Precio Inicial No Registrado'}
      </span>
    </>
  )
}

export default HeaderPublication
