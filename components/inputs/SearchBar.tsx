import useQueryParams from '@/hooks/useQueryParams'
import { Search } from '@/icons'
import { Input } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'

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
