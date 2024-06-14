import { CustomInput, GenericButton } from '@/components'
import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import CustomModal from '@/components/modal/CustomModal'
import ModalDelete from '@/components/modal/ModalDelete'
import ModalImagePreview from '@/components/modal/ModalImagePreview'
import CustomPageSize from '@/components/selects/CustomPageSize'
import FilterButtonSelection, {
  type OptionsFilterProps
} from '@/components/selects/FilterButtonSelection'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { paymentsColumns } from '@/const/columns/payments'
import { useUpdatePaymentStatus } from '@/hooks/api/usePayments'
import useQueryParams from '@/hooks/useQueryParams'
import { showToast } from '@/hooks/useToast'
import { ClearFilter } from '@/icons'
import { parseIsoDate } from '@/lib/utils/utils'
import { type GenericResponse } from '@/types/api'
import { type BodyPayments } from '@/types/api/request/payments'
import { type FileGallery } from '@/types/api/response/lots'
import {
  type PaymentsDataType,
  type PaymentStatusResponse
} from '@/types/api/response/payments'
import { Button, Image, type Selection, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect
} from 'react'

type PaymentsProps = {
  payments: PaymentsDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const dataPaymentStatus: OptionsFilterProps[] = [
  {
    key: '20',
    display: 'Pagado'
  },
  {
    key: '19',
    display: 'Pendiente'
  },
  {
    key: '0',
    display: 'Todos los estados'
  }
]
const Payments = ({
  payments,
  isLoading,
  bottomContent,
  totalRows
}: PaymentsProps) => {
  const router = useRouter()
  const { queryParams, setQueryParams } = useQueryParams()
  const { mutateAsync: updateStatus, isPending } = useUpdatePaymentStatus()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenImageModal,
    onOpen: onOpenImageModal,
    onClose: onCloseImageModal
  } = useDisclosure()
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm
  } = useDisclosure()
  const [comment, setComment] = useState('')
  const [isDetail, setIsDetail] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<
  PaymentsDataType | undefined
  >(undefined)
  const [selectedStatus, setSelectedStatus] = useState<Selection>(
    new Set(['0'])
  )
  const [selectedKey, setSelectedKey] = useState<string>('0')

  const [currentPicture, setCurrentPicture] = useState<FileGallery | undefined>(
    undefined
  )

  const filteredItems = useMemo(() => {
    if (payments !== undefined) {
      const filtered = payments?.length > 0 ? [...payments] : []
      return filtered
    }

    return []
  }, [payments])

  const handleSelectionChange = useCallback(
    async (keys: Selection) => {
      const statusArray = Array.from(keys)
      const value = statusArray[0]
      if (value === undefined) {
        setSelectedStatus(new Set(['0']))
        setQueryParams({ page: 1, typeStatus: undefined, query: undefined })
        setSelectedKey('0')
        return
      }
      setSelectedStatus(keys)

      setQueryParams({ page: 1, typeStatus: value, query: undefined })
      setSelectedKey(value.toString())
    },
    [setQueryParams]
  )
  const handleImagePreview = (picture: FileGallery | undefined) => {
    if (picture === undefined) return
    setCurrentPicture(picture)
    onOpenImageModal()
  }

  const handleConfirmPayment = (row: PaymentsDataType) => {
    setCurrentOrder(row)
    onOpen()
  }

  const handleOpenConfirm = useCallback(() => {
    if (comment === '' || comment.trim().length < 1) {
      showToast(
        'El comentario es obligatorio y al menos tener 1 caracter',
        'warning'
      )
      return
    }
    onOpenConfirm()
  }, [onOpenConfirm, comment])

  const handleSubmitConfirmPayment = useCallback(async () => {
    const dataBody: BodyPayments = {
      id: currentOrder?.idpayment_order ?? 0,
      data: {
        comment
      }
    }
    await updateStatus(dataBody, {
      onSuccess: (data: GenericResponse<PaymentStatusResponse> | undefined) => {
        if (data?.error !== undefined) {
          showToast(data.message, 'error')
        } else {
          showToast(data?.message ?? '', 'success')
        }
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
    onCloseConfirm()
    onClose()
    setComment('')
    setCurrentOrder(undefined)
    setIsDetail(false)
  }, [currentOrder, comment, updateStatus, onClose, onCloseConfirm])

  const imageUrl = useMemo(() => {
    if (currentOrder === undefined) return ''
    const filesGallery = currentOrder.fileGallery
    if (filesGallery === null) return ''
    const file = filesGallery?.files[0]
    return file?.url
  }, [currentOrder])

  const handleOpenDetailsPayment = (row: PaymentsDataType) => {
    setCurrentOrder(row)
    setIsDetail(true)
    onOpen()
  }

  const handleClose = () => {
    onClose()
    setIsDetail(false)
  }

  const handleClearFilters = useCallback(() => {
    setQueryParams({
      page: 1,
      pageSize: 10,
      query: undefined,
      typeStatus: undefined,
      startDate: undefined,
      endDate: undefined
    })

    router.refresh()
  }, [setQueryParams, router])

  const filterPaymentButtons = useMemo(() => {
    return (
      <div className='flex flex-col md:flex-row gap-6 items-center'>
        <div className='w-full md:max-w-96 md:w-full'>
          <AsyncRangePicker label='Fecha Pago:' />
        </div>
        <div className=' md:max-w-60 w-full'>
          <FilterButtonSelection
            labelPlacement={'outside-left'}
            ariaLabel='Status'
            label='Status: '
            placeholder='Filtrar por:'
            options={dataPaymentStatus}
            selectedKeys={selectedStatus}
            onSelectionChange={handleSelectionChange}
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
  }, [isLoading, handleClearFilters, handleSelectionChange, selectedStatus])

  useEffect(() => {
    if (selectedKey === '0') {
      setQueryParams({ typeStatus: undefined })
    }
  }, [selectedKey, setQueryParams, queryParams])
  return (
    <>
      <div className='w-full flex justify-start mb-2'>
        <BackComponent title=' ' subtitle='Gestión de Pagos' />
      </div>
      <div>
        <p className='text-xs mb-2 dark:text-white'>
          Gestiona en esta sección todos los pagos realizados desde el app
          móvil.
        </p>
      </div>
      <CustomTable<PaymentsDataType>
        filteredItems={filteredItems}
        columns={paymentsColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna orden de pago creada'}
        totalLabel='órdenes de pago'
        initialVisibleColumns={paymentsColumns
          .map((column) => column.key)
          .filter(
            (key) => key !== 'confirmation_user' && key !== 'payment_date'
          )}
        onViewMore={() => {}}
        onConfirmPayment={handleConfirmPayment}
        onDetailPayment={handleOpenDetailsPayment}
        useAddButton={false}
        usePage={false}
        isLoading={isLoading}
        actions={{
          useViewMore: false,
          useEdit: false,
          useDelete: false,
          isPaymentActions: true
        }}
        totalRows={totalRows}
        useCustomPagination={true}
        customPagination={isLoading ? null : bottomContent}
        useCustomSearchBar={true}
        customSearchBar={
          <SearchBar
            searchBarPlaceholder='Buscar por #Orden, ID publicación, tipo'
            styles='w-full flex-1'
          />
        }
        useCustomPageSize={true}
        customPageSize={<CustomPageSize />}
        filterContent={filterPaymentButtons}
        useFilterInNewRow={true}
      />
      <CustomModal
        titleModal={isDetail ? 'Detalles del pago' : 'Confirmar pago'}
        isOpen={isOpen}
        onClose={handleClose}
        size='md'
        backdrop='opaque'
      >
        <div className='flex flex-col dark:text-white mb-3'>
          {imageUrl !== '' && (
            <div
              className='w-full h-40 rounded-lg bg-zinc-200 overflow-hidden'
              onClick={() => {
                const gallery = currentOrder?.fileGallery
                const file = gallery?.files[0]
                handleImagePreview(file)
              }}
            >
              <Image
                isBlurred
                src={imageUrl}
                width={800}
                height={400}
                alt={`Imagen de pago ${currentOrder?.idpayment_order}`}
                className='w-full object-scale-down h-40'
              />
            </div>
          )}
          {imageUrl === '' && (
            <div className='text-center text-default-500 mb-2'>
              <p>No tiene foto depósito/transferencia</p>
            </div>
          )}
          <div className='grid grid-cols-2 mt-3'>
            <div className='flex flex-col'>
              <span className='font-semibold'>#Orden</span>
              <span className='text-sm'>#{currentOrder?.idpayment_order}</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-semibold'>#Depósito</span>
              <span className='text-sm'>
                {currentOrder?.bank_reference !== null && '#'}
                {currentOrder?.bank_reference ?? 'Sin registro'}
              </span>
            </div>
          </div>
          <div className='grid grid-cols-2 mb-1 mt-3'>
            <div className='flex flex-col'>
              <span className='font-semibold'>Tipo</span>
              <span className='text-sm'>
                {currentOrder?.typesPaymentOrder.name ?? 'No registrado'}
              </span>
            </div>
            <div className='flex flex-col justify-center'>
              <span className='font-semibold'>Fecha de pago</span>
              <span className='text-sm'>
                {currentOrder?.payment_date !== null
                  ? parseIsoDate(currentOrder?.payment_date.toString() ?? '')
                  : 'No registrado'}
              </span>
            </div>
          </div>
          <div>
            {!isDetail && (
              <CustomInput
                name='comment'
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                }}
                type='text'
                color={'primary'}
                label='Comentario'
                placeholder='Ingresa un comentario'
                error={''}
              />
            )}
            {isDetail && currentOrder?.comment !== null && (
              <div className='flex flex-col mt-1'>
                <span className='font-semibold'>Comentario</span>
                <span className='text-sm'>{currentOrder?.comment}</span>
              </div>
            )}
          </div>
          {!isDetail && (
            <div className='w-full justify-center flex'>
              <GenericButton
                type='button'
                className='md:w-auto w-full bg-cyan-700 text-white'
                label={'Confirmar'}
                onClick={handleOpenConfirm}
              />
            </div>
          )}
        </div>
      </CustomModal>
      <ModalDelete
        action={handleSubmitConfirmPayment}
        isOpen={isOpenConfirm}
        title='Confirmar pago'
        loadingAction={isPending}
        onCancel={onCloseConfirm}
        onClose={onCloseConfirm}
        actionLabel={isPending ? 'Confirmando' : 'Sí, confirmar'}
        description={
          <p className='dark:text-white text-default-600 text-sm'>
            ¿Está completamente seguro de confirmar el pago?, asegúrese de
            verificar el monto, la fecha y hora de depósito así como el número
            de depósito/transferencia ingresado por el usuario antes de
            confirmar. Esta acción No se puede revertir
          </p>
        }
      />

      <ModalImagePreview isOpen={isOpenImageModal} onClose={onCloseImageModal}>
        <div className='flex justify-center items-center'>
          <Image
            isBlurred
            src={currentPicture?.url}
            width={400}
            height={800}
            alt={currentPicture?.name}
            className='w-fit max-h-[75vh]'
          />
        </div>
      </ModalImagePreview>
    </>
  )
}

export default Payments
