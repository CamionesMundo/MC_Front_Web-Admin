import { Hammer } from '@/icons'
import { formatPrice } from '@/lib/utils/utils'
import { type BidAuctionResponse } from '@/types/api/response/lots'
import { BidStatus } from '@/types/enums'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type LastOfferCardProps = {
  item: BidAuctionResponse | undefined
}

const LastOfferCard = ({ item }: LastOfferCardProps) => {
  const getStatus = () => {
    if (item?.assignment_status === BidStatus.Winner) {
      return (
        <div className='border border-green-600 rounded-md px-1 py-0'>
          <span className='text-green-600 font-semibold text-xs'>Ganador</span>
        </div>
      )
    }
    if (item?.assignment_status === BidStatus.Penalized) {
      return (
        <div className='border border-red-600 rounded-md px-1 py-0'>
          <span className='text-red-600 font-semibold text-xs'>Penalizado</span>
        </div>
      )
    }
    return null
  }
  return (
    <div className='grid grid-cols-4 border border-zinc-300 rounded-lg px-3 py-2 w-full'>
      <div className='col-span-3'>
        <div className='flex  flex-row gap-2 items-center mt-2'>
          <Avatar
            icon={<Hammer className='md:w-3.5 md:h-3.5 w-3 h-3' />}
            size={'md'}
            classNames={{
              base: 'bg-secondary',
              icon: 'text-black/80'
            }}
          />
          <div className='flex flex-col gap-0'>
            <span className='text-xs text-zinc-700'>Última oferta</span>
            <div className='flex flex-row gap-2 items-center'>
              <Avatar
                alt={`Bandera de ${item?.user.country?.country_name}`}
                className='w-4 h-4'
                src={`https://flagcdn.com/${item?.user.country?.country_code
                  .toLowerCase()
                  .trim()}.svg`}
              />
              <span className='text-xs md:text-sm'>{item?.user.username}</span>
              {getStatus()}
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 flex justify-end items-end'>
        <span className='md:text-base text-sm font-semibold'>
          {formatPrice(Number(item?.amount))}
        </span>
      </div>
    </div>
  )
}

export default LastOfferCard
