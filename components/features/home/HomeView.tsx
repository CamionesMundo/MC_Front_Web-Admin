import { Logo, MC } from '@/icons'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

const HomeView = () => {
  const { data: session } = useSession()
  const userName = useMemo(() => {
    if (session !== undefined) {
      return session?.user.name
    }
  }, [session])

  return (
    <div className='w-full h-full grid place-content-center px-3 md:px-10'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row gap-2 items-center text-blackText dark:text-white justify-center'>
          <Logo className='w-20 h-20 md:w-32 md:h-32' />
          <MC className='w-24 h-24 md:w-40 md:h-40' />
        </div>
        <div className='py-6 px-6 md:px-12 border border-default-200 shadow-lg rounded-3xl max-w-[700px] mx-auto text-center dark:text-white'>
          <p className='font-semibold text-lg md:text-xl'>
            {'Hola '} <span className='text-cyan-600'>{`@${userName}`}</span>
          </p>
          <p className='font-semibold text-lg md:text-xl'>
            <span className='text-lg md:text-2xl'>{'!Bienvenido'}</span>
            {' al Panel admin de Mundo camiones!'}
          </p>
        </div>
        <div className='w-full text-xs md:text-sm mt-16 md:px-0 px-2 dark:text-white'>
          <p>
            {
              'Aquí podrás - Gestionar usuarios reales del app móvil - Crear/editar roles para futuros administradores - Asignar permisos a roles existentes - Gestionar Publicaciones - Gestionar Pagos - Gestionar subastas (determinadas y con martillero) - Crear y asignar Lotes de subasta a usuarios martilleros - Crear/editar Martilleros - Crear/editar Agentes aduaneros - Crear nuevas Marcas, Modelos, Sub-modelos - Configurar parámetros del aplicativo móvil (monto garantía, comisiones, tiempo de pujas, monto máximo de subasta, incrementos) - Realizar transmisiones En vivo - Editar tus datos de perfil y Cambiar la apariencia de tu cuenta modo Light o Dark.'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeView
