import { GenericButton } from '@/components'
import { Plus } from '@/icons'
import { type AddressResponse } from '@/types/api/response/address'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useState } from 'react'
import AddressItem from './AddressItem'
import { AddressType } from '@/types/enums'
import dynamic from 'next/dynamic'

const DynamicNewAddressForm = dynamic(
  async () => await import('./NewAddressForm')
)

type BillingAddressProps = {
  addresses: AddressResponse | null
  idUser: number
}

const BillingAddress = ({ addresses, idUser }: BillingAddressProps) => {
  const existAddresses = addresses !== null
  const [showForm, setShowForm] = useState<boolean>(false)

  const handleShowForm = (value: boolean) => {
    setShowForm(value)
  }

  const onCancel = () => {
    setShowForm(false)
  }
  return (
    <div className='my-4'>
      <div className='flex flex-row justify-between gap-2'>
        <span className='text-blackText dark:text-white font-semibold'>
          Dirección de Facturación
        </span>
        <div>
          <GenericButton
            type='button'
            label={'Nueva'}
            onClick={() => {
              handleShowForm(true)
            }}
            startContent={<Plus className='w-3.5 h-3.5' />}
          />
        </div>
      </div>

      <Spacer />
      <Divider />
      <div className='flex flex-col gap-2 py-2'>
        {showForm && (
          <>
            <DynamicNewAddressForm
              addressType={AddressType.Billing}
              onCancel={onCancel}
              idUser={idUser}
            />
          </>
        )}
        {existAddresses && addresses.billingAddress.length > 0
          ? (
              addresses.billingAddress.map((address) => {
                const { country, ...rest } = address.city
                return (
              <AddressItem key={address.idaddress} item={address} city={rest} />
                )
              })
            )
          : (
          <span className='text-black/70 text-sm dark:text-white'>
            No existen registros
          </span>
            )}
      </div>
    </div>
  )
}

export default BillingAddress
