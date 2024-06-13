'use client'
import Orders from '@/components/features/shipments-management/orders/Orders'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useGetAllOrders } from '@/hooks/api/useOrders'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import { Suspense, useEffect, useMemo } from 'react'

const OrdersPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: ordersResponse,
    isLoading,
    refetch
  } = useGetAllOrders({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    idOrderStatus: Number(queryParams.get('idOrderStatus')),
    startDate: queryParams.get('startDate') ?? undefined,
    endDate: queryParams.get('endDate') ?? undefined
  })

  const orders = useMemo(() => {
    const orders = ordersResponse?.data?.orders.map((order) => ({
      ...order,
      id: order.idorder
    }))
    return orders
  }, [ordersResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: ordersResponse?.data?.totalPages ?? 0 }
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
      <Orders
        orders={orders ?? []}
        isLoading={isLoading}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={ordersResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={ordersResponse?.data?.totalRows ?? 0}
      />
    </MainContainer>
  )
}

const AuctionsPageWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      }
    >
      <OrdersPage />
    </Suspense>
  )
}

export default AuctionsPageWrapper
