import React from 'react'
import {
  AppConfig,
  Category,
  Delivery,
  Home,
  Post,
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

const Sidebar = () => {
  return (
    <div className='w-full h-full rounded-xl p-2 '>
      <div className='w-full flex gap-4 items-center p-2 h-14'>
        <Avatar
          isBordered
          src='https://i.pravatar.cc/150?u=a04258114e29026302d'
        />
        <div className='flex flex-col'>
          <span className='text-sm'>USERNAME</span>
          <span className='text-black/60 text-xs'>Administrador</span>
        </div>
      </div>
      <div className='menu-height overflow-hidden'>
        <div className='w-full h-full overflow-y-auto scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-slate-400 scrollbar-thumb-rounded-full'>
          <div className='mb-2'>
            <span className='text-xs text-black/60'>General</span>
          </div>
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
      <div className='bg-white p-2'>
        <GenericButton label='Cerrar Sesión' />
      </div>
    </div>
  )
}

export { Sidebar }
