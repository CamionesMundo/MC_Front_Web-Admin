import { Button, Pagination } from '@nextui-org/react'

/**
 * The `CustomPagination` component provides a user interface for pagination controls, including page selection and navigation buttons.
 *
 * Props:
 * @param {number} page - The current page number.
 * @param {number} totalPages - The total number of pages available.
 * @param {boolean} isLoading - Boolean indicating whether data is currently being loaded.
 * @param {(page: number) => void} onChangePage - Callback function invoked when the page number is changed.
 * @param {() => void} onPreviousPage - Callback function invoked when the "Previous" button is pressed.
 * @param {() => void} onNextPage - Callback function invoked when the "Next" button is pressed.
 *
 * Behavior:
 * - Displays pagination controls including page numbers and navigation buttons.
 * - Allows users to navigate between pages.
 * - Disables controls while data is loading or if there is only one page.
 */

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
