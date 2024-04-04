import { type UserResponse } from '@/types/api/response/auth'

export const adminColumns = [
  {
    key: 'user',
    display: 'Nombre',
    render: (item: UserResponse) => item.name_user
  },
  {
    key: 'status',
    display: 'Estado',
    render: (item: UserResponse) => item.iduser_admin
  },
  {
    key: 'actions',
    display: 'Acciones'
  }
]
