import { CustomInput, GenericButton } from '@/components'
import AsyncRangePicker from '@/components/inputs/AsyncRangePicker'
import SearchBar from '@/components/inputs/SearchBar'
import CustomModal from '@/components/modal/CustomModal'
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
import {
  type PaymentsDataType,
  type PaymentStatusResponse
} from '@/types/api/response/payments'
import { Button, Image, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { type ReactNode, useCallback, useMemo, useState } from 'react'

type PaymentsProps = {
  payments: PaymentsDataType[]
  isLoading: boolean
  bottomContent: ReactNode
  totalRows: number
}

const dataPaymentStatus: OptionsFilterProps[] = [
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
  const router = useRouter()
  const { setQueryParams } = useQueryParams()
  const { mutateAsync: updateStatus, isPending } = useUpdatePaymentStatus()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [comment, setComment] = useState('')
  const [isDetail, setIsDetail] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<
  PaymentsDataType | undefined
  >(undefined)

  const filteredItems = useMemo(() => {
    if (payments !== undefined) {
      const filtered = payments?.length > 0 ? [...payments] : []
      return filtered
    }

    return []
  }, [payments])

  const handleConfirmPayment = (row: PaymentsDataType) => {
    setCurrentOrder(row)
    onOpen()
  }

  const handleSubmitConfirmPayment = useCallback(async () => {
    if (comment === '' || comment.trim().length < 1) {
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
  }, [isLoading, handleClearFilters])

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
                className='md:w-auto w-full bg-cyan-700 text-white'
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
