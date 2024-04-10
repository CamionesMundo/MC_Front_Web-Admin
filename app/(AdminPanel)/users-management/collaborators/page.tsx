'use client'

import Admins from '@/components/features/users-management/collaborators/Admins'
import { MainContainer } from '@/components/ui'
import { useGetAllAdmins } from '@/hooks/api/useAdmins'

import { useMemo } from 'react'

const CollaboratorsPage = () => {
  const { data: adminsResponse, isLoading } = useGetAllAdmins()

  const admins = useMemo(() => {
    const usersAdmin = adminsResponse?.data?.map((admin) => ({
      ...admin,
      id: admin.iduser_admin
    }))
    return usersAdmin
  }, [adminsResponse])

  return (
    <MainContainer>
      <Admins admins={admins ?? []} isLoading={isLoading} />
    </MainContainer>
  )
}

export default CollaboratorsPage
