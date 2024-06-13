import { Info } from '@/icons'
import { cn } from '@/lib/clsx/clsx'
import { Link } from '@nextui-org/react'
import React from 'react'

type Props = {
  content: string
  href?: string
  link?: string
  noMargin?: boolean
}

const InfoCard = ({ content, link = '', noMargin = false, href }: Props) => {
  return (
    <div
      className={cn(
        'w-full flex gap-5 flex-row border-gray border rounded-xl py-2 px-5 bg-slate-100',
        { 'my-3': !noMargin, 'my-0': noMargin }
      )}
    >
      <div className='flex justify-center items-center'>
        <Info className='w-4 h-4 text-textCardInfo' />
      </div>
      <div className='flex flex-col w-full h-full'>
        <p className='text-muted text-[10px]'>{content}</p>
        {link !== '' && (
          <Link
            href={href ?? ''}
            className='text-muted text-[10px]'
            underline='always'
          >
            {link}
          </Link>
        )}
      </div>
    </div>
  )
}

export default InfoCard
