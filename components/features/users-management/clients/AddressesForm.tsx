import { type ClientResponse } from '@/types/api/response/user'
import React, { useMemo } from 'react'

import { useGetAllAddressesByUserId } from '@/hooks/api/useClients'
import { Loader } from '@/components/ui/Loader'
import { UserType } from '@/types/enums'
import DeliveryAddress from './DeliveryAddress'
import BillingAddress from './BillingAddress'
import dynamic from 'next/dynamic'

const DynamicCompanyAddress = dynamic(
  async () => await import('./CompanyAddress')
)

const DynamicLegalAddress = dynamic(
  async () => await import('./LegalAddress')
)

type AddressesFormProps = {
  client: ClientResponse | null
}
const AddressesForm = ({ client }: AddressesFormProps) => {
  const { data: addressData, isLoading } = useGetAllAddressesByUserId(
    Number(client?.iduser)
  )

  const addresses = useMemo(() => {
    if (addressData !== undefined) {
      return addressData.data
    } else {
      return null
    }
  }, [addressData])

  const isBusiness = client?.seller?.type_seller === UserType.Business
  const isSeller = client?.seller !== null && client?.seller !== undefined

  if (isLoading) {
    return (
      <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
        <Loader />
      </div>
    )
  }
  return (
    <div>
      <DeliveryAddress addresses={addresses} idUser={client?.iduser ?? 0} />
      <BillingAddress addresses={addresses} idUser={client?.iduser ?? 0} />
      {isSeller && (
        <>
          <DynamicLegalAddress addresses={addresses} idUser={client?.iduser ?? 0} />
          {isBusiness && (
            <DynamicCompanyAddress
              addresses={addresses}
              idUser={client?.iduser ?? 0}
            />
          )}
        </>
      )}
    </div>
  )
}

export default AddressesForm
