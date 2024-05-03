import { BASE_MC_FILES } from '@/const/base-url'
import { handleServerError } from '@/helpers/error'
import mcApi from '@/lib/axios/mc-client'
import {
  type FilesGalleryResponse,
  type FileGalleryResponse,
  type GenericResponse
} from '@/types/api'
import { type BodyFile } from '@/types/api/request/files'
import { type AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

export async function POST (req: Request) {
  const body = (await req.json()) as BodyFile

  try {
    const mcInstance = await mcApi()
    const res: AxiosResponse<GenericResponse<number>> = await mcInstance.post<
    GenericResponse<number>
    >(`${BASE_MC_FILES}/create`, body)
    const idGallery = res.data.data
    if (idGallery !== undefined) {
      const response: AxiosResponse<GenericResponse<FileGalleryResponse[]>> =
        await mcInstance.get<GenericResponse<FileGalleryResponse[]>>(
          `${BASE_MC_FILES}/${idGallery}`
        )
      const toResponse: FilesGalleryResponse = {
        idgallery: idGallery,
        files: response.data?.data
      }
      return NextResponse.json({
        statusCode: 200,
        message: 'Archivos subidos correctamente',
        data: toResponse
      })
    }
    return NextResponse.json(res.data)
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: null,
      data: null,
      error: handleServerError(error)
    })
  }
}
