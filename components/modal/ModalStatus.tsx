import React, { type ReactNode, useMemo } from 'react'
import CustomModal from './CustomModal'
import { GenericButton } from '..'

type ModalStatusProps = {
  actionLabel: string
  action: () => void
  title?: string
  isOpen: boolean | undefined
  onClose: (() => void) | undefined
  description?: string | ReactNode
  isLoading?: boolean | undefined
}

const ModalStatus = ({
  actionLabel,
  action,
  title,
  isOpen,
  onClose,
  description,
  isLoading = false
}: ModalStatusProps) => {
  const footerActions = useMemo(() => {
    return (
      <div className='w-full flex justify-center gap-4'>
        <div className='md:w-1/2 w-full'>
          <GenericButton
            type='button'
            label={actionLabel}
            onClick={() => {
              action()
            }}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
        <div className='md:w-1/2 w-full'>
          <GenericButton
            type='button'
            className='bg-red-700 text-white uppercase font-bold w-full'
            label={'Cancelar'}
            onClick={() => {
              if (onClose !== undefined) {
                onClose()
              }
            }}
            disabled={isLoading}
          />
        </div>
      </div>
    )
  }, [action, onClose, actionLabel, isLoading])
  return (
    <CustomModal
      titleModal={title ?? ''}
      isOpen={isOpen}
      onClose={onClose}
      size='md'
      footer={footerActions}
      backdrop='opaque'
    >
      <div className='flex flex-col'>
       {description}
      </div>
    </CustomModal>
  )
}

export default ModalStatus
