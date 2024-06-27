import { Hammer } from '@/icons'
import { formatPrice } from '@/lib/utils/utils'
import { type BidAuctionResponse } from '@/types/api/response/lots'
import { BidStatus } from '@/types/enums'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type LastOfferCardProps = {
  item: BidAuctionResponse | undefined
}

const LastOfferCardDetail = ({ item }: LastOfferCardProps) => {
  const getStatus = () => {
    if (item?.assignment_status === BidStatus.Winner) {
      return (
        <div className='border border-green-600 rounded-md px-1 py-0 w-fit flex items-center mb-1'>
          <span className='text-green-600 font-semibold text-[10px]'>
            Ganador
          </span>
        </div>
      )
    }
    if (item?.assignment_status === BidStatus.Penalized) {
      return (
        <div className='border border-red-600 rounded-md px-1 py-0 w-fit flex items-center mb-1'>
          <span className='text-red-600 font-semibold text-[10px]'>
            Penalizado
          </span>
        </div>
      )
    }
    return null
  }
  return (
    <div className='grid grid-cols-4 rounded-lg w-full'>
      <span className='font-semibold text-sm col-span-4 mb-2'>
        Últimas Ofertas
      </span>
      <div className='flex flex-row justify-between w-full col-span-4'>
        {getStatus()}
      </div>
      <div className='col-span-3'>
        <div className='flex  flex-row gap-2 items-center'>
          <Avatar
            icon={<Hammer className='w-3 h-3' />}
            size={'sm'}
            classNames={{
              base: 'bg-secondary w-6 h-6',
              icon: 'text-black/80'
            }}
          />
          <div className='flex flex-col gap-0'>
            <div className='flex flex-row gap-2 items-center'>
              <Avatar
                alt={`Bandera de ${item?.user.country?.country_name}`}
                className='w-3 h-3'
                src={`https://flagcdn.com/${item?.user.country?.country_code
                  .toLowerCase()
                  .trim()}.svg`}
              />
              <span className='text-sm'>{item?.user.username}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-1 flex justify-end items-end mt-1'>
        <span className='text-md font-semibold'>
          {formatPrice(Number(item?.amount))}
        </span>
      </div>
    </div>
  )
}

export default LastOfferCardDetail
