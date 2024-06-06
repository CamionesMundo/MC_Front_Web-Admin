import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import ModalStatus from '@/components/modal/ModalStatus'
import CustomPageSize from '@/components/selects/CustomPageSize'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { publicationsFiltersColumns } from '@/const/columns/post'
import { useActiveStatusPublication } from '@/hooks/api/usePublications'
import useQueryParams from '@/hooks/useQueryParams'
import { showToast } from '@/hooks/useToast'
import { ClearFilter } from '@/icons'
import { type GenericResponse } from '@/types/api'
import {
  type GeneralPublicationResponse,
  type GeneralPublicationDataType
} from '@/types/api/response/publication'
import { Button, useDisclosure } from '@nextui-org/react'
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
  const { setQueryParams } = useQueryParams()
  const {
    mutateAsync: activeOrInactive,
    isPending: isLoadingActiveOrInactive
  } = useActiveStatusPublication()
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

  const filteredItems = useMemo(() => {
    if (products !== undefined) {
      const filtered = products?.length > 0 ? [...products] : []

      return filtered
    }

    return []
  }, [products])

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

  const handleClearFilters = useCallback(() => {
    setQueryParams({
      page: 1,
      pageSize: 10,
      query: undefined,
      startDate: undefined,
      endDate: undefined
    })

    router.refresh()
  }, [setQueryParams, router])

  const filterPostButtons = useMemo(() => {
    return (
      <div className='w-full md:w-auto flex flex-col md:flex-row gap-6 items-center'>
        <div className=' max-w-80 w-full'>
          <AsyncRangePicker />
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
  }, [handleClearFilters])

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
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por ID publicación, título, país'
            styles='w-full flex-1'
          />
        }
        useCustomPageSize={true}
        customPageSize={<CustomPageSize />}
        filterContent={filterPostButtons}
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
