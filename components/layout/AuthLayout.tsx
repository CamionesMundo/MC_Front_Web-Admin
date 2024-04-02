import Image from 'next/image'
import { type ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className='w-full max-w-screen-xl mx-auto h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2'>
        <div className='w-full bg-white overflow-y-auto flex items-center justify-center col-span-1'>
         {children}
        </div>
        <div className='w-full hidden md:block h-screen '>
          <div className='w-full h-full'>
            <Image
              src={'/images/BGLogin.jpeg'}
              width={1500}
              height={1500}
              alt='Imagen de mundo camiones'
              className='object-cover w-full h-full'
              priority
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export { AuthLayout }
