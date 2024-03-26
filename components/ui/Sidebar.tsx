import React from 'react'
import { Home, Users } from '@/icons'
import { usersManagement } from '@/const/sidebar'
import { ItemAside, SectionItemAside } from '.'

const Sidebar = () => {
  return (
    <div className='w-full h-full rounded-xl p-2 '>
      <div className='mb-2'>
        <span className='text-xs text-white/60'>General</span>
      </div>
      <ItemAside IconComponent={Home} href='/admin/panel' label='Inicio' />
      <SectionItemAside
        IconComponent={Users}
        items={usersManagement}
        label='Gestión de Usuarios'
      />

    </div>
  )
}

export { Sidebar }
