import { type TrackingHistory } from '@/types/api/response/orders'
import React, {
  type ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import ItemStatus from './ItemStatus'
import {
  Close,
  Copy,
  Document,
  DownloadCloud,
  FileUp,
  Save,
  Ship
} from '@/icons'
import { OrderStatusType } from '@/types/enums'
import { CustomInput } from '@/components'
import { Button, Spinner, Tooltip } from '@nextui-org/react'
import { useUpdateHistoryStatus } from '@/hooks/api/useOrders'
import { showToast } from '@/hooks/useToast'
import { type BodyHistoryStatus } from '@/types/api/request/order'
import Link from 'next/link'

type OrderStatusProps = {
  history: TrackingHistory[]
}

const OrderStatus = ({ history }: OrderStatusProps) => {
  const { mutateAsync: updateHistory, isPending } = useUpdateHistoryStatus()
  const inputFilesRef = useRef<HTMLInputElement | null>(null)
  const [fileBase64, setFileBase64] = useState<string | null>(null)
  const [trackingCode, setTrackingCode] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const orderPlaced = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.OrderPlaced
    )
    return filtered
  }, [history])

  const reservationPayment = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.ReservationPayment
    )
    return filtered
  }, [history])

  const vehicleShipment = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.VehicleShipment
    )
    return filtered
  }, [history])

  const receptionAtPort = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.ReceptionAtPort
    )
    return filtered
  }, [history])
  const pendingPayment = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.PendingPayment
    )
    return filtered
  }, [history])

  const vehicleDelivery = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.VehicleDelivery
    )
    return filtered
  }, [history])

  const finished = useMemo(() => {
    const filtered = history.find(
      (item) => item.idorder_status === OrderStatusType.Finished
    )
    return filtered
  }, [history])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file !== undefined) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const base64File = reader.result as string
        setFileName(file.name)
        setFileBase64(base64File)
        showToast(
          'Recuerda dar clic en el botón guardar para completar el proceso',
          'info'
        )
      }
      reader.onerror = (error) => {
        console.error('Error al leer el archivo:', error)
      }
    }
  }
  const onCompleteVehicleShipment = useCallback(async () => {
    if (reservationPayment?.status === false) {
      showToast('Falta emitir el pago de reserva', 'error')
      return
    }
    if (trackingCode === null) {
      showToast('Debes escribir el cod. tracking', 'error')
      return
    }
    if (trackingCode?.trim().length < 2) {
      showToast('Debes escribir el cod. tracking', 'error')
      return
    }
    const data = {
      tracking: trackingCode,
      status: true
    }
    const body = {
      id: vehicleShipment?.idhistory_status,
      data
    }
    await updateHistory(body, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [trackingCode, updateHistory, vehicleShipment, reservationPayment])

  const onCompleteReceptionAtPort = useCallback(async () => {
    if (reservationPayment?.status === false) {
      showToast('Falta emitir el pago de reserva', 'error')
      return
    }
    if (vehicleShipment?.status === false) {
      showToast('Falta que el vendedor complete el envío', 'error')
      return
    }

    const data = {
      file: [
        {
          file: fileBase64,
          name: fileName
        }
      ],
      status: true
    }
    const body: BodyHistoryStatus = {
      id: receptionAtPort?.idhistory_status,
      data
    }
    await updateHistory(body, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
        setFileBase64(null)
        setFileName(null)
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [
    reservationPayment,
    vehicleShipment,
    receptionAtPort,
    fileBase64,
    fileName,
    updateHistory
  ])

  const onCompleteVehicleDelivery = useCallback(async () => {
    if (reservationPayment?.status === false) {
      showToast('Falta emitir el pago de reserva', 'error')
      return
    }
    if (vehicleShipment?.status === false) {
      showToast('Falta que el vendedor complete el envío', 'error')
      return
    }
    if (pendingPayment?.status === false) {
      showToast('Falta confirmar el pago pendiente (70%)', 'error')
      return
    }
    const data = {
      status: true
    }
    const body: BodyHistoryStatus = {
      id: vehicleDelivery?.idhistory_status,
      data
    }
    await updateHistory(body, {
      onSuccess: async (data) => {
        showToast(data?.message ?? '', 'success')
      },
      onError: (data: Error) => {
        showToast(data.message, 'error')
      }
    })
  }, [
    pendingPayment?.status,
    reservationPayment?.status,
    updateHistory,
    vehicleShipment?.status,
    vehicleDelivery
  ])
  const footerVehicleShipment = useMemo(() => {
    if (
      reservationPayment?.status === true &&
      vehicleShipment?.status === true
    ) {
      return (
        <>
          <div className='w-fit flex flex-col bg-secondary text-black p-2 rounded-xl my-2'>
            <div className='flex flex-row gap-2 items-center'>
              <Ship className='w-3 h-3' />
              <span className='text-xs'>Tracking</span>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <span className='text-xs'>Cód.: {vehicleShipment?.tracking}</span>
              <Copy className='w-3 h-3' />
            </div>
          </div>
        </>
      )
    }
    if (
      reservationPayment?.status === true &&
      vehicleShipment?.status === false
    ) {
      return (
        <>
          <div className='flex flex-row gap-2 items-center max-w-72'>
            <CustomInput
              name='tracking'
              label='Cod. Tracking'
              value={trackingCode ?? ''}
              onChange={(e) => {
                setTrackingCode(e.target.value)
              }}
              error=''
              placeholder='Ej. 22312222'
            />
            <Tooltip content='Guardar' color='foreground'>
              <div
                className='w-8 h-8 flex justify-center items-center dark:bg-primary/80 dark:hover:bg-primary bg-slate-300 hover:bg-slate-400 hover:cursor-pointer rounded-full dark:border dark:border-white/60'
                onClick={!isPending ? onCompleteVehicleShipment : undefined}
              >
                {isPending && (
                  <div className='w-5 h-5'>
                    <Spinner
                      label=''
                      color='primary'
                      classNames={{
                        circle1:
                          'absolute w-5 h-5 rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary',
                        circle2:
                          'absolute w-5 h-5 rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary'
                      }}
                    />
                  </div>
                )}
                {!isPending && <Save className='w-4 h-4 dark:text-white' />}
              </div>
            </Tooltip>
          </div>
        </>
      )
    }
    return undefined
  }, [
    reservationPayment?.status,
    vehicleShipment,
    isPending,
    onCompleteVehicleShipment,
    trackingCode
  ])

  const footerReceptionAtPort = useMemo(() => {
    if (vehicleShipment?.status === true && receptionAtPort?.status === true) {
      return (
        <>
          <Link
            href={receptionAtPort.file?.files[0]?.url ?? ''}
            download
            target='_blank'
            className='w-fit flex flex-row gap-2 bg-primary text-white p-2 rounded-xl my-2 items-center'
          >
            <Document className='w-4 h-4' />
            <span className='text-xs'>Descargar reporte</span>
            <DownloadCloud className='w-4 h-4' />
          </Link>
        </>
      )
    }
    if (vehicleShipment?.status === true && receptionAtPort?.status === false) {
      return (
        <>
          <div>
            <input
              type='file'
              multiple
              accept='.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.odt'
              className='hidden'
              onChange={handleFileChange}
              ref={inputFilesRef}
            />
            {fileName !== null && (
              <>
                <div className='flex flex-row gap-1 justify-between items-center p-2 bg-slate-100 rounded-lg my-2'>
                  <div className='flex flex-row gap-1'>
                    <Document className='w-4 h-4' />
                    <span>{fileName}</span>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <Tooltip content='Eliminar' color='danger'>
                      <div
                        className='hover:cursor-pointer'
                        onClick={() => {
                          setFileName(null)
                          setFileBase64(null)
                        }}
                      >
                        <Close className='w-4 h-4 text-danger' />
                      </div>
                    </Tooltip>
                    <Tooltip content='Guardar' color='foreground'>
                      <div
                        className='w-8 h-8 flex justify-center items-center dark:bg-primary/80 dark:hover:bg-primary bg-slate-300 hover:bg-slate-400 hover:cursor-pointer rounded-full dark:border dark:border-white/60'
                        onClick={
                          !isPending ? onCompleteReceptionAtPort : undefined
                        }
                      >
                        {isPending && (
                          <div className='w-5 h-5'>
                            <Spinner
                              label=''
                              color='primary'
                              classNames={{
                                circle1:
                                  'absolute w-5 h-5 rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary',
                                circle2:
                                  'absolute w-5 h-5 rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-primary'
                              }}
                            />
                          </div>
                        )}
                        {!isPending && (
                          <Save className='w-4 h-4 dark:text-white' />
                        )}
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </>
            )}
            {fileName === null && (
              <div className='my-2'>
                <Button
                  onClick={() => inputFilesRef.current?.click()}
                  startContent={<FileUp className='w-4 h-4' />}
                >
                  Subir reporte
                </Button>
              </div>
            )}
          </div>
        </>
      )
    }
    return undefined
  }, [
    vehicleShipment?.status,
    receptionAtPort,
    fileName,
    isPending,
    onCompleteReceptionAtPort
  ])

  const footerVehicleDelivery = useMemo(() => {
    if (pendingPayment?.status === true && vehicleDelivery?.status === false) {
      return (
        <div className=''>
          <div
            className='w-fit flex flex-row gap-2 bg-secondary text-black hover:cursor-pointer py-2 px-4 rounded-xl my-2 items-center'
            onClick={!isPending ? onCompleteVehicleDelivery : undefined}
          >
            {isPending && (
              <>
                <div className='w-5 h-5'>
                  <Spinner
                    label=''
                    color='primary'
                    classNames={{
                      circle1:
                        'absolute w-5 h-5 rounded-full animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-black',
                      circle2:
                        'absolute w-5 h-5 rounded-full opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent border-2 dark:border-b-white border-b-black'
                    }}
                  />
                </div>
              </>
            )}
            <span className='text-xs'>Marcar como recibido</span>
          </div>
        </div>
      )
    }
    return undefined
  }, [
    pendingPayment?.status,
    vehicleDelivery,
    isPending,
    onCompleteVehicleDelivery
  ])
  return (
    <>
      <span className='text-sm font-semibold dark:text-white text-blackText'>
        Status
      </span>
      <div className='flex flex-col'>
        <ItemStatus
          title='Orden realizada'
          description='La orden de pago ha sido enviada al comprador.'
          isFirst
          isCompleted={orderPlaced?.status}
        />
        <ItemStatus
          title='Emisión del pago de reserva'
          description='El comprador debe pagar el 30% del monto del vehículo'
          isCompleted={reservationPayment?.status}
        />
        <ItemStatus
          title='El vendedor enviará el vehículo'
          description='El vehículo debe enviar el vehículo al puerto o dirección de destino.'
          isCompleted={vehicleShipment?.status}
          footerComponent={footerVehicleShipment}
        />
        <ItemStatus
          title='Recepción e inspección del vehículo'
          isCompleted={receptionAtPort?.status}
          description='El agente aduanero inspeccionará el vehículo y notificará al comprador'
          footerComponent={footerReceptionAtPort}
        />
        <ItemStatus
          title='Emisión del pago pendiente'
          description='Eel comprador de pagar el 70% del monto restante del vehículo'
          isCompleted={pendingPayment?.status}
        />
        <ItemStatus
          title='El comprador recibe el vehículo.'
          description='El comprador confirma que ya recibió el vehículo'
          isCompleted={vehicleDelivery?.status}
          footerComponent={footerVehicleDelivery}
          isLast={finished?.status === false}
        />
        {finished?.status === true && (
          <ItemStatus
            title='Proceso completado.'
            description='Proceso de venta completado.'
            isCompleted={finished?.status}
            isLast
          />
        )}
      </div>
    </>
  )
}

export default OrderStatus
