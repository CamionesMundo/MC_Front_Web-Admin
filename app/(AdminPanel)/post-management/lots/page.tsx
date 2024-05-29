'use client'
import Lots from '@/components/features/post-management/lots/Lots'
import { MainContainer } from '@/components/ui'
import { useGetAllLots } from '@/hooks/api/useLots'
import { Button, Pagination, type Selection } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

const LotsPage = () => {
  const queryClient = useQueryClient()

  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['default'])
  )

  const [page, setPage] = useState(1)

  const valueStatus = useMemo(() => {
    if (selectedStatus === undefined) return undefined
    const statusArray = Array.from(selectedStatus)
    const value = statusArray[0]
    return value as string
  }, [selectedStatus])

  const values = useMemo(() => {
    if (valueStatus === undefined) {
      return {
        status: 'default',
        page
      }
    }
    return {
      status: valueStatus,
      page
    }
  }, [valueStatus, page])

  const {
    data: lotsResponse,
    isLoading,
    refetch,
    isRefetching
  } = useGetAllLots(values.status, values.page)

  useEffect(() => {
    if (valueStatus === undefined) {
      setPage(1)
    }
  }, [valueStatus])

  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      setSelectedStatus(keys)
      setPage(1)
      await queryClient.invalidateQueries({ queryKey: ['lots'] })
      await refetch()
    },
    [refetch, queryClient]
  )

  const lots = useMemo(() => {
    const agents = lotsResponse?.data?.lots.map((lot) => ({
      ...lot,
      id: lot.idlot
    }))
    return agents
  }, [lotsResponse])

  const pages = useMemo(() => {
    if (lotsResponse !== undefined) {
      return lotsResponse.data?.totalPages
    } else {
      return 0
    }
  }, [lotsResponse])

  const totalRows = useMemo(() => {
    if (lotsResponse !== undefined) {
      return lotsResponse.data?.totalRows
    } else {
      return 0
    }
  }, [lotsResponse])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  useEffect(() => {
    if (page !== 0) {
      refetch()
        .then()
        .catch((error) => {
          console.error(
            'Error al volver a obtener los datos de la subasta:',
            error
          )
        })
    }
  }, [page, refetch])

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
          total={pages}
          isDisabled={isLoading}
          onChange={onChangePage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    )
  }, [isLoading, page, pages, onNextPage, onPreviousPage, onChangePage])

  return (
    <MainContainer>
      <Lots
        lots={lots ?? []}
        isLoading={isLoading || isRefetching}
        selectedStatus={selectedStatus}
        handleSelectionChange={handleSelectionChange}
        bottomContent={bottomContent}
        totalRows={totalRows}
      />
    </MainContainer>
  )
}

export default LotsPage
