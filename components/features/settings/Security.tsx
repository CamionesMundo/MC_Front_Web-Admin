'use client'
import { CustomInput, GenericButton } from '@/components'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'
import { Visible } from '@/icons'
import { passwordSchema } from '@/lib/validators/passwordValidators'
import {
  type UpdatePasswordData,
  useUpdatePasswordStore
} from '@/store/useUpdatePasswordStore'
import React, { type ChangeEvent, useState } from 'react'

const Security = () => {
  const {
    password,
    confirmPassword,
    setData,
    togglePassword,
    toggleConfirmPassword,
    showPassword,
    showConfirmPassword
  } = useUpdatePasswordStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof UpdatePasswordData
  ) => {
    const newData: Partial<UpdatePasswordData> = {}
    newData[field] = e.target.value

    try {
      // Validate the input field value using the password schema
      passwordSchema.parse({ ...newData, [field]: e.target.value })

      // If validation succeeds, update the errors state accordingly
      setErrors((prevErrors) => {
        if (prevErrors !== null && field in prevErrors) {
          // Remove the field from the errors object if it exists
          const { [field]: _, ...restErrors } = prevErrors
          return restErrors
        } else {
          return prevErrors
        }
      })
    } catch (error) {
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: err[field]
        }))
      }
    }

    setData(newData as UpdatePasswordData)
  }
  return (
    <div className='mt-4'>
      <form>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='password'
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              handleInputChange(e, 'password')
            }}
            color={errors?.password !== undefined ? 'danger' : 'primary'}
            label='Nueva    Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={togglePassword} />
            }
            error={errors?.password?.toString() ?? ''}
          />
          <CustomInput
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => {
              handleInputChange(e, 'confirmPassword')
            }}
            type={showConfirmPassword ? 'text' : 'password'}
            color={errors?.password !== undefined ? 'danger' : 'primary'}
            label='Repetir Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={toggleConfirmPassword} />
            }
            error={errors?.confirmPassword?.toString() ?? ''}
          />
          <div className='w-full flex justify-start mt-10'>
            <div className='w-1/2'>
              <GenericButton type='submit' label={'Cambiar contraseña'} />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Security
