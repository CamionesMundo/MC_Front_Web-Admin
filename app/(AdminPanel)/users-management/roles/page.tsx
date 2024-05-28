'use client'

import Roles from '@/components/features/users-management/roles/Roles'
import { MainContainer } from '@/components/ui'
import { useGetAllRoles } from '@/hooks/api/useRoles'
import { useMemo } from 'react'

const RolesPage = () => {
  const { data: rolesResponse, isLoading } = useGetAllRoles()
  const roles = useMemo(() => {
    const usersAdmin = rolesResponse?.data?.map((role) => ({
      ...role,
      id: role.idrole_admin
    }))
    return usersAdmin
  }, [rolesResponse])
  return (
    <MainContainer>
      <Roles roles={roles ?? []} isLoading={isLoading} />
    </MainContainer>
  )
}

export default RolesPage
