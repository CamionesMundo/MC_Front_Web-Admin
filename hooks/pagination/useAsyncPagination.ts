import { useCallback, useEffect, useState } from 'react'
import useQueryParams from '../useQueryParams'

type Props = {
  totalPages: number
}

const useAsyncPagination = ({ totalPages }: Props) => {
  const { setQueryParams, queryParams } = useQueryParams()
  const [page, setPage] = useState(Number(queryParams.get('page')))

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
      setQueryParams({ page: page + 1 })
    }
  }, [page, totalPages, setQueryParams])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
      setQueryParams({ page: page - 1 })
    }
  }, [page, setQueryParams])

  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
      setQueryParams({ page })
    },
    [setQueryParams]
  )

  useEffect(() => {
    if (queryParams !== undefined) {
      setPage(Number(queryParams.get('page')))
    }
  }, [queryParams])

  return {
    page,
    setPage,
    onNextPage,
    onPreviousPage,
    onChangePage
  }
}

export default useAsyncPagination
