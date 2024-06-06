import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import CustomPageSize from '@/components/selects/CustomPageSize'
import FilterButtonSelection, {
  type OptionsFilterProps
} from '@/components/selects/FilterButtonSelection'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { lotsColumns } from '@/const/columns/post'
import useQueryParams from '@/hooks/useQueryParams'
import { ClearFilter } from '@/icons'
import { type LotsDataType } from '@/types/api/response/lots'
import { Button, type Selection } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect
} from 'react'

type LotsProps = {
  lots: LotsDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const dataLotStatus: OptionsFilterProps[] = [
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

const Lots = ({ lots, isLoading, bottomContent, totalRows }: LotsProps) => {
  const router = useRouter()
  const { queryParams, setQueryParams } = useQueryParams()
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['default'])
  )
  const [selectedKey, setSelectedKey] = useState<string>('default')

  const onCreateLot = () => {
    router.push('/post-management/lots/create')
  }

  const onEditLot = (id: number) => {
    router.push(`/post-management/lots/edit/id/${id}`)
  }

  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      const statusArray = Array.from(keys)
      const value = statusArray[0]
      if (value === undefined) {
        setSelectedStatus(new Set(['default']))
        setQueryParams({ page: 1, status: undefined, query: undefined })
        setSelectedKey('default')
        return
      }
      setSelectedStatus(keys)

      setQueryParams({ page: 1, status: value, query: undefined })
      setSelectedKey(value.toString())
    },
    [setQueryParams]
  )

  const filteredItems = useMemo(() => {
    if (lots !== undefined) {
      const filtered = lots?.length > 0 ? [...lots] : []

      return filtered
    }

    return []
  }, [lots])

  const handleClearFilters = useCallback(() => {
    setQueryParams({
      page: 1,
      pageSize: 10,
      typeAuction: undefined,
      typeStatus: undefined,
      query: undefined,
      startDate: undefined,
      endDate: undefined
    })
    setSelectedStatus(new Set(['default']))

    setSelectedKey('default')

    router.refresh()
  }, [setQueryParams, router])

  const filterLotsButtons = useMemo(() => {
    return (
      <div className='flex flex-col md:flex-row gap-6 items-center'>
        <div className=' max-w-96 w-full'>
          <AsyncRangePicker label='Fecha de Transmisión:' />
        </div>
        <div className=' md:max-w-72 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Status'
            label='Status: '
            placeholder='Filtrar por:'
            selectedKeys={selectedStatus}
            onSelectionChange={handleSelectionChange}
            options={dataLotStatus}
            isLoading={isLoading}
          />
        </div>
        <div className='w-full md:w-fit'>
          <Button
            startContent={<ClearFilter className='w-4 h-4 text-blackText dark:text-white' />}
            onClick={handleClearFilters}
            className='w-full md:w-fit dark:border dark:border-white/60'
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    )
  }, [selectedStatus, isLoading, handleSelectionChange, handleClearFilters])

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

  useEffect(() => {
    if (selectedKey === 'default') {
      setQueryParams({ status: undefined })
    }
  }, [selectedKey, setQueryParams, queryParams])

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
        columns={columns}
        emptyLabel={isLoading ? '' : 'No tienes ningún lote creado'}
        totalLabel='lotes'
        initialVisibleColumns={columns.map((column) => column.key)}
        newButtonLabel={'Nuevo Lote'}
        onEdit={onEditLot}
        onDelete={() => {}}
        isLoading={isLoading}
        actionOnAdd={onCreateLot}
        actions={{
          useDelete: true,
          useEdit: true,
          useViewMore: false,
          labelEditingDisabled: 'El lote esta en progreso y no se puede editar'
        }}
        usePage={false}
        filterContent={filterLotsButtons}
        useCustomPagination={true}
        customPagination={isLoading ? null : bottomContent}
        totalRows={totalRows}
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por ID lote'
            styles='w-full flex-1'
          />
        }
        useCustomPageSize={true}
        customPageSize={<CustomPageSize />}
        useFilterInNewRow={true}
      />
    </>
  )
}

export default Lots
