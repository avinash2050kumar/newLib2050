import React, { type ReactNode } from 'react'
import { FlexCol } from '../Flex'
import { styled } from '@mui/system'

const StyledWrapper = styled(FlexCol)`
	position: absolute;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	padding: 10px;
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`

export const ModalWrapper = React.forwardRef<
	HTMLDivElement,
	{ children: ReactNode }
>(({ children }, ref) => {
	return <StyledWrapper ref={ref}>{children}</StyledWrapper>
})

ModalWrapper.displayName = 'ModalWrapper'
