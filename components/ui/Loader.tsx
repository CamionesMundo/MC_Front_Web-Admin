import { Logo } from '@/icons'
import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='velocity relative flex flex-row items-center w-12'>
        <span className='bg-black dark:bg-white'></span>
        <span className='bg-black dark:bg-white'></span>
        <span className='bg-black dark:bg-white'></span>
        <span className='bg-black dark:bg-white'></span>
        <Logo className=' w-9 h-9 absolute -right-2 truck-animation dark:text-white' />
      </div>
      <div className='animate-pulse'>
        <span className='text-sm dark:text-white'>Cargando</span>
      </div>
    </div>
  )
}

export { Loader }
