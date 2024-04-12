import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps
} from '@nextui-org/react'
import React, { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  titleModal: string
  footer?: ReactNode
} & ModalProps

const CustomModal = ({ children, titleModal, footer, ...props }: Props) => {
  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='blur'
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      {...props}
    >
      <ModalContent>
        <ModalHeader className=''>{titleModal}</ModalHeader>

        <ModalBody>{children}</ModalBody>
        {footer !== undefined && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
