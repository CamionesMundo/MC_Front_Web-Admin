'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { showToast } from '@/hooks/useToast'
import { Logo } from '@/icons'
import { emailSchema } from '@/lib/validators/emailValidator'
import { useRecoveryPasswordStore } from '@/store/useRecoveryPasswordStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoveryPassword } from '@/hooks/api/useAccount'
import { type GenericResponse } from '@/types/api'

const RecoveryPasswordPage = () => {
  const { mutateAsync: sendEmail, isPending } = useRecoveryPassword()
  const { currentEmail, reset } = useRecoveryPasswordStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(emailSchema)
  })

  const router = useRouter()

  useEffect(() => {
    if (currentEmail !== undefined && currentEmail !== '') {
      setValue('email', currentEmail)
    }
  }, [currentEmail])

  const onSubmit = handleSubmit(async (data) => {
    const { email } = data

    try {
      await sendEmail(
        { email },
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
              isLoading={isPending}
              disabled={isPending}
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
