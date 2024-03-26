'use client'
import { useUIStore } from '@/store/useUiStore'
import { type ReactNode } from 'react'
import { Navbar, Sidebar } from '../ui'

interface Props {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  const {
    isShowMenu

  } = useUIStore()

  return (
    <div className='w-screen flex flex-col  h-screen transition-all bg-radial bg-white'>
      <header className='w-full h-16 p-2 '>
        <Navbar />
      </header>
      <div className='w-full h-full flex flex-row'>
        <aside
          className={` relative hidden h-full max-w-[288px] flex-1 flex-col px-2 pb-2 transition-[transform,opacity,margin] duration-250 ease-in-out lg:flex  ${
            isShowMenu ? 'lg:w-72 w-0 ' : '-ml-72 -translate-x-72'
          }`}
        >
          <div className='w-full h-full text-white bg-primary  rounded-xl '>
            <Sidebar />
          </div>
        </aside>
        <main
          className={` text-black/70 flex-1 pr-2 pb-2 ${
            isShowMenu ? '' : 'pl-2'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export { MainLayout }
