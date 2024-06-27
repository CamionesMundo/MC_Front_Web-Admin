import { Select, type SelectProps } from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type FilterSelectProps = {
  children?: ReactNode
} & SelectProps

const FilterSelect = ({ children, ...props }: FilterSelectProps) => {
  return (
    <Select
      labelPlacement={'outside-left'}
      classNames={{
        trigger:
          'bg-slate-300 dark:bg-default-200 text-blackText dark:text-white',
        base: 'items-center text-blackText'
      }}
      {...props}
    >
      {children}
    </Select>
  )
}

export { FilterSelect }