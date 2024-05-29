import { useCallback, useState } from 'react'

type Props = {
  totalPages: number
}

const useAsyncPagination = ({ totalPages }: Props) => {
  const [page, setPage] = useState(1)

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }, [page, totalPages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  return {
    page,
    setPage,
    onNextPage,
    onPreviousPage,
    onChangePage
  }
}

export default useAsyncPagination
