import { BackComponent } from '@/components/ui/BackComponent'
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import {
  Button,
  Pagination,
  Spacer,
  Divider,
  type Selection
} from '@nextui-org/react'
import { useGetAllAuctions, useGetLotById } from '@/hooks/api/useLots'
import CustomTable from '@/components/table/CustomTable'
import { type AuctionsDataType } from '@/types/api/response/lots'
import { auctionsColumns } from '@/const/columns/post'
import { CustomInput, GenericButton } from '@/components'
import AdminsAutocomplete from '@/components/autocomplete/AdminsAutocomplete'
import { useLotFormStore } from '@/store/useLotForm'
import { useParams } from 'next/navigation'
import { XMarkCircle } from '@/icons'
import { DateTime } from 'luxon'
import ModalDelete from '@/components/modal/ModalDelete'
import { Loader } from '@/components/ui/Loader'
import useLotsActions, {
  type OrderPublication
} from '@/hooks/lots/useLotsActions'
import useLotsUtils from '@/hooks/lots/useLotsUtils'

type LotFormProps = {
  isEditing?: boolean
}

type TypeParams = {
  id?: string
}

const LotForm = ({ isEditing = false }: LotFormProps) => {
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0
  const { data: lotResponse, isLoading: isLotLoading } = useGetLotById(
    Number(id)
  )

  const {
    currentActionner,
    selectedRows,
    transmissionDate,
    updateActionner,
    updateDate,
    reset,
    updateSelectedRows
  } = useLotFormStore()

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [totalData, setTotalData] = useState<AuctionsDataType[]>([])
  const [tempSelectedKeys, setTempSelectedKeys] = useState<string[]>([])
  const [tempPublications, setTempPublications] = useState<AuctionsDataType[]>(
    []
  )
  const [orderTempPublications, setOrderTempPublications] = useState<
  OrderPublication[]
  >([])
  const [notExistIdListInTotal, setNotExistIdListInTotal] = useState<string[]>(
    []
  )

  const [page, setPage] = useState(1)
  const [filterValue, setFilterValue] = useState('')
  const { data: response, isLoading, refetch } = useGetAllAuctions(page, true)
  const hasSearchFilter = Boolean(filterValue)

  const lot = useMemo(() => {
    if (lotResponse !== undefined) {
      return lotResponse.data
    }
    return undefined
  }, [lotResponse])

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  const filteredItems = useMemo(() => {
    if (response !== undefined) {
      const mapped = response?.data?.publications?.map((auction) => ({
        ...auction,
        id: auction.idpublication
      }))

      let filtered = mapped?.length > 0 ? [...mapped] : []

      if (hasSearchFilter) {
        filtered = filtered.filter((item) =>
          item.vehicle.name_vehicle
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [response, filterValue, hasSearchFilter])

  const {
    isCreateLoading,
    handleSubmit,
    errors,
    isUpdateLoading,
    onDelete,
    openModalDelete,
    currentToDelete,
    isOpen,
    isClicking,
    onClose,
    deleteItemSelected,
    handleSelectionOnEdit,
    handleSelection
  } = useLotsActions({
    id: Number(id),
    setPage,
    refetch,
    isEditing,
    setOrderTempPublications,
    setSelectedKeys,
    setTempSelectedKeys,
    totalData,
    filteredItems,
    orderTempPublications,
    notExistIdListInTotal,
    tempPublications
  })
  const { getIdAuction, getPublications } = useLotsUtils({ currentToDelete })

  const onBack = () => {
    setTimeout(() => {
      reset()
    }, 300)
  }

  const pages = useMemo(() => {
    if (response !== undefined) {
      return response.data.totalPages
    } else {
      return 0
    }
  }, [response])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onChangePage = useCallback((page: number) => {
    setPage(page)
  }, [])

  useEffect(() => {
    if (isEditing && lot !== undefined) {
      const { publications, idPublications, idWithOrderPublications } =
        getPublications(lot)

      const dataCharged = totalData.map((data) => data.idpublication.toString()) // Total Data Charged
      if (isClicking) {
        const idIncludes = dataCharged.filter((id) =>
          tempSelectedKeys.includes(id)
        )

        const orderedIdIncludes = tempSelectedKeys.filter((id) =>
          idIncludes.includes(id)
        )

        const idNotIncludesInTempSelectedKeys = tempSelectedKeys.filter(
          (id) => !idIncludes.includes(id)
        )

        setNotExistIdListInTotal(idNotIncludesInTempSelectedKeys)

        setSelectedKeys(new Set(orderedIdIncludes))
      } else {
        const idIncludes = dataCharged.filter((id) =>
          idPublications.includes(id)
        )

        const idNotIncludes = idPublications.filter(
          (id) => !idIncludes.includes(id)
        )

        if (idNotIncludes.length > 0) {
          setNotExistIdListInTotal(idNotIncludes)
        }

        if (tempSelectedKeys.length === 0 && idNotIncludes.length > 0) {
          setTempSelectedKeys(idPublications)
          setTempPublications(publications)
          setOrderTempPublications(idWithOrderPublications)
          updateSelectedRows(publications)
          setSelectedKeys(new Set(idIncludes))
          const dateTimeDB = lot?.lot.transmission_date.toString() ?? ''
          const utcDateTime = DateTime.fromISO(dateTimeDB, { zone: 'utc' })
          const localDateTime = utcDateTime.setZone(DateTime.local().zoneName)
          const localTimeStr = localDateTime.toFormat("yyyy-MM-dd'T'HH:mm")

          updateDate(localTimeStr)
          updateActionner(lot.lot.user_actionner)
        }
      }
    }
  }, [
    isEditing,
    lot,
    updateDate,
    updateActionner,
    updateSelectedRows,
    totalData,
    tempSelectedKeys,
    isClicking,
    orderTempPublications,
    getPublications
  ])

  useEffect(() => {
    if (response === undefined) return
    const mapped = response?.data?.publications?.map((auction) => ({
      ...auction,
      id: auction.idpublication
    }))
    const newData = mapped.filter(
      (auction) =>
        !totalData.some(
          (existingAuction) =>
            auction.idpublication === existingAuction.idpublication
        )
    )

    setTotalData((prevData) => [...prevData, ...newData])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateDate(value)
  }

  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent
          title={'Lotes'}
          subtitle={isEditing ? 'Editar' : 'Crear'}
          onAction={onBack}
        />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          {isEditing
            ? 'Modifica los campos que necesites para editar y actualizar un lote de subasta'
            : 'Llena todos los campos necesarios del formulario para crear un lote de subasta, todos los artículos se agruparan y presentaran en la misma transmisión'}
        </p>
      </div>
      <Spacer />
      <Spacer />
      <Divider />
      {isLotLoading && (
        <div className='align-middle text-center h-40 flex justify-center items-center w-full'>
          <Loader />
        </div>
      )}
      {!isLotLoading && (
        <>
          <Spacer />
          <Spacer />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
            <div className='flex flex-col'>
              <h1 className='font-semibold text-blackText dark:text-white'>
                Fecha de Transmisión
              </h1>
              <p className='text-xs mb-2 dark:text-white'>
                {
                  'Elige la fecha en que se subastará el Lote ( Será la fecha de transmisión en vivo )'
                }
              </p>
              <div className='w-full'>
                <CustomInput
                  name='transmissionDate'
                  type='datetime-local'
                  value={transmissionDate}
                  onChange={handleInputChange}
                  color={
                    errors?.transmissionDate !== undefined
                      ? 'danger'
                      : 'primary'
                  }
                  label='Fecha de Transmisión'
                  placeholder='Ej'
                  error={errors?.transmissionDate?.toString() ?? ''}
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <h1 className='font-semibold text-blackText dark:text-white'>
                Martillero
              </h1>
              <p className='text-xs mb-2 dark:text-white'>
                {'Elige el Martillero que será responsable del lote'}
              </p>
              <div className='w-full'>
                <AdminsAutocomplete
                  currentAdmin={currentActionner}
                  changeAdmin={updateActionner}
                  error={errors?.currentActionner?.toString() ?? ''}
                  useMartillero
                  labelAutocomplete='Martillero'
                />
              </div>
            </div>

            <div className='w-1/2'>
              <GenericButton
                onClick={handleSubmit}
                type='button'
                label={
                  isEditing
                    ? isUpdateLoading
                      ? 'Actualizando'
                      : 'Actualizar Lote'
                    : isCreateLoading
                      ? 'Creando'
                      : 'Crear Lote'
                }
                isLoading={isEditing ? isUpdateLoading : isCreateLoading}
                disabled={isEditing ? isUpdateLoading : isCreateLoading}
              />
            </div>
          </div>
          <div
            className={`flex ${isEditing ? ' flex-col-reverse' : 'flex-col'}`}
          >
            <div className='mt-3'>
              <Spacer />
              <Spacer />
              <Divider />
              <Spacer />
              <Spacer />
              <div className='grid grid-cols-2 mt-3 mb-3'>
                <div className='flex flex-col'>
                  <h1 className='font-semibold text-blackText dark:text-white'>
                    Selección de Vehículos
                  </h1>
                  <p className='text-xs mb-2 dark:text-white'>
                    Selecciona todos los vehículos que van a formar parte del
                    lote
                  </p>
                </div>
                <div className='col-span-1 flex justify-end'>
                  {isEditing && (
                    <div className='w-1/2'>
                      <GenericButton
                        onClick={handleSubmit}
                        type='button'
                        label={
                          isUpdateLoading
                            ? 'Guardando'
                            : 'Guardar Seleccionados'
                        }
                        isLoading={
                          isEditing ? isUpdateLoading : isCreateLoading
                        }
                        disabled={isEditing ? isUpdateLoading : isCreateLoading}
                      />
                    </div>
                  )}
                </div>
              </div>
              <CustomTable<AuctionsDataType>
                filteredItems={filteredItems}
                filterValue={filterValue}
                handleSearch={onSearchChange}
                columns={auctionsColumns}
                emptyLabel={isLoading ? '' : 'No tienes ninguna subasta creada'}
                totalLabel='subastas'
                initialVisibleColumns={auctionsColumns.map(
                  (column) => column.key
                )}
                useAddButton={false}
                isLoading={isLoading}
                useMultipleSelection={true}
                customPagination={bottomContent}
                showFilesPerPage={false}
                showColumnsButton={false}
                useCustomPagination={true}
                totalRows={response?.data.totalRows}
                actions={{
                  useViewMore: true,
                  useEdit: false,
                  useDelete: false
                }}
                totalData={totalData}
                useSelection
                selectedKeys={selectedKeys}
                onSelectionChange={
                  isEditing ? handleSelectionOnEdit : handleSelection
                }
              />
            </div>
            <div className='mt-3'>
              <Spacer />
              <Spacer />
              <Divider />
              <Spacer />
              <Spacer />
              <h1
                className={`font-semibold ${
                  errors?.selectedRows !== undefined
                    ? 'text-danger '
                    : 'text-blackText dark:text-white'
                }`}
              >
                Vehículos Seleccionados {`(${selectedRows.length})`}
              </h1>
              <Spacer />
              <Spacer />
              <CustomTable<AuctionsDataType>
                filteredItems={selectedRows}
                topContent={false}
                columns={auctionsColumns}
                emptyLabel={
                  isLoading ? '' : 'No tienes ninguna vehículo seleccionado'
                }
                initialVisibleColumns={auctionsColumns.map(
                  (column) => column.key
                )}
                onDelete={isEditing ? openModalDelete : deleteItemSelected}
                actions={{
                  useDelete: true,
                  useEdit: false,
                  useViewMore: false,
                  iconDelete: <XMarkCircle className='w-5 h-5 text-danger' />,
                  labelDelete: 'Quitar de la lista'
                }}
                isLoading={false}
                bottomContent={false}
                useMultipleSelection={false}
                useScroll={true}
                usePage={false}
              />
            </div>
          </div>
          <ModalDelete
            action={onDelete}
            isOpen={isOpen}
            title='Eliminar vehículo seleccionado'
            loadingAction={isUpdateLoading}
            onCancel={onClose}
            onClose={onClose}
            actionLabel={
              isUpdateLoading ? 'Actualizando' : 'Eliminar y Actualizar'
            }
            description={
              <p className='dark:text-white text-default-600 text-sm'>
                Estas seguro que quieres quitar de la lista al vehículo{' '}
                <span className='font-semibold'>{getIdAuction()}</span> .
                Recuerda que al dar clic en el botón de Eliminar se actualizará
                y guardaran los cambios de la lista en la Base de datos.{' '}
              </p>
            }
          />
        </>
      )}
    </>
  )
}

export default LotForm
