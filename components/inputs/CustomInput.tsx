import { Input, useInput, type InputProps } from '@nextui-org/react'

/**
 * The `CustomInput` component extends the functionality of the NextUI `Input` component
 * by adding custom styling and error handling. It provides a flexible input field
 * that can be used throughout the application with additional configurations.
 *
 * Props:
 * @param {string} name - The name attribute of the input field.
 * @param {string} [error] - Optional error message to be displayed below the input field.
 * @param {...InputProps} props - Additional props supported by the NextUI `Input` component.
 *
 * The `CustomInput` component utilizes the `useInput` hook provided by NextUI
 * to manage input state and generate classNames for custom styling based on props.
 * It dynamically adjusts CSS classes based on props such as `error` and `disabled`.
 * The input's color and variant are determined based on the presence of an error message.
 * By default, the component disables browser autofill to prevent unwanted suggestions.
 */
type CustomInputProps = {
  name: string
  error?: string
} & InputProps

const CustomInput = ({ name, error, ...props }: CustomInputProps) => {
  const { classNames } = useInput({
    ...props,
    classNames: {
      input: `text-blackText placeholder:text-blackText/50 dark:placeholder:text-white/60 ${
        props.disabled === true
          ? 'cursor-not-allowed text-blackText/50 dark:text-black/70'
          : 'dark:text-white'
      }`,
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
      innerWrapper: ` ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200 dark:bg-gray-700'
          : ''
      }`,
      mainWrapper: ` ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200 dark:bg-gray-700'
          : ''
      }`,
      base: ` ${props.disabled === true ? 'cursor-not-allowed data-[hover=true]:cursor-not-allowed' : ''}`,
      helperWrapper: ` ${props.disabled === true ? 'cursor-not-allowed' : ''}`
    }
  })
  return (
    <div
      className={`${
        error !== '' ? 'mt-8' : 'mt-4'
      } mb-4 flex flex-col justify-center`}
    >
      <Input
        variant='faded'
        color={error !== '' ? 'danger' : 'primary'}
        {...props}
        classNames={{ ...classNames }}
        role='presentation'
        autoComplete='nope'
      />
      {error !== '' && (
        <span className='text-danger text-xs italic'>{`(*) Error: ${error}`}</span>
      )}
    </div>
  )
}

export { CustomInput }
