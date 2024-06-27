import React from 'react'
import ReactPlayer from 'react-player'
import ImageGallery from 'react-image-gallery'
import { Gift, NoImage, NoVideo } from '@/icons'
import { type ImagesUrl } from '@/store/useLiveTransmission'

type GalleryProps = {
  principalVideoUrl: string
  isPlaying: boolean
  handleReady: () => void
  giftsGallery: ImagesUrl[]
  imagesGallery: ImagesUrl[]
}

const Gallery = ({
  principalVideoUrl,
  isPlaying,
  handleReady,
  giftsGallery,
  imagesGallery
}: GalleryProps) => {
  return (
    <div className='bg-slate-200 dark:bg-zinc-600 w-full'>
      {principalVideoUrl !== '' && (
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
      )}
      {principalVideoUrl === '' && (
        <div className='w-full h-52 bg-zinc-300 dark:bg-zinc-700 rounded-t-lg grid place-content-center'>
          <div className='flex flex-col items-center text-default-500'>
            <NoVideo className='w-5 h-5' />
            <span>No tiene videos</span>
          </div>
        </div>
      )}
      <div className='grid grid-cols-4 h-36 w-full'>
        {giftsGallery.length > 0 && (
          <div
            className='col-span-2 relative overflow-hidden h-36'
            id='gallery-gift'
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
        {giftsGallery.length === 0 && (
          <div className='h-36 col-span-2 grid place-content-center'>
            <div className='flex flex-col items-center text-default-500'>
              <NoImage className='w-5 h-5' />
              <span>No tiene Regalos</span>
            </div>
          </div>
        )}
        <div id='gallery-pub' className='col-span-2 overflow-hidden h-36'>
          <ImageGallery
            items={imagesGallery}
            showThumbnails={false}
            showPlayButton={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Gallery
