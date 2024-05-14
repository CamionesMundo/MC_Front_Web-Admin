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
import {
  useCreateLot,
  useGetAllAuctions,
  useGetLotById,
  useUpdateLot
} from '@/hooks/api/useLots'
import CustomTable from '@/components/table/CustomTable'
import {
  type LotResponse,
  type AuctionsDataType,
  type LotFullDataResponse
} from '@/types/api/response/lots'
import { auctionsColumns } from '@/const/columns/post'
import { CustomInput, GenericButton } from '@/components'
import { type FormErrorMessages } from '@/helpers/error'
import AdminsAutocomplete from '@/components/autocomplete/AdminsAutocomplete'
import { type GenericResponse } from '@/types/api'
import { useLotFormStore } from '@/store/useLotForm'
import { showToast } from '@/hooks/useToast'
import {
  type BodyLotPublication,
  type BodyLotForm,
  type BodyUpdateLotForm
} from '@/types/api/request/lots'
import { LotStatus } from '@/types/enums'
import { useParams, useRouter } from 'next/navigation'
import { LOTS_LIST_ROUTE } from '@/const/routes'
import { XMarkCircle } from '@/icons'

type LotFormProps = {
  isEditing?: boolean
}

type TypeParams = {
  id?: string
}

type OrderPublication = {
  id: number
  position?: number | null
}
const LotForm = ({ isEditing = false }: LotFormProps) => {
  const params = useParams<TypeParams>()
  const id = params?.id ?? 0
  const { data: lotResponse } = useGetLotById(Number(id))
  const { mutateAsync: createLot, isPending: isCreateLoading } = useCreateLot()
  const { mutateAsync: updateLot, isPending: isUpdateLoading } = useUpdateLot()
  const router = useRouter()
  const {
    currentActionner,
    selectedRows,
    transmissionDate,
    updateActionner,
    updateDate,
    reset,
    updateSelectedRows
  } = useLotFormStore()
  const [errors, setErrors] = useState<FormErrorMessages | null>(null)
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

  const [isClicking, setIsClicking] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [filterValue, setFilterValue] = useState('')
  const { data: response, isLoading } = useGetAllAuctions(page, true)

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

  const handleSelection = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys)
      let selectedRowsData: AuctionsDataType[] = []
      if (keys === 'all') {
        if (totalData !== undefined) {
          selectedRowsData = totalData
        } else {
          selectedRowsData = filteredItems
        }
      } else if (Array.isArray(keys)) {
        if (totalData !== undefined) {
          selectedRowsData = keys.map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = keys.map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      } else if (keys instanceof Set) {
        if (totalData !== undefined) {
          selectedRowsData = Array.from(keys).map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = Array.from(keys).map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      }
      updateSelectedRows(selectedRowsData)
    },
    [filteredItems, totalData, updateSelectedRows]
  )

  const handleSelectionOnEdit = useCallback(
    (keys: Selection) => {
      setSelectedKeys(keys)
      let selectedRowsData: AuctionsDataType[] = []
      if (keys === 'all') {
        if (totalData !== undefined) {
          selectedRowsData = totalData
        } else {
          selectedRowsData = filteredItems
        }
      } else {
        if (totalData !== undefined) {
          selectedRowsData = Array.from(keys).map((key) =>
            totalData.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        } else {
          selectedRowsData = Array.from(keys).map((key) =>
            filteredItems.find((item) => item.id === Number(key))
          ) as AuctionsDataType[]
        }
      }

      const newSelection = selectedRowsData.map((item) =>
        item.idpublication.toString()
      )

      const tempIdPublications = orderTempPublications.map((obj) => obj.id)
      const ordered = newSelection.map((id) => {
        if (!tempIdPublications.includes(parseInt(id))) {
          tempIdPublications.push(parseInt(id))
        }
        return id
      })

      const lastIdSelected = ordered.pop()

      const last = selectedRowsData

      const lastSelected = last.pop()

      setOrderTempPublications((prev) => [
        ...prev,
        { id: Number(lastIdSelected), position: prev.length + 1 }
      ])
      const restNotExistPublications = notExistIdListInTotal
        .map((key) => {
          const found = tempPublications.find(
            (item) => item.idpublication === Number(key)
          )
          return found
        })
        .filter((item): item is AuctionsDataType => item !== undefined)

      const currentPublications = [
        ...selectedRowsData,
        ...(restNotExistPublications.length > 0
          ? restNotExistPublications
          : []),
        ...(lastSelected !== undefined ? [lastSelected] : [])
      ]

      const currentIdsPublications = currentPublications.map((item) =>
        item.idpublication.toString()
      )

      const existIdsPublications = currentIdsPublications.filter((id) =>
        tempIdPublications.includes(parseInt(id))
      )

      const orderedIdPublications = existIdsPublications.sort((a, b) => {
        return (
          tempIdPublications.indexOf(parseInt(a)) -
          tempIdPublications.indexOf(parseInt(b))
        )
      })
      const existPublications = currentPublications.filter((pub) =>
        tempIdPublications.includes(parseInt(pub.idpublication.toString()))
      )
      const orderedPublications = existPublications.sort((a, b) => {
        return (
          tempIdPublications.indexOf(parseInt(a.idpublication.toString())) -
          tempIdPublications.indexOf(parseInt(b.idpublication.toString()))
        )
      })

      updateSelectedRows(orderedPublications)
      setTempSelectedKeys(orderedIdPublications)
      setIsClicking(true)
    },
    [
      filteredItems,
      totalData,
      updateSelectedRows,
      notExistIdListInTotal,
      tempPublications,
      orderTempPublications
    ]
  )

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
        getPublications(lot) // Selected to DB

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

        setNotExistIdListInTotal(idNotIncludes)

        if (tempSelectedKeys.length === 0) {
          setTempSelectedKeys(idPublications)
          setTempPublications(publications)
          setOrderTempPublications(idWithOrderPublications)
          updateSelectedRows(publications)
        }

        setSelectedKeys(new Set(idIncludes))
        updateDate(lot.lot.transmission_date.toString().slice(0, 16))
        updateActionner(lot.lot.user_actionner)
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
    orderTempPublications
  ])

  const getPublications = (data: LotFullDataResponse) => {
    const publications = data.lot.lot_queues.map((lot) => {
      const { publication } = lot
      return {
        ...publication,
        id: publication.idpublication
      }
    })
    const idWithOrderPublications = data.lot.lot_queues.map((lot) => {
      const { publication } = lot
      const id = publication.idpublication
      return {
        id,
        position: lot.order
      }
    })

    const idPublications = publications.map((publication) =>
      publication.idpublication.toString()
    )
    return {
      publications,
      idPublications,
      idWithOrderPublications
    }
  }
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

  const deleteItemSelected = useCallback(
    (id: number) => {
      setOrderTempPublications((prev) => {
        const orderedTemp = prev
        const indexToDelete = orderedTemp.findIndex((item) => item.id === id)
        if (indexToDelete === -1) return prev
        orderedTemp.splice(indexToDelete, 1)
        const newData = orderedTemp.map((item, index) => ({
          ...item,
          position: index + 1
        }))
        return [...newData]
      })

      const filtered = selectedRows.filter((row) => row.idpublication !== id)
      const idPublications = filtered.map((publication) =>
        publication.idpublication.toString()
      )

      setSelectedKeys(new Set(idPublications))
      setTempSelectedKeys(idPublications)
      updateSelectedRows(filtered)
    },
    [selectedRows, updateSelectedRows]
  )

  const handleSubmit = async () => {
    setErrors(null)
    if (transmissionDate === '') {
      setErrors({ transmissionDate: 'Debes seleccionar una fecha' })
      showToast('Datos incompletos', 'warning')
      return
    }
    if (currentActionner === undefined) {
      setErrors({ currentActionner: 'Debes seleccionar un Martillero' })
      showToast('Datos incompletos', 'warning')
      return
    }
    if (selectedRows.length === 0) {
      setErrors({ selectedRows: 'Debes elegir un vehículo' })
      showToast('Datos incompletos', 'warning')
      setTimeout(() => {
        showToast('Debes elegir al menos un vehículo', 'error')
      }, 1500)
      return
    }

    const selectedPublications: BodyLotPublication[] = selectedRows
      .reverse()
      .map((row, index) => ({
        idpublication: row.idpublication,
        order: index + 1,
        status: true
      }))
    const dataBody: BodyLotForm = {
      actionner: currentActionner?.iduser_admin ?? 0,
      active: true,
      status: LotStatus.Active,
      streaming_url: null,
      transmission_date: transmissionDate,
      publications: selectedPublications
    }

    if (isEditing) {
      await onUpdateLot(dataBody)
    } else {
      await onCreateLot(dataBody)
    }
  }

  const onCreateLot = async (data: BodyLotForm) => {
    await createLot(data, {
      onSuccess: (data: GenericResponse<LotResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }
        showToast(data?.message ?? '', 'success')
        router.push(LOTS_LIST_ROUTE)
        setTimeout(() => {
          reset()
        }, 400)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }

  const onUpdateLot = async (data: BodyLotForm) => {
    // update
    const body: BodyUpdateLotForm = {
      id: Number(id),
      data
    }

    await updateLot(body, {
      onSuccess: (data: GenericResponse<LotFullDataResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.error, 'error')
          return
        }

        console.log(data)
        // const publications =
        //   data?.data.lot.lot_queues.map((lot) => {
        //     const { publication } = lot
        //     return {
        //       ...publication,
        //       id: publication.idpublication
        //     }
        //   }) ?? []
        // const idPublications = publications.map((publication) =>
        //   publication.idpublication.toString()
        // )
        // setSelectedKeys(new Set(idPublications))
        // updateSelectedRows(publications)
        // router.refresh()
        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
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
                errors?.transmissionDate !== undefined ? 'danger' : 'primary'
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
            label={isEditing ? 'Actualizar Lote' : 'Crear Lote'}
            isLoading={isEditing ? isUpdateLoading : isCreateLoading}
            disabled={isEditing ? isUpdateLoading : isCreateLoading}
          />
        </div>
      </div>
      <div className={`flex ${isEditing ? ' flex-col-reverse' : 'flex-col'}`}>
        <div className='mt-3'>
          <Spacer />
          <Spacer />
          <Divider />
          <Spacer />
          <Spacer />
          <h1 className='font-semibold text-blackText dark:text-white'>
            Selección de Vehículos
          </h1>
          <p className='text-xs mb-2 dark:text-white'>
            Selecciona todos los vehículos que van a formar parte del lote
          </p>
          <CustomTable<AuctionsDataType>
            filteredItems={filteredItems}
            filterValue={filterValue}
            handleSearch={onSearchChange}
            columns={auctionsColumns}
            emptyLabel={isLoading ? '' : 'No tienes ninguna subasta creada'}
            totalLabel='subastas'
            initialVisibleColumns={auctionsColumns.map((column) => column.key)}
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
            onChangeSelectedRows={updateSelectedRows}
            totalData={totalData}
            useSelection
            // disabledKeys={selectedKeys}
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
            initialVisibleColumns={auctionsColumns.map((column) => column.key)}
            onDelete={deleteItemSelected}
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
    </>
  )
}

export default LotForm
