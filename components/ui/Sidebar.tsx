import React from 'react'
import {
  AppConfig,
  Category,
  Delivery,
  Home,
  Post,
  Profile,
  Settings,
  Ship,
  Users
} from '@/icons'
import {
  categoriesManagement,
  postManagement,
  shipmentsManagement,
  usersManagement
} from '@/const/sidebar'
import { ItemAside, SectionItemAside } from '.'
import { Avatar } from '@nextui-org/react'
import { GenericButton } from '../buttons'
import { signOut, useSession } from 'next-auth/react'
import { capitalize } from '@/lib/utils/utils'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className='w-full h-full rounded-xl p-2 '>
      <div className='w-full flex gap-4 items-center p-2 h-14'>
        <Avatar
          isBordered
          src={session?.user.image ?? ''}
          fallback={<Profile className='w-5 h-5 text-default-500' />}
        />
        <div className='flex flex-col'>
          <span className='text-sm'>{session?.user.name}</span>
          <span className='text-black/60 text-xs'>
            {capitalize(session?.user.role ?? '')}
          </span>
        </div>
      </div>
      <div className='menu-height overflow-hidden'>
        <div className='w-full h-full overflow-y-auto scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full'>
          <ItemAside IconComponent={Home} href='/' label='Inicio' />
          <SectionItemAside
            IconComponent={Users}
            items={usersManagement}
            label='Gestión de Usuarios'
          />
          <SectionItemAside
            IconComponent={Post}
            items={postManagement}
            label='Gestión de Publicaciones'
          />
          <ItemAside
            IconComponent={Ship}
            href='/customs-agents'
            label='Agentes aduaneros'
          />
          <ItemAside
            IconComponent={AppConfig}
            href='/app-config'
            label='Configuraciones App'
          />
          <SectionItemAside
            IconComponent={Category}
            items={categoriesManagement}
            label='Gestión de Categorías'
          />
          <SectionItemAside
            IconComponent={Delivery}
            items={shipmentsManagement}
            label='Gestión de Envíos'
          />
          <ItemAside
            IconComponent={Settings}
            href='/settings'
            label='Configuración'
          />
        </div>
      </div>
      <div className='bg-white dark:bg-darkBg p-2'>
        <GenericButton
          label='Cerrar Sesión'
          onClick={async () => {
            await signOut()
          }}
        />
      </div>
    </div>
  )
}

export { Sidebar }
