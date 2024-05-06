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
  DropdownItem
} from '@nextui-org/react'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Loader } from '../ui/Loader'
import { capitalize, parseIsoDate } from '@/lib/utils/utils'
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
  TablePort
} from './render-cell'
import TableRole from './render-cell/TableRole'
import { type WithId } from '@/types/api/response/auth'

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
 *
 * The `CustomTable` component renders a table with customizable features such as sorting, pagination,
 * search, column visibility, and action buttons. It utilizes various components from NextUI and custom
 * rendering components for table cells. The component provides extensive customization options and
 * flexibility to meet different use cases.
 */

type CustomTableProps<T extends WithId> = {
  columns: ColumnsProps[]
  filteredItems: T[]
  filterValue: string
  handleSearch: (value: string) => void
  isLoading?: boolean
  emptyLabel?: string
  totalLabel?: string
  newButtonLabel?: string
  allowsSorting?: boolean
  initialVisibleColumns?: string[]
  onViewMore?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
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
}

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
  }
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
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

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
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  /**
   * Total number of pages based on filtered items and rows per page.
   */

  const pages = useMemo(() => {
    return Math.ceil(filteredItems.length / rowsPerPage)
  }, [filteredItems.length, rowsPerPage])

  const onSearchChange = useCallback(
    (value: string) => {
      if (value !== undefined) {
        handleSearch(value)
        setPage(1)
      } else {
        handleSearch('')
      }
    },
    [handleSearch]
  )

  const onClear = useCallback(() => {
    handleSearch('')
    setPage(1)
  }, [handleSearch])

  /**
   * Renders a cell in the table based on column key.
   */
  const renderCell = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any, columnKey: any) => {
      const cellValue = row[columnKey]

      switch (columnKey) {
        case 'name_role':
          return <TableRole row={row} />
        case 'user':
          return <TableUser row={row} />
        case 'updatedAt':
          return (
            <div className='text-center dark:text-white'>
              {parseIsoDate((row.updatedAt.toString() as string) ?? '')}
            </div>
          )
        case 'status':
          return <TableIsActive row={row} />
        case 'user_client':
          return <TableUserClient row={row} />
        case 'full_name':
          return <TableFullName row={row} />
        case 'country_name':
          return <TableCountry row={row} />
        case 'user_type':
          return <TableUserType row={row} />
        case 'city-country':
          return <TableCountryCity row={row} />
        case 'port':
          return <TablePort row={row} />
        case 'actions':
          return (
            <TableActions
              onViewMore={onViewMore}
              onEdit={onEdit}
              onDelete={onDelete}
              id={row.id}
              actions={actions}
            />
          )
        default:
          return (
            <div className='flex justify-center dark:text-white'>
              {cellValue}
            </div>
          )
      }
    },
    [onEdit, onDelete, actions, onViewMore]
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
            <Input
              isClearable
              className='w-full sm:max-w-[44%]'
              placeholder={searchBarPlaceholder}
              startContent={<Search className='w-3 h-3 dark:text-white' />}
              value={filterValue}
              classNames={{ clearButton: 'dark:text-white' }}
              onClear={() => {
                onClear()
              }}
              onValueChange={onSearchChange}
            />
          )}
          <div className='flex w-full md:w-auto md:justify-normal items-center justify-center gap-3'>
            {filterContent !== undefined && filterContent}
            {showColumnsButton && (
              <Dropdown>
                <DropdownTrigger className='hidden sm:flex'>
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
                className='text-sm bg-blackText text-white dark:border dark:border-white/60'
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
        <div
          className={cn('flex items-center', {
            'justify-between': showTotalRegister && showFilesPerPage,
            'justify-end': !showTotalRegister,
            'justify-start': !showFilesPerPage
          })}
        >
          {showTotalRegister && (
            <span className='text-default-400 text-small'>
              Total {filteredItems.length} {totalLabel}
            </span>
          )}
          {showFilesPerPage && (
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
    filteredItems.length
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
  return (
    <>
      <Table
        aria-label='Componente de tabla personalizada'
        classNames={{
          th: ['text-center text-white bg-blackText/90'],
          wrapper: [classWrapper]
        }}
        isHeaderSticky
        color={'primary'}
        topContent={showTopContent ? topContent : undefined}
        topContentPlacement='outside'
        bottomContentPlacement='outside'
        bottomContent={
          showBottomContent && !isLoading ? bottomContent : undefined
        }
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
          {items.map((row) => (
            <TableRow key={row.id}>
              {(columnKey) => (
                <TableCell>{renderCell(row, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default CustomTable
