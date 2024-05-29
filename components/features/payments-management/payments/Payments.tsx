import { CustomInput, FilterSelect, GenericButton } from '@/components'
import CustomModal from '@/components/modal/CustomModal'
import CustomTable from '@/components/table/CustomTable'
import { BackComponent } from '@/components/ui/BackComponent'
import { paymentsColumns } from '@/const/columns/payments'
import { useUpdatePaymentStatus } from '@/hooks/api/usePayments'
import { showToast } from '@/hooks/useToast'
import { parseIsoDate } from '@/lib/utils/utils'
import { type GenericResponse } from '@/types/api'
import { type BodyPayments } from '@/types/api/request/payments'
import {
  type PaymentsDataType,
  type PaymentStatusResponse
} from '@/types/api/response/payments'
import { Image, SelectItem, useDisclosure } from '@nextui-org/react'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'

type PaymentsProps = {
  payments: PaymentsDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

type PaymentStatusData = {
  key: string
  display: string
}

const dataPaymentStatus: PaymentStatusData[] = [
  {
    key: 'paid',
    display: 'Pagado'
  },
  {
    key: 'pending',
    display: 'Pendiente'
  },
  {
    key: 'all',
    display: 'Todos los estados'
  }
]
const Payments = ({
  payments,
  isLoading,
  bottomContent,
  totalRows
}: PaymentsProps) => {
  const { mutateAsync: updateStatus, isPending } = useUpdatePaymentStatus()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [filterValue, setFilterValue] = useState('')
  const [comment, setComment] = useState('')
  const [isDetail, setIsDetail] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<
  PaymentsDataType | undefined
  >(undefined)

  const hasSearchFilter = Boolean(filterValue)

  const onSearchChange = useCallback((value: string) => {
    if (value !== undefined) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])
  const filteredItems = useMemo(() => {
    if (payments !== undefined) {
      let filtered = payments?.length > 0 ? [...payments] : []

      if (hasSearchFilter) {
        filtered = filtered.filter((item) =>
          item.idpayment_order
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      }

      return filtered
    }

    return []
  }, [payments, filterValue, hasSearchFilter])

  const handleConfirmPayment = (row: PaymentsDataType) => {
    setCurrentOrder(row)
    onOpen()
  }

  const handleSubmitConfirmPayment = useCallback(async () => {
    if (comment === '' || comment.length < 1) {
      showToast(
        'El comentario es obligatorio y al menos tener 1 caracter',
        'warning'
      )
      return
    }

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
    onClose()
    setComment('')
    setCurrentOrder(undefined)
    setIsDetail(false)
  }, [currentOrder, comment, updateStatus, onClose])

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

  const filterPaymentStatusButton = useMemo(() => {
    return (
      <div className=' w-48'>
        <FilterSelect
          labelPlacement={'outside-left'}
          aria-label='Status'
          placeholder='Filtrar por:'
          classNames={{
            trigger:
              'bg-slate-300 text-blackText dark:bg-default-200 dark:text-white',
            base: 'items-center text-blackText'
          }}
          disabled={isLoading}
        >
          {dataPaymentStatus.map((lot) => (
            <SelectItem key={lot.key} value={lot.key}>
              {lot.display}
            </SelectItem>
          ))}
        </FilterSelect>
      </div>
    )
  }, [isLoading])

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
        filterValue={filterValue}
        handleSearch={onSearchChange}
        columns={paymentsColumns}
        emptyLabel={isLoading ? '' : 'No tienes ninguna orden de pago creada'}
        totalLabel='órdenes de pago'
        initialVisibleColumns={paymentsColumns.map((column) => column.key)}
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
        filterContent={filterPaymentStatusButton}
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
            <div className='w-full h-40 rounded-lg bg-zinc-200 overflow-hidden'>
              <Image
                isBlurred
                src={imageUrl}
                width={800}
                height={400}
                alt={`Imagen de pago ${currentOrder?.idpayment_order}`}
                className='w-full object-cover h-40'
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
            {isDetail && (
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
                className='bg-cyan-700 text-white'
                label={'Confirmar'}
                onClick={handleSubmitConfirmPayment}
                isLoading={isPending}
              />
            </div>
          )}
        </div>
      </CustomModal>
    </>
  )
}

export default Payments
