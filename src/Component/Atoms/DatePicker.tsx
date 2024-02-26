import React from 'react'
import {
	DesktopDatePicker,
	type DesktopDatePickerProps
} from '@mui/x-date-pickers/DesktopDatePicker'
import moment from 'moment/moment'
import { Box } from '@mui/system'
import type { TextInputProps } from './TextInput'
import { TextInput } from './TextInput'

type DatePickerProps = { onChange?(date: string | null): void } & Omit<
	DesktopDatePickerProps<any>,
	'onChange'
>

type BrowserInputProps = TextInputProps & {
	ownerState?: any
}

const BrowserInput = function BrowserInput(props: BrowserInputProps) {
	const { InputProps, inputRef } = props

	const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
		event.preventDefault() // Prevent focus on text field when clicked
	}

	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
			ref={InputProps?.ref}
		>
			<TextInput
				ref={inputRef}
				size={'small'}
				{...props}
				InputProps={{
					endAdornment: InputProps?.endAdornment,
					readOnly: true,
					onMouseDown: handleMouseDown,
					style: {
						font: 'caption',
						fontSize: 15
					}
				}}
			/>
		</Box>
	)
}

export const DatePicker: React.ComponentType<DatePickerProps> = ({
	onChange,
	value,
	...props
}) => {
	return (
		<DesktopDatePicker
			closeOnSelect={true}
			value={value ? moment(value) : undefined}
			onChange={e => onChange?.(moment.utc(e).format())}
			{...props}
			slots={{ textField: BrowserInput }}
		/>
	)
}
