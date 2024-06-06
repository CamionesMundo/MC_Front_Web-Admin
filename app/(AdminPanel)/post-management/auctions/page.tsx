'use client'
import Auctions from '@/components/features/post-management/auctions/Auctions'
import CustomPagination from '@/components/table/pagination/CustomPagination'
import { MainContainer } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useGetAllAuctionsPublications } from '@/hooks/api/usePublications'
import useAsyncPagination from '@/hooks/pagination/useAsyncPagination'
import useQueryParams from '@/hooks/useQueryParams'
import React, { Suspense, useEffect, useMemo } from 'react'

const AuctionsPage = () => {
  const { queryParams } = useQueryParams()

  const {
    data: auctionsResponse,
    isLoading,
    refetch
  } = useGetAllAuctionsPublications({
    page: Number(queryParams.get('page')),
    pageSize: Number(queryParams.get('pageSize')),
    query: queryParams.get('query') ?? '',
    typeStatus: Number(queryParams.get('typeStatus')),
    typeAuction: Number(queryParams.get('typeAuction')),
    startDate: queryParams.get('startDate') ?? undefined,
    endDate: queryParams.get('endDate') ?? undefined
  })

  const auctions = useMemo(() => {
    const auctions = auctionsResponse?.data?.publications.map((auction) => ({
      ...auction,
      id: auction.idpublication
    }))
    return auctions
  }, [auctionsResponse])

  const { page, onNextPage, onPreviousPage, onChangePage } = useAsyncPagination(
    { totalPages: auctionsResponse?.data?.totalPages ?? 0 }
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
      <Auctions
        auctions={auctions ?? []}
        isLoading={isLoading}
        bottomContent={
          <CustomPagination
            page={page}
            totalPages={auctionsResponse?.data?.totalPages ?? 0}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        }
        totalRows={auctionsResponse?.data?.totalRows ?? 0}
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
      <AuctionsPage />
    </Suspense>
  )
}

export default AuctionsPageWrapper
