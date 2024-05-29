'use client'
import Payments from '@/components/features/payments-management/payments/Payments'
import { MainContainer } from '@/components/ui'
import { useGetAllPayments } from '@/hooks/api/usePayments'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import { Button, Pagination } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'

const PaymentsPage = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const {
    data: paymentsResponse,
    isLoading,
    isRefetching,
    refetch
  } = useGetAllPayments({
    page: currentPage
  })
  const payments = useMemo(() => {
    const payments = paymentsResponse?.data?.payments.map((payment) => ({
      ...payment,
      id: payment.idpayment_order
    }))
    return payments
  }, [paymentsResponse])
  const totalPages = useMemo(() => {
    if (paymentsResponse !== undefined) {
      return paymentsResponse.data.totalPages
    }
    return undefined
  }, [paymentsResponse])

  const totalRows = useMemo(() => {
    if (paymentsResponse !== undefined) {
      return paymentsResponse.data.totalRows
    }
    return undefined
  }, [paymentsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: totalPages ?? 0 }
  )
  useEffect(() => {
    if (totalPages !== undefined) {
      setCurrentPage(page)
      refetch()
        .then(async () => {
          await queryClient.invalidateQueries({ queryKey: ['payment-orders'] })
        })
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos de la subasta:',
            error
          )
        })
    }
  }, [page, totalPages, refetch, queryClient])

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-end items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          classNames={{
            cursor: 'bg-blackText '
          }}
          page={page}
          total={totalPages ?? 0}
          isDisabled={isLoading}
          onChange={onChangePage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={totalPages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={totalPages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    )
  }, [isLoading, page, totalPages, onNextPage, onPreviousPage, onChangePage])

  return (
    <MainContainer>
      <Payments
        payments={payments ?? []}
        isLoading={isLoading || isRefetching}
        bottomContent={bottomContent}
        totalRows={totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default PaymentsPage
