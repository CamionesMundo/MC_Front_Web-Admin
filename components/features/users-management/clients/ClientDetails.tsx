import CustomTabs from '@/components/tabs/CustomTabs'
import { Loader } from '@/components/ui/Loader'
import { useGetAppUserById } from '@/hooks/api/useClients'
import { Buyer, Seller, LegalRepresentative, PostalCode } from '@/icons'
import { type TabItem } from '@/types/ui/tab'

import React, { type Key, useMemo, useState } from 'react'
import BuyerProfile from './BuyerProfile'
import SellerProfile from './SellerProfile'
import LegalRepresentativeProfile from './LegalRepresentativeProfile'
import AddressesView from './AddressesView'

type ClientDetailsProps = {
  currentIdUser: number | null
}

const ClientDetails = ({ currentIdUser }: ClientDetailsProps) => {
  const { data: clientData, isLoading } = useGetAppUserById(
    Number(currentIdUser)
  )

  const [selected, setSelected] = useState('buyer')

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }

  const client = useMemo(() => {
    if (clientData !== undefined) {
      return clientData.data
    }
    return null
  }, [clientData])

  const tabs = useMemo(() => {
    const defaultTabs: TabItem[] = [
      {
        key: 'buyer',
        title: (
          <div className='flex items-center space-x-2'>
            <Buyer className='w-5 h-5' />
            <span>Perfil de Comprador</span>
          </div>
        ),
        content: <BuyerProfile client={client} />
      }
    ]

    if (client !== undefined) {
      const dynamicTabs: TabItem[] = []

      if (client?.seller !== null) {
        dynamicTabs.push({
          key: 'seller',
          title: (
            <div className='flex items-center space-x-2'>
              <Seller className='w-5 h-5' />
              <span>Perfil de Vendedor</span>
            </div>
          ),
          content: <SellerProfile client={client} />
        })
      }

      if (
        client?.seller !== null &&
        client?.seller?.legal_representative !== null
      ) {
        dynamicTabs.push({
          key: 'legal',
          title: (
            <div className='flex items-center space-x-2'>
              <LegalRepresentative className='w-5 h-5' />
              <span>Representante legal</span>
            </div>
          ),
          content: <LegalRepresentativeProfile client={client} />
        })
      }
      dynamicTabs.push({
        key: 'addresses',
        title: (
          <div className='flex items-center space-x-2'>
            <PostalCode className='w-5 h-5' />
            <span>Direcciones</span>
          </div>
        ),
        content: <AddressesView client={client}/>
      })

      return [...defaultTabs, ...dynamicTabs]
    }

    return defaultTabs
  }, [client])
  if (isLoading) {
    return (
      <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
        <Loader />
      </div>
    )
  }
  return (
    <div className=''>
      <CustomTabs
        tabs={tabs}
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}

export default ClientDetails
