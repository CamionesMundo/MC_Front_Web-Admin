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
