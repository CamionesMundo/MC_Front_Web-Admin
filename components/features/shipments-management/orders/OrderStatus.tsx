import { type TrackingHistory } from '@/types/api/response/orders'
import React, { useMemo } from 'react'
import ItemStatus from './ItemStatus'
import { Copy, Document, DownloadCloud, Output, Ship } from '@/icons'
import { OrderStatusType } from '@/types/enums'

type OrderStatusProps = {
  history: TrackingHistory[]
}

const OrderStatus = ({ history }: OrderStatusProps) => {

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

  return (
    <>
      <span className='text-sm font-semibold dark:text-white text-blackText'>
        Status
      </span>
      <div className='flex flex-col'>
        <ItemStatus
          title='Orden realizada'
          description='La orden ha sido recibida con éxito.'
          isFirst
          isCompleted={orderPlaced?.status}
        />
        <ItemStatus
          title='Emisión del pago de reserva'
          description='Deberás emitir el pago del 30%'
          isCompleted={reservationPayment?.status}
        />
        <ItemStatus
          title='El vendedor enviará el vehículo'
          description='El vehículo debe ser enviado al puerto acordado.'
          isCompleted={vehicleShipment?.status}
          footerComponent={
            <>
              <div className='w-fit flex flex-col bg-primary text-white p-2 rounded-xl my-2'>
                <div className='flex flex-row gap-2 items-center'>
                  <Ship className='w-3 h-3' />
                  <span className='text-xs'>Tracking</span>
                  <Output className='w-3 h-3' />
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <span className='text-xs'>
                    Cód.: {vehicleShipment?.tracking}
                  </span>
                  <Copy className='w-3 h-3' />
                </div>
              </div>
            </>
          }
        />
        <ItemStatus
          title='Recepción e inspección en puerto'
          isCompleted={receptionAtPort?.status}
          description='El agente aduanero inspeccionará el vehículo y notificará al comprador'
          footerComponent={
            <>
              <div className='w-fit flex flex-row gap-2 bg-primary text-white p-2 rounded-xl my-2 items-center'>
                <Document className='w-4 h-4' />
                <span className='text-xs'>Descargar reporte</span>
                <DownloadCloud className='w-4 h-4' />
              </div>
            </>
          }
        />
        <ItemStatus
          title='Emisión del pago pendiente'
          description='Deberás emitir el pago pendiente del 70% restante.'
          isCompleted={pendingPayment?.status}
        />
        <ItemStatus
          title='Coordinación de la entrega del vehículo.'
          description='Coordinarás con mundocamiones.com la recepción del vehículo.'
          isCompleted={vehicleDelivery?.status}
        />
        <ItemStatus
          title='Proceso completado.'
          description='Proceso completado.'
          isCompleted={finished?.status}
          isLast
        />
      </div>
    </>
  )
}

export default OrderStatus
