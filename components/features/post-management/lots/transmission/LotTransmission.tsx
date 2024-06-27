import { BackComponent } from '@/components/ui/BackComponent'
import { useGetLotById } from '@/hooks/api/useLots'
import { Radio, Truck } from '@/icons'
import React, { type Key, useMemo, useState, useEffect } from 'react'
import Queue from './Queue'
import Transmission from './Transmission'
import CustomTabs from '@/components/tabs/CustomTabs'
import { Loader } from '@/components/ui/Loader'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { TypeAuctionStatus } from '@/types/enums'

type LotTransmissionProps = {
  id: string
}

const LotTransmission = ({ id }: LotTransmissionProps) => {
  const {
    updateCurrentIdLot,
    updateCurrentLot,
    updateTotalQueue,
    updateAwaitingQueue,
    updateCurrentAuctionId,
    updateCurrentIdQueue,
    updateIsLast,
    updateNextLotId,
    awaitingQueue,
    publication,
    reset
  } = useLiveTransmissionStore()

  const { data: response, isLoading } = useGetLotById(Number(id))
  const [selectedTab, setSelectedTab] = useState('transmission')

  const handleSelectionChangeTab = (key: Key) => {
    if (typeof key === 'string') {
      setSelectedTab(key)
    }
  }
  const status = publication?.auction.type_status.type_name
  useEffect(() => {
    if (response !== undefined) {
      const lots = response.data?.lot?.lot_queues
      const lotsMapped = lots?.map((item) => ({
        ...item,
        id: item.idlot_queue
      }))

      const currentLot = lotsMapped?.find((lotInQueue) => lotInQueue.current)

      const nextLot = lotsMapped?.find(
        (lotInQueue) => lotInQueue.order === (currentLot?.order ?? 1) + 1
      )

      const nextLotId = nextLot?.idlot_queue
      const restQueue = lotsMapped?.filter(
        (lot) => lot.order > (currentLot?.order ?? 1)
      )
      updateCurrentIdLot(Number(id))
      updateTotalQueue(lotsMapped)
      updateCurrentLot(currentLot)
      updateNextLotId(nextLotId)
      updateAwaitingQueue(restQueue)
      updateCurrentIdQueue(currentLot?.idlot_queue)
      updateIsLast(restQueue?.length === 0)
      updateCurrentAuctionId(currentLot?.publication.auction.idauctions)
    }
  }, [
    response,
    updateCurrentIdLot,
    id,
    updateTotalQueue,
    updateCurrentLot,
    updateNextLotId,
    updateAwaitingQueue,
    updateCurrentIdQueue,
    updateIsLast,
    updateCurrentAuctionId
  ])

  const tabs = useMemo(() => {
    return [
      {
        key: 'transmission',
        title: (
          <div className='flex items-center space-x-2'>
            <Radio className='w-5 h-5' />
            <span>Transmisión en vivo</span>
          </div>
        ),
        content: <Transmission />
      },
      {
        key: 'queue',
        title: (
          <div className='flex items-center space-x-2'>
            <Truck className='w-5 h-5' />
            <span>{`Vehículos en cola (${awaitingQueue?.length})`}</span>
          </div>
        ),
        content: <Queue />
      }
    ]
  }, [awaitingQueue])

  const onBack = () => {
    setTimeout(() => {
      reset()
    }, 400)
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title='Gestión de Lotes '
          subtitle='Transmisión En vivo'
          useGoBack
          onAction={onBack}
        />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          {
            'Gestiona el lote a subastar, será visto por los postores desde el app móvil en tiempo real (Transmisión en vivo)'
          }
          .
        </p>
      </div>
      {isLoading && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div className=''>
          <CustomTabs
            tabs={tabs}
            selectedKey={selectedTab}
            aria-label='Tab de transmisiones'
            onSelectionChange={handleSelectionChangeTab}
            disabledKeys={
              status === TypeAuctionStatus.InProgress ? ['queue'] : undefined
            }
          />
        </div>
      )}
    </>
  )
}

export default LotTransmission
