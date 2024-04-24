import { Textarea, type TextAreaProps } from '@nextui-org/react'
import React from 'react'

type CustomTextareaProps = {
  name: string
  error?: string
} & TextAreaProps

const CustomTextarea = ({ name, error, ...props }: CustomTextareaProps) => {
  return (
    <div
      className={`${
        error !== '' ? 'mt-8' : 'mt-4'
      } mb-4 flex flex-col justify-center flex-1`}
    >
      <Textarea
        variant='faded'
        color={error !== '' ? 'danger' : 'primary'}
        {...props}
        role='presentation'
        autoComplete='nope'
        classNames={{
          label: `font-semibold ${
            props.disabled === true
              ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-black-600'
              : 'dark:text-white'
          }`,
          inputWrapper: `border ${
            error !== ''
              ? 'border-danger'
              : 'border-[#e0e0e0] dark:hover:border-white data-[hover=true]:cursor-not-allowed'
          }  ${
            props.disabled === true
              ? '!cursor-not-allowed bg-gray-200 hover:bg-gray-200 dark:bg-gray-700'
              : ''
          }`,
          input: `text-blackText placeholder:text-blackText/50 dark:placeholder:text-white/60 ${
            props.disabled === true
              ? 'cursor-not-allowed text-blackText/50 dark:text-black/70'
              : 'dark:text-white'
          }`
        }}
        errorMessage={error !== '' && `(*) Error: ${error}`}
      />
    </div>
  )
}

export default CustomTextarea
