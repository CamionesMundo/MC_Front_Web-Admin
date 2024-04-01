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
