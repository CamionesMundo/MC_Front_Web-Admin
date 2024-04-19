import { type ClientResponse } from '@/types/api/response/user'
import React, { useMemo } from 'react'

import { useGetAllAddressesByUserId } from '@/hooks/api/useClients'
import { Loader } from '@/components/ui/Loader'
import { UserType } from '@/types/enums'
import DeliveryAddress from './DeliveryAddress'
import BillingAddress from './BillingAddress'
import LegalAddress from './LegalAddress'
import CompanyAddress from './CompanyAddress'

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
          <LegalAddress addresses={addresses} idUser={client?.iduser ?? 0} />
          {isBusiness && (
            <CompanyAddress
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
