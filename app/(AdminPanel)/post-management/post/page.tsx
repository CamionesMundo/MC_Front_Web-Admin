'use client'
import Products from '@/components/features/post-management/products/Products'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { useGetAllGeneralPublications } from '@/hooks/api/usePublications'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import React, { useEffect, useMemo } from 'react'

const ProductsPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: publicationsResponse,
    isLoading,
    refetch
  } = useGetAllGeneralPublications({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    startDate: queryParams.get('startDate') ?? undefined,
    endDate: queryParams.get('endDate') ?? undefined
  })

  const publications = useMemo(() => {
    const publications = publicationsResponse?.data?.publications.map(
      (publication) => ({
        ...publication,
        id: publication.idpublication
      })
    )
    return publications
  }, [publicationsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: publicationsResponse?.data?.totalPages ?? 0 }
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
      <Products
        products={publications ?? []}
        isLoading={isLoading}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={publicationsResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={publicationsResponse?.data.totalRows ?? 0}
      />
    </MainContainer>
  )
}

export default ProductsPage
