'use client'
import Products from '@/components/features/post-management/products/Products'
import { MainContainer } from '@/components/ui'
import { useGetAllGeneralPublications } from '@/hooks/api/usePublications'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import { Button, Pagination } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'

const ProductsPage = () => {
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {
    data: publicationsResponse,
    isLoading,
    isRefetching,
    refetch
  } = useGetAllGeneralPublications({
    page: currentPage
  })

  const publications = useMemo(() => {
    const publications = publicationsResponse?.data?.publications.map((publication) => ({
      ...publication,
      id: publication.idpublication
    }))
    return publications
  }, [publicationsResponse])

  const totalPages = useMemo(() => {
    if (publicationsResponse !== undefined) {
      return publicationsResponse.data.totalPages
    }
    return undefined
  }, [publicationsResponse])

  const totalRows = useMemo(() => {
    if (publicationsResponse !== undefined) {
      return publicationsResponse.data.totalRows
    }
    return undefined
  }, [publicationsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: totalPages ?? 0 }
  )

  useEffect(() => {
    if (totalPages !== undefined) {
      setCurrentPage(page)
      refetch()
        .then()
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
      <Products
        products={publications ?? []}
        isLoading={isLoading || isRefetching}
        bottomContent={bottomContent}
        totalRows={totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default ProductsPage
