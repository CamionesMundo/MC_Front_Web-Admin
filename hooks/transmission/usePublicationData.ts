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

  const [selected, setSelected] = useState('additional')

  /**
   * The function `handleSelectionChange` takes a key as input and sets it as the selected value if it
   * is a string.
   * @param {Key} key - The `key` parameter in the `handleSelectionChange` function is of type `Key`.
   * It is used to determine the selected item and update the state accordingly.
   */
  const handleSelectionChange = (key: Key) => {
    if (typeof key === 'string') {
      setSelected(key)
    }
  }

  /* The `useEffect` hook in the provided code snippet is responsible for updating the state based on
  the response data received from the API call. Here's a breakdown of what the `useEffect` is doing: */
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
