'use client'
import Lots from '@/components/features/post-management/lots/Lots'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { useGetAllLots } from '@/hooks/api/useLots'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import { useEffect, useMemo } from 'react'

const LotsPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: lotsResponse,
    isLoading,
    refetch
  } = useGetAllLots({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    status: queryParams.get('status') ?? '',
    startDate: queryParams.get('startDate') ?? undefined,
    endDate: queryParams.get('endDate') ?? undefined
  })

  const lots = useMemo(() => {
    const agents = lotsResponse?.data?.lots.map((lot) => ({
      ...lot,
      id: lot.idlot
    }))
    return agents
  }, [lotsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: lotsResponse?.data?.totalPages ?? 0 }
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

  return (
    <MainContainer>
      <Lots
        lots={lots ?? []}
        isLoading={isLoading}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={lotsResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={lotsResponse?.data?.totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default LotsPage
