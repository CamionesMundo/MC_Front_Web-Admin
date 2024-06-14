import { formatFullDate, formatPrice } from '@/lib/utils/utils'
import { type OrderDetailResponse } from '@/types/api/response/orders'
import { Avatar, Chip } from '@nextui-org/react'
import React from 'react'

type InfoPublicationCardProps = {
  order: OrderDetailResponse
}

const InfoPublicationCard = ({ order }: InfoPublicationCardProps) => {
  return (
    <div className='w-full border border-default-200 rounded-lg p-4 shadow-lg'>
      <>
        <div className='flex flex-row gap-4'>
          <div className='text-start text-default-500 dark:text-white flex flex-row gap-2 justify-start items-center'>
            {order?.publication?.vehicle?.city?.country.country_code !== '' && (
              <Avatar
                alt={`Bandera de ${order?.publication?.vehicle?.city?.country.country_name}`}
                className='w-5 h-5'
                src={`https://flagcdn.com/${order?.publication?.vehicle?.city?.country.country_code
                  .toLowerCase()
                  .trim()}.svg`}
              />
            )}
            <span className='text-xs'>{`${
              order?.publication.vehicle?.city?.city_name ??
              'Ciudad no Registrada'
            }, ${
              order?.publication?.vehicle?.city?.country.country_name ??
              'País no Registrado'
            }`}</span>
          </div>
        </div>
        <h1 className='font-bold text-black/80 dark:text-white'>
          {order?.publication.vehicle.name_vehicle}
        </h1>
        <span className='dark:text-white'>
          {order?.publication.vehicle.sale_price !== undefined && (
            <>{formatPrice(Number(order?.publication.vehicle.sale_price))}</>
          )}

          {order?.publication.vehicle.sale_price === undefined &&
            'Precio Inicial No Registrado'}
        </span>
      </>
      <div className='flex flex-row mt-2 gap-12'>
        <div className='flex flex-col'>
          <span className='font-semibold text-default-700 text-sm'>Status</span>
          <div>
            <Chip
              color={order?.publication.active ? 'success' : 'danger'}
              size='sm'
            >
              {order?.publication.active ? 'Activo' : 'No activo'}
            </Chip>
          </div>
        </div>
        <div className='flex flex-col gap-0.5'>
          <span className='font-semibold text-default-700 text-sm'>
            Fecha creación
          </span>
          <span className='text-default-700 text-sm'>
            {formatFullDate(order?.publication?.createdAt?.toString() ?? '')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InfoPublicationCard
