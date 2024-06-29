import React from 'react'
import ReactPlayer from 'react-player'
import ImageGallery from 'react-image-gallery'
import { Gift, NoImage, NoVideo } from '@/icons'
import { type ImagesUrl } from '@/store/useLiveTransmission'

type GalleryTabsProps = {
  principalVideoUrl: string
  isPlaying: boolean
  handleReady: () => void
  giftsGallery: ImagesUrl[]
  imagesGallery: ImagesUrl[]
  currentSelected: string
}

const GalleryTabs = ({
  principalVideoUrl,
  isPlaying,
  handleReady,
  giftsGallery,
  imagesGallery,
  currentSelected
}: GalleryTabsProps) => {
  return (
    <div className=' w-full h-[352px]'>
      {principalVideoUrl !== '' && currentSelected === 'video' && (
        <div className=' h-full w-full '>
          <ReactPlayer
            url={principalVideoUrl}
            controls={false}
            width='100%'
            height='100%'
            playing={isPlaying}
            loop
            muted
            onReady={handleReady}
          />
        </div>
      )}
      {principalVideoUrl === '' && currentSelected === 'video' && (
        <div className='w-full h-full bg-zinc-300 dark:bg-zinc-700 rounded-t-lg grid place-content-center'>
          <div className='flex flex-col items-center text-default-500'>
            <NoVideo className='w-5 h-5' />
            <span>No tiene videos</span>
          </div>
        </div>
      )}

      {giftsGallery.length > 0 && currentSelected === 'gift' && (
        <div
          className='h-full w-full relative overflow-hidden'
          id='gallery-gift-2'
        >
          <div className='absolute top-0 left-0 w-full bg-secondary text-black h-6 z-50 flex flex-row gap-2 items-center px-3'>
            <Gift className='w-4 h-4' />
            <span className='font-semibold text-xs'>Regalos</span>
          </div>
          <ImageGallery
            items={giftsGallery}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      )}
      {giftsGallery.length === 0 && currentSelected === 'gift' && (
        <div className='h-full w-full grid place-content-center'>
          <div className='flex flex-col items-center text-default-500'>
            <NoImage className='w-5 h-5' />
            <span>No tiene Regalos</span>
          </div>
        </div>
      )}
      {imagesGallery.length > 0 && currentSelected === 'gallery' && (
        <div id='gallery-pub-2' className='w-full overflow-hidden h-full'>
          <ImageGallery
            items={imagesGallery}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      )}
    </div>
  )
}

export default GalleryTabs
