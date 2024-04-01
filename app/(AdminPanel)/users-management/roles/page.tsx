'use client'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { type Roles, rolesData } from '@/const/data'
import React, { useEffect, useState } from 'react'

const RolesPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<Roles[]>([])
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setData(rolesData)
    }, 2000)
  }, [])
  const columns = [
    {
      key: 'name',
      display: 'Nombre',
      render: (item: any) => item.name
    },
    {
      key: 'canCreate',
      display: 'Columna 1',
      render: (item: any) => item.canCreate
    },
    {
      key: 'canRead',
      display: 'Columna 2',
      render: (item: any) => item.canRead
    },
    {
      key: 'canUpdate',
      display: 'Columna 3',
      render: (item: any) => item.canUpdate
    },
    {
      key: 'canDelete',
      display: 'columna 4',
      render: (item: any) => item.canDelete
    },
    {
      key: 'actions',
      display: 'Acciones'
    }
  ]
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
      <CustomTable
        data={data}
        columns={columns}
        emptyLabel={isLoading ? '' : 'No tienes ningún rol creado'}
        totalLabel='roles'
        initialVisibleColumns={columns.map((column) => column.key)}
        newButtonLabel={'Nuevo rol'}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={isLoading}
      />
    </div>
  )
}

export default RolesPage
