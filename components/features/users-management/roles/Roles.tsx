'use client'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { rolesColumns } from '@/const/columns/roles'
import { type RoleDataType } from '@/types/api/response/roles'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

type RolesProps = {
  roles: RoleDataType[]
  isLoading: boolean
}

const Roles = ({ roles, isLoading }: RolesProps) => {
  const router = useRouter()
  console.log(roles)
  const [filterValue, setFilterValue] = useState('')

  const hasSearchFilter = Boolean(filterValue)
  const onCreateRole = () => {
    router.push('/users-management/roles/create')
  }

  const onEditRole = (id: number) => {
    router.push(`/users-management/roles/edit/id/${id}`)
  }

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (roles !== undefined) {
      let filtered = roles?.length > 0 ? [...roles] : []

      if (hasSearchFilter) {
        filtered = filtered.filter((item) =>
          item.name_role.toLowerCase().includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [roles, filterValue, hasSearchFilter])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Roles' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección a los roles y permisos de los
          administradores.
        </p>
      </div>
      <CustomTable<RoleDataType>
        filteredItems={filteredItems}
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={rolesColumns}
        emptyLabel={isLoading ? '' : 'No tienes ningún rol creado'}
        totalLabel='roles'
        initialVisibleColumns={rolesColumns.map((column) => column.key)}
        newButtonLabel={'Nuevo Rol'}
        onEdit={onEditRole}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateRole}
      />
    </>
  )
}

export default Roles
