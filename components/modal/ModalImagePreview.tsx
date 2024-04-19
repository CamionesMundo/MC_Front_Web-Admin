import {
  Modal,
  ModalBody,
  ModalContent,
  type ModalProps
} from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type ModalImagePreviewProps = {
  children: ReactNode
} & ModalProps

const ModalImagePreview = ({ children, ...props }: ModalImagePreviewProps) => {
  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='opaque'
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      className='z-10'
      classNames={{
        backdrop:
          'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        base: 'bg-transparent',
        closeButton: 'hover:bg-white/80 active:bg-white/90 bg-white/60'
      }}
      size='full'
      {...props}
    >
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalImagePreview
