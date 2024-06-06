'use client'

import Users from '@/components/features/users-management/clients/Users'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { handleClientError } from '@/helpers/error'
import { useGetAllAppUsers } from '@/hooks/api/useClients'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import { useEffect, useMemo } from 'react'

const ClientsPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: clientsResponse,
    isLoading,
    refetch
  } = useGetAllAppUsers({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    userType: Number(queryParams.get('userType'))
  })

  const clients = useMemo(() => {
    const usersAdmin = clientsResponse?.data?.users.map((client) => ({
      ...client,
      id: client.iduser
    }))
    return usersAdmin
  }, [clientsResponse])
  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: clientsResponse?.data?.totalPages ?? 0 }
  )
  useEffect(() => {
    if (queryParams !== undefined) {
      refetch()
        .then()
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos de la subasta:',
            error
          )
        })
    }
  }, [queryParams, refetch])

  if (clientsResponse?.error !== null && clientsResponse !== undefined) {
    handleClientError(clientsResponse?.statusCode)
  }
  return (
    <MainContainer>
      <Users
        isLoading={isLoading}
        clients={clients ?? []}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={clientsResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={clientsResponse?.data.totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default ClientsPage
