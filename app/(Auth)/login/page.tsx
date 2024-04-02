'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { Logo, Visible } from '@/icons'
import { loginSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
      if (res !== undefined) {
        if (res?.ok && res?.status === 200) {
          router.push('/')
        }

        if (res?.error !== null && res?.status === 200) {
          toast.error(res.error, {
            duration: 3000,
            className: '!bg-red-200',
            closeButton: true
          })
        }
      }
    } catch (error) {
      console.error('Hubo un error:', error)
    }

    setIsLoading(false)
  })

  return (
    <div className='max-w-lg w-full bg-white rounded-2xl mx-auto mt-7 '>
      <div className='p-4 flex flex-col w-full'>
        <div className='w-full flex justify-center'>
          <Logo className='w-14 h-14 text-blackText' />
        </div>
        <h1 className='text-center text-lg text-blackText'>
          Iniciar Sesión en el Administrador
        </h1>
        <form className='my-4' onSubmit={onSubmit}>
          <CustomInput
            name='email'
            register={register}
            type='text'
            color={errors.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors.email?.message?.toString() ?? ''}
          />
          <CustomInput
            name='password'
            register={register}
            type={showPassword ? 'text' : 'password'}
            color={errors.password !== undefined ? 'danger' : 'primary'}
            label='Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={togglePassword} />
            }
            error={errors.password?.message?.toString() ?? ''}
          />
          <div className='flex justify-between pb-2'>
            <Link
              className='text-sm text-blackText hover:cursor-pointer'
              underline='hover'
            >
              Olvidé mi contraseña
            </Link>
          </div>
          <div className='mt-3'>
            <GenericButton
              type='submit'
              label='Ingresar'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
