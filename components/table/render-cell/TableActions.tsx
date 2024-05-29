import { Delete, Edit, Visible } from '@/icons'
import { cn } from '@/lib/clsx/clsx'
import { type PaymentsDataType } from '@/types/api/response/payments'
import { LotStatus } from '@/types/enums'
import { type ActionsPermissions } from '@/types/ui/table'
import { Button, Tooltip } from '@nextui-org/react'
import React from 'react'

/**
 * The `TableActions` component renders action buttons for table rows,
 * such as view more, edit, and delete buttons.
 * It accepts callbacks for each action and permissions to determine which actions are enabled.
 *
 * Props:
 * @param {(id: number) => void} [onViewMore] - The callback function for the "View More" action.
 * @param {(id: number) => void} [onEdit] - The callback function for the "Edit" action.
 * @param {(id: number) => void} [onDelete] - The callback function for the "Delete" action.
 * @param {number} id - The unique identifier of the table row.
 * @param {ActionsPermissions} actions - The permissions for table actions such as view more, edit, and delete.
 *
 * The `TableActions` component renders action buttons based on the provided permissions and
 * invokes the corresponding callback functions when the buttons are clicked. It provides
 * tooltips for each action button to enhance user experience and clarity of action purpose.
 */

type Props = {
  onViewMore: ((id: number) => void) | undefined
  onEdit: ((id: number) => void) | undefined
  onDelete: ((id: number) => void) | undefined
  onConfirmPayment?: ((row: PaymentsDataType) => void) | undefined
  onDetailPayment?: ((row: PaymentsDataType) => void) | undefined
  id: number
  actions: ActionsPermissions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any
}

const TableActions = ({
  onViewMore,
  onEdit,
  onDelete,
  onConfirmPayment,
  onDetailPayment,
  id,
  actions = {
    useDelete: true,
    useEdit: true,
    useViewMore: true,
    isPaymentActions: false
  },
  row
}: Props) => {
  const isLot = Boolean(row.lot_code ?? false)
  const isInprogress = isLot ? row.status === LotStatus.InProgress : false
  const isPendingPayment = Boolean(row.payment_status ?? false)

  return (
    <div className='relative flex items-center justify-center gap-4'>
      {actions.useViewMore && (
        <Tooltip content='Ver Detalles' color='foreground'>
          <span
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
            onClick={() => {
              if (onViewMore !== undefined) {
                onViewMore(id)
              }
            }}
          >
            <Visible className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
      {actions.useEdit && (
        <Tooltip
          content={isInprogress ? actions.labelEditingDisabled : 'Editar'}
          color='foreground'
        >
          <span
            className={cn('text-lg active:opacity-50', {
              'cursor-not-allowed text-default-300': isInprogress,
              'cursor-pointer text-default-400': !isInprogress
            })}
            onClick={
              isInprogress
                ? () => {}
                : () => {
                    if (onEdit !== undefined) {
                      onEdit(id)
                    }
                  }
            }
          >
            <Edit className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
      {actions.useDelete && (
        <Tooltip
          color='danger'
          content={
            isInprogress
              ? 'No se puede eliminar mientras está en progreso'
              : actions?.labelDelete !== undefined
                ? actions.labelDelete
                : 'Eliminar'
          }
        >
          <span
            className={cn('text-lg active:opacity-50', {
              'cursor-not-allowed text-default-300': isInprogress,
              'cursor-pointer text-danger': !isInprogress
            })}
            onClick={
              isInprogress
                ? () => {}
                : () => {
                    if (onDelete !== undefined) {
                      onDelete(id)
                    }
                  }
            }
          >
            {actions.iconDelete !== undefined
              ? (
                  actions.iconDelete
                )
              : (
              <Delete className='w-4 h-4' />
                )}
          </span>
        </Tooltip>
      )}
      {(actions?.isPaymentActions ?? false) && isPendingPayment && (
        <Tooltip content='Ver Detalles' color='foreground'>
          <span
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
            onClick={() => {
              if (onDetailPayment !== undefined) {
                onDetailPayment(row as PaymentsDataType)
              }
            }}
          >
            <Visible className='w-4 h-4' />
          </span>
        </Tooltip>
      )}
      {(actions?.isPaymentActions ?? false) && !isPendingPayment && (
        <div>
          <Button
            color='primary'
            className='bg-cyan-700 text-white h-8 '
            onClick={() => {
              if (onConfirmPayment !== undefined) {
                onConfirmPayment(row as PaymentsDataType)
              }
            }}
          >
            <span className='text-white'>Confirmar</span>
          </Button>
        </div>
      )}
    </div>
  )
}

export { TableActions }
