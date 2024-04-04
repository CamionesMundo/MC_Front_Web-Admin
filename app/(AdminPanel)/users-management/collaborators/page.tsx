'use client'
import Admins from '@/components/features/users-management/collaborators/Admins'
import { useGetAllAdmins } from '@/hooks/api/useAdmins'

const CollaboratorsPage = () => {
  const { data: adminsResponse, isLoading } = useGetAllAdmins()

  const admins = adminsResponse?.data.map((admin) => ({
    ...admin,
    id: admin.iduser_admin
  }))
  return (
    <div className='w-full bg-white/70 p-2 md:p-4 rounded-lg border border-gray-500/60 h-full overflow-y-auto'>
      <Admins admins={admins ?? []} isLoading={isLoading} />
    </div>
  )
}

export default CollaboratorsPage
