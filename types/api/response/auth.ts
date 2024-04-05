export interface UserDataResponse {
  user: UserResponse
  token: string
}

export interface UserResponse {
  iduser_admin: number
  name_user: string
  email: string
  createdAt: Date
  updatedAt: Date
  role: Role
  file_profile: FileProfile
}

export interface Role {
  name_role: string
  idrole_admin: number
}

export interface FileProfile {
  url: string
}
