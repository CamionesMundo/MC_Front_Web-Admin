import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { lotsColumns } from '@/const/columns/post'
import { type LotsDataType } from '@/types/api/response/lots'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

type LotsProps = {
  lots: LotsDataType[]
  isLoading: boolean
}

const Lots = ({ lots, isLoading }: LotsProps) => {
  const router = useRouter()

  const [filterValue, setFilterValue] = useState('')

  const hasSearchFilter = Boolean(filterValue)
  const onCreateRole = () => {
    router.push('/post-management/lots/create')
  }

  const onEditRole = (id: number) => {
    router.push(`/post-management/lots/edit/id/${id}`)
  }
  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (lots !== undefined) {
      let filtered = lots?.length > 0 ? [...lots] : []

      if (hasSearchFilter) {
        filtered = filtered.filter((item) =>
          item.lot_code.toLowerCase().includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [lots, filterValue, hasSearchFilter])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Lotes' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección todos los lotes de subastas creadas por los
          administradores y martilleros de Mundo Camiones.
        </p>
      </div>
      <CustomTable<LotsDataType>
        filteredItems={filteredItems}
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={lotsColumns}
        emptyLabel={isLoading ? '' : 'No tienes ningún lote creado'}
        totalLabel='lotes'
        initialVisibleColumns={lotsColumns.map((column) => column.key).filter((key) => key !== 'type_lot')}
        newButtonLabel={'Nuevo Lote'}
        onEdit={onEditRole}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateRole}
      />
    </>
  )
}

export default Lots
