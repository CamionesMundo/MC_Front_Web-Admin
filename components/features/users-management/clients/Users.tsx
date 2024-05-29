import { FilterSelect, GenericButton } from '@/components'
import CustomModal from '@/components/modal/CustomModal'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { clientColumns } from '@/const/columns/users'
import {
  type UserAppType,
  type ClientDataType,
  type UserClientResponse
} from '@/types/api/response/user'
import { UserType } from '@/types/enums'
import { SelectItem, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useState, useCallback, useMemo } from 'react'
import ClientDetails from './ClientDetails'
import { Edit } from '@/icons'
import ModalStatus from '@/components/modal/ModalStatus'
import { useActiveStatusAppUser } from '@/hooks/api/useClients'
import { type GenericResponse } from '@/types/api'
import { showToast } from '@/hooks/useToast'

type UsersProps = {
  clients: ClientDataType[]
  isLoading: boolean
}

const dataUserTypes: UserAppType[] = [
  {
    key: UserType.Buyer,
    display: 'Comprador'
  },
  {
    key: UserType.Seller,
    display: 'Vendedor'
  }
]
const Users = ({ clients, isLoading }: UsersProps) => {
  const router = useRouter()
  const {
    mutateAsync: activeOrInactive,
    isPending: isLoadingActiveOrInactive
  } = useActiveStatusAppUser()
  const [filterValue, setFilterValue] = useState('')
  const [selectedType, setSelectedType] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenModalStatus,
    onOpen: onOpenModalStatus,
    onClose: onCloseModalStatus
  } = useDisclosure()
  const [currentIdUser, setCurrentIdUser] = useState<number | null>(null)
  const [currentUserSelected, setCurrentUserSelected] = useState<
  ClientDataType | undefined
  >(undefined)
  const hasSearchFilter = Boolean(filterValue)
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value)
  }

  const filteredItems = useMemo(() => {
    if (clients !== undefined) {
      let filtered = clients?.length > 0 ? [...clients] : []

      if (hasSearchFilter) {
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.username?.toLowerCase().includes(filterValue.toLowerCase()) ||
            item.email?.toLowerCase().includes(filterValue.toLowerCase())
        )
      }

      if (selectedType !== '') {
        filtered = filtered.filter(
          (item) => item.user_type === Number(selectedType)
        )
      }

      return filtered
    }

    return []
  }, [clients, filterValue, selectedType, hasSearchFilter])
  const onEditClient = (id: number) => {
    router.push(`/users-management/clients/edit/id/${id}`)
  }
  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClickSwitch = (row: ClientDataType) => {
    setCurrentUserSelected(row)
    onOpenModalStatus()
  }
  const filterTypeButton = useMemo(() => {
    return (
      <div className=' w-48'>
        <FilterSelect
          labelPlacement={'outside-left'}
          aria-label='Tipo de usuario'
          placeholder='Filtrar por:'
          selectedKeys={selectedType}
          onChange={handleSelectionChange}
        >
          {dataUserTypes.map((role) => (
            <SelectItem key={role.key} value={role.key}>
              {role.display}
            </SelectItem>
          ))}
        </FilterSelect>
      </div>
    )
  }, [selectedType])

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
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={clientColumns}
        useAddButton={false}
        emptyLabel={isLoading ? '' : 'No tienes registros'}
        totalLabel='clientes'
        searchBarPlaceholder={'Buscar por nombre, correo y/o nombre de usuario'}
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
