'use client'
import Payments from '@/components/features/payments-management/payments/Payments'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { useGetAllPayments } from '@/hooks/api/usePayments'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import { useEffect, useMemo } from 'react'

const PaymentsPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: paymentsResponse,
    isLoading,
    isRefetching,
    refetch
  } = useGetAllPayments({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    startDate: queryParams.get('startDate') ?? undefined,
    endDate: queryParams.get('endDate') ?? undefined
  })

  const payments = useMemo(() => {
    const payments = paymentsResponse?.data?.payments.map((payment) => ({
      ...payment,
      id: payment.idpayment_order
    }))
    return payments
  }, [paymentsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: paymentsResponse?.data?.totalPages ?? 0 }
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
      <Payments
        payments={payments ?? []}
        isLoading={isLoading || isRefetching}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={paymentsResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={paymentsResponse?.data?.totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default PaymentsPage
