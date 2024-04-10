import { Input, useInput, type InputProps } from '@nextui-org/react'

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
      inputWrapper: `border border-[#e0e0e0]  ${
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
    <div className='input-class'>
      <Input
        variant='faded'
        color='primary'
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
