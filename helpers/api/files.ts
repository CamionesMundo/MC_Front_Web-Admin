import api from '@/lib/axios/axios-client'
import { BASE_ADMIN_API } from '@/const/base-url'
import { type FilesGalleryResponse, type GenericResponse } from '@/types/api'
import { type BodyFile } from '@/types/api/request/files'

export const createFileGallery = async (body: BodyFile) => {
  const res = await api.post<GenericResponse<FilesGalleryResponse>>(
    `${BASE_ADMIN_API}/files`,
    body
  )

  const { data } = res

  return data
}
