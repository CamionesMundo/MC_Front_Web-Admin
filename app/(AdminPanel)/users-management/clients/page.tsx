'use client'

import Users from '@/components/features/users-management/clients/Users'
import { MainContainer } from '@/components/ui'
import { handleClientError } from '@/helpers/error'
import { useGetAllAppUsers } from '@/hooks/api/useClients'
import { useMemo } from 'react'

const ClientsPage = () => {
  const { data: clientsResponse, isLoading } = useGetAllAppUsers()
  const clients = useMemo(() => {
    const usersAdmin = clientsResponse?.data?.map((client) => ({
      ...client,
      id: client.iduser
    }))
    return usersAdmin
  }, [clientsResponse])

  if (clientsResponse?.error !== null && clientsResponse !== undefined) {
    handleClientError(clientsResponse?.statusCode)
  }
  return (
    <MainContainer>
      <Users isLoading={isLoading} clients={clients ?? []} />
    </MainContainer>
  )
}

export default ClientsPage
