export const usersManagement = [
  { label: 'Roles', href: '/users-management/roles' },
  {
    label: 'Administradores',
    href: '/users-management/collaborators'
  },
  { label: 'Usuarios', href: '/users-management/clients?page=1&pageSize=10' }
]

export const postManagement = [
  {
    label: 'Gestión de publicaciones',
    href: '/post-management/post?page=1&pageSize=10'
  },
  {
    label: 'Gestión de subastas',
    href: '/post-management/auctions?page=1&pageSize=10'
  },
  {
    label: 'Gestión de lotes',
    href: '/post-management/lots?page=1&pageSize=10'
  }
]

export const categoriesManagement = [
  { label: 'Países', href: '/categories-management/countries' },
  {
    label: 'Ciudades',
    href: '/categories-management/cities'
  },
  {
    label: 'Tipos de vehículos ',
    href: '/categories-management/vehicle-types'
  },
  { label: 'Marcas ', href: '/categories-management/brands' }
]

export const shipmentsManagement = [
  { label: 'Ventas', href: '/shipments-management/orders?page=1&pageSize=10' },
  {
    label: 'Historial',
    href: '/shipments-management/history'
  },
  { label: 'Notificaciones ', href: '/shipments-management/notify' }
]

export const paymentsManagement = [
  {
    label: 'Gestión de pagos',
    href: '/payments-management/payments?page=1&pageSize=10'
  },
  {
    label: 'Cobros por penalidad',
    href: '/payments-management/penalty-charges'
  },
  { label: 'Gestión de retiros ', href: '/payments-management/withdrawal' }
]
