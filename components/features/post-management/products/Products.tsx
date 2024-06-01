import ModalStatus from '@/components/modal/ModalStatus'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { publicationsFiltersColumns } from '@/const/columns/post'
import { useActiveStatusPublication } from '@/hooks/api/usePublications'
import { showToast } from '@/hooks/useToast'
import { type GenericResponse } from '@/types/api'
import {
  type GeneralPublicationResponse,
  type GeneralPublicationDataType
} from '@/types/api/response/publication'
import { useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useState, type ReactNode, useCallback, useMemo } from 'react'

type AuctionsProps = {
  products: GeneralPublicationDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const Products = ({
  products,
  isLoading,
  bottomContent,
  totalRows
}: AuctionsProps) => {
  const router = useRouter()
  const {
    mutateAsync: activeOrInactive,
    isPending: isLoadingActiveOrInactive
  } = useActiveStatusPublication()
  const [filterValue, setFilterValue] = useState('')
  const hasSearchFilter = Boolean(filterValue)
  const {
    isOpen: isOpenModalStatus,
    onOpen: onOpenModalStatus,
    onClose: onCloseModalStatus
  } = useDisclosure()

  const [currentPostSelected, setCurrentPostSelected] = useState<
  GeneralPublicationDataType | undefined
  >(undefined)

  const onViewPostDetails = (id: number) => {
    router.push(`/post-management/post/publication/id/${id}`)
  }

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])
  const filteredItems = useMemo(() => {
    if (products !== undefined) {
      let filtered = products?.length > 0 ? [...products] : []

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
  }, [products, filterValue, hasSearchFilter])

  const onClickSwitch = (row: GeneralPublicationDataType) => {
    setCurrentPostSelected(row)
    onOpenModalStatus()
  }

  const isActive = useMemo(() => {
    if (currentPostSelected !== undefined) {
      return currentPostSelected.active ?? false
    }
    return false
  }, [currentPostSelected])

  const handleChangeSwitch = async () => {
    await handleActiveOrInactivePublication()
    onCloseModalStatus()
  }
  const handleActiveOrInactivePublication = async () => {
    if (currentPostSelected !== undefined) {
      await activeOrInactive(
        {
          id: currentPostSelected?.idpublication ?? 0,
          active: !isActive
        },
        {
          onSuccess: (
            data: GenericResponse<GeneralPublicationResponse> | undefined
          ) => {
            if (data?.error !== undefined) {
              showToast(data.message, 'error')
            } else {
              showToast(data?.message ?? '', 'success')
            }
          }
        }
      )
    }
  }
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Gestión de Publicaciones' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección todas las publicaciones que fueron creadas
          desde el app móvil.
        </p>
      </div>
      <CustomTable<GeneralPublicationDataType>
        filteredItems={filteredItems}
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={publicationsFiltersColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna publicación creada'}
        totalLabel='publicaciones'
        initialVisibleColumns={publicationsFiltersColumns
          .map((column) => column.key)
          .filter(
            (key) => key !== 'publication_description' && key !== 'promotion'
          )}
        onViewMore={onViewPostDetails}
        onDelete={() => {}}
        onEdit={() => {}}
        onChangePublicationStatus={onClickSwitch}
        useAddButton={false}
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
        showFilesPerPage={false}
      />
      <ModalStatus
        isOpen={isOpenModalStatus}
        onClose={onCloseModalStatus}
        isLoading={isLoadingActiveOrInactive}
        action={async () => {
          await handleChangeSwitch()
        }}
        actionLabel={isActive ? 'Desactivar' : 'Activar'}
        title={isActive ? 'Desactivar Publicación' : 'Activar Publicación'}
        description={
          <p className='text-black/80 dark:text-white text-sm'>
            {`Estas a un paso de ${
              isActive ? 'desactivar' : 'activar'
            } la publicación con código`}
            <span className='font-bold text-blackText dark:text-white'>{` ${currentPostSelected?.publication_code}`}</span>
            {'. Si estas seguro que deseas hacerlo, presiona en el botón'}
            <span
              className={`font-bold ${
                isActive ? 'text-red-700' : 'text-green-700'
              }`}
            >{` ${isActive ? 'DESACTIVAR' : 'ACTIVAR'}`}</span>
            {' para continuar'}
          </p>
        }
      />
    </>
  )
}

export default Products
