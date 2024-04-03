'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { Logo } from '@/icons'
import { emailSchema } from '@/lib/validators/emailValidator'
import { useRecoveryPasswordStore } from '@/store/useRecoveryPasswordStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const RecoveryPasswordPage = () => {
  const { currentEmail, reset } = useRecoveryPasswordStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(emailSchema)
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentEmail !== undefined) {
      setValue('email', currentEmail)
    }
  }, [currentEmail])

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    console.log(currentEmail)

    setIsLoading(false)
  })

  return (
    <div className='max-w-lg w-full bg-white rounded-2xl mx-auto mt-7 '>
      <div className='p-4 flex flex-col w-full'>
        <div className='w-full flex justify-center'>
          <Logo className='w-14 h-14 text-blackText' />
        </div>
        <h1 className='text-center text-lg text-blackText'>
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
            register={register}
            type='text'
            color={errors.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors.email?.message?.toString() ?? ''}
          />
          <div className='mt-3'>
            <GenericButton
              type='submit'
              label='Enviar'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
          <div className='flex justify-end pb-2 mt-3'>
            <Link
              className='text-sm text-blackText hover:cursor-pointer'
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
