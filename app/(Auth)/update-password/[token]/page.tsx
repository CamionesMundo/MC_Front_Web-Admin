'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import { Logo, Visible } from '@/icons'
import { passwordSchema } from '@/lib/validators/passwordValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const UpdatePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(passwordSchema)
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    console.log(data)

    setIsLoading(false)
  })
  return (
    <div className='max-w-lg w-full bg-white rounded-2xl mx-auto mt-7 '>
      <div className='p-4 flex flex-col w-full'>
        <div className='w-full flex justify-center'>
          <Logo className='w-14 h-14 text-blackText' />
        </div>
        <h1 className='text-center text-lg text-blackText'>
          Actualizar contraseña
        </h1>

        <form onSubmit={onSubmit}>
          <CustomInput
            name='password'
            register={register}
            type={showPassword ? 'text' : 'password'}
            color={errors.password !== undefined ? 'danger' : 'primary'}
            label='Nueva    Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={togglePassword} />
            }
            error={errors.password?.message?.toString() ?? ''}
          />
          <CustomInput
            name='confirmPassword'
            register={register}
            type={showConfirmPassword ? 'text' : 'password'}
            color={errors.password !== undefined ? 'danger' : 'primary'}
            label='Repetir Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={toggleConfirmPassword} />
            }
            error={errors.confirmPassword?.message?.toString() ?? ''}
          />
          <div className='mt-3'>
            <GenericButton
              type='submit'
              label='Actualizar contraseña'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdatePasswordPage
