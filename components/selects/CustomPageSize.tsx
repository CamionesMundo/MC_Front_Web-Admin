import useQueryParams from '@/hooks/useQueryParams'
import React, { useCallback, useState } from 'react'

type CustomPageSizeProps = {
  options?: string[]
  label?: string
}

const DEFAULT_OPTIONS = ['5', '10', '15']
const DEFAULT_LABEL = ' Filas por página:'

const CustomPageSize = ({
  options = DEFAULT_OPTIONS,
  label = DEFAULT_LABEL
}: CustomPageSizeProps) => {
  const { queryParams: search, setQueryParams } = useQueryParams()
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    Number(search.get('pageSize'))
  )
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value)
      setQueryParams({ pageSize: value })
      setRowsPerPage(value)
    },
    [setQueryParams]
  )
  return (
    <>
      <label className='flex items-center text-default-400 text-small'>
        {label}
        <select
          className='bg-transparent outline-none text-default-400 text-small'
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
        >
          {options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}

export default CustomPageSize
