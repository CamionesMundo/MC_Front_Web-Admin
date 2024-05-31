import { Tab, Tabs } from '@nextui-org/react'
import React, { type Key } from 'react'
import TabDescription from './TabDescription'
import TabCharacteristics from './TabCharacteristics'
import TabCheckList from './TabCheckList'
import { type PublicationResponse } from '@/types/api/response/publication'
import { type ImagesUrl } from '@/store/useLiveTransmission'

type TabsPublicationProps = {
  publication: PublicationResponse | undefined
  giftsGallery: ImagesUrl[]
  selected: string
  handleSelectionChange: (key: Key) => void
}

const TabsPublication = ({
  publication,
  giftsGallery,
  selected,
  handleSelectionChange
}: TabsPublicationProps) => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs
        size='sm'
        radius='full'
        aria-label='Tab de Detalles de publicación'
        color='primary'
        classNames={{
          cursor: 'bg-blue-100 border border-primary text-primary',
          tab: 'text-primary ',
          tabContent:
            'group-data-[selected=true]:text-primary group-data-[selected=true]:font-semibold'
        }}
        selectedKey={selected}
        onSelectionChange={handleSelectionChange}
      >
        <Tab key='description' title='Descripción General'>
          <TabDescription publication={publication} />
        </Tab>
        <Tab key='specifications' title='Características'>
          <TabCharacteristics publication={publication} />
        </Tab>

        {publication?.vehicle.check_list !== null && (
          <Tab key='list' title='Check List del Producto'>
            <TabCheckList publication={publication} />
          </Tab>
        )}
        {giftsGallery.length > 0 && (
          <Tab key='gifts' title='Regalos'>
            <div className='flex flex-col'>
              <span className='font-semibold text-sm text-zinc-800'>
                {'Descripción del Regalo'}
              </span>
              <p className='text-sm text-black/70'>
                {publication?.vehicle.gift_description ?? 'Sin descripción'}
              </p>
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default TabsPublication
