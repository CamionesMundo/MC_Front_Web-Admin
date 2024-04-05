'use client'
import { GenericButton } from '@/components/buttons'
import { CustomInput } from '@/components/inputs'
import {
  type FormErrorMessages,
  handleValidationFormErrors
} from '@/helpers/error'
import { Logo, Visible } from '@/icons'
import { loginSchema } from '@/lib/validators'
import { useLoginStore, type LoginData } from '@/store/useLoginStore'
import { useRecoveryPasswordStore } from '@/store/useRecoveryPasswordStore'

import { Link } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, type ChangeEvent } from 'react'
import { toast } from 'sonner'

const LoginPage = () => {
  const router = useRouter()
  // Custom hook to manage login state
  const { email, password, setData } = useLoginStore()

  // Custom hook to handle changing email for password recovery
  const { changeCurrentEmail } = useRecoveryPasswordStore()

  // Local States for loading, control password visibility and form errors messages
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  /**
   * Function to toggle password visibility.
   */
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  /**
   * Function executed when submitting the login form.
   * @param e Form event
   */
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Validate the email and password using the login schema
      loginSchema.parse({ email, password })

      // If validation succeeds, reset errors state to null
      setErrors(null)
    } catch (error) {
      // If validation fails, handle the error and set errors state accordingly
      const err = handleValidationFormErrors(error)
      if (err !== undefined) {
        setErrors(err)
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      return
    }
    // Attempt to sign in with provided credentials
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res !== undefined) {
        if (res?.ok && res?.status === 200) {
          router.push('/')
        }

        if (res?.error !== null && res?.status !== 200) {
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
  }

  /**
   * Function to initiate password recovery process.
   */
  const onRecoveryPassword = () => {
    changeCurrentEmail(email)
  }

  /**
   * Function to handle form input change.
   * @param e Input change event
   * @param field Input field
   */
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof LoginData
  ) => {
    const newData: Partial<LoginData> = {}
    newData[field] = e.target.value
    setData(newData as LoginData)
  }
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
            value={email}
            type='text'
            onChange={(e) => {
              handleInputChange(e, 'email')
            }}
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors?.email?.toString() ?? ''}
          />
          <CustomInput
            name='password'
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              handleInputChange(e, 'password')
            }}
            color={errors?.password !== undefined ? 'danger' : 'primary'}
            label='Contraseña'
            placeholder='Ingresa aquí tu contraseña'
            endContent={
              <Visible className='icon-input' onClick={togglePassword} />
            }
            error={errors?.password?.toString() ?? ''}
          />
          <div className='flex justify-between pb-2'>
            <span className='text-sm'>Olvidé mi contraseña</span>
            <Link
              className='text-sm text-blackText hover:cursor-pointer'
              underline='hover'
              href='/recovery-password'
              onClick={onRecoveryPassword}
            >
              Recuperar
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
