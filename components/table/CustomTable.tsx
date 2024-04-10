import { CheckCircle, ChevronRight, Plus, Search, XMarkCircle } from '@/icons'
import { type ColumnsProps } from '@/types/ui/table'

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
  Switch,
  Tooltip
} from '@nextui-org/react'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'
import { Loader } from '../ui/Loader'
import { capitalize, parseIsoDate } from '@/lib/utils/utils'
import { GenericButton } from '../buttons'
import { cn } from '@/lib/clsx/clsx'
import { TableActions, TableUser } from './render-cell'
import TableRole from './render-cell/TableRole'
import { type WithId } from '@/types/api/response/auth'

type CustomTableProps<T extends WithId> = {
  columns: ColumnsProps[]
  data: T[]
  filteredItems: T[]
  filterValue: string
  handleSearch: (value: string) => void
  isLoading?: boolean
  emptyLabel?: string
  totalLabel?: string
  newButtonLabel?: string
  allowsSorting?: boolean
  initialVisibleColumns?: string[]
  onEdit?: (id: number) => void
  onDelete?: (row: any) => void
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
}

const CustomTable = <T extends WithId>({
  columns,
  data,
  filteredItems,
  filterValue,
  handleSearch,
  isLoading = false,
  emptyLabel = 'No existen registros',
  totalLabel = 'Registros',
  newButtonLabel = 'Nuevo registro',
  allowsSorting = false,
  initialVisibleColumns = [],
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
  filterContent
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
  }, [visibleColumns])

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
  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      handleSearch(value)
      setPage(1)
    } else {
      handleSearch('')
    }
  }, [])

  const onClear = useCallback(() => {
    handleSearch('')
    setPage(1)
  }, [])

  /**
   * Renders a cell in the table based on column key.
   */
  const renderCell = useCallback(
    (row: any, columnKey: any) => {
      const cellValue = row[columnKey]

      switch (columnKey) {
        case 'canCreate':
        case 'canRead':
        case 'canDelete':
        case 'canUpdate':
        case 'useSubmodule':
        case 'isRestricted':
          return (
            <div className='flex justify-center items-center'>
              {cellValue === true
                ? (
                <CheckCircle className='w-5 h-5' />
                  )
                : (
                <XMarkCircle className='w-5 h-5' />
                  )}
            </div>
          )
        case 'name_role':
          return <TableRole row={row} />
        case 'user':
          return <TableUser row={row} />
        case 'updatedAt':
          return (
            <div className='text-center'>
              {parseIsoDate((row.updatedAt.toString() as string) ?? '')}
            </div>
          )
        case 'status':
          return (
            <Tooltip content='Activar/Desactivar' color='foreground'>
              <div className='flex justify-center'>
                <Switch size='sm' defaultSelected color='primary' />
              </div>
            </Tooltip>
          )
        case 'actions':
          return <TableActions onEdit={onEdit} onDelete={onDelete} row={row} />
        default:
          return <div className='flex justify-center'>{cellValue}</div>
      }
    },
    [onEdit, onDelete]
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
              startContent={<Search className='w-3 h-3' />}
              value={filterValue}
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
                    className='bg-slate-300 text-blackText'
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
                className='text-sm bg-blackText text-white'
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
              Total {data.length} {totalLabel}
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
    data.length
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
        selectionMode='single'
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
