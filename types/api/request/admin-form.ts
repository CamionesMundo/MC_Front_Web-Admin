export type BodyAdminForm = {
  name_user: string
  email: string
  password: string
  idrole_admin: number
  photo_idgallery: number | null
}

export type BodyUpdateAdminForm = Partial<Omit<BodyAdminForm, 'password' | 'email'>>

export type BodyUpdateProfileAdmin = Pick<BodyUpdateAdminForm, 'photo_idgallery'>

export type RequestUpdateAdminForm = {
  id: number
  body: BodyUpdateAdminForm
}

export type BodyUpdateImageProfile = {
  id: number
  data: BodyFileImage
}

export type BodyFileImage = {
  file: FileImage[]
}

export type FileImage = {
  file: string
  name: string
}
