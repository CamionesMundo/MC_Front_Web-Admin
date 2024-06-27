import { Location, Ship } from '@/icons'
import { type AddressBaseData } from '@/types/api'
import { Avatar } from '@nextui-org/react'

type OrderAddressProps = {
  item: AddressBaseData | null | undefined
}

const OrderAddress = ({ item }: OrderAddressProps) => {
  return (
    <div>
      <div className='flex flex-col w-full gap-1 mt-2'>
        <div className='flex flex-row gap-2 items-center'>
          <Location className='w-3.5 h-3.5 dark:text-white' />
          <span className='text-xs md:text-sm dark:text-white'>
            {item?.address ?? 'No registrado'}
          </span>
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <Ship className='w-3.5 h-3.5 dark:text-white' />
          <span className='text-xs md:text-sm dark:text-white'>
            {item?.receiving_port?.name ?? 'No registrado'}
          </span>
        </div>

        <div className='flex flex-row gap-2 items-center'>
          {item?.city.country.country_code !== undefined && (
            <Avatar
              alt={`Bandera de ${item.city.country.country_name ?? ''}`}
              className='w-4 h-4'
              src={`https://flagcdn.com/${(
                item.city.country.country_code ?? ''
              ).toLowerCase()}.svg`}
            />
          )}
          <p className='text-xs md:text-sm dark:text-white'>
            {item?.city.city_name ?? 'No registrado'},{' '}
            <span className='dark:text-white'>
              {item?.city.country.country_name ?? 'No registrado'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderAddress
