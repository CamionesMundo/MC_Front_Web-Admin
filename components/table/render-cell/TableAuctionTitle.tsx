import { Logo } from '@/icons'
import { type AuctionsResponse } from '@/types/api/response/lots'
import Image from 'next/image'
import React from 'react'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableAuctionTitle = ({ row }: Props) => {
  const data = row as AuctionsResponse
  const images =
    data.vehicle?.photo_galleries !== null
      ? data.vehicle?.photo_galleries.files
      : []
  const principal =
    images?.find((image) => image.name === 'principal')?.url ?? ''

  return (
    <div className='max-w-[300px] flex gap-2 flex-row items-center'>
      <div className='w-12 h-12 overflow-hidden flex justify-center items-center bg-slate-200 rounded-xl'>
        {principal !== '' && (
          <Image
            alt={`Imagen de publicación ${data.idpublication}`}
            src={principal}
            className=' object-cover rounded-xl w-full h-full'
            width={300}
            height={300}
          />
        )}
        {principal === '' && <Logo className='w-7 h-7' />}
      </div>
      <div className='flex flex-1 flex-col gap-0'>
        <span className='text-[11px] text-black dark:text-white'>{`ID: ${data.publication_code}`}</span>
        <span className='text-xs text-default-500'>
          {data.vehicle?.name_vehicle}
        </span>
      </div>
    </div>
  )
}

export { TableAuctionTitle }
