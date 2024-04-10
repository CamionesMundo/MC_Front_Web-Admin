import React, { type ReactNode } from 'react'
import { Select, type SelectProps } from '@nextui-org/react'

type CustomSelectProps = {
  name: string
  children?: ReactNode
  error?: string
  useMarginTop?: boolean
} & SelectProps

const CustomSelect = ({
  name,
  error,
  items,
  children,
  useMarginTop = true,
  ...props
}: CustomSelectProps) => {
  return (
    <div>
      <Select
        placeholder='Seleccione'
        className='w-full'
        variant='faded'
        color='primary'
        size='md'
        classNames={{
          label: 'text-blackText placeholder:text-blackText/50 font-semibold',
          trigger: 'h-[54px] border rounded-lg',
          listboxWrapper: 'max-h-[400px] rounded-lg border',
          mainWrapper: [
            'border border-[#E2E2E2] rounded-lg',
            '!cursor-text',
            'hover:bg-default',
            'hover:border-none',
            'focus-within:!bg-default-200/50',
            `${useMarginTop ? 'mt-4' : ''}`
          ]
        }}
        listboxProps={{
          itemClasses: {
            base: [
              'rounded-md',
              'text-default-500',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500'
            ]
          }
        }}
        popoverProps={{
          classNames: {
            base: 'before:bg-default-200',
            content: 'p-0 border-small border-divider bg-background'
          }
        }}
        {...props}
      >
        {children}
      </Select>
      {error !== '' && error !== undefined && (
        <span className='text-danger text-xs italic'>{`(*) Error: ${error}`}</span>
      )}
    </div>
  )
}

export { CustomSelect }
