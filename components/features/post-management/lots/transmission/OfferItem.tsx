import { formatPrice } from '@/lib/utils/utils'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type OfferItemProps = {
  countryName: string | undefined
  countryCode: string | undefined
  userName: string
  price: string
}
const OfferItem = ({
  countryName,
  countryCode,
  userName,
  price
}: OfferItemProps) => {
  return (
    <div className='flex justify-between dark:text-white'>
      <div className='flex flex-row gap-2 items-center'>
        <Avatar
          alt={`Bandera de ${countryName}`}
          className='w-4 h-4'
          src={`https://flagcdn.com/${countryCode}.svg`}
        />
        <span className='text-xs'>{userName}</span>
      </div>
      <span className='text-xs'>{formatPrice(Number(price))}</span>
    </div>
  )
}

export default OfferItem
