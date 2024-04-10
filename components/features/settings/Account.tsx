import { CustomInput, CustomSelect, GenericButton } from '@/components'
import { type FormErrorMessages } from '@/helpers/error'

import { Divider, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'

const Account = () => {
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)

  return (
    <div className='mt-4'>
      <form>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-3 md:gap-x-4 md:gap-y-1'>
          <CustomInput
            name='name'
            type='text'
            color={errors?.name !== undefined ? 'danger' : 'primary'}
            label='Nombre de Usuario'
            placeholder='Ej. John Doe'
            error={errors?.name?.toString() ?? ''}
          />
          <CustomInput
            name='email'
            type='text'
            readOnly
            disabled
            color={errors?.email !== undefined ? 'danger' : 'primary'}
            label='Correo electrónico'
            placeholder='Ej. admin@mundocamiones.com'
            error={errors?.email?.toString() ?? ''}
          />
          <CustomSelect
            name='role'
            color={errors?.role !== undefined ? 'danger' : 'primary'}
            error={errors?.role?.toString() ?? ''}
            label='Rol'
            isDisabled
          >
            <SelectItem key={1} value={1}>
              {'Admin'}
            </SelectItem>
          </CustomSelect>
        </div>

        <div className='w-full flex justify-start mt-10'>
          <div className='w-1/4'>
            <GenericButton type='submit' label={'Guardar Datos'} />
          </div>
        </div>
      </form>
      <div className='my-3'>
        <Divider />
      </div>
      <h1 className='font-semibold text-blackText'>
        Solicitar cambio de contraseña
      </h1>
      <div className='w-1/4 mt-3'>
        <GenericButton type='button' label={'Solicitar '} />
      </div>
    </div>
  )
}

export default Account
