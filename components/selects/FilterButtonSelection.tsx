import React from 'react'
import { FilterSelect } from '.'
import { SelectItem, type Selection } from '@nextui-org/react'

export type OptionsFilterProps = {
  key: string
  display: string
}

type FilterButtonSelectionProps = {
  isLoading: boolean
  labelPlacement: 'outside-left' | 'inside' | 'outside' | undefined
  ariaLabel: string
  label: string
  placeholder: string
  options: OptionsFilterProps[]
  selectedKeys?: Selection
  onSelectionChange?: (keys: Selection) => Promise<void>
}

const FilterButtonSelection = ({
  isLoading,
  labelPlacement,
  ariaLabel,
  label,
  placeholder,
  options,
  selectedKeys,
  onSelectionChange
}: FilterButtonSelectionProps) => {
  return (
    <FilterSelect
      labelPlacement={labelPlacement}
      aria-label={ariaLabel}
      label={label}
      placeholder={placeholder}
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      classNames={{
        trigger:
          'bg-slate-300 text-blackText dark:bg-default-200 dark:text-white dark:border dark:border-white/60',
        base: 'items-center text-blackText w-full justify-center md:justify-start',
        label: 'font-semibold text-blackText dark:text-white',
        mainWrapper: 'md:w-60'
      }}
      disabled={isLoading}
    >
      {options.map((item) => (
        <SelectItem key={item.key} value={item.key}>
          {item.display}
        </SelectItem>
      ))}
    </FilterSelect>
  )
}

export default FilterButtonSelection
