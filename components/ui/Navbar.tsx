import { Collapsable } from '@/icons'
import { useUIStore } from '@/store/useUiStore'
import { Avatar, Tooltip } from '@nextui-org/react'
import React from 'react'

const Navbar = () => {
  const { changeShowMenu } = useUIStore()
  return (
    <div className='w-full h-full bg-primary text-white  rounded-xl backdrop-blur-lg p-2 flex justify-between'>
      <div className='flex flex-row gap-2 w-64 justify-between'>
        <div className='flex flex-row gap-2 items-center'>
          {/* <Logo className='w-14 h-14' /> */}
          <div className='flex flex-col justify-center mt-2 pl-2'>
            <p className='text-white leading-3 font-bold text-2xl'>
              <span>PRA</span>
              <span className='text-secondary'>IA</span>
            </p>
            <span className='text-xs leading-5 text-white font-light'>
              tour system
            </span>
          </div>
        </div>
        <Tooltip content='Menú' color='foreground'>
          <div
            className='p-2 rounded-lg hover:cursor-pointer hover:bg-default-100/20 flex justify-center items-center'
            onClick={changeShowMenu}
          >
            <Collapsable className='w-6 h-6' />
          </div>
        </Tooltip>
      </div>
      <Avatar size='sm' />
    </div>
  )
}

export { Navbar }
