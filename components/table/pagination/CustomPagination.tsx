import { Button, Pagination } from '@nextui-org/react'
import React from 'react'

type CustomPaginationProps = {
  page: number
  totalPages: number
  isLoading: boolean
  onChangePage: (page: number) => void
  onPreviousPage: () => void
  onNextPage: () => void
}

const CustomPagination = ({
  page,
  totalPages,
  isLoading,
  onChangePage,
  onPreviousPage,
  onNextPage
}: CustomPaginationProps) => {
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
        total={totalPages}
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
}

export default CustomPagination
