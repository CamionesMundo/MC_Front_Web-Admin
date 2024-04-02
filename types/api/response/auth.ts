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
  name_rol: string
}

export interface FileProfile {
  url: string
}
