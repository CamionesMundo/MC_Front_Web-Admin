import useQueryParams from '@/hooks/useQueryParams'
import { Search } from '@/icons'
import { Input } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'

/**
 * The `SearchBar` component provides a user interface for searching with an input field.
 *
 * Props:
 * @param {string} [searchBarPlaceholder='Buscar por'] - Optional placeholder text for the search input.
 * @param {string} [styles='w-full sm:max-w-[44%]'] - Optional custom styles for the search input.
 *
 * Behavior:
 * - Initializes the search input value from query parameters if available.
 * - Allows users to input search terms, updating query parameters accordingly.
 * - Supports clearing the search input, resetting the query parameter.
 * - Adjusts the display of the search input with custom styles and placeholder.
 */

type SearchingProps = {
  searchBarPlaceholder?: string
  styles?: string
}

const SearchBar = ({
  searchBarPlaceholder = 'Buscar por',
  styles = 'w-full sm:max-w-[44%]'
}: SearchingProps) => {
  const { queryParams: search, setQueryParams } = useQueryParams()
  const [searchValue, setSearchValue] = useState(search.get('query') ?? '')

  const handleSearch = useCallback(
    (term: string) => {
      setQueryParams({ page: 1, query: term, pageSize: 10 })
      setSearchValue(term)
    },
    [setQueryParams]
  )

  useEffect(() => {
    if (search.get('query') === null) {
      setSearchValue('')
    }
  }, [search])

  return (
    <>
      <Input
        isClearable
        className={styles}
        placeholder={searchBarPlaceholder}
        startContent={<Search className='w-3 h-3 dark:text-white' />}
        value={searchValue}
        classNames={{
          clearButton: 'dark:text-white ',
          inputWrapper: 'dark:border dark:border-white/60'
        }}
        onClear={() => {
          handleSearch('')
        }}
        onValueChange={handleSearch}
      />
    </>
  )
}

export default SearchBar
