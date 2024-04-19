import { GenericButton } from '@/components'
import { Plus } from '@/icons'
import { type AddressResponse } from '@/types/api/response/address'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useState } from 'react'
import AddressItem from './AddressItem'
import NewAddressForm from './NewAddressForm'
import { AddressType } from '@/types/enums'

type LegalAddressProps = {
  addresses: AddressResponse | null
  idUser: number
}

const LegalAddress = ({ addresses, idUser }: LegalAddressProps) => {
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
        <span className='text-blackText font-semibold'>
          Dirección de Representante legal
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
              addressType={AddressType.LegalRepresentative}
              onCancel={onCancel}
              idUser={idUser}
            />
          </>
        )}
        {existAddresses && addresses.legalRepresentativeAddress.length > 0
          ? (
              addresses.legalRepresentativeAddress.map((address) => {
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

export default LegalAddress
