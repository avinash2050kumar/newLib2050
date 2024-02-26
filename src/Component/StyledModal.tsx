import React from 'react'
import { Modal, type ModalProps } from '@mui/material'
import { ModalWrapper } from './Atoms/ModalWrapper'

export const StyledModal: React.ComponentType<ModalProps> = ({
	children,
	onClose,
	...props
}) => {
	return (
		<Modal
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			style={{ zIndex: 210 }}
			disableEscapeKeyDown
			{...props}
		>
			<ModalWrapper>{children}</ModalWrapper>
		</Modal>
	)
}
