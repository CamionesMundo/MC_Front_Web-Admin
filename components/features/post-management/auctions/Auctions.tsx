import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { auctionsFiltersColumns } from '@/const/columns/post'
import { type AuctionFilterDataType } from '@/types/api/response/publication'
import { useRouter } from 'next/navigation'
import React, { useState, type ReactNode, useCallback, useMemo } from 'react'

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
  const router = useRouter()
  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)
  const onCreateLot = () => {
    router.push('/post-management/lots/create')
  }
  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])
  const filteredItems = useMemo(() => {
    if (auctions !== undefined) {
      let filtered = auctions?.length > 0 ? [...auctions] : []

      if (hasSearchFilter) {
        filtered = filtered.filter((item) =>
          item.vehicle.name_vehicle
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [auctions, filterValue, hasSearchFilter])
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
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={auctionsFiltersColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna subasta creada'}
        totalLabel='subastas'
        initialVisibleColumns={auctionsFiltersColumns
          .map((column) => column.key)
          .filter((key) => key !== 'auction_description')}
        onViewMore={() => {}}
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
      />
    </>
  )
}

export default Auctions
