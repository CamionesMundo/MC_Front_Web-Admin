import React, { type ReactNode, useMemo } from 'react'
import CustomModal from './CustomModal'
import { GenericButton } from '..'

/**
 * The `ModalStatus` component is a reusable modal dialog for displaying status messages
 * or confirmation dialogs with customizable action buttons and content.
 * It utilizes the `CustomModal` component and `GenericButton` component to provide
 * a consistent and flexible modal interface.
 *
 * Props:
 * @param {string} actionLabel - The label for the primary action button.
 * @param {() => void} action - The function to be executed when the primary action button is clicked.
 * @param {string} [title] - The title to be displayed in the modal header.
 * @param {boolean | undefined} isOpen - Determines whether the modal is open or closed.
 * @param {() => void | undefined} [onClose] - The function to be executed when the modal is closed.
 * @param {string | ReactNode} [description] - The description or content to be displayed in the modal body.
 * @param {boolean | undefined} [isLoading] - Determines whether the primary action button is in a loading state.
 *
 * The `ModalStatus` component renders a modal dialog with a title, description, and action buttons.
 * It supports customizing the primary action button label, the function to be executed on action click,
 * modal title, modal open state, close function, description content, and loading state for the action button.
 * The `footerActions` useMemo hook generates the footer content with primary and secondary action buttons.
 * The modal size, backdrop, and styling are configured using props passed to the `CustomModal` component.
 */

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
