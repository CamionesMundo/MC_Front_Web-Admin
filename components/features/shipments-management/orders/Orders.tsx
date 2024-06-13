import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import CustomPageSize from '@/components/selects/CustomPageSize'
import FilterButtonSelection, {
  type OptionsFilterProps
} from '@/components/selects/FilterButtonSelection'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { ordersFiltersColumns } from '@/const/columns/shipments'
import { useGetAllOrderStatus } from '@/hooks/api/useOrders'
import useQueryParams from '@/hooks/useQueryParams'
import { ClearFilter } from '@/icons'
import { type OrderDataType } from '@/types/api/response/orders'
import { Button, type Selection } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  useState,
  type ReactNode,
  useCallback,
  useMemo,
  useEffect
} from 'react'

type OrdersProps = {
  orders: OrderDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const Orders = ({
  orders,
  isLoading,
  bottomContent,
  totalRows
}: OrdersProps) => {
  const { queryParams, setQueryParams } = useQueryParams()
  const { data: orderStatusResponse } = useGetAllOrderStatus()
  const router = useRouter()
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['0'])
  )
  const [selectedKey, setSelectedKey] = useState<string>('0')

  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      const statusArray = Array.from(keys)
      const value = statusArray[0]
      if (value === undefined) {
        setSelectedStatus(new Set(['0']))
        setQueryParams({ page: 1, idOrderStatus: undefined, query: undefined })
        setSelectedKey('0')
        return
      }
      setSelectedStatus(keys)

      setQueryParams({ page: 1, idOrderStatus: value, query: undefined })
      setSelectedKey(value.toString())
    },
    [setQueryParams]
  )

  const filteredItems = useMemo(() => {
    if (orders !== undefined) {
      const filtered = orders?.length > 0 ? [...orders] : []

      return filtered
    }

    return []
  }, [orders])

  const handleClearFilters = useCallback(() => {
    setQueryParams({
      page: 1,
      pageSize: 10,
      idOrderStatus: undefined,
      query: undefined,
      startDate: undefined,
      endDate: undefined
    })
    setSelectedStatus(new Set(['0']))
    setSelectedKey('0')

    router.refresh()
  }, [setQueryParams, router])

  const statusData = useMemo(() => {
    if (orderStatusResponse !== undefined) {
      const data = orderStatusResponse.data
      const mapped: OptionsFilterProps[] = data.map((status) => ({
        key: status?.idorder_status.toString(),
        display: status?.name_status
      }))
      const all: OptionsFilterProps[] = [{ key: '0', display: 'Todos' }]
      return [...all, ...mapped]
    } else {
      return []
    }
  }, [orderStatusResponse])

  const filterAuctionButtons = useMemo(() => {
    return (
      <div className='flex flex-col md:flex-row gap-6 items-center'>
        <div className=' max-w-[410px] w-full'>
          <AsyncRangePicker label='Fecha venta:' />
        </div>
        <div className=' md:max-w-96 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Status'
            label='Status: '
            placeholder='Filtrar por:'
            selectedKeys={selectedStatus}
            onSelectionChange={handleSelectionChange}
            options={statusData}
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
    handleClearFilters,
    statusData
  ])

  // const onViewOrderDetails = (id: number) => {
  //   router.push(`/shipments-management/orders/details/id/${id}`)
  // }
  useEffect(() => {
    if (selectedKey === '0') {
      setQueryParams({ idOrderStatus: undefined })
    }
  }, [selectedKey, setQueryParams, queryParams])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Gestión de Ventas' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección todas las ventas realizadas desde el app
          móvil.
        </p>
      </div>
      <CustomTable<OrderDataType>
        filteredItems={filteredItems}
        columns={ordersFiltersColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna venta registrada'}
        totalLabel='ventas'
        initialVisibleColumns={ordersFiltersColumns.map((column) => column.key)}
        // onViewMore={onViewOrderDetails}
        onDelete={() => {}}
        onEdit={() => {}}
        newButtonLabel='Crear Lote Subasta'
        useAddButton={false}
        usePage={false}
        isLoading={isLoading}
        actions={{
          useViewMore: true,
          useEdit: false,
          useDelete: false
        }}
        totalRows={totalRows}
        useCustomPagination={true}
        customPagination={isLoading ? null : bottomContent}
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por ID publicación, título, país'
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

export default Orders
