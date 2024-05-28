export const rolesData: Roles[] = [
  {
    name: 'Administrador',
    canCreate: true,
    canUpdate: true,
    canRead: true,
    canDelete: true
  },
  {
    name: 'Soporte',
    canCreate: false,
    canUpdate: false,
    canRead: true,
    canDelete: false
  },
  {
    name: 'Agente',
    canCreate: false,
    canUpdate: true,
    canRead: true,
    canDelete: false
  }
]

export type Roles = {
  name: string
  canCreate: boolean
  canUpdate: boolean
  canRead: boolean
  canDelete: boolean
}

export type User = {
  name: string
  email: string
  avatar: string
  role: string
  status: string
}

export const usersData: User[] = [
  {
    name: 'Tony Reichert',
    email: 'eichtici@gmail.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    role: 'Administrador',
    status: 'Activo'
  },
  {
    name: 'Zoey Lang',
    email: 'zoey.lang@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    role: 'Administrador',
    status: 'Activo'
  },
  {
    name: 'Jane Fisher',
    email: 'jane.fisher@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    role: 'Administrador',
    status: 'Inactivo'
  },
  {
    name: 'William Howard',
    email: 'william.howard@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    role: 'Administrador',
    status: 'Activo'
  }
]
