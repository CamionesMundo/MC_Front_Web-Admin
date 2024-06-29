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
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetTransmissionStatus } from '@/hooks/api/useLots'
import { LotTransmissionStatus } from '@/types/enums'
import CustomModal from '@/components/modal/CustomModal'
import TabsPublication from './TabsPublication'
import { useRouter } from 'next/navigation'
import GalleryTabs from './GalleryTabs'

const Transmission = () => {
  const router = useRouter()
  const [isReady, setIsReady] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentSelected, setCurrentSelected] = useState('video')
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
  } = useAuctionActions({ socket, refetch, refetchStatusTransmission })

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

  const handleFinishLot = useCallback(() => {
    onOpen()
  }, [onOpen])

  const auctionTab = useMemo(() => {
    return (
      <>
        <div className='flex flex-col gap-5 md:gap-0 md:flex-row'>
          <div className='flex flex-col md:flex-col gap-3 mt-0'>
            <GenericButton
              type='button'
              label='Iniciar Pujas'
              color='default'
              className={
                disabledInitAuctionButton
                  ? 'cursor-not-allowed w-full'
                  : 'bg-green-700 text-white font-semibold w-full'
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
                  ? 'cursor-not-allowed w-full'
                  : 'bg-gray-500 text-white font-semibold w-full'
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
                  ? 'text-capitalize bg-blue-800 text-white font-bold w-full'
                  : 'cursor-not-allowed w-full'
              }
              onClick={isLast ? handleFinishLot : handleNextAuction}
              isLoading={isLoadingNextButton}
              disabled={disabledNextButton}
            />
          </div>
          <SocketComponent isLoadingTotalCount={isLoadingParameters} />
        </div>
      </>
    )
  }, [
    disabledInitAuctionButton,
    handleInitAuction,
    isPendingStart,
    disableUnlinkButton,
    handleUnlinkAuction,
    isLoadingDelete,
    isLast,
    disabledNextButton,
    handleFinishLot,
    handleNextAuction,
    isLoadingNextButton,
    isLoadingParameters
  ])

  const handleChangeButton = (value: string) => {
    setCurrentSelected(value)
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
          <div className='flex flex-row w-full'>
            <div className='w-full flex gap-2 flex-col md:flex-row items-start justify-end md:-mt-28'>
              <GenericButton
                type='button'
                label={'stream'}
                onClick={handleRefetch}
                isLoading={isLoadingStatus}
                startContent={
                  isLoadingStatus ? undefined : <Refresh className='w-4 h-4' />
                }
              />
              {isOnline && (
                <div className='h-40 md:h-32 md:w-56 w-full'>
                  <ReactPlayer
                    url='https://50275799e5a0.us-east-1.playback.live-video.net/api/video/v1/us-east-1.339712782868.channel.SIV9qpv5k4AR.m3u8'
                    controls={true}
                    playing={true}
                    width='100%'
                    height='100%'
                    muted
                  />
                </div>
              )}
              {!isOnline && (
                <div className='h-40 md:h-32 md:w-56 w-full bg-blackText grid place-content-center rounded-lg'>
                  <div className='flex flex-col'>
                    <div className='flex justify-center'>
                      <Radio className='w-6 h-6 text-white animate-pulse' />
                    </div>
                    <span className='text-white text-sm animate-pulse text-center'>
                      La transmisión empezará pronto...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <h1 className='md:block hidden font-semibold text-black/80 dark:text-white'>
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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
                  <div className='mt-2 order-2 md:order-1 md:max-h-[410px]'>
                    <div className='md:hidden block mt-3'>
                      <h1 className=' font-semibold text-black/80 dark:text-white'>
                        {'Vehículos en pantalla'}
                        <span className=' text-cyan-600 font-semibold'>
                          {' (en tiempo real)'}
                        </span>
                      </h1>
                      <Spacer />
                      <Divider />
                      <Spacer />
                    </div>
                    <HeaderPublication
                      publication={publication}
                      currentButtonSelected={currentSelected}
                      handleChangeButton={handleChangeButton}
                      hasGifts={giftsGallery.length > 0}
                    />
                    <GalleryTabs
                      giftsGallery={giftsGallery}
                      handleReady={handleReady}
                      imagesGallery={imagesGallery}
                      isPlaying={isPlaying}
                      principalVideoUrl={principalVideoUrl}
                      currentSelected={currentSelected}
                    />
                  </div>
                  <div className='order-1 md:order-2 md:max-h-[410px] overflow-hidden overflow-y-auto mt-6 md:mt-0'>
                    <TabsPublication
                      publication={publication}
                      giftsGallery={giftsGallery}
                      selected={selected}
                      handleSelectionChange={handleSelectionChange}
                      useInitialTab
                      titleAdditionalTab='Subasta'
                      useOneColumn={true}
                      contentAdditionalTab={auctionTab}
                    />
                  </div>
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
                    router.push('/post-management/lots?page=1&pageSize=10')
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
