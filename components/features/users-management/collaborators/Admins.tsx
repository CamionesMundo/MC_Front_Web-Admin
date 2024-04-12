'use client'
import { FilterSelect } from '@/components'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { adminColumns } from '@/const/columns/users'

import { type AdminDataType } from '@/types/api/response/auth'
import { SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'

type Props = {
  admins: AdminDataType[]
  isLoading: boolean
}

type Roles = {
  key: string
  display: string
}

const dataRoles: Roles[] = [
  {
    key: 'admin',
    display: 'Admin'
  },
  {
    key: 'seller',
    display: 'Vendedor'
  }
]

const Admins = ({ admins, isLoading }: Props) => {
  const router = useRouter()
  const [filterValue, setFilterValue] = useState('')
  const [selectedRoles, setSelectedRoles] = useState<string>('')

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRoles(e.target.value)
  }
  const hasSearchFilter = Boolean(filterValue)
  const onCreateAdmin = () => {
    router.push('/users-management/collaborators/create')
  }

  /**
   * Navigate to the page for editing an administrator.
   * @param id ID of the administrator to edit.
   */
  const onEditAdmin = (id: number) => {
    router.push(`/users-management/collaborators/edit/id/${id}`)
  }

  /**
   * Filters administrators based on search criteria and selected roles.
   */
  const filteredItems = useMemo(() => {
    if (admins !== undefined) {
      let filtered = admins?.length > 0 ? [...admins] : []

      if (hasSearchFilter) {
        filtered = filtered.filter(
          (item) =>
            item.name_user.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.email.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.role.name_role
              .toLowerCase()
              .includes(filterValue.toLowerCase())
        )
      }
      if (selectedRoles !== '') {
        filtered = filtered.filter(
          (item) => item.role.name_role === selectedRoles
        )
      }

      return filtered
    }

    return []
  }, [admins, filterValue, selectedRoles, hasSearchFilter])

  /**
   * Callback function to handle search filter change.
   * @param value Search filter value.
   */
  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  /**
   * Generates the content for the role filter.
   */
  const filterRolButton = useMemo(() => {
    return (
      <div className=' w-48'>
        <FilterSelect
          labelPlacement={'outside-left'}
          aria-label='Rol'
          placeholder='Filtrar por:'
          selectedKeys={selectedRoles}
          onChange={handleSelectionChange}
          classNames={{
            trigger: 'bg-slate-300 text-blackText',
            base: 'items-center'
          }}
        >
          {dataRoles.map((role) => (
            <SelectItem key={role.key} value={role.key}>
              {role.display}
            </SelectItem>
          ))}
        </FilterSelect>
      </div>
    )
  }, [selectedRoles])

  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Administradores' />
      </div>
      <div>
        <p className='text-xs mb-2'>
          Gestiona en esta sección a los administradores registrados.
        </p>
      </div>
      <CustomTable<AdminDataType>
        data={admins}
        filteredItems={filteredItems}
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={adminColumns}
        emptyLabel={
          isLoading ? '' : 'No tienes ningún usuario administrador creado'
        }
        totalLabel='usuarios administradores'
        initialVisibleColumns={adminColumns.map((column) => column.key)}
        newButtonLabel={'Nuevo Administrador'}
        onEdit={onEditAdmin}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateAdmin}
        filterContent={filterRolButton}
      />
    </>
  )
}

export default Admins
