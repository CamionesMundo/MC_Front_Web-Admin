import { FilterSelect } from '@/components'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { lotsColumns } from '@/const/columns/post'
import { type LotsDataType } from '@/types/api/response/lots'
import { SelectItem, type Selection } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'

type LotsProps = {
  lots: LotsDataType[]
  isLoading: boolean
  selectedStatus: Selection
  handleSelectionChange: (key: Selection) => void
  bottomContent: ReactNode
  totalRows: number
}

type LotStatusData = {
  key: string
  display: string
}

const dataLotStatus: LotStatusData[] = [
  {
    key: 'active',
    display: 'Activos'
  },
  {
    key: 'progress',
    display: 'En Progreso'
  },
  {
    key: 'finished',
    display: 'Finalizados'
  },
  {
    key: 'default',
    display: 'Activos, En Progreso'
  }
]

const Lots = ({
  lots,
  isLoading,
  selectedStatus,
  handleSelectionChange,
  bottomContent,
  totalRows
}: LotsProps) => {
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

  const filterLotButton = useMemo(() => {
    return (
      <div className=' w-48'>
        <FilterSelect
          labelPlacement={'outside-left'}
          aria-label='Status'
          placeholder='Filtrar por:'
          selectedKeys={selectedStatus}
          onSelectionChange={handleSelectionChange}
          classNames={{
            trigger:
              'bg-slate-300 text-blackText dark:bg-default-200 dark:text-white',
            base: 'items-center text-blackText'
          }}
          disabled={isLoading}
        >
          {dataLotStatus.map((lot) => (
            <SelectItem key={lot.key} value={lot.key}>
              {lot.display}
            </SelectItem>
          ))}
        </FilterSelect>
      </div>
    )
  }, [selectedStatus, isLoading, handleSelectionChange])

  const columns = useMemo(() => {
    const arrayStatus = Array.from(selectedStatus)
    const status = arrayStatus[0]
    if (status === 'finished') {
      const filtered = lotsColumns.filter(
        (item) => item.key !== 'lot_transmission' && item.key !== 'actions'
      )
      return filtered
    } else {
      return lotsColumns
    }
  }, [selectedStatus])

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
        columns={columns}
        emptyLabel={isLoading ? '' : 'No tienes ningún lote creado'}
        totalLabel='lotes'
        initialVisibleColumns={columns.map((column) => column.key)}
        newButtonLabel={'Nuevo Lote'}
        onEdit={onEditRole}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateRole}
        actions={{
          useDelete: true,
          useEdit: true,
          useViewMore: false,
          labelEditingDisabled: 'El lote esta en progreso y no se puede editar'
        }}
        filterContent={filterLotButton}
        usePage={false}
        customPagination={isLoading ? null : bottomContent}
        useCustomPagination={true}
        totalRows={totalRows}
      />
    </>
  )
}

export default Lots
