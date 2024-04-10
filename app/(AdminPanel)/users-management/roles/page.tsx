'use client'

import { BackComponent } from '@/components/ui/BackComponent'

const RolesPage = () => {
  return (
    <div className='w-full bg-white/70 p-2 md:p-4 rounded-lg border border-gray-500/60'>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Roles' />
      </div>
      <div>
        <p className='text-xs mb-2'>
          Gestiona en esta sección los roles y permisos para cada colaborador.
        </p>
      </div>
    </div>
  )
}

export default RolesPage
