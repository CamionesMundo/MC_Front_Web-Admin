import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import CustomPageSize from '@/components/selects/CustomPageSize'
import FilterButtonSelection, {
  type OptionsFilterProps
} from '@/components/selects/FilterButtonSelection'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { auctionsFiltersColumns } from '@/const/columns/post'
import useQueryParams from '@/hooks/useQueryParams'
import { ClearFilter } from '@/icons'
import { type AuctionFilterDataType } from '@/types/api/response/publication'
import { Button, type Selection } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  type ReactNode,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react'

const dataAuctionStatus: OptionsFilterProps[] = [
  {
    key: '0',
    display: 'Todos'
  },
  {
    key: '20',
    display: 'Activos'
  },
  {
    key: '21',
    display: 'En Progreso'
  },
  {
    key: '19',
    display: 'Pendientes'
  },
  {
    key: '22',
    display: 'Adjudicados'
  },
  {
    key: '23',
    display: 'Sin postor'
  },
  {
    key: '24',
    display: 'En revisión'
  }
]

const auctionTypeData: OptionsFilterProps[] = [
  {
    key: '0',
    display: 'Todos'
  },
  {
    key: '14',
    display: 'Determinada'
  },
  {
    key: '13',
    display: 'Martillero'
  }
]

type AuctionsProps = {
  auctions: AuctionFilterDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const Auctions = ({
  auctions,
  isLoading,
  bottomContent,
  totalRows
}: AuctionsProps) => {
  const { queryParams, setQueryParams } = useQueryParams()
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['0'])
  )

  const [selectedType, setSelectedType] = useState<Selection>(new Set(['0']))
  const [selectedKey, setSelectedKey] = useState<string>('0')
  const [selectedTypeKey, setSelectedTypeKey] = useState<string>('0')

  const onCreateLot = () => {
    router.push('/post-management/lots/create')
  }
  const onViewAuctionDetails = (id: number) => {
    router.push(`/post-management/auctions/publication/id/${id}`)
  }
  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      const statusArray = Array.from(keys)
      const value = statusArray[0]
      if (value === undefined) {
        setSelectedStatus(new Set(['0']))
        setQueryParams({ page: 1, typeStatus: undefined, query: undefined })
        setSelectedKey('0')
        return
      }
      setSelectedStatus(keys)

      setQueryParams({ page: 1, typeStatus: value, query: undefined })
      setSelectedKey(value.toString())
    },
    [setQueryParams]
  )

  const handleSelectionTypeChange = useCallback(
    async (keys: Selection) => {
      const typeArray = Array.from(keys)
      const value = typeArray[0]
      if (value === undefined) {
        setSelectedType(new Set(['0']))
        setQueryParams({ page: 1, typeAuction: undefined, query: undefined })
        setSelectedTypeKey('0')
        return
      }
      setSelectedType(keys)

      setQueryParams({ page: 1, typeAuction: value, query: undefined })
      setSelectedTypeKey(value.toString())
    },
    [setQueryParams]
  )
  const filteredItems = useMemo(() => {
    if (auctions !== undefined) {
      const filtered = auctions?.length > 0 ? [...auctions] : []

      return filtered
    }

    return []
  }, [auctions])

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
    setSelectedStatus(new Set(['0']))
    setSelectedType(new Set(['0']))
    setSelectedKey('0')
    setSelectedTypeKey('0')

    router.refresh()
  }, [setQueryParams, router])

  const filterAuctionButtons = useMemo(() => {
    return (
      <div className='flex flex-col md:flex-row gap-6 items-center'>
        <div className=' max-w-[350px] w-full'>
          <AsyncRangePicker label='Fecha cierre:' />
        </div>
        <div className=' md:max-w-52 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Status'
            label='Status: '
            placeholder='Filtrar por:'
            selectedKeys={selectedStatus}
            onSelectionChange={handleSelectionChange}
            options={dataAuctionStatus}
            isLoading={isLoading}
          />
        </div>
        <div className=' md:max-w-52 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Tipo'
            label='Tipo: '
            placeholder='Filtrar por:'
            selectedKeys={selectedType}
            onSelectionChange={handleSelectionTypeChange}
            options={auctionTypeData}
            isLoading={isLoading}
          />
        </div>
        <div className='w-full md:w-fit'>
          <Button
            startContent={
              <ClearFilter className='w-4 h-4 text-blackText dark:text-white' />
            }
            onClick={handleClearFilters}
            className='w-full md:w-fit dark:border dark:border-white/60'
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    )
  }, [
    selectedStatus,
    isLoading,
    handleSelectionChange,
    selectedType,
    handleSelectionTypeChange,
    handleClearFilters
  ])

  useEffect(() => {
    if (selectedKey === '0') {
      setQueryParams({ typeStatus: undefined })
    }
  }, [selectedKey, setQueryParams, queryParams])

  useEffect(() => {
    if (selectedTypeKey === '0') {
      setQueryParams({ typeAuction: undefined })
    }
  }, [selectedTypeKey, setQueryParams])

  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Gestión de Subastas' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección todas las subastas que fueron creadas desde
          el app móvil.
        </p>
      </div>
      <CustomTable<AuctionFilterDataType>
        filteredItems={filteredItems}
        columns={auctionsFiltersColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna subasta creada'}
        totalLabel='subastas'
        initialVisibleColumns={auctionsFiltersColumns
          .map((column) => column.key)
          .filter((key) => key !== 'auction_description')}
        onViewMore={onViewAuctionDetails}
        onDelete={() => {}}
        onEdit={() => {}}
        newButtonLabel='Crear Lote Subasta'
        actionOnAdd={onCreateLot}
        usePage={false}
        isLoading={isLoading}
        actions={{
          useViewMore: true,
          useEdit: true,
          useDelete: true
        }}
        totalRows={totalRows}
        useCustomPagination={true}
        customPagination={isLoading ? null : bottomContent}
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por ID subasta, título, país, lote'
            styles='w-full flex-1'
          />
        }
        useCustomPageSize={true}
        customPageSize={<CustomPageSize />}
        filterContent={filterAuctionButtons}
        useFilterInNewRow={true}
      />
    </>
  )
}

export default Auctions
