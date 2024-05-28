'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { showToast } from '@/hooks/useToast'
import { Logo } from '@/icons'
import { emailSchema } from '@/lib/validators/emailValidator'
import { useRecoveryPasswordStore } from '@/store/useRecoveryPasswordStore'
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { type ChangeEvent, useState, type FormEvent } from 'react'

import { useRecoveryPassword } from '@/hooks/api/useAccount'
import { type GenericResponse } from '@/types/api'
import {
  handleValidationFormErrors,
  type FormErrorMessages
} from '@/helpers/error'

const RecoveryPasswordPage = () => {
  const router = useRouter()

  // Custom hook to send email for password recovery
  const { mutateAsync: sendEmail, isPending } = useRecoveryPassword()

  // Custom hook to manage email and related operations for password recovery
  const { currentEmail, reset, changeCurrentEmail } = useRecoveryPasswordStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  /**
   * Function to handle email input change.
   * @param e Input change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value
    changeCurrentEmail(email)
  }

  /**
   * Function executed when submitting the email form.
   * @param e Form event
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Validate the email using the email schema
      emailSchema.parse({ email: currentEmail })

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
    // Attempt to send the email for init the recovery password process
    try {
      await sendEmail(
        { email: currentEmail },
        {
          onSuccess: (data: GenericResponse<boolean>) => {
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

  return (
    <div className='max-w-lg w-full bg-white dark:bg-darkBg rounded-2xl mx-auto mt-7 '>
      <div className='p-4 flex flex-col w-full'>
        <div className='w-full flex justify-center'>
          <Logo className='w-14 h-14 text-blackText dark:text-white' />
        </div>
        <h1 className='text-center text-lg text-blackText dark:text-white'>
          Recuperar contraseña
        </h1>
        <div className='my-2'>
          <p className='text-xs'>
            Ingresa una dirección de correo electrónico para que podamos
            ponernos en contacto contigo. Te enviaremos un correo con las
            instrucciones para recuperar tu contraseña.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <CustomInput
            name='email'
            value={currentEmail}
            onChange={handleChange}
            type='text'
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors?.email?.toString() ?? ''}
          />
          <div className='mt-3'>
            <GenericButton
              type='submit'
              label='Enviar'
              isLoading={isPending}
              disabled={isPending}
            />
          </div>
          <div className='flex justify-end pb-2 mt-3'>
            <Link
              className='text-sm text-blackText dark:text-white hover:cursor-pointer'
              underline='hover'
              href='/login'
              onClick={() => {
                reset()
              }}
            >
              {'< Regresar'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecoveryPasswordPage
