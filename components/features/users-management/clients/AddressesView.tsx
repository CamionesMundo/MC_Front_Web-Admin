import { type ClientResponse } from '@/types/api/response/user'
import { Divider, Spacer } from '@nextui-org/react'
import React, { useMemo } from 'react'
import AddressItem from './AddressItem'
import { useGetAllAddressesByUserId } from '@/hooks/api/useClients'
import { Loader } from '@/components/ui/Loader'
import { UserType } from '@/types/enums'

type AddressesViewProps = {
  client: ClientResponse | null
}

const AddressesView = ({ client }: AddressesViewProps) => {
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

  const existAddresses = addresses !== null
  if (isLoading) {
    return (
      <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
        <Loader />
      </div>
    )
  }
  return (
    <div>
      <div>
        <span className='text-blackText font-semibold'>
          Dirección de Entrega
        </span>
        <Spacer />
        <Divider />
        <div className='grid md:grid-cols-2 grid-cols-1 gap-2 py-2'>
          {existAddresses && addresses.deliveryAddress.length > 0
            ? (
                addresses.deliveryAddress.map((address) => {
                  const { country, ...rest } = address.city
                  return (
                <AddressItem
                  key={address.idaddress}
                  item={address}
                  city={rest}
                  isPreviewMode
                />
                  )
                })
              )
            : (
            <span className='text-black/70 text-sm'>No existen registros</span>
              )}
        </div>
      </div>
      <div className='my-4'>
        <span className='text-blackText font-semibold'>
          Dirección de Facturación
        </span>
        <Spacer />
        <Divider />
        <div className='grid md:grid-cols-2 grid-cols-1 gap-2 py-2'>
          {existAddresses && addresses.billingAddress.length > 0
            ? (
                addresses.billingAddress.map((address) => {
                  const { country, ...rest } = address.city
                  return (
                <AddressItem
                  key={address.idaddress}
                  item={address}
                  city={rest}
                  isPreviewMode
                />
                  )
                })
              )
            : (
            <span className='text-black/70 text-sm'>No existen registros</span>
              )}
        </div>
      </div>
      {isSeller && (
        <>
          <div className='my-4'>
            <span className='text-blackText font-semibold'>
              Dirección de Representante legal
            </span>
            <Spacer />
            <Divider />
            <div className='grid md:grid-cols-2 grid-cols-1 gap-2 py-2'>
              {existAddresses &&
              addresses.legalRepresentativeAddress.length > 0
                ? (
                    addresses.legalRepresentativeAddress.map((address) => {
                      const { country, ...rest } = address.city
                      return (
                    <AddressItem
                      key={address.idaddress}
                      item={address}
                      city={rest}
                      isPreviewMode
                    />
                      )
                    })
                  )
                : (
                <span className='text-black/70 text-sm'>
                  No existen registros
                </span>
                  )}
            </div>
          </div>
          {isBusiness && (
            <div className='my-4'>
              <span className='text-blackText font-semibold'>
                Dirección de la compañía
              </span>
              <Spacer />
              <Divider />
              <div className='grid md:grid-cols-2 grid-cols-1 gap-2 py-2'>
                {existAddresses && addresses.companyAddresses.length > 0
                  ? (
                      addresses.companyAddresses.map((address) => {
                        const { country, ...rest } = address.city
                        return (
                      <AddressItem
                        key={address.idaddress}
                        item={address}
                        city={rest}
                        isPreviewMode
                      />
                        )
                      })
                    )
                  : (
                  <span className='text-black/70 text-sm'>
                    No existen registros
                  </span>
                    )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AddressesView
