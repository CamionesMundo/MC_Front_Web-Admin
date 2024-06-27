import React, { type ReactNode, useMemo } from 'react'
import CustomModal from './CustomModal'
import { GenericButton } from '..'

type Props = {
  action: () => void
  title?: string
  description?: ReactNode
  actionLabel?: string
  loadingAction: boolean
  onCancel?: () => void
  isOpen?: boolean
  onClose?: () => void
}
const ModalDelete = ({
  action,
  title,
  description,
  actionLabel,
  loadingAction,
  onCancel,
  isOpen,
  onClose
}: Props) => {
  const footerActions = useMemo(() => {
    return (
      <div className='w-full flex justify-center gap-4'>
        <div className='md:w-1/2 w-full'>
          <GenericButton
            type='button'
            label={actionLabel ?? 'Eliminar'}
            onClick={() => {
              action()
            }}
            disabled={loadingAction}
            isLoading={loadingAction}
          />
        </div>
        <div className='md:w-1/2 w-full'>
          <GenericButton
            type='button'
            className='bg-red-700 text-white uppercase font-bold w-full dark:border dark:border-red-500'
            label={'Cancelar'}
            onClick={() => {
              if (onCancel !== undefined) {
                onCancel()
              }
            }}
            disabled={loadingAction}
          />
        </div>
      </div>
    )
  }, [action, onCancel, actionLabel, loadingAction])
  return (
    <CustomModal
      titleModal={title ?? ''}
      size='md'
      footer={footerActions}
      backdrop='opaque'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex flex-col dark:text-white'>{description}</div>
    </CustomModal>
  )
}

export default ModalDelete
