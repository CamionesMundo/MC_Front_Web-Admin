import { useCallback, useEffect, useState } from 'react'
import useQueryParams from '../useQueryParams'

type Props = {
  totalPages: number
}

const useAsyncPagination = ({ totalPages }: Props) => {
  const { setQueryParams, queryParams } = useQueryParams()
  const [page, setPage] = useState(Number(queryParams.get('page')))

  /* The `onNextPage` function defined using `useCallback` is responsible for handling the logic to
  navigate to the next page in a paginated list. Here's a breakdown of what it does: */
  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
      setQueryParams({ page: page + 1 })
    }
  }, [page, totalPages, setQueryParams])

  /* The `onPreviousPage` function defined using `useCallback` is responsible for handling the logic to
  navigate to the previous page in a paginated list. Here's a breakdown of what it does: */
  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
      setQueryParams({ page: page - 1 })
    }
  }, [page, setQueryParams])

  /* The `onChangePage` function defined using `useCallback` is responsible for updating the current
  page to a specified page number in a paginated list. Here's a breakdown of what it does: */
  const onChangePage = useCallback(
    (page: number) => {
      setPage(page)
      setQueryParams({ page })
    },
    [setQueryParams]
  )

  /* The `useEffect` hook you provided is responsible for updating the `page` state based on the value
  of the `page` query parameter in the URL. Here's a breakdown of what it does: */
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
