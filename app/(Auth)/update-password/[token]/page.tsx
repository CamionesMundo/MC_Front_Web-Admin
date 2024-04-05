'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { Logo, Visible } from '@/icons'
import { passwordSchema } from '@/lib/validators/passwordValidators'
import React, { type ChangeEvent, type FormEvent, useState } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { useUpdatePassword } from '@/hooks/api/useAccount'
import { type GenericResponse } from '@/types/api'
import { showToast } from '@/hooks/useToast'
import { type UserResponse } from '@/types/api/response/auth'
import {
  type UpdatePasswordData,
  useUpdatePasswordStore
} from '@/store/useUpdatePasswordStore'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'

type TypeParams = {
  token: string
}
const UpdatePasswordPage = () => {
  const router = useRouter()

  // Get parameters from the URL
  const params = useParams<TypeParams>()
  const token = params.token

  // Custom hook to handle password update
  const { mutateAsync: sendNewPassword, isPending } = useUpdatePassword()

  // Custom hook to handle state of password update data
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

  // Function to handle form submission
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // Validate the password and confirm password using the password schema
      passwordSchema.parse({ password, confirmPassword })

      // If validation succeeds, reset errors state to null
      setErrors(null)
    } catch (error) {
      // If validation fails, handle the error and set errors state accordingly
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors(err)
        return
      }
      return
    }
    try {
      // Send new password to the server
      await sendNewPassword(
        { password, token },
        {
          onSuccess: (data: GenericResponse<UserResponse>) => {
            showToast(data.message, 'success')
            router.push('/')
          },
          onError: (data) => {
            showToast(data.message, 'error')
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Handles change events on input fields for password update.
   * Performs validation on the input value and updates the state accordingly.
   * @param e The event triggered when the input field value changes.
   * @param field The field being updated in the password data.
   */
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

  /**
   * Handles blur events on input fields for password update.
   * Performs validation on the input value and updates the state accordingly.
   * @param e The event triggered when the input field loses focus.
   * @param field The field being updated in the password data.
   */

  return (
    <div className='max-w-lg w-full bg-white rounded-2xl mx-auto mt-7 '>
      <div className='p-4 flex flex-col w-full'>
        <div className='w-full flex justify-center'>
          <Logo className='w-14 h-14 text-blackText' />
        </div>
        <h1 className='text-center text-lg text-blackText'>
          Actualizar contraseña
        </h1>
        <div className='my-2'>
          <p className='text-xs'>
            Recuerda que la nueva contraseña debe incluir al menos una letra en
            mayúscula, al menos una letra en minúscula, al menos un número y
            como mínimo 8 caracteres{' '}
          </p>
        </div>
        <form onSubmit={onSubmit}>
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
          <div className='mt-3'>
            <GenericButton
              type='submit'
              label='Actualizar contraseña'
              isLoading={isPending}
              disabled={isPending}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePasswordPage
