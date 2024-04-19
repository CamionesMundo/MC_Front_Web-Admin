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
      input: `text-blackText placeholder:text-blackText/50 ${
        props.disabled === true ? 'cursor-not-allowed text-blackText/50' : ''
      }`,
      label: `font-semibold ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200'
          : ''
      }`,
      inputWrapper: `border ${
        error !== '' ? 'border-danger' : 'border-[#e0e0e0]'
      }  ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200'
          : ''
      }`,
      innerWrapper: ` ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200'
          : ''
      }`,
      mainWrapper: ` ${
        props.disabled === true
          ? 'cursor-not-allowed bg-gray-200 hover:bg-gray-200'
          : ''
      }`
    }
  })
  return (
    <div className={`${error !== '' ? 'mt-8' : 'mt-4'} mb-4 flex flex-col justify-center`}
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
