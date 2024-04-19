import { GenericButton } from '@/components'
import { Plus } from '@/icons'
import { type AddressResponse } from '@/types/api/response/address'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useState } from 'react'
import AddressItem from './AddressItem'
import NewAddressForm from './NewAddressForm'
import { AddressType } from '@/types/enums'

type DeliveryAddressProps = {
  addresses: AddressResponse | null
  idUser: number
}

const DeliveryAddress = ({ addresses, idUser }: DeliveryAddressProps) => {
  const existAddresses = addresses !== null

  const [showForm, setShowForm] = useState<boolean>(false)

  const handleShowForm = (value: boolean) => {
    setShowForm(value)
  }

  const onCancel = () => {
    setShowForm(false)
  }
  return (
    <div>
      <div className='flex flex-row justify-between gap-2 items-center'>
        <span className='text-blackText font-semibold'>
          Dirección de Entrega
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
            <NewAddressForm
              addressType={AddressType.Delivery}
              onCancel={onCancel}
              idUser={idUser}
            />
          </>
        )}
        {existAddresses && addresses.deliveryAddress.length > 0
          ? (
              addresses.deliveryAddress.map((address) => {
                const { country, ...rest } = address.city
                return (
              <AddressItem key={address.idaddress} item={address} city={rest} />
                )
              })
            )
          : (
          <span className='text-black/70 text-sm'>No existen registros</span>
            )}
      </div>
    </div>
  )
}

export default DeliveryAddress
