import React from 'react'
import ReactPlayer from 'react-player'
import ImageGallery from 'react-image-gallery'
import { Gift } from '@/icons'
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
    <div className='bg-slate-100 w-full'>
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
      <div className='grid grid-cols-4 h-36 w-full'>
        {giftsGallery.length > 0 && (
          <div
            className='col-span-2 relative overflow-hidden h-36'
            id='gallery-gift'
          >
            <div className='absolute top-0 left-0 w-full bg-secondary h-6 z-50 flex flex-row gap-2 items-center px-3'>
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
