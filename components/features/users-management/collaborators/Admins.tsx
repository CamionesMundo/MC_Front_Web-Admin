'use client'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { adminColumns } from '@/const/columns/users'
import { type UserResponse } from '@/types/api/response/auth'
import { useRouter } from 'next/navigation'

type Props = {
  admins: UserResponse[]
  isLoading: boolean
}

const Admins = ({ admins, isLoading }: Props) => {
  const router = useRouter()
  const onCreateAdmin = () => {
    router.push('/users-management/collaborators/create')
  }
  const onEditAdmin = (id: number) => {
    router.push(`/users-management/collaborators/edit/id/${id}`)
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Administradores' />
      </div>
      <div>
        <p className='text-xs mb-2'>
          Gestiona en esta sección a los administradores registrados.
        </p>
      </div>
      <CustomTable
        data={admins}
        columns={adminColumns}
        emptyLabel={isLoading ? '' : 'No tienes ningún usuario creado'}
        totalLabel='usuarios'
        initialVisibleColumns={adminColumns.map((column) => column.key)}
        newButtonLabel={'Nuevo Administrador'}
        onEdit={onEditAdmin}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateAdmin}
      />
    </>
  )
}

export default Admins
