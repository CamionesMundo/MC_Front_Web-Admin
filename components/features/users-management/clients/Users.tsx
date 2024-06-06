import { GenericButton } from '@/components'
import CustomModal from '@/components/modal/CustomModal'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { clientColumns } from '@/const/columns/users'
import {
  type ClientDataType,
  type UserClientResponse
} from '@/types/api/response/user'
import { UserType } from '@/types/enums'
import { Button, type Selection, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import {
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  useEffect
} from 'react'
import ClientDetails from './ClientDetails'
import { ClearFilter, Edit } from '@/icons'
import ModalStatus from '@/components/modal/ModalStatus'
import { useActiveStatusAppUser } from '@/hooks/api/useClients'
import { type GenericResponse } from '@/types/api'
import { showToast } from '@/hooks/useToast'
import useQueryParams from '@/hooks/useQueryParams'
import SearchBar from '@/components/inputs/SearchBar'
import CustomPageSize from '@/components/selects/CustomPageSize'
import FilterButtonSelection, {
  type OptionsFilterProps
} from '@/components/selects/FilterButtonSelection'

type UsersProps = {
  clients: ClientDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const dataUserTypes: OptionsFilterProps[] = [
  {
    key: 'all',
    display: 'Todos'
  },
  {
    key: UserType.Buyer.toString(),
    display: 'Comprador'
  },
  {
    key: UserType.Seller.toString(),
    display: 'Vendedor'
  }
]
const Users = ({
  clients,
  isLoading,
  bottomContent,
  totalRows
}: UsersProps) => {
  const router = useRouter()
  const { setQueryParams } = useQueryParams()
  const {
    mutateAsync: activeOrInactive,
    isPending: isLoadingActiveOrInactive
  } = useActiveStatusAppUser()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModalStatus,
    onOpen: onOpenModalStatus,
    onClose: onCloseModalStatus
  } = useDisclosure()
  const [currentIdUser, setCurrentIdUser] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<Selection>(new Set(['all']))
  const [selectedKey, setSelectedKey] = useState<string>('all')
  const [currentUserSelected, setCurrentUserSelected] = useState<
  ClientDataType | undefined
  >(undefined)

  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      const statusArray = Array.from(keys)
      const value = statusArray[0]
      if (value === undefined) {
        setSelectedType(new Set(['all']))
        setQueryParams({ page: 1, userType: undefined, query: undefined })
        setSelectedKey('all')
        return
      }
      setSelectedType(keys)

      setQueryParams({ page: 1, userType: value, query: undefined })
      setSelectedKey(value.toString())
    },
    [setQueryParams]
  )

  const filteredItems = useMemo(() => {
    if (clients !== undefined) {
      const filtered = clients?.length > 0 ? [...clients] : []

      return filtered
    }

    return []
  }, [clients])
  const onEditClient = (id: number) => {
    router.push(`/users-management/clients/edit/id/${id}`)
  }

  const onClickSwitch = (row: ClientDataType) => {
    setCurrentUserSelected(row)
    onOpenModalStatus()
  }

  const handleOnMoreDetails = (id: number) => {
    setCurrentIdUser(id)
    onOpen()
  }

  const gotoEditUser = (id: number) => {
    router.push(`/users-management/clients/edit/id/${id}`)
  }
  const isActive = useMemo(() => {
    if (currentUserSelected !== undefined) {
      return currentUserSelected.active ?? false
    }
    return false
  }, [currentUserSelected])

  const handleChangeSwitch = async () => {
    await handleActiveOrInactiveUser()
    onCloseModalStatus()
  }
  const handleActiveOrInactiveUser = async () => {
    if (currentUserSelected !== undefined) {
      await activeOrInactive(
        { id: currentUserSelected?.iduser ?? 0, active: !isActive },
        {
          onSuccess: (
            data: GenericResponse<UserClientResponse> | undefined
          ) => {
            if (data?.error !== undefined) {
              showToast(data.message, 'error')
            } else {
              showToast(data?.message ?? '', 'success')
              router.refresh()
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
      userType: undefined
    })

    router.refresh()
  }, [setQueryParams, router])

  const filterTypeButton = useMemo(() => {
    return (
      <div className=' w-full md:auto flex flex-col md:flex-row gap-6 items-center'>
        <div className=' md:max-w-72 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Tipo'
            label='Tipo: '
            placeholder='Filtrar por:'
            selectedKeys={selectedType}
            onSelectionChange={handleSelectionChange}
            options={dataUserTypes}
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
  }, [selectedType, handleSelectionChange, handleClearFilters, isLoading])

  useEffect(() => {
    if (selectedKey === 'all') {
      setQueryParams({ userType: undefined })
    }
  }, [selectedKey, setQueryParams])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Usuarios' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección a los usuarios registrados en la aplicación
          de cliente.
        </p>
      </div>
      <CustomTable<ClientDataType>
        filteredItems={filteredItems}
        columns={clientColumns}
        useAddButton={false}
        emptyLabel={isLoading ? '' : 'No tienes registros'}
        totalLabel='clientes'
        initialVisibleColumns={clientColumns
          .map((column) => column.key)
          .filter((key) => key !== 'updatedAt')}
        onEdit={onEditClient}
        onViewMore={handleOnMoreDetails}
        onChangeStatusRow={onClickSwitch}
        onDelete={() => {}}
        isLoading={isLoading}
        filterContent={filterTypeButton}
        actions={{
          useViewMore: true,
          useEdit: true,
          useDelete: true
        }}
        usePage={false}
        totalRows={totalRows}
        useCustomPagination={true}
        customPagination={isLoading ? null : bottomContent}
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por nombre, correo y/o nombre de usuario'
            styles='w-full flex-1'
          />
        }
        useCustomPageSize={true}
        customPageSize={<CustomPageSize />}
      />
      <CustomModal
        titleModal={'Detalles del usuario'}
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
        footer={
          <div className='w-full flex justify-end'>
            <div className='md:w-1/4 sm:w-1/2 w-full'>
              <GenericButton
                type='button'
                label={'Editar datos'}
                startContent={<Edit className='w-3.5 h-3.5' />}
                onClick={() => {
                  gotoEditUser(currentIdUser ?? 0)
                }}
              />
            </div>
          </div>
        }
      >
        <ClientDetails currentIdUser={currentIdUser} />
      </CustomModal>
      <ModalStatus
        isOpen={isOpenModalStatus}
        onClose={onCloseModalStatus}
        isLoading={isLoadingActiveOrInactive}
        action={async () => {
          await handleChangeSwitch()
        }}
        actionLabel={isActive ? 'Desactivar' : 'Activar'}
        title={isActive ? 'Desactivar Usuario' : 'Activar Usuario'}
        description={
          <p className='text-black/80 dark:text-white text-sm'>
            {`Estas a un paso de ${
              isActive ? 'desactivar' : 'activar'
            } al usuario`}
            <span className='font-bold text-blackText dark:text-white'>{` ${currentUserSelected?.username}`}</span>
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

export default Users
