import React from 'react'
import { LeftArrow } from '@/icons'
import { useGoBackPage } from '@/lib/utils/utils'

type BackComponentProps = {
  title: string
  subtitle: string
}

const BackComponent = ({ title, subtitle }: BackComponentProps) => {
  const { handleGoBack } = useGoBackPage()
  return (
    <div className='  w-full flex justify-start items-center gap-4 flex-row'>
      <div
        className=' bg-transparent border-black/50 border-1 w-10 h-10 flex justify-center items-center rounded-lg hover:cursor-pointer hover:opacity-100 opacity-85'
        onClick={handleGoBack}
      >
        <LeftArrow className='w-4 h-4 text-black' />
      </div>
      <div className='flex flex-col text-black/70'>
        <span className='text-xs md:text-sm'>{title}</span>
        <span className='font-bold text-sm md:text-xl'>{subtitle}</span>
      </div>
    </div>
  )
}

export { BackComponent }
