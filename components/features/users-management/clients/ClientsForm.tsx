'use client'
import CustomTabs from '@/components/tabs/CustomTabs'
import { BackComponent } from '@/components/ui/BackComponent'
import { Loader } from '@/components/ui/Loader'
import { useGetAppUserById } from '@/hooks/api/useClients'
import { Buyer, LegalRepresentative, PostalCode, Seller } from '@/icons'
import { type TabItem } from '@/types/ui/tab'
import { useParams } from 'next/navigation'
import React, { type Key, useMemo, useState } from 'react'
import BuyerEditForm from './BuyerEditForm'
import SellerEditForm from './SellerEditForm'
import LegalEditForm from './LegalEditForm'
import AddressesForm from './AddressesForm'

type TypeParams = {
  id?: string
}
const ClientsForm = () => {
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0

  const { data: clientData, isLoading } = useGetAppUserById(Number(id))
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

  const onBack = () => {
    setTimeout(() => {
      //   reset()
    }, 300)
  }

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
        content: <BuyerEditForm client={client} />
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
          content: <SellerEditForm client={client} />
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
          content: <LegalEditForm client={client} />
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
        content: <AddressesForm client={client} />
      })

      return [...defaultTabs, ...dynamicTabs]
    }

    return defaultTabs
  }, [client])

  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title={'Clientes'}
          subtitle={'Editar'}
          onAction={onBack}
        />
      </div>
      {isLoading
        ? (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
          )
        : (
        <div className=''>
          <CustomTabs
            tabs={tabs}
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
          />
        </div>
          )}
    </>
  )
}

export default ClientsForm
