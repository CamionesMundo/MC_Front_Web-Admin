import { Check } from '@/icons'
import { cn } from '@/lib/clsx/clsx'
import React, { type ReactNode } from 'react'

type ItemStatusProps = {
  isCompleted?: boolean
  title: string
  description: string
  isFirst?: boolean
  isLast?: boolean
  footerComponent?: ReactNode
}

const ItemStatus = ({
  isCompleted = false,
  isFirst = false,
  isLast = false,
  description,
  title,
  footerComponent
}: ItemStatusProps) => {
  return (
    <div className='grid grid-cols-12'>
      <div
        className={cn('col-span-1  h-full flex flex-col items-center', {
          'pt-1': isFirst,
          'justify-center': !isLast,
          'justify-start': isLast
        })}
      >
        <div
          className={cn('w-3 h-3 rounded-full', {
            ' bg-slate-200': !isCompleted,
            ' bg-primary': isCompleted
          })}
        ></div>
        {!isLast && (
          <div
            className={cn('w-[2px] h-full', {
              ' bg-slate-200': !isCompleted,
              ' bg-primary': isCompleted
            })}
          ></div>
        )}
      </div>
      <div className='col-span-11 flex flex-col pb-4'>
        <div className='flex flex-row justify-between items-start pb-1'>
          <span className='text-sm font-semibold text-blackText dark:text-white'>{title}</span>
          {isCompleted && (
            <div className='py-1 px-2 h-fit rounded-xl bg-secondary flex justify-center items-center gap-1'>
              <Check className='w-2.5 h-2.5 text-black' />
              <span className='text-[10px] font-bold'>COMPLETADO</span>
            </div>
          )}
        </div>
        <p className='text-xs'>{description}</p>
        {footerComponent !== undefined && footerComponent}
      </div>
    </div>
  )
}

export default ItemStatus
