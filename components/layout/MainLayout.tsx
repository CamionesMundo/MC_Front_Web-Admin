'use client'
import { useUIStore } from '@/store/useUiStore'
import { type ReactNode } from 'react'
import { Navbar, Sidebar } from '../ui'
import { useResponsive } from '@/hooks/useResponsive'
import { cn } from '@/lib/clsx/clsx'
import dynamic from 'next/dynamic'

const DynamicMobileAside = dynamic(
  async () => await import('../ui/MobileAside')
)

interface Props {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  const { isShowMenu, isShowMobileMenu } = useUIStore()
  const isMobile = useResponsive()

  return (
    <div className='w-screen flex flex-col  h-screen transition-all bg-radial dark:bg-radial-dark bg-white'>
      <header className='w-full h-16 p-2 '>
        <Navbar />
      </header>
      <div className='w-full h-full flex flex-row'>
        <aside
          className={` relative hidden sidebar-height max-w-[288px] flex-1 flex-col px-2 pb-2 transition-[transform,opacity,margin] duration-250 ease-in-out lg:flex  ${
            isShowMenu ? 'lg:w-72 w-0 ' : '-ml-72 -translate-x-72'
          }`}
        >
          <div className='w-full h-full  text-blackText border border-gray-500/60 bg-white dark:bg-darkBg dark:text-white  rounded-xl '>
            <Sidebar />
          </div>
        </aside>
        <main
          className={` text-black flex-1 pr-2 pb-2 overflow-hidden sidebar-height ${cn(
            { 'pl-2': isMobile }
          )} ${isShowMenu ? 'w-[calc(100% - 288px)]' : 'pl-2 w-full'}`}
        >
          {children}
        </main>
        {isMobile && isShowMobileMenu && <DynamicMobileAside />}
      </div>
    </div>
  )
}

export { MainLayout }