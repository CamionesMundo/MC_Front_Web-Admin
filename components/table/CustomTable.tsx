import { ChevronRight, Plus, Search } from '@/icons'
import { type ActionsPermissions, type ColumnsProps } from '@/types/ui/table'

import {
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type Selection,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  type TableProps
} from '@nextui-org/react'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Loader } from '../ui/Loader'
import { capitalize } from '@/lib/utils/utils'
import { GenericButton } from '../buttons'
import { cn } from '@/lib/clsx/clsx'
import {
  TableActions,
  TableFullName,
  TableUser,
  TableUserClient,
  TableIsActive,
  TableCountry,
  TableUserType,
  TableCountryCity,
  TablePort,
  TableTypeLot,
  TableIsoDate,
  TableLotUser,
  TableLotStatus,
  TableAuctionTitle,
  TableAuctionStatus,
  TableCreationAuction,
  TableLotTransmission,
  TableBasePrice,
  TablePosition,
  TablePaymentStatus,
  TablePaymentType,
  TableConfirmationDate,
  TablePaymentDate,
  TableConfirmationUser,
  TableAuctionType,
  TableLotCode,
  TableAuctionEndDate,
  TableTypePublication,
  TableCreationDate,
  TablePublicationStatus,
  TablePromotion,
  TableOrderTitle,
  TableOrderOrigin,
  TableOrderCountry,
  TableOrderStatus,
  TableOrderPrice,
  TablePaymentMethod,
  TablePaymentAmount,
  TableAuctionActive
} from './render-cell'
import TableRole from './render-cell/TableRole'
import { type WithId } from '@/types/api/response/auth'
import { TableAuctionDescription } from './render-cell/TableAuctionDescription'
import { type PaymentsDataType } from '@/types/api/response/payments'
import { type ClientDataType } from '@/types/api/response/user'
import {
  type AuctionFilterDataType,
  type GeneralPublicationDataType
} from '@/types/api/response/publication'

/**
 * The `CustomTable` component is a reusable table component with various customization options
 * such as sorting, pagination, search, and column visibility.
 * It accepts data, columns configuration, and several props to customize its behavior and appearance.
 *
 * Props:
 * @param {ColumnsProps[]} columns - The configuration for table columns.
 * @param {T[]} data - The array of data objects to be displayed in the table.
 * @param {T[]} filteredItems - The array of data objects after applying the search filter.
 * @param {string} filterValue - The value of the search filter.
 * @param {(value: string) => void} handleSearch - The function to handle search input change.
 * @param {boolean} [isLoading=false] - Indicates whether the table is in loading state.
 * @param {string} [emptyLabel='No existen registros'] - The label to display when there are no records to show.
 * @param {string} [totalLabel='Registros'] - The label for the total number of records.
 * @param {string} [newButtonLabel='Nuevo registro'] - The label for the button to add new records.
 * @param {boolean} [allowsSorting=false] - Indicates whether sorting is allowed on table columns.
 * @param {string[]} [initialVisibleColumns=[]] - The initial set of visible columns.
 * @param {(id: number) => void} [onViewMore] - The function to handle "View More" action.
 * @param {(id: number) => void} [onEdit] - The function to handle "Edit" action.
 * @param {(id: number) => void} [onDelete] - The function to handle "Delete" action.
 * @param {() => void} [onChangeStatusRow] - The function to handle row status change.
 * @param {() => void} [onChangePublicationStatus] - The function to handle publication status change.
 * @param {() => void} [onConfirmPayment] - The function to handle payment confirmation.
 * @param {((row: PaymentsDataType) => void) | undefined} [onDetailPayment] - The function to handle payment details.
 * @param {boolean} [useRounded=true] - Indicates whether rounded corners should be used in table wrapper.
 * @param {boolean} [useSearchBar=true] - Indicates whether to display the search bar.
 * @param {string} [searchBarPlaceholder='Buscar'] - The placeholder text for the search bar.
 * @param {boolean} [showColumnsButton=true] - Indicates whether to display the "Columns" dropdown button.
 * @param {() => void} [actionOnAdd] - The function to be executed when the "Add" button is clicked.
 * @param {boolean} [useAddButton=true] - Indicates whether to display the "Add" button.
 * @param {boolean} [showTotalRegister=true] - Indicates whether to display the total number of records.
 * @param {boolean} [showFilesPerPage=true] - Indicates whether to display the files per page selector.
 * @param {boolean} [showTopContent=true] - Indicates whether to display the top content section.
 * @param {boolean} [showBottomContent=true] - Indicates whether to display the bottom content section.
 * @param {ReactNode} [filterContent] - The content to display alongside the search bar.
 * @param {ActionsPermissions} [actions] - The permissions for table actions such as view more, edit, and delete.
 * @param {boolean} [useMultipleSelection=false] - Indicates whether to enable multiple selection of rows.
 * @param {boolean} [useCustomPagination=false] - Indicates whether to use custom pagination.
 * @param {ReactNode} [customPagination] - Custom pagination component.
 * @param {number} [totalRows=0] - Total number of rows in the data set.
 * @param {T[]} [totalData] - The complete data set.
 * @param {boolean} [useSelection=false] - Indicates whether to enable row selection.
 * @param {boolean} [useScroll=false] - Indicates whether to enable scrollable table.
 * @param {boolean} [usePage=true] - Indicates whether to enable pagination.
 * @param {ReactNode} [customSearchBar] - Custom search bar component.
 * @param {boolean} [useCustomSearchBar=false] - Indicates whether to use custom search bar.
 * @param {boolean} [useCustomPageSize=false] - Indicates whether to use custom page size selector.
 * @param {ReactNode} [customPageSize] - Custom page size selector component.
 * @param {boolean} [useFilterInNewRow=false] - Indicates whether to display filter content in a new row.
 *
 * The `CustomTable` component renders a table with customizable features such as sorting, pagination,
 * search, column visibility, and action buttons. It utilizes various components from NextUI and custom
 * rendering components for table cells. The component provides extensive customization options and
 * flexibility to meet different use cases.
 */

type CustomTableProps<T extends WithId> = {
  columns: ColumnsProps[]
  filteredItems: T[]
  filterValue?: string
  handleSearch?: (value: string) => void
  isLoading?: boolean
  emptyLabel?: string
  totalLabel?: string
  newButtonLabel?: string
  allowsSorting?: boolean
  initialVisibleColumns?: string[]
  onViewMore?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onChangeStatusRow?: (row: ClientDataType) => void
  onChangeActiveStatusRow?: (row: AuctionFilterDataType) => void
  onChangePublicationStatus?: (row: GeneralPublicationDataType) => void
  onConfirmPayment?: (row: PaymentsDataType) => void
  onDetailPayment?: ((row: PaymentsDataType) => void) | undefined
  useRounded?: boolean
  useSearchBar?: boolean
  searchBarPlaceholder?: string
  showColumnsButton?: boolean
  actionOnAdd?: () => void
  useAddButton?: boolean
  showTotalRegister?: boolean
  showFilesPerPage?: boolean
  showTopContent?: boolean
  showBottomContent?: boolean
  filterContent?: ReactNode | undefined | null
  actions?: ActionsPermissions
  useMultipleSelection?: boolean
  useCustomPagination?: boolean
  customPagination?: ReactNode | undefined | null
  totalRows?: number
  totalData?: T[]
  useSelection?: boolean
  useScroll?: boolean
  usePage?: boolean
  customSearchBar?: ReactNode | undefined | null
  useCustomSearchBar?: boolean
  useCustomPageSize?: boolean
  customPageSize?: ReactNode | undefined | null
  useFilterInNewRow?: boolean
} & TableProps

const CustomTable = <T extends WithId>({
  columns,
  filteredItems,
  filterValue,
  handleSearch,
  isLoading = false,
  emptyLabel = 'No existen registros',
  totalLabel = 'Registros',
  newButtonLabel = 'Nuevo registro',
  allowsSorting = false,
  initialVisibleColumns = [],
  onViewMore,
  onEdit,
  onDelete,
  onConfirmPayment,
  onDetailPayment,
  onChangeStatusRow,
  onChangeActiveStatusRow,
  onChangePublicationStatus,
  useRounded = true,
  useSearchBar = true,
  searchBarPlaceholder = 'Buscar',
  showColumnsButton = true,
  actionOnAdd,
  useAddButton = true,
  showTotalRegister = true,
  showFilesPerPage = true,
  showTopContent = true,
  showBottomContent = true,
  filterContent,
  actions = {
    useViewMore: false,
    useEdit: true,
    useDelete: true
  },
  useMultipleSelection = false,
  useCustomPagination = false,
  customPagination,
  totalRows = 0,
  totalData,
  useSelection = false,
  useScroll = false,
  usePage = true,
  customSearchBar,
  useCustomSearchBar = false,
  useCustomPageSize = false,
  customPageSize,
  useFilterInNewRow = false,
  ...props
}: CustomTableProps<T>) => {
  /**
   * Wrapper class name for styling purposes.
   * @param useRounded Indicates whether rounded corners should be used.
   */
  const classWrapper = ` p-1 md:p-3 ${useRounded ? '' : 'rounded-none'}`

  /**
   * Component state for managing visible columns.
   */
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns)
  )

  /**
   * Component state for managing the current page.
   */
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  /**
   * Memoized header columns based on visible columns selection.
   */
  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    )
  }, [visibleColumns, columns])

  /**
   * Memoized items to display on the current page.
   */
  const items = useMemo(() => {
    if (!usePage) {
      return filteredItems
    }
    if (useCustomPagination) {
      return filteredItems
    }
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage, useCustomPagination, usePage])

  /**
   * Total number of pages based on filtered items and rows per page.
   */

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage)
  }, [filteredItems.length, rowsPerPage])

  const onSearchChange = useCallback(
    (value: string) => {
      if (value !== undefined) {
        if (handleSearch !== undefined) {
          handleSearch(value)
        }
        setPage(1)
      } else {
        if (handleSearch !== undefined) {
          handleSearch('')
        }
      }
    },
    [handleSearch]
  )

  const onClear = useCallback(() => {
    if (handleSearch !== undefined) {
      handleSearch('')
    }
    setPage(1)
  }, [handleSearch])

  const renderCell = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any, columnKey: any, index: number) => {
      const cellValue = row[columnKey]

      const renderers: Record<string, ReactNode> = {
        name_role: <TableRole row={row} />,
        user: <TableUser row={row} />,
        updatedAt: <TableIsoDate row={row} />,
        transmission_date: <TableIsoDate row={row} />,
        order_date: <TableIsoDate row={row} />,
        createdAt: <TableCreationDate row={row} />,
        status: (
          <TableIsActive row={row} onChangeStatusRow={onChangeStatusRow} />
        ),
        user_client: <TableUserClient row={row} />,
        full_name: <TableFullName row={row} />,
        country_name: <TableCountry row={row} />,
        user_type: <TableUserType row={row} />,
        'city-country': (
          <TableCountryCity
            row={row.idlot_queue !== undefined ? row.publication : row}
          />
        ),
        port: <TablePort row={row} />,
        type_lot: <TableTypeLot />,
        lot_user: <TableLotUser row={row} />,
        lot_status: <TableLotStatus row={row} />,
        lot_transmission: <TableLotTransmission row={row} />,
        auction_title: (
          <TableAuctionTitle
            row={row.idlot_queue !== undefined ? row.publication : row}
          />
        ),
        auction_active: (
          <TableAuctionActive
            row={row}
            onChangeStatusRow={onChangeActiveStatusRow}
          />
        ),
        base_price: (
          <TableBasePrice
            row={row.idlot_queue !== undefined ? row.publication : row}
          />
        ),
        creation_auction: <TableCreationAuction row={row} />,
        auction_status: <TableAuctionStatus row={row} />,
        position: <TablePosition row={row} index={index} />,
        auction_description: <TableAuctionDescription row={row} />,
        publication_description: <TableAuctionDescription row={row} />,
        payment_status: <TablePaymentStatus row={row} />,
        typePayment: <TablePaymentType row={row} />,
        confirmation_date: <TableConfirmationDate row={row} />,
        payment_date: <TablePaymentDate row={row} />,
        payment_method: <TablePaymentMethod row={row} />,
        payment_amount: <TablePaymentAmount row={row} />,
        confirmation_user: <TableConfirmationUser row={row} />,
        auction_type: <TableAuctionType row={row} />,
        lot_code_auction: <TableLotCode row={row} />,
        auction_end_date: <TableAuctionEndDate row={row} />,
        type_publication: <TableTypePublication row={row} />,
        publication_status: (
          <TablePublicationStatus
            row={row}
            onChangePublicationStatus={onChangePublicationStatus}
          />
        ),
        promotion: <TablePromotion row={row} />,
        order_title: <TableOrderTitle row={row} />,
        origin: <TableOrderOrigin row={row} />,
        order_country: <TableOrderCountry row={row} />,
        order_status: <TableOrderStatus row={row} />,
        order_price: <TableOrderPrice row={row} />,
        actions: (
          <TableActions
            onViewMore={onViewMore}
            onEdit={onEdit}
            onDelete={onDelete}
            onConfirmPayment={onConfirmPayment}
            onDetailPayment={onDetailPayment}
            id={row.id}
            actions={actions}
            row={row}
          />
        ),
        default: (
          <div className='flex justify-center dark:text-white'>{cellValue}</div>
        )
      }

      return renderers[columnKey] ?? renderers.default
    },
    [
      onEdit,
      onDelete,
      actions,
      onViewMore,
      onConfirmPayment,
      onDetailPayment,
      onChangeStatusRow,
      onChangePublicationStatus,
      onChangeActiveStatusRow
    ]
  )

  /**
   * Handles next page navigation.
   */
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  /**
   * Handles previous page navigation.
   */
  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  /**
   * Handles rows per page change event.
   */
  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  /**
   * Handles page change event.
   */
  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col gap-4'>
        <div
          className={cn('flex flex-col md:flex-row gap-3 items-center', {
            'justify-end': !useSearchBar,
            'justify-between': useSearchBar
          })}
        >
          {useSearchBar && (
            <>
              {!useCustomSearchBar && (
                <Input
                  isClearable
                  className='w-full sm:max-w-[44%]'
                  placeholder={searchBarPlaceholder}
                  startContent={<Search className='w-3 h-3 dark:text-white' />}
                  value={filterValue}
                  classNames={{
                    clearButton: 'dark:text-white',
                    inputWrapper: 'dark:border dark:border-white/60'
                  }}
                  onClear={() => {
                    onClear()
                  }}
                  onValueChange={onSearchChange}
                />
              )}
              {useCustomSearchBar && customSearchBar}
            </>
          )}
          <div className='flex w-full md:w-auto md:justify-normal md:flex-row flex-col items-center justify-center gap-3'>
            {filterContent !== undefined && !useFilterInNewRow && filterContent}
            {showColumnsButton && (
              <Dropdown>
                <DropdownTrigger className='w-full md:w-auto mt-1 md:mt-0 flex'>
                  <Button
                    className='bg-slate-300 dark:bg-default-200 dark:border dark:border-white/60 text-blackText dark:text-white'
                    endContent={
                      <ChevronRight className='w-2.5 h-2.5 rotate-90' />
                    }
                    variant='flat'
                  >
                    Columnas
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label='Columnas de la tabla'
                  closeOnSelect={false}
                  selectedKeys={visibleColumns}
                  selectionMode='multiple'
                  onSelectionChange={setVisibleColumns}
                >
                  {columns.map((column) => (
                    <DropdownItem key={column.key} className='capitalize'>
                      {capitalize(column.display)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
            {useAddButton && (
              <GenericButton
                iconStart={<Plus className='w-3 h-3 text-white' />}
                type='button'
                className='w-full md:w-auto text-sm bg-blackText text-white dark:border dark:border-white/60'
                label={newButtonLabel}
                onClick={() => {
                  if (actionOnAdd !== undefined) {
                    actionOnAdd()
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className='flex flex-col md:flex-row md:justify-end gap-3 w-full'>
          {filterContent !== undefined && useFilterInNewRow && filterContent}
        </div>
        <div
          className={cn('flex items-center', {
            'justify-between': showTotalRegister && showFilesPerPage,
            'justify-end': !showTotalRegister,
            'justify-start': !showFilesPerPage
          })}
        >
          {showTotalRegister && (
            <span className='text-default-400 text-small'>
              Total {useCustomPagination ? totalRows : filteredItems.length}{' '}
              {totalLabel}
            </span>
          )}
          {showFilesPerPage && (
            <>
              {!useCustomPageSize && (
                <label className='flex items-center text-default-400 text-small'>
                  Filas por página:
                  <select
                    className='bg-transparent outline-none text-default-400 text-small'
                    onChange={onRowsPerPageChange}
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                  </select>
                </label>
              )}
              {useCustomPageSize && customPageSize}
            </>
          )}
        </div>
      </div>
    )
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    columns,
    newButtonLabel,
    actionOnAdd,
    onClear,
    filterContent,
    searchBarPlaceholder,
    showColumnsButton,
    showFilesPerPage,
    showTotalRegister,
    totalLabel,
    useAddButton,
    useSearchBar,
    filteredItems.length,
    useCustomPagination,
    totalRows,
    useCustomSearchBar,
    customSearchBar,
    customPageSize,
    useCustomPageSize,
    useFilterInNewRow
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-end items-center'>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          classNames={{
            cursor: 'bg-blackText '
          }}
          page={page}
          total={pages}
          isDisabled={isLoading}
          onChange={onChangePage}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button
            isDisabled={pages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1 || isLoading}
            size='sm'
            variant='flat'
            onPress={onNextPage}
          >
            Siguiente
          </Button>
        </div>
      </div>
    )
  }, [isLoading, page, pages, onNextPage, onPreviousPage, onChangePage])

  const renderPagination = () => {
    if (useCustomPagination) {
      if (!isLoading) {
        return customPagination
      } else {
        return undefined
      }
    } else {
      if (showBottomContent && !isLoading && filteredItems.length > 0) {
        return bottomContent
      } else {
        return undefined
      }
    }
  }
  return (
    <>
      <Table
        aria-label='Componente de tabla personalizada'
        classNames={{
          base: `${useScroll ? 'h-auto' : ''}`,
          th: ['text-center text-white bg-blackText/90'],
          wrapper: [classWrapper]
        }}
        selectionMode={
          useSelection ? (useMultipleSelection ? 'multiple' : 'single') : 'none'
        }
        selectionBehavior={useMultipleSelection ? 'toggle' : 'replace'}
        isHeaderSticky
        color={'primary'}
        topContent={showTopContent ? topContent : undefined}
        topContentPlacement='outside'
        bottomContentPlacement='outside'
        bottomContent={renderPagination()}
        {...props}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting={allowsSorting}>
              {column.display}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={
            <div className='align-middle text-center h-40 flex items-center'>
              <Loader />
            </div>
          }
          emptyContent={
            <div className='align-middle justify-center text-center h-40 flex items-center'>
              {emptyLabel}
            </div>
          }
        >
          {items.map((row, index) => (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell>{renderCell(row, columnKey, index)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default CustomTable
