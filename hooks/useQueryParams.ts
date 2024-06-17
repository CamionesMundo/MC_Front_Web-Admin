import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

const useQueryParams = <T>() => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /* The `useMemo` hook in the provided code snippet is used to memoize the creation of a new
  `URLSearchParams` object based on the `searchParams` value. */
  const urlSearchParams = useMemo(() => {
    return new URLSearchParams(searchParams?.toString())
  }, [searchParams])

  /* The `setQueryParams` function is a callback function that takes an object of type `Partial<T>` as
  its parameter. It iterates over the key-value pairs of the input object using
  `Object.entries(params).forEach(([key, value]) => { ... }`. */
  const setQueryParams = useCallback(
    (params: Partial<T>) => {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          urlSearchParams.delete(key)
        } else {
          urlSearchParams.set(key, String(value))
        }
      })

      const search = urlSearchParams.toString()
      const query = search !== undefined ? `?${search}` : ''
      // replace since we don't want to build a history
      router.replace(`${pathname}${query}`, { scroll: false })
    },
    [pathname, router, urlSearchParams]
  )

  return { queryParams: searchParams, setQueryParams, urlSearchParams }
}

export default useQueryParams
