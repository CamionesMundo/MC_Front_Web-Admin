import { MainLayout } from '@/components/layout'
import { MainContainer } from '@/components/ui'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound () {
  return (
    <MainLayout>
      <MainContainer>
        <div className='flex items-center justify-center w-full h-full'>
          <div className='w-full flex flex-col items-center'>
            <div className='max-w-72 max-h-72 w-full h-full mb-3'>
              <Image
                src={'/images/404.png'}
                alt='404 página no encontrada'
                width={700}
                height={700}
                className=' w-full h-full'
              />
            </div>
            <h1 className='text-3xl font-bold dark:text-white text-blackText'>
              ¡Ups! Página no encontrada
            </h1>
            <span className='dark:text-white/80 text-sm'>
              Parece que hubo un error con la página que estabas buscando.
            </span>
            <span className='dark:text-white/80 text-sm'>
              Es posible que haya sido eliminada o la dirección no exista.
            </span>
            <p className='dark:text-white/80 mt-2 text-sm'>
              Volver a la{' '}
              <Link href={'/'} className='dark:text-white font-semibold'>
                Página principal
              </Link>
            </p>
          </div>
        </div>
      </MainContainer>
    </MainLayout>
  )
}
