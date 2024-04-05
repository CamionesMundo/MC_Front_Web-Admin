export type BodyAdminForm = {
  name_user: string
  email: string
  password: string
  idrole_admin: number
  photo_idgallery: number | null
}

export type BodyUpdateAdminForm = Omit<BodyAdminForm, 'password' | 'email'>

export type RequestUpdateAdminForm = {
  id: number
  body: BodyUpdateAdminForm
}
