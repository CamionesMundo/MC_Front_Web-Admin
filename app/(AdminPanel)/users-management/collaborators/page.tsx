'use client'

import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { usersData, type User } from '@/const/data'
import { useEffect, useState } from 'react'

const CollaboratorsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<User[]>([])
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setData(usersData)
    }, 2000)
  }, [])

  const columns = [
    {
      key: 'user',
      display: 'Nombre',
      render: (item: any) => item.user
    },
    {
      key: 'status',
      display: 'Estado',
      render: (item: any) => item.user
    },
    {
      key: 'actions',
      display: 'Acciones'
    }
  ]
  return (
    <div className='w-full bg-white/70 p-2 md:p-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Administradores' />
      </div>
      <div>
        <p className='text-xs mb-2'>
          Gestiona en esta sección a los administradores registrados.
        </p>
      </div>
      <CustomTable
        data={data}
        columns={columns}
        emptyLabel={isLoading ? '' : 'No tienes ningún usuario creado'}
        totalLabel='usuarios'
        initialVisibleColumns={columns.map((column) => column.key)}
        newButtonLabel={'Nuevo Usuario'}
        onEdit={() => {}}
        onDelete={() => {}}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CollaboratorsPage
