import { useResponsive } from '@/hooks/useResponsive'
import { Collapsable, Logo, MC, Profile } from '@/icons'
import { useUIStore } from '@/store/useUiStore'
import { Avatar, Tooltip } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

import React from 'react'

const Navbar = () => {
  const { changeShowMenu, changeShowMobileMenu } = useUIStore()
  const { data: session } = useSession()
  const isMobile = useResponsive()
  return (
    <div className='w-full h-full bg-white text-blackText border border-gray-500/60  rounded-xl backdrop-blur-lg p-2 flex justify-between'>
      <div className='flex flex-row gap-2 w-64 justify-between'>
        <div className='flex flex-row gap-2 items-center'>
          <Logo className='w-12 h-12' />
          <MC className='w-16 h-16' />
        </div>
        <Tooltip content='Menú' color='foreground'>
          <div
            className='p-2 rounded-lg hover:cursor-pointer hover:bg-default-100/20 flex justify-center items-center'
            onClick={isMobile ? changeShowMobileMenu : changeShowMenu}
          >
            <Collapsable className='w-6 h-6' />
          </div>
        </Tooltip>
      </div>
      <Avatar
        size='sm'
        src={session?.user.image ?? ''}
        fallback={
          <Profile className='w-4 h-4 text-default-500' />
        }
      />
    </div>
  )
}

export { Navbar }
