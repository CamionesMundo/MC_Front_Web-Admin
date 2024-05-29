import { Divider, Spacer, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import TabDescription from './TabDescription'
import TabCharacteristics from './TabCharacteristics'
import { Loader } from '@/components/ui/Loader'
import { GenericButton } from '@/components'
import { Gift, Radio, Refresh } from '@/icons'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import HeaderPublication from './HeaderPublication'
import ReactPlayer from 'react-player'
import TabCheckList from './TabCheckList'
import SocketComponent from './SocketComponent'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'
import { useAuctionState } from '@/hooks/transmission/useAuctionState'
import { useAuctionActions } from '@/hooks/transmission/useAuctionActions'
import { useSocketListeners } from '@/hooks/transmission/useSocketListener'
import { usePublicationData } from '@/hooks/transmission/usePublicationData'
import { useCallback, useEffect, useState } from 'react'
import { useGetTransmissionStatus } from '@/hooks/api/useLots'
import { LotTransmissionStatus } from '@/types/enums'
import CustomModal from '@/components/modal/CustomModal'

type TransmissionProps = {
  codeLot: number
}

const Transmission = ({ codeLot }: TransmissionProps) => {
  const [isReady, setIsReady] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    data: statusResponse,
    refetch: refetchStatusTransmission,
    isRefetching: isLoadingStatus
  } = useGetTransmissionStatus()
  const [isOnline, setIsOnline] = useState(false)
  // Store
  const {
    isLast,
    publication,
    principalVideoUrl,
    isPlaying,
    giftsGallery,
    imagesGallery,
    isLoadingNextButton,
    updateIsPlaying
  } = useLiveTransmissionStore()
  // Custom hooks

  const { isLoadingParameters } = useAuctionState()
  const {
    selected,
    handleSelectionChange,
    isLoadingCurrentPublication,
    refetch
  } = usePublicationData()

  const { socket } = useSocketListeners({
    refetch
  })

  const {
    disabledInitAuctionButton,
    disableUnlinkButton,
    disabledNextButton,
    handleInitAuction,
    handleNextAuction,
    handleUnlinkAuction,
    handleFinishedLot,
    isPendingStart,
    isLoadingDelete,
    isLoadingFinishedLot
  } = useAuctionActions({ socket, refetch })

  const handleReady = () => {
    setIsReady(true)
  }
  useEffect(() => {
    if (publication !== undefined && principalVideoUrl !== '' && isReady) {
      updateIsPlaying(true)
    }
  }, [principalVideoUrl, publication, updateIsPlaying, isReady])

  useEffect(() => {
    if (statusResponse !== undefined) {
      const isCurrentOnline =
        statusResponse.data.status === LotTransmissionStatus.Online
      if (isCurrentOnline) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    }
  }, [statusResponse])

  const handleRefetch = useCallback(async () => {
    await refetchStatusTransmission()
  }, [refetchStatusTransmission])

  const handleFinishLot = () => {
    onOpen()
  }

  return (
    <>
      {publication === undefined && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {publication !== undefined && (
        <>
          <div className='grid grid-cols-3 gap-3'>
            <div className='col-span-1'>
              <p className='text-sm text-default-600 dark:text-white pt-2'>
                Recuerda siempre{' '}
                <span className='font-semibold'>
                  INICIAR el Streaming desde tu OBS STUDIO
                </span>
                para que todos los usuarios puedan ver la transmisión En vivo de
                subastas en la aplicación
              </p>
            </div>
            <div className='grid grid-cols-6 col-span-2'>
              <div className='flex flex-col col-span-2'>
                <span className='font-semibold text-center pt-2 text-lg'>{`ID SUBASTA: #${codeLot}`}</span>
                <GenericButton
                  type='button'
                  label={'Actualizar stream'}
                  onClick={handleRefetch}
                  isLoading={isLoadingStatus}
                  startContent={
                    isLoadingStatus
                      ? undefined
                      : (
                      <Refresh className='w-4 h-4' />
                        )
                  }
                />
              </div>
              <div className='col-span-4 w-5/6 h-40 mx-auto'>
                {isOnline && (
                  <ReactPlayer
                    url='https://50275799e5a0.us-east-1.playback.live-video.net/api/video/v1/us-east-1.339712782868.channel.SIV9qpv5k4AR.m3u8'
                    controls={true}
                    playing={true}
                    width='100%'
                    height='100%'
                  />
                )}
                {!isOnline && (
                  <div className='w-full h-40 bg-blackText grid place-content-center rounded-lg'>
                    <div className='flex flex-col'>
                      <div className='flex justify-center'>
                        <Radio className='w-6 h-6 text-white animate-pulse' />
                      </div>
                      <span className='text-white text-sm animate-pulse'>
                        La transmisión empezará pronto...
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Spacer />
          <Spacer />
          <h1 className='font-semibold text-black/80 dark:text-white'>
            {'Vehículos en pantalla'}
            <span className=' text-cyan-600 font-semibold'>
              {' (en tiempo real)'}
            </span>
          </h1>
          <Spacer />
          <Divider />
          <Spacer />
          <>
            {isLoadingCurrentPublication && (
              <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
                <Loader />
              </div>
            )}
            {!isLoadingCurrentPublication && (
              <>
                <div className='grid grid-cols-2 gap-x-3 mb-3'>
                  <div className='mt-2'>
                    <HeaderPublication />
                    <div className='bg-slate-100 w-full'>
                      <div className=' h-52 w-full bg-slate-700'>
                        <ReactPlayer
                          url={principalVideoUrl}
                          controls
                          width='100%'
                          height='100%'
                          playing={isPlaying}
                          loop
                          muted
                          onReady={handleReady}
                        />
                      </div>
                      <div className='grid grid-cols-4 h-36 w-full'>
                        {giftsGallery.length > 0 && (
                          <div
                            className='col-span-2 relative overflow-hidden h-36'
                            id='gallery-gift'
                          >
                            <div className='absolute top-0 left-0 w-full bg-secondary h-6 z-50 flex flex-row gap-2 items-center px-3'>
                              <Gift className='w-4 h-4' />
                              <span className='font-semibold text-xs'>
                                Regalos
                              </span>
                            </div>
                            <ImageGallery
                              items={giftsGallery}
                              showThumbnails={false}
                              showPlayButton={false}
                            />
                          </div>
                        )}
                        <div
                          id='gallery-pub'
                          className='col-span-2 overflow-hidden h-36'
                        >
                          <ImageGallery
                            items={imagesGallery}
                            showThumbnails={false}
                            showPlayButton={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='flex flex-row gap-3 mt-3 justify-center'>
                      <GenericButton
                        type='button'
                        label='Iniciar Subasta'
                        color='default'
                        className={
                          disabledInitAuctionButton
                            ? 'cursor-not-allowed'
                            : 'bg-green-700 text-white font-semibold'
                        }
                        onClick={handleInitAuction}
                        isLoading={isPendingStart}
                        disabled={disabledInitAuctionButton}
                      />
                      <GenericButton
                        type='button'
                        label='Desvincular del lote'
                        color='default'
                        className={
                          disableUnlinkButton
                            ? 'cursor-not-allowed'
                            : 'bg-gray-500 text-white font-semibold'
                        }
                        onClick={handleUnlinkAuction}
                        isLoading={isLoadingDelete}
                        disabled={disableUnlinkButton}
                      />
                      <GenericButton
                        type='button'
                        label={isLast ? 'Finalizar Lote' : 'Siguiente Subasta'}
                        className={
                          !disabledNextButton
                            ? 'text-capitalize bg-blue-800 text-white font-bold'
                            : 'cursor-not-allowed'
                        }
                        onClick={isLast ? handleFinishLot : handleNextAuction}
                        isLoading={isLoadingNextButton}
                        disabled={disabledNextButton}
                      />
                    </div>

                    <SocketComponent
                      isLoadingTotalCount={isLoadingParameters}
                    />
                  </div>
                </div>
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
                            {publication?.vehicle.gift_description ??
                              'Sin descripción'}
                          </p>
                        </div>
                      </Tab>
                    )}
                  </Tabs>
                </div>
              </>
            )}
          </>
          <CustomModal
            titleModal={''}
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            backdrop='opaque'
          >
            <div className='flex flex-col dark:text-white mb-3'>
              <p className='text-default-600 dark:text-white mb-3'>
                No olvides <span className='font-semibold'>CERRAR</span> la
                transmisión de Streaming desde tu{' '}
                <span className='font-semibold'>OBS STUDIO</span>, hay costos
                asociados al streaming.
              </p>
              <div className='w-full'>
                <GenericButton
                  type='button'
                  label={'Finalizar Lote'}
                  isLoading={isLoadingFinishedLot}
                  onClick={async () => {
                    await handleFinishedLot()
                    onClose()
                  }}
                />
              </div>
            </div>
          </CustomModal>
        </>
      )}
    </>
  )
}

export default Transmission
