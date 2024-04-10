import React, { type ReactNode } from 'react'
import { Radio, type RadioProps, cn } from '@nextui-org/react'

type CustomRadioProps = {
  children: ReactNode
} & RadioProps

export const CustomRadio = ({ children, ...otherProps }: CustomRadioProps) => {
  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
          'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
          'data-[selected=true]:border-primary'
        )
      }}
    >
      {children}
    </Radio>
  )
}
