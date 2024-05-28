import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type ModalProps
} from '@nextui-org/react'
import React, { type ReactNode } from 'react'

/**
 * The `CustomModal` component extends the functionality of the NextUI `Modal` component
 * by adding custom configurations such as a title and optional footer content.
 * It provides a flexible modal dialog that can be used throughout the application.
 *
 * Props:
 * @param {ReactNode} children - The content to be displayed within the modal body.
 * @param {string} titleModal - The title to be displayed in the modal header.
 * @param {ReactNode} [footer] - Optional content to be displayed in the modal footer.
 * @param {...ModalProps} props - Additional props supported by the NextUI `Modal` component.
 *
 * The `CustomModal` component utilizes the `Modal`, `ModalContent`, `ModalHeader`,
 * `ModalBody`, and `ModalFooter` components provided by NextUI to structure the modal dialog.
 * It supports custom configurations for scroll behavior, backdrop, and dismissability.
 * The title specified by the `titleModal` prop is displayed in the modal header.
 * If a `footer` is provided, it is rendered in the modal footer section.
 */
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
