export type FilesGallery = {
  idgallery: number
  files: FilesInfo[]
}

export type FilesInfo = {
  idfile: number
  url: string
  idgallery: number
  name: string
}

export type FileGalleryResponse = {
  idfile: number
  url: string
  thumbnail: null
  main_file: boolean
  idgallery: number
  name: string
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export type FilesGalleryResponse = {
  idgallery: number
  files: FileGalleryResponse[]
}
