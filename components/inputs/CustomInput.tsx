import { Input, type InputProps } from '@nextui-org/react'
import { type FieldValues, type RegisterOptions, type UseFormRegister } from 'react-hook-form'

type CustomInputProps = {
  register: UseFormRegister<FieldValues>
  name: string
  validationSchema?: RegisterOptions<FieldValues, string>
  error?: string
} & InputProps

const CustomInput = ({
  register,
  name,
  validationSchema,
  error,
  ...props
}: CustomInputProps) => {
  return (
    <div className='input-class'>
      <Input
        variant='flat'
        color='primary'
        {...register(name, validationSchema)}
        {...props}
        classNames={{
          input: 'text-blackText placeholder:text-blackText/50',
          label: 'font-semibold',
          inputWrapper: 'border border-[#e0e0e0]'
        }}
      />
      {error !== '' && (
        <span className='text-danger text-xs italic'>{`(*) Error: ${error}`}</span>
      )}
    </div>
  )
}

export { CustomInput }
