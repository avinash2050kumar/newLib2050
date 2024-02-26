import React, { type CSSProperties } from 'react'
import { TextInput } from './TextInput'
import { Autocomplete, Paper } from '@mui/material'
import { styled } from '@mui/system'
import type { AutocompleteProps } from '@mui/material/Autocomplete'
import { objectOmit } from '../../helpers'
import { FlexCol } from '../Flex'

const StyledListBox = styled(Paper)`
	max-height: 350px;
	background-color: ${({ theme }) => theme.palette.background.default};
	width: 100%;

	:hover {
		cursor: pointer;
	}
`

const List = styled(FlexCol)`
	max-height: 300px;
	width: 100%;
	flex-wrap: nowrap;
	overflow-y: scroll;
`

export type CustomAutoCompleteProps<T> = {
	options?: T[]
	footer?: React.ReactNode
	placeholder?: string
	wrapperStyle?: CSSProperties
	error?: string
} & Omit<
	AutocompleteProps<T, false, false, true>,
	'renderInput' | 'placeholder'
>

export const CustomAutoComplete: React.ComponentType<
	CustomAutoCompleteProps<any>
> = ({ footer, placeholder, error, ...props }) => {
	return (
		<Autocomplete
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			ListboxComponent={props => (
				<StyledListBox {...objectOmit(props, 'className')}>
					<List>{props.children}</List> {footer}
				</StyledListBox>
			)}
			openOnFocus={true}
			sx={{ width: 300 }}
			filterOptions={e => e}
			renderInput={params => (
				<TextInput
					{...params}
					error={!!error}
					placeholder={placeholder}
				/>
			)}
			{...props}
		/>
	)
}
