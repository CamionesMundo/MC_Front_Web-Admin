export type BodyFile = {
  file: FileRequest[]
}

export type FileRequest = {
  file: string | null
  name: string
}
