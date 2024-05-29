import { Document, Mileage } from '@/icons'
import { type PublicationResponse } from '@/types/api/response/publication'
import React from 'react'

type TabDescriptionProps = {
  publication: PublicationResponse | undefined
}

const TabDescription = ({ publication }: TabDescriptionProps) => {
  return (
    <div className='flex flex-col'>
      <span className='font-semibold text-sm text-zinc-800'>
        {'Descripción General'}
      </span>
      <p className='text-sm text-black/70'>
        {publication?.vehicle.vehicle_description ?? 'Sin descripción'}
      </p>
      <div className='grid grid-cols-2'>
        <div className='flex flex-row gap-3 items-center py-4'>
          <Mileage className='w-4 h-4' />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>Kilometraje</span>
            <span className='text-sm'>{`${publication?.vehicle.mileage} Km`}</span>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center py-4'>
          <Document className='w-4 h-4' />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>VIN</span>
            <span className='text-sm'>{publication?.vehicle.vin}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabDescription
