import { Close } from '@/icons'
import { useUIStore } from '@/store/useUiStore'
import React from 'react'
import { Sidebar } from '.'

const MobileAside = () => {
  const { changeShowMobileMenu } = useUIStore()
  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-white dark:bg-darkBg  z-50 overflow-y-auto'>
      <div className='relative w-full'>
        <div className='h-full overflow-y-auto w-full bg-white dark:bg-darkBg flex flex-col border-r border-gray'>
          <div className='fixed top-3 right-2'>
            <div
              className=' w-9 h-9 mr-1  rounded-xl flex justify-center items-center z-10'
              onClick={() => {
                changeShowMobileMenu()
              }}
            >
              <Close className='w-5 h-5' />
            </div>
          </div>
          <div className='p-2 h-screen pb-6'>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileAside
