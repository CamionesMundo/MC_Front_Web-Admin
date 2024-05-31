import { Divider, Spacer, useDisclosure } from '@nextui-org/react'
import { Loader } from '@/components/ui/Loader'
import { GenericButton } from '@/components'
import { Radio, Refresh } from '@/icons'

import 'react-image-gallery/styles/css/image-gallery.css'
import HeaderPublication from './HeaderPublication'
import ReactPlayer from 'react-player'
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
import Gallery from './Gallery'
import TabsPublication from './TabsPublication'

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
                    <HeaderPublication publication={publication} />
                    <Gallery
                      giftsGallery={giftsGallery}
                      handleReady={handleReady}
                      imagesGallery={imagesGallery}
                      isPlaying={isPlaying}
                      principalVideoUrl={principalVideoUrl}
                    />
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
                <TabsPublication
                  publication={publication}
                  giftsGallery={giftsGallery}
                  selected={selected}
                  handleSelectionChange={handleSelectionChange}
                />
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
