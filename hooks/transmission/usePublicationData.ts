import { type Key, useEffect, useState } from 'react'
import { useGetPublicationById } from '../api/usePublications'
import { useLiveTransmissionStore } from '@/store/useLiveTransmission'

export const usePublicationData = () => {
  const {
    currentLot,
    updatePrincipalVideo,
    updateImagesGallery,
    updateGiftsGallery,
    updatePublication
  } = useLiveTransmissionStore()
  const {
    data: response,
    isLoading: isLoadingCurrentPublication,
    refetch
  } = useGetPublicationById(currentLot?.idpublication ?? 0)

  const [selected, setSelected] = useState('description')

  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }
  useEffect(() => {
    if (response !== undefined) {
      const publication = response.data
      const videoGallery = publication.vehicle.video_galleries.files
      const videoUrl = videoGallery[0].url
      const images = publication.vehicle.photo_galleries.files ?? []
      const imagesMapped = images.map((item) => ({ original: item.url }))
      const gifts = publication.vehicle.gift_galleries?.files ?? []
      const giftsMapped = gifts.map((item) => ({ original: item.url }))
      updatePublication(publication)
      updatePrincipalVideo(videoUrl)
      updateImagesGallery(imagesMapped)
      updateGiftsGallery(giftsMapped)
    }
  }, [
    updatePublication,
    response,
    updatePrincipalVideo,
    updateImagesGallery,
    updateGiftsGallery
  ])

  return {
    selected,
    handleSelectionChange,
    isLoadingCurrentPublication,
    refetch
  }
}
