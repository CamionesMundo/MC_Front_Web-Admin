import { createFileGallery } from '@/helpers/api/files'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { showToast } from '../useToast'

export const useCreateFilesGallery = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['createFilesGallery'],
    mutationFn: createFileGallery,
    onSuccess: async () => {
      try {
        router.refresh()
      } catch (error) {
        console.error('Error al invalidar las queries:', error)
      }
    },
    onError: (data: Error) => {
      showToast(data.message, 'error')
    }
  })
}
